import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-calc-imc',
  standalone: true,
  imports: [ToastModule, CommonModule, FormsModule, InputGroupModule, InputGroupAddonModule, DropdownModule, CardModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './calc-imc.component.html',
  styleUrl: './calc-imc.component.scss',

})
export class CalcImcComponent {

  constructor(private messageService: MessageService) { }

  peso: string = '';

  height: any = 0;
  weight: any = 0;

  showCards: boolean = true;
  showMagreza: boolean = false;
  showNormal: boolean = false;
  showSobrepeso: boolean = false;
  showObesidade: boolean = false;

  resetCards() {
    this.showCards = true;
    this.showMagreza = false;
    this.showNormal = false;
    this.showSobrepeso = false;
    this.showObesidade = false;
  }


  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Inputs Invalidos' });
  }

  CalculateIMC() {

    this.height = (document.getElementById('height') as HTMLInputElement).value;
    this.weight = (document.getElementById('weight') as HTMLInputElement).value;
    let imc = parseFloat(((this.weight / (this.height / 100 )) / (this.height / 100 )).toFixed(2))

    this.resetCards();

    if(imc < 18.5 && imc > 0){
      this.showCards = false;
      this.showMagreza = true;
      return;
    }

    if(imc >= 18.5 && imc <= 24.9){
      this.showCards = false;
      this.showNormal = true;
      return;
    }

    if(imc >= 25 && imc <= 29.9){
      this.showCards = false;
      this.showSobrepeso = true;
      return;
    }

    if(imc >= 30){
      this.showCards = false;
      this.showObesidade = true;
      return;
    }

    this.showError();
    this.resetCards();
  }



}
