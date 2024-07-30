import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-calc-imc',
  standalone: true,
  imports: [CommonModule, FormsModule, InputGroupModule, InputGroupAddonModule, DropdownModule, CardModule],
  templateUrl: './calc-imc.component.html',
  styleUrl: './calc-imc.component.scss'
})
export class CalcImcComponent {
  peso: string = '';
}
