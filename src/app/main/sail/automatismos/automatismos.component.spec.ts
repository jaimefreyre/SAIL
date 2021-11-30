import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomatismosComponent } from './automatismos.component';

describe('AutomatismosComponent', () => {
  let component: AutomatismosComponent;
  let fixture: ComponentFixture<AutomatismosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomatismosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomatismosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
