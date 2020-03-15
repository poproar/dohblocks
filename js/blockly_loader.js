// sidenav
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});
// tabs
var el = document.querySelector('.tabs');
var options = { onShow: codeShow };
var instance = M.Tabs.init(el, options);


document.addEventListener('DOMContentLoaded', function () {
  var tips = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(tips, {});
});

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
    if (typeof PR == 'object') {
      PR.prettyPrint();
    }
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
