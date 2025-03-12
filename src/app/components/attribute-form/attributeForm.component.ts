import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttributeService } from '../../services/attribute.service';
import { Attribute } from '../../models/attribute.model';
import {FormsModule, NgForm} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-attribute-form',
  standalone: true,
  imports:[FormsModule, RouterModule, NgIf],
  templateUrl: './attributeForm.component.html',
  styleUrls: ['./attributeForm.component.less']
})
export class AttributeFormComponent implements OnInit {
  attribute: Attribute = { id: 0, description: '' };
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private attributeService: AttributeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      const existingAttribute = this.attributeService.getAttributes().find(attr => attr.id === Number(id));
      if (existingAttribute) {
        this.attribute = { ...existingAttribute };
      }
    }
  }

  saveAttribute(attributeForm: NgForm): void {
    //in case form is invalid prevent next action
    if(attributeForm.invalid){
      return;
    }
    if (this.isEditMode) {
      this.attributeService.updateAttribute(this.attribute).subscribe(() => this.router.navigate(['/attributes']));
    } else {
      this.attributeService.addAttribute(this.attribute).subscribe(() => this.router.navigate(['/attributes']));
    }
  }
}
