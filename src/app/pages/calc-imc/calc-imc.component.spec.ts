import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcImcComponent } from './calc-imc.component';

describe('CalcImcComponent', () => {
  let component: CalcImcComponent;
  let fixture: ComponentFixture<CalcImcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcImcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcImcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
