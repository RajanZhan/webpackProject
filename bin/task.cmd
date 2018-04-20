@echo off
copy %cd%\install.cmd %cd%\..\build\install.cmd /A
cd ..
copy %cd%\package.json %cd%\build\package.json /A
copy %cd%\config.json %cd%\build\config.json /A
Xcopy %cd%\static %cd%\build\static\ /S /A /Y
Xcopy %cd%\dist %cd%\build\dist\ /S /A /Y
Xcopy %cd%\dataModel %cd%\build\dataModel\ /S /A /Y
Xcopy %cd%\common %cd%\build\common\ /S /A /Y
echo "请运行install.cmd 安装依赖包，并运行build.js 启动系统" > build/readme.txt
echo "compile finished....OK"
pause