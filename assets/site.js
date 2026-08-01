/* BAC Contracting and Design, shared behavior for every page */

// header shadow on scroll
var header = document.getElementById('site-header');
if (header) {
  var onScroll = function(){ header.classList.toggle('scrolled', window.scrollY > 8); };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
}

// mobile menu
var burger = document.getElementById('burger'), menu = document.getElementById('mobileMenu');
if (burger && menu) {
  burger.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
    });
  });
}

// services dropdown: hover is handled in CSS, this adds click, touch and keyboard control
var dropWrap = document.getElementById('svcDropWrap'), dropBtn = document.getElementById('svcDropBtn');
if (dropWrap && dropBtn) {
  dropBtn.addEventListener('click', function(e){
    e.stopPropagation();
    var open = dropWrap.classList.toggle('open');
    dropBtn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', function(e){
    if (!dropWrap.contains(e.target)) {
      dropWrap.classList.remove('open');
      dropBtn.setAttribute('aria-expanded', false);
    }
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      dropWrap.classList.remove('open');
      dropBtn.setAttribute('aria-expanded', false);
    }
  });
}

// scroll reveal
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, {threshold:.1});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
} else {
  document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
}

// Estimate form to FormSubmit (AJAX, so the visitor stays on the page).
// Falls back to opening their email client if FormSubmit is ever unreachable.
var estimateForm = document.getElementById('estimateForm');
if (estimateForm) {
  estimateForm.addEventListener('submit', async function(ev){
    ev.preventDefault();
    var form = this, btn = form.querySelector('button[type=submit]');
    if (form._honey && form._honey.value) return; // bot filled the honeypot, drop it
    var g = function(n){ var el = form.elements[n]; return el ? el.value : ''; };
    var subject = g('_subject') || 'New free-estimate request from baccontractinganddesign.com';
    var orig = btn.textContent;
    btn.disabled = true; btn.textContent = 'Sending…';
    try {
      var r = await fetch('https://formsubmit.co/ajax/bacbuildit@gmail.com', {
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({
          name: g('name'), phone: g('phone'), email: g('email'), msg: g('msg'),
          _subject: subject, _template: 'table'
        })
      });
      if (!r.ok) throw new Error(r.status);
      form.innerHTML = '<p class="lead"><b>Thanks, your request is in.</b></p>' +
        '<p class="fine">We&rsquo;ll reply within one business day. Need us sooner? Call (314)&nbsp;202-4037.</p>';
    } catch (e) {
      btn.disabled = false; btn.textContent = orig;
      var e2 = function(n){ return encodeURIComponent(g(n)); };
      window.location.href = 'mailto:bacbuildit@gmail.com?subject=' +
        encodeURIComponent('Free estimate request') +
        '&body=Name: ' + e2('name') + '%0D%0APhone: ' + e2('phone') +
        '%0D%0AEmail: ' + e2('email') + '%0D%0A%0D%0A' + e2('msg');
    }
  });
}
