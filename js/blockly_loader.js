document.addEventListener('DOMContentLoaded', function () {
  var sidenav = document.querySelectorAll('.sidenav');
  var mSidenav = M.Sidenav.init(sidenav, {});

  var tooltips = document.querySelectorAll('.tooltipped');
  var mTooltip = M.Tooltip.init(tooltips, {});

  // var selects = document.querySelectorAll('select');
  // var mFormSelect = M.FormSelect.init(selects, {});
  var code_lang = document.getElementById('code_lang');
  M.FormSelect.init(code_lang, {});

  var modals = document.querySelectorAll('.modal');
  var mModals = M.Modal.init(modals, {});

  var tabs = document.querySelector('.tabs');
  var tabOptions = { onShow: Code.codeShow };
  var mTabs = M.Tabs.init(tabs, tabOptions);
});