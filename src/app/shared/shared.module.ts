import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDaterangepickerComponent } from './custom-daterangepicker/custom-daterangepicker.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [CustomDaterangepickerComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgxDaterangepickerMd.forRoot({
            displayFormat: 'DD MMMM YYYY',
            customRangeLabel: 'Custom',
        })
    ],
    exports: [CustomDaterangepickerComponent],
    providers: [],
})
export class SharedModule { }