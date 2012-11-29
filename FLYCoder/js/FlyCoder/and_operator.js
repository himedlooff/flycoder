define(["FlyCoder/config", "FlyCoder/operator", "FlyCoder/Expression"], function (config, Operator, Expression) {
	function AndOperator() {
	
	}
	AndOperator.prototype = new Operator();
	AndOperator.prototype._construct(config.types.ANDOP); 
	
	
	
	return AndOperator;
});