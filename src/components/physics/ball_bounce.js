import * as Blockly from 'blockly/core';

Blockly.Blocks['set_variable'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("set")
            .appendField(new Blockly.FieldDropdown(
                [
                    ["x acceleration","ddx"], 
                    ["y acceleration","ddy"], 
                    ["x velocity","dx"],
                    ["y velocity","dy"],
                    ["x position","px"],
                    ["y position","py"],
                    ["timer","maxTime"]
                ]
            ), "my_variable")
            .appendField("to")
        this.appendValueInput("my_value")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['set_variable'] = function(block) {
  var dropdown_my_variable = block.getFieldValue('my_variable');
  var value_my_value = Blockly.JavaScript.valueToCode(block, 'my_value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `vueSet('${dropdown_my_variable}', ${value_my_value});`;
  return code;
};

Blockly.Blocks['change_variable'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("change")
            .appendField(new Blockly.FieldDropdown(
                [
                    ["x acceleration","ddx"], 
                    ["y acceleration","ddy"], 
                    ["x velocity","dx"],
                    ["y velocity","dy"],
                    ["x position","px"],
                    ["y position","py"],
                    ["timer","maxTime"]
                ]
            ), "my_variable")
            .appendField("by")
        this.appendValueInput("my_value")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['change_variable'] = function(block) {
  var dropdown_my_variable = block.getFieldValue('my_variable');
  var value_my_value = Blockly.JavaScript.valueToCode(block, 'my_value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `vueSet('${dropdown_my_variable}', (vueGet('${dropdown_my_variable}') + ${value_my_value}));`;
  return code;
};

Blockly.Blocks['get_variable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
            [
                ["x acceleration","ddx"], 
                ["y acceleration","ddy"], 
                ["x velocity","dx"],
                ["y velocity","dy"],
                ["x position","px"],
                ["y position","py"],
                ["timer","max_time"]
            ]
        ), "my_variable");
    this.setOutput(true, null);
    this.setColour(230);
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['get_variable'] = function(block) {
  var dropdown_my_variable = block.getFieldValue('my_variable');
  var code = `vueGet('${dropdown_my_variable}')`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['draw_ball'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("draw_ball");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['draw_ball'] = function(block) {
  block
  var code = 'draw();';
  return code;
};

Blockly.Blocks['repeat_timer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("every second do");
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

