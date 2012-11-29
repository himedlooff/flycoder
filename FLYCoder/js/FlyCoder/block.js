define(["FlyCoder/config", "FlyCoder/expression"], function (config, Expression) {

	function Block() {
		//this.body = [];
		
		this.accepted_types = ["block", "while", "if", "operator", "constant", "for", "do", "expression"];
		this.rejected_types = [];
	}
	Block.prototype = new Expression();
	Block.prototype._construct(config.types.BLOCK);
	Block.prototype.evaluate = function() {
		/*var body = [];
		
		for (var i=0; i < this.body.length; i++) {
			body.push(this.body[i].evaluate());
		}
		return body.join(config.settings.LINE_TERMINATOR);*/
	}
	
	Block.prototype.drop = function(location_id, object) {
		//limit what can go into body.
		this.body.push(object);
	}

	return Block;
});