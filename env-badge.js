/**
 * Puts the environment badge beside the logo on the static pages.
 *
 * The app renders its own in React; these pages have no framework, so one
 * small script does it for all of them. Both read the SAME global, written
 * per environment by the deploy into /env-config.js — so the badge cannot say
 * one thing on the pitch and another in the product.
 *
 * Does nothing when the global is absent. That is the local-preview case, and
 * a badge reading "unknown" would be worse than no badge.
 */
(function () {
  var env = window.PMX_ENV;
  if (!env || !env.label) return;
  var brand = document.querySelector('.nav .brand');
  if (!brand) return;
  var badge = document.createElement('span');
  badge.className = 'envbadge ' + (env.tone || '');
  badge.textContent = env.label;
  badge.title = 'This is the ' + env.label + ' environment';
  brand.insertAdjacentElement('afterend', badge);
})();
