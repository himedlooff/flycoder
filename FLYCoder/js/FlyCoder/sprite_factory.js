define(["FlyCoder/config", "FlyCoder/sprite"], function (config, Sprite) {
	function SpriteFactory() {
		return {
			get: function(type) {
				var sprite = null;
				//return correct sprint for type
				switch (type) {
					case config.types.ANDOP:
						sprite = new Sprite();
						sprite._construct(10,10);
						break;
					
					case config.types.WHILE:
						sprite = new Sprite();
						sprite._construct(0,0);
						break;
					
					default:
						sprite = null;
						break;
				}
				return sprite;
			}
		};
	}
	return SpriteFactory;
});