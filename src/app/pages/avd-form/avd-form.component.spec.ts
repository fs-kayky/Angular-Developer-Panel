import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvdFormComponent } from './avd-form.component';

describe('AvdFormComponent', () => {
  let component: AvdFormComponent;
  let fixture: ComponentFixture<AvdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvdFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
