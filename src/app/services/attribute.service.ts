import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Attribute} from '../models/attribute.model';
import {EmployeeService} from './employee.service';


@Injectable({
  providedIn : 'root'
})

export class AttributeService{

  private readonly API_URL = 'assets/mock-data/attributes.json';
  private attributes: Attribute[] = [];

  constructor(private http: HttpClient, private employeeService: EmployeeService){}


  /**
   * Loads attributes from back-end(mock-data json in our case)
   * Tried to represent a real http request
   * @returns Observable<Attribute[] - List of attributes.
   * In case list contains at least one record retrieve data from memory
   */
  loadAttributes(): Observable<Attribute[]> {
    if (this.attributes.length) {
      return of(this.attributes);
    }
    return new Observable(observer => {
      this.http.get<Attribute[]>(this.API_URL).subscribe(
        data => {
          this.attributes = data; // Store in memory
          observer.next(this.attributes);
          observer.complete();
        },
        error => observer.error(error)
      );
    });
  }

  /**
   * Loads attributes from memory
   * @returns Attribute[] - List of attributes.
   */
  getAttributes(): Attribute[]{
    return this.attributes;
  }

  /**
   * Adds a new attribute to the list
   * @returns Observable<boolean>.
   * We could use a method to create unique encrypted ids
   * I have used Observables as in real cases these will be http requests and we need to completion for next actions
   */
  addAttribute(attribute : Attribute): Observable<boolean>{
    attribute.id = this.attributes.length + 1;
    this.attributes.push(attribute);
    return of(true);
  }

  /**
   * Updates an existing attribute
   * @returns Observable<Attribute | null>
   * I have used Observables as in real cases these will be http requests and we need to completion for next actions
   */
  updateAttribute(attribute: Attribute): Observable<Attribute | null>{
    const index = this.findIndexViaId(attribute && attribute.id)
    if (index !== -1 && index !== null) {
      this.attributes[index] = attribute;
      this.employeeService.updateAttributeFromEmployees(attribute);
      return of(attribute);
    }
    return of(null);
  }

  /**
   * Deletes the selected attribute
   * @returns Observable<boolean>
   * I have used Observables as in real cases these will be http requests and we need to completion for next actions
   */
  deleteAttribute(attribute: Attribute): Observable<boolean> {
    const index = this.findIndexViaId(attribute.id);
    if (index !== -1 && index !== null) {
      let attributeId : number = attribute.id;
      this.attributes.splice(index, 1);
      this.employeeService.removeAttributeFromEmployees(attributeId);
      return of(true);
    }
    return of(false);
  }

  /**
   * Deletes the selected attribute
   * @returns number | null, the attributes index in array
   * Could be a common utility function for across services usage
   */
  findIndexViaId(id : number): number | null {
    if(id){
      return this.attributes.findIndex(item => item.id === id);
    }else{
      console.warn('Something went wrong.Missing id')
    }
      return null;
  }













}
