import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AttributeService } from '../../services/attribute.service';
import { Employee } from '../../models/employee.model';
import {FormsModule, NgForm} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Attribute } from '../../models/attribute.model';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports:[FormsModule, RouterModule, NgFor, NgIf],
  templateUrl: './employeeForm.component.html',
  styleUrls: ['./employeeForm.component.less']
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    id: 0,
    name: "",
    birthDate: "",
    hasCar: false,
    address: "",
    coordinates: { "lat": 0, "lng": 0 },
    attribute: null
  }
  attributes: Attribute[] = [];
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private attributeService: AttributeService
  ) {}

  ngOnInit(): void {
    this.attributeService.loadAttributes().subscribe(
      (data) => (this.attributes = data),
      (error) => console.error('Error fetching attributes:', error)
    );
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      const existingEmployee = this.employeeService.getEmployees().find(emp => emp.id === Number(id));
      if (existingEmployee) {
        this.employee = { ...existingEmployee };
      }
      //We need to assign attribute with correct object reference from fetched attributes
      if (this.employee.attribute) {
        const matchingAttribute = this.attributes.find(
          (attr) => attr.id === this.employee.attribute?.id
        );

        if (matchingAttribute) {
          this.employee.attribute = matchingAttribute; // Assign the correct object
        }
      }
    }
  }

  saveEmployee(employeeForm : NgForm): void {
    //in case form is invalid prevent next action
    if (employeeForm.invalid) {
      return;
    }
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employee).subscribe(() => this.router.navigate(['/employees']));
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(() => this.router.navigate(['/employees']));
    }
  }
}
