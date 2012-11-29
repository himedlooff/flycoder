define(["FlyCoder/config", "FlyCoder/expression"], function (config, Expression) {

	function Variable(value) {
		if (typeof value !== "undefined")
			this.value = value;
	}
	
	Variable.prototype = new Expression();
	Variable.prototype._construct(config.types.VARIABLE);
	
	Variable.prototype.evaluate = function() {
		return this.value;
	};
	
	Variable.prototype.drop = function(location_id, object) {
	}
	
	Variable.prototype.set = function(val) {
		this.value = val;
	}

	return Variable;
});