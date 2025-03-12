import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeeFilter',
  standalone: true
})
export class EmployeeFilterPipe implements PipeTransform {
  transform(employees: any[], searchTerm: string): any[] {
    if (!employees || !searchTerm) {
      return employees;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();

    return employees.filter(emp =>
      emp?.name.toLowerCase().includes(lowerCaseSearch) ||
      emp?.birthDate.includes(lowerCaseSearch) ||
      emp?.address.toLowerCase().includes(lowerCaseSearch) ||
      emp?.attribute?.description.toLowerCase().includes(lowerCaseSearch)
    );
  }

}
