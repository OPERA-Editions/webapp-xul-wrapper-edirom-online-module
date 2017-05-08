const MainUI = new function() {
	
	/**
	 * Opens the about dialog
	 */
	this.openAboutDialog = function() {
		window.openDialog('chrome://edirom-online/content/ui/about.xul', 'about', 'chrome,resizable=no');
	}

	/**
	 * Checks for updates
	 */
	this.checkForUpdates = function() {
		window.open('chrome://mozapps/content/update/updates.xul', 'updateChecker', 'chrome,centerscreen');
	}
	
	this.openEdition = function() {    
        document.getElementById("startWindow").selectedIndex = 1;
    }
    
    this.openEditionHome = function() {    
        document.getElementById("startWindow").selectedIndex = 0;
    }
    
    this.openManual = function() {
        window.open('chrome://edirom-online/content/manual/manual.xul', 'manual-window', 'chrome,centerscreen,resizable,dependent,scrollbars');
    }
    
    this.openLicence = function() {
        window.openDialog('chrome://edirom-online/content/licence/licence.xul', 'licence-dialog', 'chrome,scrollbars,modal');
    }
    
    this.openLegalNotice = function() {
        window.openDialog('chrome://edirom-online/content/legalNotice/legalNotice.xul', 'legalNotice-dialog', 'chrome,scrollbars,modal');
    }
    
    this.reloadEdition = function() {    
        document.getElementById("webapp").contentDocument.location = "http://127.0.0.1:19099/exist/apps/EdiromOnline/index.html?timestamp=" + Date.now();
    }
    
    this.restartProgram = function() {
        var appStartup = Components.classes["@mozilla.org/toolkit/app-startup;1"].getService(Components.interfaces.nsIAppStartup);
 
        appStartup.quit(Components.interfaces.nsIAppStartup.eRestart | Components.interfaces.nsIAppStartup.eAttemptQuit);
    }


	/**
	 * Run when standalone window first opens
	 */
	this.onLoad = function() {
	}

	/**
	 * Called before standalone window is closed
	 */
	this.onUnload = function() {
	}
	
	this.onResize = function(e) {
	    document.getElementById("windowBackground").setAttribute('width', document.getElementById("container").clientWidth);
	    document.getElementById("windowForeground").setAttribute('left', (document.getElementById("container").clientWidth - document.getElementById("windowForeground").clientWidth) / 2);
	}
}

window.addEventListener("load", function(e) { MainUI.onLoad(e); }, false);
window.addEventListener("unload", function(e) { MainUI.onUnload(e); }, false);

window.addEventListener("resize", function(e) { MainUI.onResize(e); }, false);
