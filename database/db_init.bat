@echo off
set PGDATABASE=legalease
set PGUSER=postgres
set PGPASSWORD=admin

:: Change directory to database so we can find all files
cd ..\database\

:: Run all sql files
for /r %%f in (*.sql) do >NUL "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U %PGUSER% -d %PGDATABASE% -f %%f

@echo Finished installing all database definitions