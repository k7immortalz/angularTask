import { Component, inject } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { CommService } from '../../services/commService.service';

@Component({
  selector: 'app-bs-modal',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './bs-modal.component.html',
  styleUrl: './bs-modal.component.css'
})
export class BsModalComponent {
  
  private modalService = inject(CommService).getComponents();

  constructor(private mService:CommService) { }

  currentIndex : number = 0;

// get current component using commService
  get currentComponent() {
    this.mService.currentComponentIndex.subscribe(num => {
      try {
        this.currentIndex = num;
      } catch (error) {
        console.error("An error occurred inside the subscription callback:", error);
      }
    });
    return this.modalService[this.currentIndex];
  }

}
