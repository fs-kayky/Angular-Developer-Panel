import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  toggle() {
    this.sidebarToggle.emit();
  }

}
