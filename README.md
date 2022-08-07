# Urlaubsplaner (Last Update: 10-07-2022)

## Purpose
This web application is for coordination of holidays of a company´s employees. Hence the data is stored in plain JSON files instead of a database, the application is only suited for a small amount of employees.    

## Overview
The application is base on the model-view-controll pattern. in The src/model folder the Employee class can be found. Which is used as template to store data in JSON files in the data folder. This data can be manipulated and drawed by the EmployeeJSONAdapater. To Show the data the PlotConfig class is used to create a chart showing all employee vaccations

In src/static all frontend html files can be found. These files get there information by requests to controller endpoints EmployeeController
