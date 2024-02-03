import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class APIService {

    public apiUrl: string = `${environment.baseUrl}`;
    constructor(private http: HttpClient) { }

    public getCountry(): Observable<any> {

        return this.http.get<any>(this.apiUrl);
    }

    private readonly STORAGE_KEY_CUSTOMER = 'CustomerData';
    private readonly STORAGE_KEY_PIN = 'PinData';

    getCustomer(): any[] {
        if (typeof localStorage !== 'undefined') {
        const dataString = localStorage.getItem(this.STORAGE_KEY_CUSTOMER);
        return dataString ? JSON.parse(dataString) : [];
        }else{
            return []
        }
    }

    addCustomer(item: any): void {
        const data = this.getCustomer();
        item.id = this.generateCId();
        data.push(item);
        localStorage.setItem(this.STORAGE_KEY_CUSTOMER, JSON.stringify(data));
    }

    //create Customer ID
    private generateCId(): number {
        const data = this.getCustomer();
        return data.length > 0 ? Math.max(...data.map((item: any) => item.id)) + 1 : 1;
    }


    getPin(): any[] {
        if (typeof localStorage !== 'undefined') {
            const dataString = localStorage.getItem(this.STORAGE_KEY_PIN);
            return dataString ? JSON.parse(dataString) : [];
        } else {
            return []
        }
    }

    addPin(item: any): void {
        const data = this.getPin();
        item.id = this.generatePId();
        data.push(item);
        localStorage.setItem(this.STORAGE_KEY_PIN, JSON.stringify(data));
    }

    //create Pin ID
    private generatePId(): number {
        const data = this.getPin();
        return data.length > 0 ? Math.max(...data.map((item: any) => item.id)) + 1 : 1;
    }
}