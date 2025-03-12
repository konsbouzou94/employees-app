import { Component, Input  } from '@angular/core';
import {Employee} from '../../models/employee.model';
import { NgFor, NgIf } from '@angular/common';
import {EmployeeService} from '../../services/employee.service';
import { GlobalConfirmationModalComponent } from '../../shared/modals/global-confirmation-modal.component';
import { RouterModule } from '@angular/router';
import { EmployeeFilterPipe } from '../../directives/employee-filter.pipe'


@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [NgFor, NgIf, GlobalConfirmationModalComponent, RouterModule, EmployeeFilterPipe],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.less'
})
export class EmployeesListComponent {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  isModalVisible: boolean = false;
  emptyRecordsMessage : string = '';
  employeeRoutes: { [id: number]: string[] } = {};

  @Input() showActions: boolean = true;
  @Input() routeUrl: string = "";
  @Input() searchTerm: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    if(this.employeeService.getEmployees().length){
      this.employees = this.employeeService.getEmployees();
      this.declareEmployeeRoute();
    }
    this.loadEmployees();
    this.setInformativeText();
  }

  setInformativeText(): void {
    if (this.showActions) {
      this.emptyRecordsMessage = 'No Records Found. Click on Add New Employee button to create a new one.';
    } else {
      this.emptyRecordsMessage = 'No Records Found with given criteria. Try with another.';
    }
  }

  loadEmployees(): void {
    this.employeeService.loadEmployees().subscribe(
      (data) => {
        this.employees = data,
          this.declareEmployeeRoute()
      },
      (error) => console.error('Error fetching employees:', error)
    );
  }

  /**
   * Triggers the modal display and updates the selected Employee upon Deletion action
   * @returns void
   */
  onDeleteEmployee(employee : Employee): void{
    this.selectedEmployee = employee;
    this.isModalVisible = true;
  }

  /**
   * Deleted selected employee and dismiss the modal after successful operation
   * @returns void
   * We could use an error modal or ppage(view) to handle failed operations
   */
  deleteEmployee = (): void => {
    if (this.selectedEmployee) {
      this.employeeService.deleteEmployee(this.selectedEmployee).subscribe((success) => {
        if (success) {
          this.employees = this.employeeService.getEmployees();
          this.closeModal();
        }
      });
    }
  };

  /**
   * Declares the routing based on routeUrl passed
   * @returns void
   */
  declareEmployeeRoute(): void {
    this.employeeRoutes = {};
    for (const employee of this.employees) {
      this.employeeRoutes[employee.id] = this.routeUrl.replace(':id', employee.id.toString()).split('/');
    }
  }

  closeModal = (): void => {
    this.isModalVisible = false;
    this.selectedEmployee = null;
  };

}
