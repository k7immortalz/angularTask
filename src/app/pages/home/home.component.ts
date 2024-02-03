import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BsModalComponent } from '../../commComponents/bs-modal/bs-modal.component';
import { CommService } from '../../services/commService.service';
import { APIService } from '../../services/APIservice.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, BsModalComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  plusIcon = faPlus;
  tableData: any;
  customerData:any;
  constructor(private modalService: CommService, private ApiService: APIService) { }

  ngOnInit(): void {
    this.tableData = this.ApiService.getPin();
    this.customerData = this.ApiService.getCustomer();
  }
  ngDoCheck():void{
    this.tableData = this.ApiService.getPin();
    this.customerData = this.ApiService.getCustomer();
  }

  //  update index number for modal component
  addModalComponentIndex(index: number) {
    this.modalService.updateComponentIndex(index)
  }

}
