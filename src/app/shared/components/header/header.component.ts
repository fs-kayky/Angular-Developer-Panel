import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  router = inject(Router);
  sidebarVisible = false;

  onToggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  constructor() { }

  ngOnInit() {

  }

  goToHome() {
    this.router.navigate(['home']);
  }

}
