import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ApiKeyPreferencesComponent } from "./api-key-preferences.component";

describe('ApiKeyPreferencesComponent', () => {
  let component: ApiKeyPreferencesComponent;
  let fixture: ComponentFixture<ApiKeyPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
      declarations: [ApiKeyPreferencesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiKeyPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
