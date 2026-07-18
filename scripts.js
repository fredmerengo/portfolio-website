// Mobile menu toggle with ESC, auto-close, focus trap, and live-region announcements
document.addEventListener('DOMContentLoaded', function(){
  var btn = document.querySelector('.menu-toggle');
  if(!btn) return;
  var nav = document.getElementById(btn.getAttribute('aria-controls'));
  var statusEl = document.getElementById('nav-status');
  var focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function getFocusable(){
    if(!nav) return [];
    return Array.from(nav.querySelectorAll(focusableSelector)).filter(function(el){
      return el.offsetWidth > 0 || el.offsetHeight > 0;
    });
  }

  function announce(text){
    if(!statusEl) return;
    statusEl.textContent = text;
  }

  function closeMenu(){
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('open');
    if(nav) nav.dataset.visible = 'false';
    announce('Navigation closed');
    btn.focus();
    document.removeEventListener('keydown', onKeydown);
  }

  function openMenu(){
    btn.setAttribute('aria-expanded', 'true');
    btn.classList.add('open');
    if(nav) nav.dataset.visible = 'true';
    var items = getFocusable();
    var count = items.length;
    var countText = count === 1 ? '1 link available' : count + ' links available';
    announce('Navigation opened. ' + countText + '.');
    // focus first item if present
    if(items.length) items[0].focus();
    document.addEventListener('keydown', onKeydown);
  }

  function onKeydown(e){
    var key = e.key || e.keyIdentifier || e.code;
    if(key === 'Escape' || key === 'Esc'){
      closeMenu();
      return;
    }
    if(key === 'Tab' && nav && nav.dataset.visible === 'true'){
      var items = getFocusable();
      if(!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if(!e.shiftKey && document.activeElement === last){
        e.preventDefault();
        first.focus();
      } else if(e.shiftKey && document.activeElement === first){
        e.preventDefault();
        last.focus();
      }
    }
  }

  btn.addEventListener('click', function(){
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    if(expanded) closeMenu(); else openMenu();
  });

  // Close when a nav link is activated (improves mobile UX)
  if(nav){
    nav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        setTimeout(closeMenu, 50);
      });
    });
  }

  // Map consent and lazy-loading
  var mapContainer = document.getElementById('map-container');
  var mapConsentEl = document.getElementById('map-consent');
  var loadBtn = document.getElementById('load-map');
  var denyBtn = document.getElementById('deny-map');

  function loadMap(){
    if(!mapContainer) return;
    // Add iframe
    mapContainer.innerHTML = '<iframe src="https://www.google.com/maps?q=Langas,+Eldoret,+Kenya&output=embed" width="100%" height="320" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Maranatha Praise Center location on Google Maps"></iframe>';
    mapContainer.setAttribute('aria-hidden','false');
    if(mapConsentEl) mapConsentEl.style.display = 'none';
    try{ localStorage.setItem('mpc_map_consent','granted'); }catch(e){}
  }

  function denyMap(){
    if(mapConsentEl) mapConsentEl.innerHTML = '<p>Map not allowed. You can still open it on Google Maps via the "Get directions" link.</p>';
    try{ localStorage.setItem('mpc_map_consent','denied'); }catch(e){}
  }

  try{
    var consent = localStorage.getItem('mpc_map_consent');
    if(consent === 'granted') loadMap();
    else if(consent === 'denied' && mapConsentEl) mapConsentEl.innerHTML = '<p>Map not allowed. You can still open it on Google Maps via the "Get directions" link.</p>';
  }catch(e){}

  if(loadBtn) loadBtn.addEventListener('click', function(){ loadMap(); });
  if(denyBtn) denyBtn.addEventListener('click', function(){ denyMap(); });

  // Cookie consent banner handling
  var cookieBanner = document.querySelector('.cookie-banner');
  var cookieAccept = cookieBanner && cookieBanner.querySelector('.accept-cookies');
  var cookieDecline = cookieBanner && cookieBanner.querySelector('.decline-cookies');

  function hideCookieBanner(){ if(cookieBanner) cookieBanner.style.display = 'none'; }

  try{
    var cookieConsent = localStorage.getItem('mpc_cookies_consent');
    if(!cookieConsent && cookieBanner){ cookieBanner.style.display = 'flex'; }
    else { hideCookieBanner(); }
  }catch(e){ if(cookieBanner) cookieBanner.style.display = 'flex'; }

  if(cookieAccept){ cookieAccept.addEventListener('click', function(){ try{ localStorage.setItem('mpc_cookies_consent','granted'); }catch(e){} hideCookieBanner(); }); }
  if(cookieDecline){ cookieDecline.addEventListener('click', function(){ try{ localStorage.setItem('mpc_cookies_consent','denied'); }catch(e){} hideCookieBanner(); }); }
});
