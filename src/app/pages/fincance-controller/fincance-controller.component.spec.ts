import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FincanceControllerComponent } from './fincance-controller.component';

describe('FincanceControllerComponent', () => {
  let component: FincanceControllerComponent;
  let fixture: ComponentFixture<FincanceControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FincanceControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FincanceControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
