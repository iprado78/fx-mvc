import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyReservesComponent } from './currency-reserves.component';

describe('CurrencyReservesComponent', () => {
  let component: CurrencyReservesComponent;
  let fixture: ComponentFixture<CurrencyReservesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyReservesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyReservesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
