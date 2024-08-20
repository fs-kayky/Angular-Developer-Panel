import { RadioButtonModule } from 'primeng/radiobutton';
import { EditorModule  } from 'primeng/editor';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SliderModule } from 'primeng/slider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-avd-form',
  standalone: true,
  imports: [FormsModule, EditorModule, RadioButtonModule, CommonModule, SliderModule, RatingModule, InputTextareaModule, ButtonModule, RippleModule],
  templateUrl: './avd-form.component.html',
  styleUrl: './avd-form.component.scss'
})
export class AvdFormComponent {
  text: string | undefined;
  selectedCategory: any = null;
  selectedCategory1: any = null;

  value: number = 0;
  value2: number = 0;
  value3: number = 0;
  value4: number = 0;
  value5: string = '';

}
