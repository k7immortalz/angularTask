import { Injectable, Type } from '@angular/core';
import { CustomerFieldComponent } from '../shaComponents/customer-field/customer-field.component';
import { PinFieldComponent } from '../shaComponents/pin-field/pin-field.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommService {

    private ComponentIndex = new BehaviorSubject(0);
    currentComponentIndex = this.ComponentIndex.asObservable();

    // add dynamic component for modal
    getComponents() {
        return [
            {
                component: CustomerFieldComponent,
                title: "Create Customer",
            },
            {
                component: PinFieldComponent,
                title: "Create Pin",
            },
        ] as { component: Type<any>, title: string }[];
    }


    updateComponentIndex(index: number) {
        this.ComponentIndex.next(index)
    }


}