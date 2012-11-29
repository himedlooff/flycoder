define(function () {
    //Do setup work here
	
	//utility array function.
	if(!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(needle) {
			for(var i = 0; i < this.length; i++) {
				if(this[i] === needle) {
					return i;
				}
			}
			return -1;
		};
	}
	
	Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};
	
    return {
		types: {
			BLOCK : "block",
			CONDITIONAL_BLOCK: "conditional_block",
			EXPRESSION : "expression",
			OPERATOR : "operator",
			WHILE : "while",
			CONSTANT: "constant",
			VARIABLE: "variable",
			AR_DRONE_FUNCTION: "ar_drone_function"
		},
		
		/*type_parents: {
			CONDITIONAL_BLOCK : this.types.BLOCK,
			OPERATOR: this.types.EXPRESSION,
			WHILE: this.types.BLOCK
		},
		
		parent_types: {
			this.types.BLOCK : [this.types.CONDITIONAL_BLOCK, this.types.WHILE],
			this.types.EXPRESSION: [this.types.OPERATOR],
			this.types.CONSTANTS: []
		},*/
		
		simple_conditional_types: {
			IF: "if",
			WHILE: "while",
			DO: "do"
		},
		
		op_types: {
			AND: "&&",
            OR: "||",
            NOT: "!",
            BIN_OR: "|",
            //BIN_OR_EQ: "|=",
            BIN_AND: "&",
            //BIN_AND_EQ: "&=",
            BIN_XOR: "^",
            //BIN_XOR_EQ: "^=",
            GT: ">",
            LT: "<",
            GTE: ">=",
            LTE: "<=",
            ASSIGNMENT: "=",
            EQUALITY: "==",
            TYPE_EQUALITY: "===",
            NOT_EQUAL: "!=",
            TYPE_INEQUALITY: "!==",
            LEFT_SHIFT: "<<",
            RIGHT_SHIFT: ">>",
            ADD: "+",
            //INC: "++",
            //DEC: "--",
            PLUS_EQUAL: "+=",
            MIN_EQUAL: "-=",
            MUL_EQUAL: "*=",
            DIV_EQUAL: "/=",
            SUB: "-",
            MUL: "*",
            DIV: "/",
            MOD: "%"
		},
		
		ar_drone_funcs: {
			takeoff: {name: "takeoff", params: 0},
			land: {name: "land", params: 0},
			up: {name: "up", params: 1},
			down: {name: "down", params: 1},
			clockwise: {name: "clockwise", params: 1},
			counterClockwise: {name: "counterClockwise", params: 1},
			front: {name: "front", params: 1},
			back: {name: "back", params: 1},
			left: {name: "left", params: 1},
			right: {name: "right", params: 1},
			stop: {name: "stop", params: 0}
			
		},
		
		op_settings: {
			LOCATION_ID_NA: 0,
			LOCATION_ID_LEFT: 1,
			LOCATION_ID_RIGHT: 2
		},
		
		settings: {
			//a bit field, for different aspects.
			// 0x01	- 	(FOR DEBUG) will alert debug messages.
			// 0x02	-	(FOR DEBUG) will write debug messages to console.
			// 0x04	-	(FOR DEBUG) will write debug messages to a file
			// 0x08 - 
			// 0x10
			// 0x20
			// 0x40
			// 0x80
			// 0x100
			// 0x200
			// 0x400
			// 0x800
			// 0x1000
			STATE: 2,
			OPEN_CURLY_BRACE: "{",
			CLOSE_CURLY_BRACE: "}",
			OPEN_PAREN: "(",
			CLOSE_PAREN: ")",
			LINE_TERMINATOR: ";",
			SINGLE_SPACE: " ",
			AR_DRONE_CLIENT_OBJ: "client.",
			AR_DRONE_BOOTSTRAP: "var arDrone = require('ar-drone'); var client = arDrone.createClient(); "
		},
		
		root_events: {
			exception: "exception",
			compiling: "compiling",
			compiled: "compiled"
		}
    };
});