
const Alert = new function() {
	
	this.onLoad = function() {
        document.getElementById("message").innerHTML = window.arguments[0].inn.message;
	}
	
	this.onOK = function() {
        window.arguments[0].out = 'ok';
        return true;
    }
}

window.addEventListener("load", function(e) { Alert.onLoad(e); }, false);
