import { RadioButtonModule } from 'primeng/radiobutton';
import { EditorModule  } from 'primeng/editor';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avd-form',
  standalone: true,
  imports: [FormsModule, EditorModule, RadioButtonModule, CommonModule],
  templateUrl: './avd-form.component.html',
  styleUrl: './avd-form.component.scss'
})
export class AvdFormComponent implements OnInit {
  text: string | undefined;
  selectedCategory: any = null;
  selectedCategory1: any = null;


  categories: any[] = [
    { name: '1', key: 1 },
    { name: '2', key: 2 },
    { name: '3', key: 3 },
    { name: '4', key: 4 },
    { name: '5', key: 5 },
    { name: '6', key: 6 },
    { name: '7', key: 7 },
    { name: '8', key: 8 },
    { name: '9', key: 9 },
    { name: '10', key: 10 }
];

ngOnInit() {
  this.selectedCategory = this.categories[0];
  this.selectedCategory1 = this.categories[0];
}


showCategories() {
  console.log(this.selectedCategory);
  console.log(this.selectedCategory1);
}


}
