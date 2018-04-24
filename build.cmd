@echo off
if not  exist "%cd%\build" mkdir build
echo "compiling...."
npm run build && cd compileTool && npm run build  && cd .. && cd bin && task.cmd