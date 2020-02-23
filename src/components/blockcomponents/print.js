import * as Blockly from 'blockly/core';

Blockly.Blocks['puts'] = {
  init: function() {
    this.appendValueInput("puts_text")
        .setCheck(null)
        .appendField("puts");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript["puts"] = function(block) {
  var value_puts_text = Blockly.JavaScript.valueToCode(block, 'puts_text', Blockly.JavaScript.ORDER_ATOMIC);
  console.log(value_puts_text)
  var code = `print_out(${value_puts_text});\n`
  console.log(code)
  return code;
};