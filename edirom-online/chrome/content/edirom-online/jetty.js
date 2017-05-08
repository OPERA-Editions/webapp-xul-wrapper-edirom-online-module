jetty = (function() {

    var OS = null;

    var checkJava = function() {
        
        log('check java', 'TRACE');

        if(OS === 'WINNT') {
            log('We are on a windows machine and use our own java', 'TRACE');
            runServer();
            return;
        }
        
        var success = runServer;
        var failure = reportNoJava;
        
        var checkResult = function(result) {
            
            log('checkResult: ' + result, 'TRACE');
            
            if(result == null) {
                //TODO: Open window and report error
                return;
            } 
            
            switch (result.trim()) {
                case "success": success(); break;
                case "failure": log('calling failure', 'TRACE'); failure(); break;
            };
        };
        
        var observer = {
            observe: function(subject, topic, data) {
            
                log('observe: ' + topic, 'TRACE');
            
                switch (topic) {
                    case "process-finished":
                        var file = FileUtils.getFile("TmpD", ["edirom_online_checkJava.txt"]);
                    	readFile(file, checkResult);
                        break;
    
                    case "process-failed": break;
                };
            }
        };
        
        var script;
        
        script = FileUtils.getFile("CurProcD", ["scripts", "checkJava.sh"]);
        
        var process = Components.classes["@mozilla.org/process/util;1"]
                            .createInstance(Components.interfaces.nsIProcess);
        process.init(script);
    
        var args = [FileUtils.getFile("TmpD", ["edirom_online_checkJava.txt"]).path];
        process.runAsync(args, args.length, observer);
    };
    
    var runServer = function(javaCmd) {
        var script;
        
        if(OS === 'WINNT')
            script = FileUtils.getFile("CurProcD", ["scripts", "startServer.js"]);
        else
            script = FileUtils.getFile("CurProcD", ["scripts", "startServer.sh"]);
            
        var process = Components.classes["@mozilla.org/process/util;1"]
                                .createInstance(Components.interfaces.nsIProcess);
        process.init(script);
        
        var args = [javaCmd];
        process.runAsync(args, args.length, null);
    };
    
    var shutdownServer = function() {
        var script;
        
        if(OS === 'WINNT')
            script = FileUtils.getFile("CurProcD", ["scripts", "shutdownServer.js"]);
        else
            script = FileUtils.getFile("CurProcD", ["scripts", "shutdownServer.sh"]);
            
        var process = Components.classes["@mozilla.org/process/util;1"]
                                .createInstance(Components.interfaces.nsIProcess);
        process.init(script);
        
        var args = [];
        log('Running shutdown script', 'TRACE');
        process.runAsync(args, args.length, null);
        log('Shutdown script executed', 'TRACE');
    };
    
    var reportNoJava = function() {
        log('reportNoJava', 'TRACE');
        notification("No Java installation found", "The system cannot find a proper Java installation. Please download a version from <html:span style=\"text-decoration:underline;\" onclick=\"gotoUrl('http://www.java.com');\">http://www.java.com</html:span> and restart the application.");
    };
    
    var init = function() {
        
        var xulRuntime = Components.classes["@mozilla.org/xre/app-info;1"]
                           .getService(Components.interfaces.nsIXULRuntime);
        OS = xulRuntime.OS;
        
        checkJava();
    };
    
    var shutdown = function() {
        
        log('Shutting down server', 'TRACE');
        shutdownServer();
    };
    
    var readFile = function(file, callback) {
        NetUtil.asyncFetch(file, function(inputStream, status) {
            if (!Components.isSuccessCode(status)) {
                callback(null);
            }
        
            var content = NetUtil.readInputStreamToString(inputStream, inputStream.available());
            callback(content);
        });
    };

    return {
        init: init,
        shutdown: shutdown
    };

})();