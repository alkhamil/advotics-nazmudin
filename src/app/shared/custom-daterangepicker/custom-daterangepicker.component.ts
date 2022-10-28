import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { DateRange } from './daterange.model';

@Component({
  selector: 'app-custom-daterangepicker',
  templateUrl: './custom-daterangepicker.component.html',
  styleUrls: ['./custom-daterangepicker.component.scss']
})
export class CustomDaterangepickerComponent implements OnInit {

  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')]
  };

  filter: DateRange = {
    startDate: '',
    endDate: '',
  }

  maxDate: moment.Moment = moment();
  minDate: moment.Moment = moment();

  @Input() filterDate: any;
  @Output() onChangeModel = new EventEmitter<DateRange>();

  isCollapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.maxDate = moment().add(6, 'months').subtract(1, 'days');

    this.filterDate = {
      startDate: moment().subtract(6, 'days'),
      endDate: moment()
    }
  }

  onChangeDate() {
    if (this.filterDate.startDate) {
      this.filter.startDate = moment(this.filterDate.startDate).format('YYYY-MM-DD');
    } else {
      this.filter.startDate = '';
    }

    if (this.filterDate.endDate) {
      this.filter.endDate = moment(this.filterDate.endDate).format('YYYY-MM-DD');
    } else {
      this.filter.endDate = '';
    }

    this.onChangeModel.emit(this.filter);
  }

  onClickDate() {
    this.isCollapsed = !this.isCollapsed;
    const node = `<div class="label">
          <img src="assets/images/calendar.png" alt="advotics">
          <span>Periode</span>
      </div>
      <img src="assets/images/ic-close.svg" class="close" id="btn-close" alt="advotics">`;
    this._createElementHeader(node);

    document.getElementById('btn-close')?.addEventListener('click', function(e) {
      const mdDrppicker = document.querySelector('.md-drppicker');
      if (mdDrppicker?.classList.contains('shown')) {
        mdDrppicker?.classList.remove('shown')
        mdDrppicker?.classList.add('hidden');
      }
    });
  }

  private _createElementHeader(htmlString: string) {
    const mdDrppicker = document.querySelector('.md-drppicker');
    const headerAlready = mdDrppicker?.querySelector('.header');
    if (!headerAlready) {
      const header = document.createElement('div');
      header.classList.add('header');
      header.innerHTML = htmlString.trim();
      mdDrppicker?.insertBefore(header, mdDrppicker.firstChild);
    }
  }

}
