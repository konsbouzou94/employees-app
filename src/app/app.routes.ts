import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AttributeFormComponent } from './components/attribute-form/attributeForm.component';
import { AttributesPageComponent } from './pages/attributes/attributes-page.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeesPageComponent } from './pages/employees/employees-page.component';
import { MapComponent } from './components/map/map.component';
import { MapPageComponent } from './pages/map/map-page.component';
import { EmployeeFormComponent } from './components/employee-form/employeeForm.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },  // Default Route
  { path: 'employees', component: EmployeesPageComponent },
  { path: 'employees/list', component: EmployeesListComponent },
  { path: 'employees/form', component: EmployeeFormComponent },
  { path: 'employees/form/:id', component: EmployeeFormComponent },
  { path: 'attributes', component: AttributesPageComponent },
  { path: 'attributes/form', component: AttributeFormComponent }, // ✅ Create Mode
  { path: 'attributes/form/:id', component: AttributeFormComponent },
  { path: 'map', component: MapPageComponent },
  { path: 'map/form/:id', component: MapComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect unknown routes to home
];
