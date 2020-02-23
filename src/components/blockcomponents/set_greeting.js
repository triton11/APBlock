import * as Blockly from 'blockly/core';

Blockly.Blocks['set_greeting'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set greeting to")
        .appendField(new Blockly.FieldDropdown([["Hello","Hello"], ["Hey there","Hey there"], ["Bienvenidos","Bienvenidos"]]), "greeting");
    this.setNextStatement(true, null);
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

Blockly.Blocks['set_name'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set name to")
        .appendField(new Blockly.FieldTextInput("default"), "NAME");
    this.setPreviousStatement(true, null);
    this.setColour(160);
 this.setTooltip("Use this to set the page greeting");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['set_name'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var code = `this.name = '${text_name}';\n`;
  return code;
};