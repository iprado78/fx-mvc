import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyGridComponent } from './currency-grid.component';

describe('CurrencyGridComponent', () => {
  let component: CurrencyGridComponent;
  let fixture: ComponentFixture<CurrencyGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
