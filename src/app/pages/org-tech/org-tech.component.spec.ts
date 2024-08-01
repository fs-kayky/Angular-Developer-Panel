import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgTechComponent } from './org-tech.component';

describe('OrgTechComponent', () => {
  let component: OrgTechComponent;
  let fixture: ComponentFixture<OrgTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgTechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
