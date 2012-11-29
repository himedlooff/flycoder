define(["FlyCoder/config", "FlyCoder/sprite_factory"], function (config, SpriteFactory) {

	function Expression() {
		
		this._construct = function (type) {
			if(typeof type === "undefined") throw "Please provide a type!";
			
			this.type = null;
			this.accepted_types = [];
			this.rejected_types = ["block", "while", "if", "for", "do"];
			this.code = "";
			
			if (config.types.hasOwnProperty(type)) {
				this.type = type;
				this.sprite = SpriteFactory().get(type);
			} else {
				for (key in config.types) {
					if(config.types[key] == type) {
						this.type = config.types[key];
						break;
					}
				}
			}
			
			if (this.type == null) throw "Invalid type!";
		};
	}
	//Expression._construct(config.types.EXPRESSION);
	Expression.prototype.evaluate = function() {
		this.code = "";
	}
	
	Expression.prototype.drop = function(location_id, object) {
		if (this.authorize(object)) {}
	}
	
	Expression.prototype.render = function() {
	}
	
	Expression.prototype.authorize = function(object) {
		if (this.rejected_types.indexOf(object.type) > -1) return false;
		if (this.accepted_types.indexOf(object.type) > -1) return true;
		
		//not in either, what do?
		return true;
	}
	
	return Expression;
});