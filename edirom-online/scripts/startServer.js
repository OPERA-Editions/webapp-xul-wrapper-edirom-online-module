var dir = WScript.ScriptFullName.replace(/[\/\\]+[^\/\\]*[\/\\]+[^\/\\]*$/, "");
var Shell = WScript.CreateObject("Wscript.Shell");
Shell.CurrentDirectory = dir + "\\chrome\\jetty";
Shell.Run("..\\jre\\bin\\java.exe -jar -Djava.awt.headless=true -DSTOP.PORT=19100 -DSTOP.KEY=blaise -XX:+HeapDumpOnOutOfMemoryError -Xmx1024m start.jar", 0, false);
