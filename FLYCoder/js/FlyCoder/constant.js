define(["FlyCoder/config", "FlyCoder/expression"], function (config, Expression) {

	function Constant(value) {
		if (typeof value !== "undefined")
			this.value = value;
	}
	
	Constant.prototype = new Expression();
	Constant.prototype._construct(config.types.CONSTANT);
	
	Constant.prototype.evaluate = function() {
		return this.value;
	};
	
	Constant.prototype.drop = function(location_id, object) {
	}
	
	Constant.prototype.set = function(val) {
		this.value = val;
	}

	return Constant;
});