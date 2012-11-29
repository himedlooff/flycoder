define(["FlyCoder/config", "FlyCoder/block"], function (config, Block) {

	function While() {
		
	}
	While.prototype = new Block();
	While.prototype._construct(config.types.WHILE);
	While.prototype.evaluate = function() {
		var ret = "";
		for (var i=0; i < this.body.length; i++)
			ret += this.body[i].evaluate();
			
		return ret;
	};
	
	return Block;
});