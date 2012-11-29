define(["FlyCoder/config", "FlyCoder/block"], function (config, Block) {

	function ConditionalBlock(type) {
		if (typeof type === "undefined") throw "Please provide a valid conditional type!";
		
		this.condition = null;
		this.type = null;
		this.body = [];
		
		//CHECK ITS ONE OF THE OPERATORS
		if (config.simple_conditional_types.hasOwnProperty(type))
			this.type = config.simple_conditional_types[type];
		else {
			for (key in config.simple_conditional_types) {
				if(config.simple_conditional_types[key] == type) {
					this.type = config.simple_conditional_types[key];
					break;
				}
			}
		}
		
		if (this.type == null) throw "Invalid conditional type!";
	}
	ConditionalBlock.prototype = new Block();
	ConditionalBlock.prototype._construct(config.types.CONDITIONAL_BLOCK);
	
	ConditionalBlock.prototype.evaluate = function() {
		if (this.condition == null || this.type == null)
			throw "You must specify a valid condition and a valid condition type.";
		
		var code = "";
		var cond_code = [this.type,config.settings.OPEN_PAREN, this.condition.evaluate(false), config.settings.CLOSE_PAREN];
		
		var body = [];
		
		for (var i=0; i < this.body.length; i++) {
			body.push(this.body[i].evaluate());
		}
		
		code = cond_code.join(" ") + config.settings.SINGLE_SPACE + config.settings.OPEN_CURLY_BRACE;
		
		if(body.length > 0) {
			code += body.join(" ");//config.settings.LINE_TERMINATOR);
		}
		
		code += config.settings.CLOSE_CURLY_BRACE;
		
		return code;
	}
	
	ConditionalBlock.prototype.set_condition = function(expression) {
		//cannot be another block, must be expression
		//if (expression.type 
		this.condition = expression;
	}

	return ConditionalBlock;
});