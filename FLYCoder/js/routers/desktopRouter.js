define(["jquery","backbone","models/UserModel", "views/UserView","collections/UsersCollection", "FlyCoder/config", "FlyCoder/log", "FlyCoder/while", "FlyCoder/operator", "FlyCoder/constant", "FlyCoder/variable", "FlyCoder/conditional_block", "FlyCoder/program_root", "FlyCoder/ar_function"], function($, Backbone, UserModel, UserView, UsersCollection, Config, Log, While, Operator, Constant, Variable, ConditionalBlock, ProgramRoot, ARFunction){

    var Router = Backbone.Router.extend({
		
        initialize: function(){

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();

        },

        // All of your Backbone Routes (add more)
        routes: {

            // When there is no hash bang on the url, the home method is called
            "": "fly",
			"fly": "fly"

        },

        home: function() {
			/*
            // Creates a new Model instance and sets default values
            var user = new UserModel().set({ "firstname": "Greg", "lastname": "Franko", "email": "example@gmail.com", "phone": "703-243-7371" }),

                // Creates a new Collection instance (Adds the previous Model instance to the Collection)
                users = new UsersCollection([user]),

                // Instantiating the mainView instance
                mainView = new UserView({

                    // Declares the View's collection instance property
                    collection: users

                });

            // Renders all of the User Model's to the page
            mainView.render();
			*/
        },
		
		fly: function() {
			var program_root = new ProgramRoot( {root: ar_takeoff, bootstrap: Config.settings.AR_DRONE_BOOTSTRAP} );
			
			var ar_takeoff = new ARFunction(Config.ar_drone_funcs.takeoff);
			var ar_clockwise = new ARFunction(Config.ar_drone_funcs.clockwise);
			ar_clockwise.drop(0, 0.5);
			var ar_front = new ARFunction(Config.ar_drone_funcs.front);
			ar_front.drop(0, 0.5);
			var a = new Variable("a");
			var zeroone = new Constant(.01);
			var a_assignment = new Operator(Config.op_types.ASSIGNMENT);
			a_assignment.drop(Config.op_settings.LOCATION_ID_LEFT, a);
			a_assignment.drop(Config.op_settings.LOCATION_ID_RIGHT, zeroone);
			var while_loop = new ConditionalBlock(Config.simple_conditional_types.WHILE);
			var condition1 = new Operator(Config.op_types.LT);
			var pointfive = new Constant(0.5);
			condition1.drop(Config.op_settings.LOCATION_ID_LEFT, a);
			condition1.drop(Config.op_settings.LOCATION_ID_RIGHT, pointfive);
			while_loop.set_condition(condition1);
			var ar_cclockwise = new ARFunction(Config.ar_drone_funcs.counterClockwise);
			ar_cclockwise.drop(0, 0.5);
			var a_inc = new Operator(Config.op_types.PLUS_EQUAL);
			var pointone = new Constant(0.1);
			a_inc.drop(Config.op_settings.LOCATION_ID_LEFT, a);
			a_inc.drop(Config.op_settings.LOCATION_ID_RIGHT, pointone);
			while_loop.drop(Config.op_settings.LOCATION_ID_NA, ar_cclockwise);
			while_loop.drop(Config.op_settings.LOCATION_ID_NA, a_inc);
			var ar_land = new ARFunction(Config.ar_drone_funcs.land);
			
			program_root.push_command(ar_takeoff, ar_clockwise, ar_front, a_assignment, while_loop, ar_land);
			
			/*
			var ar_function = new ARFunction(Config.ar_drone_funcs.clockwise);
			var if_loop = new ConditionalBlock(Config.simple_conditional_types.IF);
			var while_loop = new ConditionalBlock(Config.simple_conditional_types.WHILE);
			var equality1 = new Operator("EQUALITY");
			var equality2 = new Operator("EQUALITY");
			var assignment1 = new Operator(Config.op_types.ASSIGNMENT);
			var increment1 = new Operator(Config.op_types.ADD);
			
			var one = new Constant(1);
			var five = new Constant(5);
			var ten = new Constant(10);
			var fifteen = new Constant(15);
			var twentyseven = new Constant(27);
			var variableA = new Variable("a");
			
			program_root.push_global_scope(if_loop);
			
			ar_function.drop(0, 0.8);
			
			equality1.drop(Config.op_settings.LOCATION_ID_LEFT, five);
			equality1.drop(Config.op_settings.LOCATION_ID_RIGHT, equality2);
			
			equality2.drop(Config.op_settings.LOCATION_ID_LEFT, ten);
			equality2.drop(Config.op_settings.LOCATION_ID_RIGHT, ten);
			
			assignment1.drop(Config.op_settings.LOCATION_ID_LEFT, variableA);
			assignment1.drop(Config.op_settings.LOCATION_ID_RIGHT, increment1);
			
			increment1.drop(Config.op_settings.LOCATION_ID_LEFT, twentyseven);
			increment1.drop(Config.op_settings.LOCATION_ID_RIGHT, one);
			
			//while_loop.set_condition(equality1);
			//while_loop.drop(Config.op_settings.LOCATION_ID_NA, equality1);
			//while_loop.drop(Config.op_settings.LOCATION_ID_NA, assignment1);
			
			if_loop.set_condition(equality2);
			//if_loop.drop(Config.op_settings.LOCATION_ID_NA, assignment1);
			//if_loop.drop(Config.op_settings.LOCATION_ID_NA, equality1);
			//if_loop.drop(Config.op_settings.LOCATION_ID_NA, while_loop);
			if_loop.drop(Config.op_settings.LOCATION_ID_NA, ar_function);
			
			*/
			
			
			
			program_root.subscribe(Config.root_events.compiled, function(code) {
				alert(code);
				Log.log("Code Output: " + code);
			});

			program_root.compile();
		}
    });

    // Returns the Router class
    return Router;

});