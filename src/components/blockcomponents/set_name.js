import * as Blockly from 'blockly/core';

Blockly.Blocks['set_name'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set greeting to")
        .appendField(new Blockly.FieldDropdown([["Hello","Hello"], ["Hey there","Hey there"], ["Bienvenidos","Bienvenidos"]]), "greeting");
    this.setPreviousStatement(true, null);
    this.setColour(160);
 this.setTooltip("Use this to set the page greeting");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['set_greeting'] = function(block) {
  var dropdown_greeting = block.getFieldValue('greeting');
  var code = `this.greeting = '${dropdown_greeting}';\n`;
  return code;
};