# EmployeesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.7.

## Notes & Comments
The **core application structure** is implemented, including:
  - Home Page
  - Employees Page
  - Attributes Page
  - Map Page

Components have been implemented:
- Employees List for displaying the employees and its core functionality(search,add-modify-delete actions)
- Employees Form for Create or Modify Employee
- Attributes List for displaying the attributes and its core functionality(add-modify-delete actions)
- Attributes Form for Create or Modify Attribute
- Map to display Employees on Map and creating the routing

Services:
- Employees Service for http requests and main actions(CRUD)
- Attributes Service for http requests and main actions(CRUD)

Models:
- Employees Interface
- Attributes Interface

Directives:
- Custom directive created for Employees filtering based on each model property

Styling:
- Less preprocessor used
- global.less implemented to place common application's variables and mixins
- 
Missing Implementations:
- Validations for Date Of Birth
- Language Switching
- Internationalization(we could implement files with each language localization and import them based on language selection)
- Interceptors to manipulate http requests and Global modal informative messages
- Confirmation Modal for Modify actions(Used only on Delete action)
- Some common methods reused on services could be common util functions
- Real route creating on map.Only PolyLines implemented.(Lack of api key for respective google map service)
