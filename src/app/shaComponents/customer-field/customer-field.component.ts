import { Component } from '@angular/core';
import { APIService } from '../../services/APIservice.service';
import { CountryResponse } from '../../ApiInterface/countryList';
import { NgxSelectModule } from 'ngx-select-ex';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customer-field',
  standalone: true,
  imports: [NgxSelectModule, ReactiveFormsModule],
  templateUrl: './customer-field.component.html',
  styleUrl: './customer-field.component.css'
})
export class CustomerFieldComponent {
  CountryList: any;
  RegionList: any;
  AllCountry: any;
  constructor(private ApiService: APIService, private formbuilder: FormBuilder) {

  }


  CustomerForm = this.formbuilder.group({
    Cname: ['', Validators.required],
    Cemail: ['', Validators.required],
    Cregion: ['', Validators.required],
    Ccountry: ['', Validators.required]
  });

  getCountry() {
    this.ApiService.getCountry().subscribe(
      (response) => {
        try {
          const AllCountryLists: CountryResponse = response.data;
          this.AllCountry = AllCountryLists;
          this.RegionList = Object.keys(AllCountryLists).map(key => AllCountryLists[key].region);
          this.RegionList = Array.from(new Set(this.RegionList))
        } catch (error) {
          console.error("API response error:", error);
        }
      },
      error => {
        console.error("HTTP error:", error);
      }
    );
  }

  RegionSelect(value: any) {
    this.CountryList = Object.keys(this.AllCountry)
      .filter(key => this.AllCountry[key].region === value)
      .map(key => this.AllCountry[key].country);
  }

  onSubmit() {
    this.ApiService.addCustomer(this.CustomerForm.value);
    alert("Customer Darta save Successfully");

  }


}
