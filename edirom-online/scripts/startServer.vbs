option explicit
dim dir, objShell, objRegEx, strSearchString, strNewString, strPath, objFSO,objFile,strFolder, jreCall

Set objShell = CreateObject("Wscript.Shell")

strPath = Wscript.ScriptFullName

Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objFile = objFSO.GetFile(strPath)

strFolder = objFSO.GetParentFolderName(objFile) 
strPath = "explorer.exe /e," & strFolder

Set objRegEx = CreateObject("VBScript.RegExp")

objRegEx.Global = True   
objRegEx.IgnoreCase = True
objRegEx.Pattern = "/[\/\\]+[^\/\\]*[\/\\]+[^\/\\]*$/"

strSearchString = strPath

dir = objRegEx.Replace(objShell.CurrentDirectory, "") + "\chrome\jetty"
jreCall = "..\jre\bin\java.exe -jar -Djava.awt.headless=true -DSTOP.PORT=19100 -DSTOP.KEY=blaise -XX:+HeapDumpOnOutOfMemoryError -Xmx1024m start.jar"

'*Wscript.Echo jreCall

objShell.CurrentDirectory = dir
objShell.Run(jreCall), 0, false