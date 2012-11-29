define(["FlyCoder/config", "FlyCoder/expression"], function (config, Expression) {
	function Operator(type) {
		if (typeof type === "undefined") throw "Please provide an operator!";
		
		this.left = null;
		this.right = null;
		this.operator = null;
		
		//CHECK ITS ONE OF THE OPERATORS
		if (config.op_types.hasOwnProperty(type))
			this.operator = config.op_types[type];
		else {
			for (key in config.op_types) {
				if(config.op_types[key] == type) {
					this.operator = config.op_types[key];
					break;
				}
			}
		}
		
		if (this.operator == null) throw "Invalid operator!";
	}
	Operator.prototype = new Expression();
	Operator.prototype._construct(config.types.OPERATOR);
	
	Operator.prototype.drop = function(location_id, object) {
		if (!this.authorize(object)) return false;
		
		if (location_id == config.op_settings.LOCATION_ID_LEFT) {
			//check type of object?!
			this.left = object;
		} else if (location_id == config.op_settings.LOCATION_ID_RIGHT) {
			//check type
			this.right = object;
		}
	}
	
	Operator.prototype.evaluate = function(add_term) {
		if (this.operator != null && this.left != null && this.right != null) {
			var code = [this.left.evaluate(), this.operator, this.right.evaluate()];
			code = code.join(" ");
			if(typeof add_term !== "undefined" && add_term == false)
				return code;
			else
				return code + config.settings.LINE_TERMINATOR;
		} else {
			return false;
		}
	};
	
	return Operator;
});