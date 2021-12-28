import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsecionariosComponent } from './consecionarios.component';

describe('ConsecionariosComponent', () => {
  let component: ConsecionariosComponent;
  let fixture: ComponentFixture<ConsecionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsecionariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsecionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
