import * as Blockly from 'blockly/core';


Blockly.Blocks['draw_people'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("draw_people");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['draw_people'] = function(block) {
  block
  var code = 'draw();';
  return code;
};

Blockly.Blocks['set_days'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set number of days to")
        .appendField(new Blockly.FieldNumber(0), "days");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['set_days'] = function(block) {
  var value_days = block.getFieldValue('days');
  // TODO: Assemble JavaScript into code variable.
  var code = `vueSet('maxDays', ${value_days});`;
  return code;
};

Blockly.Blocks['random_infect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("random_infect");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['random_infect'] = function(block) {
  block
  var code = 'randomInfect(); draw();';
  return code;
};

Blockly.Blocks['repeat_days'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("every day do");
    this.appendStatementInput("loop_content")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['repeat_days'] = function(block) {
  var statements_loop_content = Blockly.JavaScript.statementToCode(block, 'loop_content');
  var code = `draw(); for (var i = 1; i <= vueGet('maxDays'); i++) { waitForMilliseconds(1000); ${statements_loop_content} vueSet('currentDay', i); draw(); }`
  return code;
};

Blockly.Blocks['repeat_person'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("every person do");
    this.appendStatementInput("loop_content")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['repeat_person'] = function(block) {
  var statements_loop_content = Blockly.JavaScript.statementToCode(block, 'loop_content');
  var code = `draw(); for (var j = 0; j < 80; j++) { waitForMilliseconds(20); vueSet('currentPerson', j); ${statements_loop_content} draw(); } vueSet('currentPerson', undefined); updateSick(); draw();`
  return code;
};

Blockly.Blocks['meet_people'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("meet")
        .appendField(new Blockly.FieldNumber(0), "people")
        .appendField("people");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};

Blockly.JavaScript['meet_people'] = function(block) {
  var value_people = block.getFieldValue('people');
  // TODO: Assemble JavaScript into code variable.
  var code = `meetPeople(${value_people}, j);`;
  return code;
};

Blockly.Blocks['if_person'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("if person age")
        .appendField(new Blockly.FieldDropdown(
                [
                    ["<","less"],
                    ["=","equal"], 
                    [">","greater"]
                ]
            ), "my_variable");
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "number_test");
    this.appendStatementInput("then_do")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['if_person'] = function(block) {
  var value_number = block.getFieldValue('number_test');
  var value_comparison = block.getFieldValue('my_variable');

  var statements_then_do = Blockly.JavaScript.statementToCode(block, 'then_do');
  // TODO: Assemble JavaScript into code variable.
  var code = `if (j < ${value_number}) { ${statements_then_do} };\n`;
  if (value_comparison == 'equal') {
    code = `if (j === ${value_number}) { ${statements_then_do} };\n`;
  }
  if (value_comparison == 'greater') {
    code = `if (j > ${value_number}) { ${statements_then_do} };\n`;
  }
  return code;
};

Blockly.Blocks['get_person_attribute'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
            [
                ["age","age"], 
            ]
        ), "my_variable");
    this.setOutput(true, "Number");
    this.setColour(330);
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['get_person_attribute'] = function(block) {
  var dropdown_my_variable = block.getFieldValue('my_variable');
  var code = `vueGetPerson(j, '${dropdown_my_variable}')`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['set_immunity'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set transmission rate to")
        .appendField(new Blockly.FieldNumber(0), "immunity")
        .appendField("%");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['set_immunity'] = function(block) {
  var value_immunity = block.getFieldValue('immunity');
  // TODO: Assemble JavaScript into code variable.
  var code = `vueSet('immunity', ${value_immunity});`;
  return code;
};
