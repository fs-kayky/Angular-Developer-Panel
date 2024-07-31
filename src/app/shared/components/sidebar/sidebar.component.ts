import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() sidebarState!: boolean;
  @Output() sidebarToggle = new EventEmitter();

  router = inject(Router);

  toggle() {
    this.sidebarToggle.emit();
  }


  navigateTo(url: string) {
    this.router.navigate([url]);
  }

}
