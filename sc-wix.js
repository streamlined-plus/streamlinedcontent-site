/* Streamlined Content · Wix headless connector (forms, newsletter, Streamlined+ checkout, analytics).
   Plain browser JS, no dependencies. The client id is public; it only mints anonymous visitor tokens. */
(function () {
  var SC = {
    clientId: "b40a1002-9c0a-41ad-99ca-d17a046f829f",
    forms: {
      blueprint:  "f47b2594-1d91-42a0-896e-b213e55879e8",
      newsletter: "0fcc09fb-5e37-4b14-a09f-d72c7f619cd7"
    },
    plans: { splus: "5c57cb60-a418-4fd2-8008-48a72848d554" },
    ga: "G-L4X34GZB13"
  };
  window.SC_WIX = SC;

  var API = "https://www.wixapis.com";
  var KEY = "wix-visitor-token-" + SC.clientId;

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; } }
  function save(t) { try { localStorage.setItem(KEY, JSON.stringify(t)); } catch (e) {} }
  function mint(body) {
    return fetch(API + "/oauth2/token", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { if (!r.ok) throw new Error("oauth " + r.status); return r.json(); })
      .then(function (d) { var t = { accessToken: d.access_token, refreshToken: d.refresh_token, expiresAt: Date.now() + d.expires_in * 1000 }; save(t); return t.accessToken; });
  }
  function token() {
    var c = load();
    if (c && c.expiresAt > Date.now() + 60000) return Promise.resolve(c.accessToken);
    var p = c && c.refreshToken ? mint({ clientId: SC.clientId, grantType: "refresh_token", refreshToken: c.refreshToken }).catch(function () { return null; }) : Promise.resolve(null);
    return p.then(function (t) { return t || mint({ clientId: SC.clientId, grantType: "anonymous" }); });
  }
  function api(path, body) {
    return token().then(function (t) {
      return fetch(API + path, { method: "POST", headers: { "Content-Type": "application/json", Authorization: t }, body: JSON.stringify(body) });
    }).then(function (r) {
      return r.text().then(function (txt) {
        var data; try { data = JSON.parse(txt); } catch (e) { data = txt; }
        if (!r.ok) { var err = new Error("wix " + r.status); err.body = data; throw err; }
        return data;
      });
    });
  }

  /* ---- forms ---- */
  var OK = { CONFIRMED: 1, PENDING: 1, PAYMENT_WAITING: 1 };
  SC.submit = function (formId, values) {
    return api("/form-submission-service/v4/submissions", { submission: { formId: formId, submissions: values } })
      .then(function (res) {
        var s = res && res.submission;
        if (!s || !s.id || !OK[s.status]) throw new Error("submission not created");
        return s;
      });
  };
  function violations(err) {
    var v = (err && err.body && err.body.details && err.body.details.validationError && err.body.details.validationError.fieldViolations) || [];
    var out = []; v.forEach(function (x) { (x.data && x.data.errors ? x.data.errors : [x]).forEach(function (e) { if (e.errorPath) out.push(e); }); });
    return out;
  }
  function note(form, msg, kind) {
    var n = form.querySelector(".form-msg");
    if (!n) { n = document.createElement("p"); n.className = "form-msg"; form.appendChild(n); }
    n.textContent = msg; n.setAttribute("data-kind", kind);
  }
  function wireForm(form) {
    var key = form.getAttribute("data-wix-form"), formId = SC.forms[key];
    if (!formId) return;
    form.removeAttribute("action");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var btn = form.querySelector("[type=submit]"), values = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name || el.disabled) return;
        if (el.type === "checkbox") { if (el.checked) values[el.name] = true; return; }
        var v = (el.value || "").trim(); if (v) values[el.name] = v;
      });
      if (form.hasAttribute("data-subscribe")) values.subscribe = true;
      if (values.focus) { values.message = "Focus: " + values.focus + (values.message ? "\n\n" + values.message : ""); delete values.focus; }
      if (btn) { btn.disabled = true; btn.setAttribute("data-label", btn.textContent); btn.textContent = "Sending…"; }
      SC.submit(formId, values).then(function () {
        form.reset();
        note(form, form.getAttribute("data-thanks") || "Got it. A human will reply within two business days.", "ok");
        form.dispatchEvent(new CustomEvent("sc:submitted", { bubbles: true }));
      }).catch(function (err) {
        var v = violations(err);
        note(form, v.length ? "Please check: " + v.map(function (e) { return e.errorPath.replace(/_/g, " "); }).join(", ") : "That didn't go through. Email hello@streamlinedcontent.com and we'll sort it.", "err");
      }).then(function () { if (btn) { btn.disabled = false; btn.textContent = btn.getAttribute("data-label"); } });
    });
  }

  /* ---- Streamlined+ checkout (Wix-hosted; handles login/signup + payment) ---- */
  SC.checkout = function (planId, opts) {
    opts = opts || {};
    var callbacks = { postFlowUrl: opts.postFlowUrl || location.href };
    if (opts.thankYouPageUrl) callbacks.thankYouPageUrl = opts.thankYouPageUrl;
    return api("/headless/v1/redirect-session", { paidPlansCheckout: { planId: planId }, callbacks: callbacks })
      .then(function (r) { var u = r && r.redirectSession && r.redirectSession.fullUrl; if (!u) throw new Error("no checkout url"); return u; });
  };
  function wirePlan(a) {
    var key = a.getAttribute("data-wix-plan"), planId = SC.plans[key];
    if (!planId) return;
    a.addEventListener("click", function (ev) {
      ev.preventDefault();
      var label = a.innerHTML; a.innerHTML = "Opening secure checkout…"; a.style.pointerEvents = "none";
      SC.checkout(planId, { thankYouPageUrl: location.origin + "/streamlined-plus/thank-you/index.html", postFlowUrl: location.origin + "/streamlined-plus/index.html" })
        .then(function (u) { location.href = u; })
        .catch(function () { a.innerHTML = label; a.style.pointerEvents = ""; alert("Checkout isn't available right now. Email hello@streamlinedcontent.com and we'll invoice you directly."); });
    });
  }

  /* ---- analytics (GA4, only if an id is set) ---- */
  function ga() {
    if (!SC.ga) return;
    var s = document.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + SC.ga; document.head.appendChild(s);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date()); gtag("config", SC.ga, { anonymize_ip: true });
    document.addEventListener("sc:submitted", function (e) { gtag("event", "generate_lead", { form: e.target.getAttribute("data-wix-form") }); });
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll("form[data-wix-form]"), wireForm);
    Array.prototype.forEach.call(document.querySelectorAll("[data-wix-plan]"), wirePlan);
    ga();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
