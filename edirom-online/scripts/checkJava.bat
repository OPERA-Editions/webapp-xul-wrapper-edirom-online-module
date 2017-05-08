@Echo off
set temp_file_a="%1"
if exist %temp_file_a% del %temp_file_a% echo clear temp file
reg query HKLM\SOFTWARE\Classes\jarfile\shell\open\command > %temp_file_a%
