define(["FlyCoder/log", "FlyCoder/config"], function (config) {

	function Sprite() {
		
		this._private = {
			x:0,
			y:0,
			img: null,
			html: null
		};
		
		this.public = {
			_construct: function(x,y) {
			},
			output: function() {
				log("render sprite");
			}
		};
			
		return this.public;
	}
	
	return Sprite;
});