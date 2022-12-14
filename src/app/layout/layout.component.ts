import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isCollapsed: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onListenCollapsed(event: boolean) {
    this.isCollapsed = event;
  }

}
