/* Closes the secretarial-compliance scope dropdown when a click lands
   inside its panel but outside the card, or on the close control.

   SCOPED TO .scm-dropdown-list ON PURPOSE. The previous version keyed
   off .w-dropdown-list, which every Webflow dropdown on the site
   carries, so a click on any link inside any dropdown was
   preventDefault()ed and its panel force-closed. The blog's
   "References & Sources" list was the visible casualty: its citation
   links did not merely collapse the toggle, they did nothing at all. */
document.addEventListener('click', function (e) {
  var list = e.target.closest('.scm-dropdown-list');
  if (!list) return;
  var card = e.target.closest('.scm-card');
  var closeBtn = e.target.closest('.scm-close');
  if (closeBtn || !card) {
    e.preventDefault();
    list.classList.remove('w--open');
  }
});