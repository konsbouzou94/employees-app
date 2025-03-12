import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { GoogleMapsModule ,GoogleMap, MapMarker, MapInfoWindow, MapPolyline } from '@angular/google-maps';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less'],
  standalone: true,
  imports: [GoogleMapsModule,GoogleMap,MapMarker,MapInfoWindow,MapPolyline, NgFor,NgIf, RouterModule], // ✅ Import Google Maps in Component
})
export class MapComponent implements OnInit {
  employees: Employee[] = [];
  polylinePath: google.maps.LatLngLiteral[] = [];
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  selectedEmployee: Employee | undefined = {
    "id": 0,
    "name": "",
    "birthDate": "",
    "hasCar": false,
    "address": "",
    "coordinates": {"lat": 0, "lng": 0},
    "attribute": null
  };
  center = {lat: 0, lng: 0}; // Default: Athens, Greece

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.loadEmployees();

  }

  loadEmployees() {
    this.employees = this.employeeService.getEmployees();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.selectedEmployee = this.employeeService.getEmployees().find(emp => emp.id === Number(id));
      if(this.selectedEmployee){
        this.center = this.selectedEmployee.coordinates;
      }
    }

  }


  /**
   * Creates the route between the selected employee and other employees on map
   * @returns void
   * Feature to select an employee on map has not been implemented
   */
  createRoute() {
    if (this.selectedEmployee) {
      this.polylinePath = this.employees.map((user) => ({
        lat: user.coordinates.lat,
        lng: user.coordinates.lng,
      }));
      this.polylinePath.unshift({ lat: this.selectedEmployee.coordinates.lat, lng: this.selectedEmployee.coordinates.lng });
    }else{
      console.error('No selected employee.Route cannot be created!')
    }
  }
}
