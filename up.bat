@REM to upload into repositories, before that, the current version is updated with pull - just write "./up.bat" into the Terminal


git pull
git add .
git commit -m "%*"
git push
