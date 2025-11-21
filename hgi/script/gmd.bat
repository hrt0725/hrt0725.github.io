@echo off

rmdir /s /q "..\assets" 

set "musicDir=..\music"
set "output=.\public\data\musics.json"

powershell -NoProfile -Command  "Get-ChildItem -Path '%musicDir%' -File | Where-Object { $_.Name -ne 'list.json' } | Sort-Object Name | ForEach-Object { $_.Name } | ConvertTo-Json -Depth 1 | Set-Content -Path '%output%' -Encoding UTF8"