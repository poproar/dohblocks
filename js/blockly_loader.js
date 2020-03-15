document.addEventListener('DOMContentLoaded', function () {
  var sidenav = document.querySelectorAll('.sidenav');
  var mSidenav = M.Sidenav.init(sidenav, {});

  var tooltips = document.querySelectorAll('.tooltipped');
  var mTooltip = M.Tooltip.init(tooltips, {});

  var selects = document.querySelectorAll('select');
  var mFormSelect = M.FormSelect.init(selects, {});

  var modals = document.querySelectorAll('.modal');
  var mModals = M.Modal.init(modals, {});
});

var tabs = document.querySelector('.tabs');
var tabOptions = { onShow: codeShow };
var mTabs = M.Tabs.init(el, tabOptions);


var workspace = Blockly.inject('blocklyDiv',
  {
    grid:
    {
      spacing: 25,
      length: 3,
      colour: '#ccc',
      snap: true
    },
    media: '/media/',
    toolbox: document.getElementById('toolbox'),
    zoom:
    {
      controls: true,
      wheel: true
    }
  });



function codeShow(tabObj) {
  console.log(tabObj.id);
  if (tabObj.id == 'codeTab') {
    var content = document.getElementById('content_javascript');
    console.log(content);
    content.textContent = '';
    if (checkAllGeneratorFunctionsDefined(Blockly.JavaScript)) {
      var code = Blockly.JavaScript.workspaceToCode(workspace);
      content.textContent = code;
      // Remove the 'prettyprinted' class, so that Prettify will recalculate.
      content.className = content.className.replace('prettyprinted', '');
    }
  } else if (tabObj.id == 'xmlTab') {
    var content = document.getElementById('content_xml');
    content.textContent = '';
    var asXML = Blockly.Xml.workspaceToDom(workspace);
    var xmlText = Blockly.Xml.domToPrettyText(asXML);
    content.textContent = xmlText;
    content.className = content.className.replace('prettyprinted', '');
  }
  if (typeof PR == 'object') {
    PR.prettyPrint();
  }
}

function checkAllGeneratorFunctionsDefined(generator) {
  var blocks = workspace.getAllBlocks(false);
  var missingBlockGenerators = [];
  for (var i = 0; i < blocks.length; i++) {
    var blockType = blocks[i].type;
    if (!generator[blockType]) {
      if (missingBlockGenerators.indexOf(blockType) == -1) {
        missingBlockGenerators.push(blockType);
      }
    }
  }

  var valid = missingBlockGenerators.length == 0;
  if (!valid) {
    var msg = 'The generator code for the following blocks not specified for ' +
      generator.name_ + ':\n - ' + missingBlockGenerators.join('\n - ');
    Blockly.alert(msg);  // Assuming synchronous. No callback.
  }
  return valid;
}
