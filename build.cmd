@echo off
echo "compiling...."
npm run build && cd compileTool && npm run build  && cd .. && cd bin && task.cmd