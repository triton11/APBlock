import * as Blockly from 'blockly/core';

Blockly.Blocks['draw_dot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("draw_dot");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['draw_dot'] = function(block) {
  block
  var code = 'draw();';
  return code;
};

Blockly.Blocks['draw_random_dot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("draw_random_dot");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['draw_random_dot'] = function(block) {
  block
  var code = 'drawRandom();';
  return code;
};

Blockly.Blocks['repeat_timer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("repeat")
        .appendField(new Blockly.FieldTextInput("number"), "times")
        .appendField("times");
    this.appendStatementInput("loop_content")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("Use this to set the page greeting");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['repeat_timer'] = function(block) {
  var statements_loop_content = Blockly.JavaScript.statementToCode(block, 'loop_content');
  var code = `draw(); for (var i = 1; i <= vueGet('maxTime'); i++) { waitForSeconds(1); ${statements_loop_content} vueSet('currentTime', i); draw(); }`
  return code;
};


Blockly.Blocks['set_color'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set color to")
        .appendField(new Blockly.FieldDropdown([["yellow","1"], ["green","2"], ["blue","3"], ["purple","4"], ["black","5"], ["current color at row and column","6"]]), "color")
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['set_color'] = function(block) {
  var value_color = block.getFieldValue('color');
  var code = `vueSet('color', ${value_color});`;
  return code;
};

Blockly.Blocks['set_size'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set size to")
        .appendField(new Blockly.FieldNumber(0), "size")
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['set_size'] = function(block) {
  var value_size = block.getFieldValue('size');
  var code = `vueSet('size', ${value_size});`;
  return code;
};


Blockly.Blocks['set_row'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set row to")
        .appendField(new Blockly.FieldNumber(0), "row")
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['set_row'] = function(block) {
  var value_row = block.getFieldValue('row');
  var code = `vueSet('row', ${value_row});`;
  return code;
};


Blockly.Blocks['set_column'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set column to")
        .appendField(new Blockly.FieldNumber(0), "column")
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['set_column'] = function(block) {
  var value_column = block.getFieldValue('column');
  var code = `vueSet('column', ${value_column});`;
  return code;
};

Blockly.Blocks['repeat_column'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("repeat for every")
        .appendField(new Blockly.FieldNumber(10), "column")
        .appendField("th column,");
    this.appendDummyInput()
        .appendField("starting with")
        .appendField(new Blockly.FieldNumber(0), "start_column")
        .appendField("and ending with")
        .appendField(new Blockly.FieldNumber(400), "end_column")
        .appendField(":");
    this.appendStatementInput("column_repeat_content")
        .setCheck(null);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};

Blockly.JavaScript['repeat_column'] = function(block) {
  var number_column = block.getFieldValue('column');
  var number_start_column = block.getFieldValue('start_column');
  var number_end_column = block.getFieldValue('end_column');
  var statements_column_repeat = Blockly.JavaScript.statementToCode(block, 'column_repeat_content');
  var code = `for (var j = ${number_start_column}; j <= ${number_end_column}; j+=${number_column}) { waitForMilliseconds(10); vueSet('column', j); ${statements_column_repeat}; }`;
  return code;
};

Blockly.Blocks['repeat_row'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("repeat for every")
        .appendField(new Blockly.FieldNumber(10), "row")
        .appendField("th row,");
    this.appendDummyInput()
        .appendField("starting with")
        .appendField(new Blockly.FieldNumber(0), "start_row")
        .appendField("and ending with")
        .appendField(new Blockly.FieldNumber(400), "end_row")
        .appendField(":");
    this.appendStatementInput("row_repeat_content")
        .setCheck(null);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};

Blockly.JavaScript['repeat_row'] = function(block) {
  var number_row = block.getFieldValue('row');
  var number_start_row = block.getFieldValue('start_row');
  var number_end_row = block.getFieldValue('end_row');
  var statements_row_repeat = Blockly.JavaScript.statementToCode(block, 'row_repeat_content');
  var code = `for (var i = ${number_start_row}; i <= ${number_end_row}; i+=${number_row}) { waitForMilliseconds(10); vueSet('row', i); ${statements_row_repeat}; }`;
  return code;
};

