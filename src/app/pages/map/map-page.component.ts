import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeesListComponent } from '../../components/employees-list/employees-list.component';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports:[FormsModule,EmployeesListComponent],
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.less'] // Updated to use LESS
})
export class MapPageComponent {
  searchTerm: string = '';

}
