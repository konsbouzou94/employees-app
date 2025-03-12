import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { GlobalConfirmationModalComponent } from '../../shared/modals/global-confirmation-modal.component';
import { AttributesListComponent } from '../../components/attributes-list/attributes-list.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-attributes-page',
  standalone: true,
  imports: [NgFor, GlobalConfirmationModalComponent, AttributesListComponent, RouterModule],
  templateUrl: './attributes-page.component.html',
  styleUrl: './attributes-page.component.less'
})
export class AttributesPageComponent {

}
