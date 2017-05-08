var dir = WScript.ScriptFullName.replace(/[\/\\]+[^\/\\]*[\/\\]+[^\/\\]*$/, "");
var Shell = WScript.CreateObject("Wscript.Shell");
Shell.CurrentDirectory = dir + "\\chrome\\jetty";
Shell.Run("..\\jre\\bin\\java.exe -jar -DSTOP.PORT=19100 -DSTOP.KEY=blaise start.jar --stop", 0, false);
