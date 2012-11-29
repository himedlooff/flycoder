define(["FlyCoder/config"], function (config) {
    //Do setup work here
	function ProgramRoot(args) {
		//holds the individual code blocks / expressions
		this.root = [];
		if(typeof args.root != "undefined") {
			this.root.push(args.root);
		}
			
		//general settings, program name, etc
		this.settings = args;
		this.bootstrap = (typeof this.settings.bootstrap !== "undefined") ? this.settings.bootstrap : "";
		this.output = null;
		this.subscribers = {
			exception: [],
			compiling: [],
			compiled: []
		}
	}
	
	ProgramRoot.prototype.push_command = function() {
		//check objects??
		for (var i = 0; i < arguments.length; i++) {
			this.root.push(arguments[i]);
		}
	}
	
	ProgramRoot.prototype.set_bootstrap = function(code) {
		this.bootstrap = code;
	}
	
	ProgramRoot.prototype.compile = function() {
		for (var i = 0; i < this.subscribers[config.root_events.compiling].length; i++) {
			this.subscribers[config.root_events.compiling][i]();
		}
			
		//args for compile settings.
		var out = (this.bootstrap == null) ? "" : this.bootstrap;
		
		try {
			for (var i = 0; i < this.root.length; i++) {
				out += this.root[i].evaluate();
			}
		} catch(exc) {
			for (var i = 0; i < this.subscribers[config.root_events.exception].length; i++) {
				this.subscribers[config.root_events.exception][i](exc.name, exc.message);
			}
		}
		
		if (out.length <= 0) return false;
		
		this.output = out;
		
		for (var i = 0; i < this.subscribers[config.root_events.compiled].length; i++) {
			this.subscribers[config.root_events.compiled][i](this.output);
		}
	}
	
	
	ProgramRoot.prototype.subscribe = function(event, callback) {
		if (this.subscribers.hasOwnProperty(event) && (callback instanceof Function || typeof callback == "function")) {
			this.subscribers[event].push(callback);
		}
	}

    return ProgramRoot;
});