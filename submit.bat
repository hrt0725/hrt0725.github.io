@echo off
cd /d "%~dp0"
cd hgi
set /p userInput=:
npm run build && cd ..


 
pause
