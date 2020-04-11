import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyGridComponent } from './currency-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { DatesService } from '../../services/dates/dates.service';

describe('CurrencyGridComponent', () => {
  let component: CurrencyGridComponent;
  let fixture: ComponentFixture<CurrencyGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyGridComponent ],
      imports: [AgGridModule.withComponents(), HttpClientTestingModule]
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
