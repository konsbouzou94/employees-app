import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { GlobalConfirmationModalComponent } from '../../shared/modals/global-confirmation-modal.component';
import { EmployeesListComponent } from '../../components/employees-list/employees-list.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [NgFor, GlobalConfirmationModalComponent, EmployeesListComponent, RouterModule],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.less'
})
export class EmployeesPageComponent {

}
