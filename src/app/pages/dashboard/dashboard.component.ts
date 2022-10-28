import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DateRange } from 'src/app/shared/custom-daterangepicker/daterange.model';

import { Chart, registerables } from 'chart.js';
import { CurrencyPipe } from '@angular/common';
Chart.register(...registerables);

interface InsightCountingData {
  name: string,
  amount: number,
  percentage: number,
  percentageIcon: string,
  description: string,
  icon: string
}

interface BarChartLegend {
  color: string,
  label: string
}

interface ProductData {
  name: string,
  price: number,
  sold: number,
  image: string
}

const PRODUCT_DATA: ProductData[] = [
  {
    name: 'Activia',
    image: 'assets/images/product.png',
    price: 12000,
    sold: 56
  },
  {
    name: 'Nature',
    image: 'assets/images/product.png',
    price: 10000,
    sold: 30
  },
  {
    name: 'Nature',
    image: 'assets/images/product.png',
    price: 10000,
    sold: 30
  },
  {
    name: 'Nature',
    image: 'assets/images/product.png',
    price: 10000,
    sold: 30
  },
  {
    name: 'Nature',
    image: 'assets/images/product.png',
    price: 10000,
    sold: 30
  },
]

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  insightCountingData: InsightCountingData[] = [
    {
      name: 'Sales Turnover',
      amount: 3600000,
      percentage: 13.8,
      percentageIcon: 'assets/images/ic-down.svg',
      description: 'last periode in product sold',
      icon: 'assets/images/sales-turnover.png'
    },
  ];

  @ViewChild('barChart') barChart: any;
  barChartCtx: any;
  barChartCanvas: any;
  barChartData: any;
  barChartLegends: BarChartLegend[] = [
    {
      color: '#37B04C',
      label: 'Nett'
    },
    {
      color: '#289E45',
      label: 'Gross'
    },
    {
      color: '#7AE28C',
      label: 'Average Purchase Value'
    },
    {
      color: '#707070',
      label: 'Unit per Transaction'
    }
  ];

  bestSellingSKU: ProductData[] = PRODUCT_DATA;
  topCompetitorSKU: ProductData[] = PRODUCT_DATA;

  valuesBar: number[] = [25, 22, 20, 21, 20, 23, 24];
  valuesLine: number[] = [23, 20, 18, 20, 18, 20, 22];

  constructor(
    private currencyPipe: CurrencyPipe
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadChart();
  }

  loadChart() {
    const labels: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.barChartCanvas = this.barChart.nativeElement;
    this.barChartCtx = this.barChartCanvas.getContext('2d');
    const chartStatus = Chart.getChart(this.barChartCanvas);
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    const currencyPipe = this.currencyPipe;
    this.barChartData = new Chart(this.barChartCtx, {
      type: 'scatter',
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += currencyPipe.transform(context.parsed.y, 'IDR', '', '1.0-0', 'id');
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            grid: {
              borderDash: [8, 2]
            },
            ticks: {
              callback: function (value, index, values) {
                return currencyPipe.transform(value, 'IDR', '', '1.0-0', 'id');
              },
            },
          },
        }
      },
      data: {
        datasets: [
          {
            type: 'line',
            data: this.valuesLine,
            borderColor: '#FFE854',
            backgroundColor: [
              '#FFE854',
              '#FFE854',
              '#FFE854',
              '#FFE854',
              '#FFE854',
              '#FFE854',
              '#FFE854',
            ],
          },
          {
            type: 'bar',
            data: this.valuesBar,
            backgroundColor: [
              '#37B04C',
              '#37B04C',
              '#37B04C',
              '#37B04C',
              '#37B04C',
              '#37B04C',
              '#37B04C',
            ],
          }
        ],
        labels: labels
      }
    })
  }

  onChangeDate(event: DateRange) {
    this.valuesBar = [];
    this.valuesLine = [];
    for (let i = 0; i < 7; i++) {
      this.valuesBar.push(this._getRandomInt());
      this.valuesLine.push(this._getRandomInt());
    }
    setTimeout(() => {
      this.loadChart();
    }, 200);
  }

  private _getRandomInt(max: number = 25) {
    return Math.floor(Math.random() * max);
  }

}
