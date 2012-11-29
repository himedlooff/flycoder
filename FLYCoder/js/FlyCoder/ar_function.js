define(["FlyCoder/config", "FlyCoder/expression"], function (config, Expression) {
	function ARFunction(func) {
		if (typeof name === "undefined") throw "Please provide a function name!";
		
		this.parameters = [];
		this.name = func.name;
		this.parameter_count = func.params;
		
		/*for (key in ar_drone_funcs) {    
            if(ar_drone_funcs[key].name == name) {
                this.name = ar_drone_funcs[key].name;
                this.parameter_count = ar_drone_funcs[key].params;
                break;
            }
        }*/
		
		if (this.name == null) throw "Invalid AR.DRONE function!";
	}
	ARFunction.prototype = new Expression();
	ARFunction.prototype._construct(config.types.AR_DRONE_FUNCTION);
	
	ARFunction.prototype.drop = function(location_id, object) {
		if (!this.authorize(object)) return false;
		
		//location_id 
		if (Object.size(this.parameters) >= this.parameter_count)
			throw "This function does not accept any more parameters!"
			
		this.parameters[location_id] = object;
	}
	
	ARFunction.prototype.evaluate = function() {
		if (this.name != null && Object.size(this.parameters) == this.parameter_count) {
			var code = config.settings.AR_DRONE_CLIENT_OBJ + this.name + config.settings.OPEN_PAREN + this.parameters.join() + config.settings.CLOSE_PAREN + config.settings.LINE_TERMINATOR;
			return code;
		} else {
			return false;
		}
	};
	
	return ARFunction;
});