import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FramesdashComponent } from './framesdash.component';

describe('FramesdashComponent', () => {
  let component: FramesdashComponent;
  let fixture: ComponentFixture<FramesdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FramesdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FramesdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
