Components.utils.import("resource://gre/modules/FileUtils.jsm");
Components.utils.import("resource://gre/modules/NetUtil.jsm");

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;
const Ce = Components.Exception;

(function () {
    
    var xulRuntime = Components.classes["@mozilla.org/xre/app-info;1"]
                           .getService(Components.interfaces.nsIXULRuntime);
    var OS = xulRuntime.OS;
    
    var now = new Date();
    log('Initializing the application (' + now + ')', 'INFO');
    
    log('Initializing shutdown observer', 'TRACE');
    var observerService = Cc[ "@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
    var shutdownObserver = {
        observe: function (subject, topic, data) {
            log('Shutting down jetty', 'TRACE');
            jetty.shutdown();
        }
    };
    observerService.addObserver(shutdownObserver, "quit-application-granted", false);
    
    log('Initializing messaging service', 'TRACE');
    var messageHandler = function(e) {
        var link = e.target.getAttribute("value");
        
        log('open external link: ' + link, 'TRACE');
        
        if(link == 'edirom://editionHome')
            MainUI.openEditionHome();
            
        else       
            gotoUrl(link);
	};
    window.addEventListener("load", function(e) { 
        document.getElementById("webapp").addEventListener("DOMContentLoaded", function(e) {
            document.getElementById("webapp").contentDocument.addEventListener("openExternalLink", messageHandler);
        }, true);
    }, false, true);
    
    log('Initializing server instance', 'TRACE');
    jetty.init();
})();

function log(str, level) {
    
    var logLevel = 'INFO';
    var logLevels =[ "ALL", "TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL", "OFF"];
    
    if (typeof level === 'undefined') level = 'ALL';
    
    if (logLevels.indexOf(level) < logLevels.indexOf(logLevel)) return;
    
    var service = Components.classes[ '@mozilla.org/consoleservice;1'].getService(Components.interfaces.nsIConsoleService);
    
    service.logStringMessage(level + ": " + str);
    dump(level + ": " + str + "\n");
}

function notification(title, text, image) {
    
    var params = {
        title: title, buttons: 'accept', inn: {
            message: text
        },
        out: null
    };
    window.openDialog("chrome://edirom-online/content/ui/alert.xul", "",
    "chrome, dialog, modal, resizable=yes", params).focus();
    
    if (params.out) {
        log('ok', 'TRACE');
    }
}