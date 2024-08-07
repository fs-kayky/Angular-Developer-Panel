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
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { generate } from 'rxjs';

@Component({
  selector: 'app-fincance-controller',
  standalone: true,
  imports: [DialogModule, TagModule, TableModule, CommonModule, CalendarModule, FormsModule, InputTextModule, DropdownModule, InputNumberModule, ToastModule],
  providers: [MessageService],
  templateUrl: './fincance-controller.component.html',
  styleUrl: './fincance-controller.component.scss'
})
export class FincanceControllerComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  date: Date | undefined;
  value: number | undefined;
  selectedCategory!: ICategory | undefined;
  categories: ICategory[] | undefined;
  description: string | undefined;
  tableRows: ITableRow[] = [];
  haveData: boolean = (this.tableRows.length > 0) ? true : false;
  dialogEditDisplay: boolean = false;
  actualEditId!: number;
  id: number = 0;

  editObject: ITableRow = {
    id: 0,
    date: new Date(),
    category: '',
    categoryType: '',
    value: 0,
    description: ''
  };

  selectedCategoryEdit!: ICategory;
  // editDate!: Date;
  // editValue!: number;
  // editSelectedCategory!: ICategory;
  // editDescription!: string;

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

  generateID(): number {
    return this.id++;

  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: `${message}` });
  }

  removeProduct(id: number) {
    this.tableRows = this.tableRows.filter(row => row.id !== id);
    if (this.tableRows.length === 0) {
      this.haveData = false;
    }
  }

  editProduct() {

      const index = this.tableRows.findIndex(row => row.id === this.actualEditId);

      this.tableRows[index] = {
      ...this.editObject,
      date: this.editObject.date,
      category: this.selectedCategoryEdit.type,
      categoryType: this.selectedCategoryEdit.operation
    };

  }

  showDialog(id: number) {
    const index = this.tableRows.findIndex(row => row.id === id);
    this.actualEditId = id;
    this.editObject = {...this.tableRows[index]};
    this.editObject.date = new Date(this.editObject.date);

    const selectedCategory: any = this.categories?.find(category => category.type === this.tableRows[index].category);
    this.selectedCategoryEdit = {...selectedCategory};
    this.dialogEditDisplay = true;
  }

  getSeverity(operation: string): any {
    switch (operation) {
      case 'entrada':
        return 'success';
      case 'saida':
        return 'danger';
      default:
        return 'contrast';
    }
  }

  resetInputs() {
    this.date = undefined;
    this.value = undefined;
    this.selectedCategory = undefined;
    this.description = undefined
  }

  createNewRow() {
    if (this.date && this.value && this.selectedCategory && this.description) {
      this.tableRows.push({
        id: this.generateID(),
        date: this.date,
        category: this.selectedCategory.type,
        categoryType: this.selectedCategory.operation,
        value: this.value,
        description: this.description
      });
      this.haveData = true;
      this.resetInputs();

    } else {
      this.showError('Preencha todos os campos!');
    }

  }

  formatDate(date: Date): string{
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth()+1).padStart(2, '0')}/${date.getFullYear()}`;
  }


}
