import * as Blockly from 'blockly/core';

Blockly.Blocks['si_no'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("si");
    this.appendValueInput("condicion")
        .setCheck("Boolean");
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("entonces"), "NAME");
    this.appendStatementInput("si_haces")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("si no");
    this.appendStatementInput("si_no_haces")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['si_no'] = function(block) {
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_si_haces = Blockly.JavaScript.statementToCode(block, 'si_haces');
  var statements_si_no_haces = Blockly.JavaScript.statementToCode(block, 'si_no_haces');
  // TODO: Assemble JavaScript into code variable.
  var code = `if (${value_condicion}) { ${statements_si_haces} } else { ${statements_si_no_haces} };\n`;
  return code;
};

Blockly.Blocks['si'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("si");
    this.appendValueInput("condicion")
        .setCheck("Boolean");
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("entonces"), "NAME");
    this.appendStatementInput("si_haces")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['si'] = function(block) {
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_si_haces = Blockly.JavaScript.statementToCode(block, 'si_haces');
  // TODO: Assemble JavaScript into code variable.
  var code = `if (${value_condicion}) { ${statements_si_haces} };\n`;
  return code;
};


Blockly.Blocks['dice'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("dice")
        .appendField(new Blockly.FieldTextInput("hola"), "dice")
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['dice'] = function(block) {
  var text_dice = block.getFieldValue('dice');
  // TODO: Assemble JavaScript into code variable.
  var code = `waitForSeconds(1); botMessage('${text_dice}');\n`;
  return code;
};

Blockly.Blocks['pregunta'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("pregunta ¿")
        .appendField(new Blockly.FieldTextInput("qué"), "pregunta")
        .appendField("?");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['pregunta'] = function(block) {
  var text_pregunta = '¿' + block.getFieldValue('pregunta') + '?';
  // TODO: Assemble JavaScript into code variable.
  var code = `waitForSeconds(1); botMessage('${text_pregunta}');\n`;
  return code;
};

Blockly.Blocks['contiene'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("contiene");
    this.appendValueInput("contiene")
        .setCheck("String");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['contiene'] = function(block) {
  var value_contains = Blockly.JavaScript.valueToCode(block, 'contiene', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `checkContains(${value_contains})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['y_logic'] = {
  init: function() {
    this.appendValueInput("first")
        .setCheck('Boolean');
    this.appendDummyInput()
        .appendField("y");
    this.appendValueInput("second")
        .setCheck('Boolean');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['y_logic'] = function(block) {
  var value_first = Blockly.JavaScript.valueToCode(block, 'first', Blockly.JavaScript.ORDER_ATOMIC);
  var value_second = Blockly.JavaScript.valueToCode(block, 'second', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = `(${value_first} && ${value_second})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['o_logic'] = {
  init: function() {
    this.appendValueInput("first")
        .setCheck('Boolean');
    this.appendDummyInput()
        .appendField("o");
    this.appendValueInput("second")
        .setCheck('Boolean');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['o_logic'] = function(block) {
  var value_first = Blockly.JavaScript.valueToCode(block, 'first', Blockly.JavaScript.ORDER_ATOMIC);
  var value_second = Blockly.JavaScript.valueToCode(block, 'second', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = `(${value_first} || ${value_second})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['no_logic'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("no");
    this.appendValueInput("first")
        .setCheck('Boolean');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['no_logic'] = function(block) {
  var value_first = Blockly.JavaScript.valueToCode(block, 'first', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = `(!(${value_first}))`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};