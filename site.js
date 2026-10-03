(() => {
  'use strict';
  const zh = document.documentElement.lang.startsWith('zh');
  const lang = zh ? 'zh' : 'en';
  const api = typeof window.LIVELIVA_CONFIG?.apiBase === 'string' ? window.LIVELIVA_CONFIG.apiBase.replace(/\/$/, '') : '';
  const optKey = 'liveliva-analytics-disabled';
  const signal = navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.globalPrivacyControl === true;
  let optedOut = false;
  try { optedOut = localStorage.getItem(optKey) === '1'; } catch (_) {}
  const path = location.pathname;
  const page = /\/brief\//.test(path) ? 'brief' : /product(?:-zh)?\.html$/.test(path) ? 'blueprint' : 'home';
  const sourceValue = new URLSearchParams(location.search).get('ref');
  const source = ['direct','linkedin','maimai','captaincast','other'].includes(sourceValue) ? sourceValue : sourceValue ? 'other' : 'direct';
  if (source !== 'direct') document.querySelectorAll('a[href]').forEach(a => {
    const raw = a.getAttribute('href');
    if (raw.startsWith('#')) return;
    const u = new URL(a.href, location.href);
    if (u.origin === location.origin && /\.html$|\/$/.test(u.pathname)) { u.searchParams.set('ref', source); a.href = u.href; }
  });
  const events = new Set(['pageview','video_play','brief_open','blueprint_open','captaincast_open','founder_open','contact_view','experience_interaction']);
  function track(event) {
    if (!api || signal || optedOut || !events.has(event)) return;
    const body = JSON.stringify({event, page, source, lang});
    try {
      fetch(api + '/api/events', {method:'POST', headers:{'Content-Type':'application/json'}, body, keepalive:true, credentials:'omit'}).catch(() => {});
    } catch (_) {}
  }
  if (!/privacy(?:-zh)?\.html$/.test(path)) track('pageview');
  document.querySelectorAll('video').forEach(video => video.addEventListener('play', () => track('video_play'), {once:true}));
  document.addEventListener('click', event => {
    const a = event.target.closest('a[href]');
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (/LiveLiva_One_Page_/.test(url.pathname)) track('brief_open');
    else if (/\/product(?:-zh)?\.html$/.test(url.pathname)) track('blueprint_open');
    else if (/\/CaptainCast\/liveliva\/?/.test(url.pathname)) track('captaincast_open');
    else if (/\/cv\/?$/.test(url.pathname)) track('founder_open');
  });
  document.addEventListener('liva:experience', () => track('experience_interaction'), {once:true});
  const contact = document.getElementById('connect');
  if (contact && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { track('contact_view'); observer.disconnect(); }
    }, {threshold:0.1});
    observer.observe(contact);
  }
  const toggle = document.getElementById('analytics-optout');
  if (toggle) {
    toggle.checked = optedOut || signal;
    toggle.disabled = signal;
    const status = document.getElementById('privacy-status');
    if (signal) status.textContent = zh ? '浏览器隐私信号已停用统计。' : 'Your browser privacy signal has disabled analytics.';
    toggle.addEventListener('change', () => {
      optedOut = toggle.checked;
      try {
        if (optedOut) localStorage.setItem(optKey, '1'); else localStorage.removeItem(optKey);
        status.textContent = zh ? '偏好已保存。' : 'Preference saved.';
      } catch (_) { status.textContent = zh ? '本次页面已应用，浏览器未允许保存偏好。' : 'Applied for this page. Your browser did not allow saving the preference.'; }
    });
  }
  const form = document.getElementById('contact-form');
  if (!form || !api) return;
  const button = form.querySelector('button[type=submit]');
  const status = document.getElementById('contact-status');
  button.disabled = false;
  status.textContent = zh ? '留言仅由负责人查阅。' : 'Only the project lead can read your message.';
  let requestId = null;
  let pending = false;
  let lastPayload = null;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    const fields = new FormData(form);
    const payload = {name:String(fields.get('name') || '').trim(), email:String(fields.get('email') || '').trim(), interest:String(fields.get('interest')), message:String(fields.get('message') || '').trim(), consent:fields.get('consent') === 'on', website:String(fields.get('website') || '')};
    if (payload.message.length < 10) { status.textContent = zh ? '请至少填写10个有效字符。' : 'Please enter at least 10 non-padding characters.'; return; }
    const serialized = JSON.stringify(payload);
    if (!requestId || serialized !== lastPayload) requestId = crypto.randomUUID();
    lastPayload = serialized;
    pending = true; button.disabled = true;
    status.textContent = zh ? '正在发送…' : 'Sending…';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(api + '/api/messages', {method:'POST', headers:{'Content-Type':'application/json'}, credentials:'omit', signal:controller.signal, body:JSON.stringify({id:requestId, ...payload})});
      if (!response.ok) throw new Error('Send failed');
      const receipt = await response.json();
      if (receipt.ok !== true || receipt.id !== requestId) throw new Error('Missing receipt');
      form.reset(); requestId = null; lastPayload = null;
      status.textContent = zh ? '留言已保存。谢谢，负责人可通过你预留的邮箱与你联系。' : 'Your message has been saved. The project lead can follow up using your email.';
    } catch (_) {
      status.textContent = zh ? '发送未确认，内容已保留。请重试或使用上方邮件入口。' : 'Delivery could not be confirmed. Your message is preserved. Please retry or use the email link above.';
    } finally { clearTimeout(timer); pending = false; button.disabled = false; }
  });
})();
