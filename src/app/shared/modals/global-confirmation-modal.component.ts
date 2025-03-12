import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgIf,NgFor} from '@angular/common';

@Component({
  selector: 'app-global-confirmation-modal',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './global-confirmation-modal.component.html',
  styleUrls: ['./global-confirmation-modal.component.less']
})
export class GlobalConfirmationModalComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() buttons: { text: string, action: () => void }[] = [];
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  executeAction(action: () => void): void {
    action();
    this.closeModal.emit(); // Ensure modal closes after action
  }
}
