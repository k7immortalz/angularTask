import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload';
import { APIService } from '../../services/APIservice.service';
import { NgxSelectModule } from 'ngx-select-ex';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/'; //add your backend url here.

@Component({
  selector: 'app-pin-field',
  standalone: true,
  imports: [FileUploadModule, NgxSelectModule, ReactiveFormsModule],
  templateUrl: './pin-field.component.html',
  styleUrl: './pin-field.component.css'
})
export class PinFieldComponent {

  uploader: FileUploader;
  customerList: any;


  // imageDataURL: string | undefined;




  constructor(private ApiService: APIService, private formbuilder: FormBuilder) {
    this.uploader = new FileUploader({
      url: URL,
    });

  }

  PinForm = this.formbuilder.group({
    Ptitle: ['', Validators.required],
    Pimage: ['', Validators.required as any],
    Pcustomer: ['', Validators.required],
    Pprivacy: ['', Validators.required]
  });


  UploadImage() {
    if (this.uploader?.queue.length > 0) {
      const file: File = this.uploader.queue[0]._file;
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContentAsDataURL: string = event?.target?.result as string;

        // Update the form control with the data URL
        this.PinForm.patchValue({
          Pimage: fileContentAsDataURL
        });
      };
      reader.readAsDataURL(file);
    }
  }

  getCustomers() {
    const customerlist = this.ApiService.getCustomer();
    this.customerList = customerlist.map(item => item.Cname);
  }

  onSubmit() {
    this.ApiService.addPin(this.PinForm.value);
    alert("PIN Darta save Successfully");
  }


}
