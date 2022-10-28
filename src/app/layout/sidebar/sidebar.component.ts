import { Component, EventEmitter, OnInit, Output } from '@angular/core';

interface Sidebar {
  label: string,
  url: string,
  icon: string
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebar: Sidebar[] = [
    {
      label: 'Dashboard',
      url: 'dashboard',
      icon: 'assets/images/ic-dashboard.svg'
    }
  ]; 

  isCollapsed: boolean = false;
  @Output() onCollapsed = new EventEmitter<boolean>(false);
  constructor() { }

  ngOnInit(): void {
  }

  onClickCollapsed() {
    this.isCollapsed = !this.isCollapsed;
    this.onCollapsed.emit(this.isCollapsed);
  }

}
