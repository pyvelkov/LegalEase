@echo off
set PGDATABASE=legalease
set PGUSER=postgres
set PGPASSWORD=admin
@echo on

for /r %%f in (*.sql) do "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U %PGUSER% -d %PGDATABASE% -f %%f

:: date column in templates table
:: route to return all templates
:: reoute to return tag fields for single template
:: reoute for deleting template
:: database table to store template tags
