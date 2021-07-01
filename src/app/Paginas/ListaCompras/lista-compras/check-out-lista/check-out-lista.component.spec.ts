import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutListaComponent } from './check-out-lista.component';

describe('CheckOutListaComponent', () => {
  let component: CheckOutListaComponent;
  let fixture: ComponentFixture<CheckOutListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
