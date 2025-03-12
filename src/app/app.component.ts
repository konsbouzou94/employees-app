import {Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent{
  title: string = 'Employees-Application';
  leftSidebarOpen: boolean = false;
  activePath = '/';

  constructor(private router: Router) {
    this.activePath = this.router.url;
  }

  toggleLeftSidebar() {
    this.leftSidebarOpen = !this.leftSidebarOpen;
  }

  setActive(path: string) {
    this.activePath = path;
  }

  isActive(path: string): boolean {
    return this.activePath === path;
  }

}

