import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CurrencyExchangeComponent } from '../currency-exchange/currency-exchange.component';
import { CurrencyReservesComponent } from '../currency-reserves/currency-reserves.component';
import { LiveRateComponent } from './realtime-card.component';

describe('LiveRateComponent', () => {
  let component: LiveRateComponent;
  let fixture: ComponentFixture<LiveRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CurrencyExchangeComponent,
        CurrencyReservesComponent,
        LiveRateComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
