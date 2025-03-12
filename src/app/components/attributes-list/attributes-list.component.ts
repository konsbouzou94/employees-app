import { Component } from '@angular/core';
import {Attribute} from '../../models/attribute.model';
import { NgFor, NgIf } from '@angular/common';
import {AttributeService} from '../../services/attribute.service';
import { GlobalConfirmationModalComponent } from '../../shared/modals/global-confirmation-modal.component'; // ✅ Import Global Modal
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-attributes-list',
  standalone: true,
  imports: [NgFor, NgIf, GlobalConfirmationModalComponent, RouterModule],
  templateUrl: './attributes-list.component.html',
  styleUrl: './attributes-list.component.less'
})
export class AttributesListComponent {
  attributes: Attribute[] = [];
  selectedAttribute: Attribute | null = null;
  isModalVisible: boolean = false;
  emptyRecordsMessage : string = 'No Records Found. Click on Add New Attribute button to create a new one.';

  constructor(private attributeService: AttributeService) {}

  ngOnInit(): void {
    this.loadAttributes();
  }

  loadAttributes(): void {
    this.attributeService.loadAttributes().subscribe(
      (data) => (this.attributes = data),
      (error) => console.error('Error fetching attributes:', error)
    );
  }

  /**
   * Triggers the modal display and updates the selected Attribute upon Deletion action
   * @returns void
   */
  onDeleteAttribute(attribute : Attribute): void{
    this.selectedAttribute = attribute;
    this.isModalVisible = true;
  }

  /**
   * Deleted selected attribute and dismiss the modal after successful operation
   * @returns void
   * We could use an error modal or ppage(view) to handle failed operations
   */
  deleteAttribute = (): void => {
    if (this.selectedAttribute) {
      this.attributeService.deleteAttribute(this.selectedAttribute).subscribe((success) => {
        if (success) {
          this.attributes = this.attributeService.getAttributes();
          this.closeModal();
        }
      });
    }
  };

  updateAttribute(attribute: Attribute): void{
    this.attributeService.updateAttribute(attribute);
  }

  closeModal = (): void => {
    this.isModalVisible = false;
    this.selectedAttribute = null;
  };

}
