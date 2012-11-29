define(["FlyCoder/config"], function (config) {
    //Do setup work here
    return {
        log: function(text) {                 
            var date = new Date();
            var day = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
            var pre = "LOG: " + day + ": ";
            var post = "";
            var out = pre + text + post;
            
            if (config.settings.STATE & 1) {
                alert(out);
            }
            
            if(config.settings.STATE & 2) {
                console.log(out);
            }
            
            if(config.settings.STATE & 4) {
                //DB log?? or file log??
            }        
        }
    };
});