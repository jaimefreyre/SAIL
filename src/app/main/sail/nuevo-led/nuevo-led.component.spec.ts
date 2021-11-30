import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoLedComponent } from './nuevo-led.component';

describe('NuevoLedComponent', () => {
  let component: NuevoLedComponent;
  let fixture: ComponentFixture<NuevoLedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoLedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoLedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
