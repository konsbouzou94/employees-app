import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Employee} from '../models/employee.model';
import {Attribute} from '../models/attribute.model';


@Injectable({
  providedIn : 'root'
})

export class EmployeeService{

  private readonly API_URL = 'assets/mock-data/employees.json';
  private employees: Employee[] = [];

  constructor(private http: HttpClient){}

  /**
   * Loads employees from back-end(mock-data json in our case)
   * Tried to represent a real http request
   * @returns Observable<Employee[] - List of employees.
   * In case list contains at least one record retrieve data from memory
   */
  loadEmployees(): Observable<Employee[]> {
    if (this.employees.length) {
      return of(this.employees);
    }

    return new Observable(observer => {
      this.http.get<Employee[]>(this.API_URL).subscribe(
        data => {
          this.employees = data; // Store in memory
          observer.next(this.employees);
          observer.complete();
        },
        error => observer.error(error)
      );
    });
  }

  /**
   * Loads employees from memory
   * @returns Employee[] - List of employees.
   */
  getEmployees(): Employee[]{
    return this.employees;
  }

  /**
   * Adds a new employee to the list
   * @returns Observable<boolean>.
   * We could use a method to create unique encrypted ids
   * I have used Observables as in real cases these will be http requests and we need to completion for next actions
   */
  addEmployee(employee : Employee): Observable<boolean>{
    employee.id = this.employees.length + 1;
    this.employees.push(employee);
    return of(true);
  }

  /**
   * Updates an existing employee
   * @returns Observable<Attribute | null>
   * I have used Observables as in real cases these will be http requests and we need to completion for next actions
   */
  updateEmployee(employee: Employee): Observable<Employee | null>{
    const index = this.findIndexViaId(employee && employee.id)
    if (index !== -1 && index !== null) {
      this.employees[index] = employee;
      return of(employee);
    }
    return of(null);
  }

  /**
   * Deletes the selected employee
   * @returns Observable<boolean>
   * I have used Observables as in real cases these will be http requests and we need to completion for next actions
   */
  deleteEmployee(employee: Employee): Observable<boolean> {
    const index = this.findIndexViaId(employee.id);
    if (index !== -1 && index !== null) {
      this.employees.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  /**
   * Removes deleted attribute of all employees with this attribute.id assigned
   * @returns Observable<boolean>
   * I have used Observables as in real cases these will be http requests and we need to completion for next actions
   */
  removeAttributeFromEmployees(attributeId: number): void {
    this.employees = this.employees.map(emp => {
      if (emp.attribute?.id === attributeId) {
        return { ...emp, attribute: null };
      }
      return emp;
    });
  }

  /**
   * Updates modiofied attribute of all employees with this attribute.id assigned
   * @returns Observable<boolean>
   * I have used Observables as in real cases these will be http requests and we need to completion for next actions
   */
  updateAttributeFromEmployees(attribute: Attribute): void {
    this.employees = this.employees.map(emp => {
      if (emp.attribute?.id === attribute.id) {
        return { ...emp, attribute: { id: attribute.id, description: attribute.description } };
      }
      return emp;
    });
  }

  /**
   * Deletes the selected attribute
   * @returns number | null, the attributes index in array
   * Could be a common utility function for across services usage
   */
  findIndexViaId(id : number): number | null {
    if(id){
      return this.employees.findIndex(item => item.id === id);
    }else{
      console.warn('Something went wrong.Missing id')
    }
      return null;
  }













}
