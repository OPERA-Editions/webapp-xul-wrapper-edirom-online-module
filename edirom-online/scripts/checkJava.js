var dir = WScript.ScriptFullName.replace(/[\/\\]+[^\/\\]*$/, "");
var Shell = WScript.CreateObject("Wscript.Shell");
Shell.CurrentDirectory = dir;
Shell.Run("checkJava.bat " + WScript.Arguments(0), 0, false);