import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSelectHarness } from "@angular/material/select/testing";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HeaderComponent } from "./header.component";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        MatSelectModule,
        MatDatepickerModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display quote currency as an option', async () => {
    component.quoteCurrency = 'GBP';
    const sourceSelect = await loader.getHarness(
      MatSelectHarness.with({ selector: '#base-currency-select' })
    );
    expect(sourceSelect.getOptions()).not.toContain('GBP');
  });
});
