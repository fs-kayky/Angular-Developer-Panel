import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ICategory } from '../../../interfaces/ICategory';
import { ITableRow } from '../../../interfaces/ITableRow';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-fincance-controller',
  standalone: true,
  imports: [TableModule, CommonModule, CalendarModule, FormsModule, InputTextModule, DropdownModule, InputNumberModule, ToastModule],
  providers: [MessageService],
  templateUrl: './fincance-controller.component.html',
  styleUrl: './fincance-controller.component.scss'
})
export class FincanceControllerComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  date: Date | undefined;
  value: number | undefined;
  selectedCategory: ICategory | undefined;
  categories: ICategory[] | undefined;
  description: string | undefined;
  tableRows: ITableRow[] = [];
  haveData: boolean = (this.tableRows.length > 0) ? true : false;

  ngOnInit() {

    this.categories = [
      { type: 'Salário', operation: 'entrada' },
      { type: 'Aluguel', operation: 'saida' },
      { type: 'Transporte', operation: 'saida' },
      { type: 'Rendimentos', operation: 'entrada' },
      { type: 'Lazer', operation: 'saida' },
      { type: 'Alimentação', operation: 'saida' },
    ];
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: `${message}` });
  }

  resetInputs() {
    this.date = undefined;
    this.value = undefined;
    this.selectedCategory = undefined;
    this.description = undefined
  }


  // RESOLVER BUG DA DATA!!!!!

  createNewRow() {

    if (this.date && this.value && this.selectedCategory && this.description) {
      this.tableRows.push({
        date: `${String(this.date.getDay()).padStart(2, '0')}/${String(this.date.getMonth()).padStart(2, '0')}/${this.date.getFullYear()}`, // FAZER TRATATIVA NA DATA
        category: this.selectedCategory.type,
        value: this.value,
        description: this.description
      });
      this.haveData = true;
      this.resetInputs();

    } else {
      // SHOW TOAST ERROR MESSAGE
      this.showError('Preencha todos os campos!');
    }

  }


}
