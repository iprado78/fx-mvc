import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyPreferencesComponent } from './api-key-preferences.component';

describe('ApiKeyPreferencesComponent', () => {
  let component: ApiKeyPreferencesComponent;
  let fixture: ComponentFixture<ApiKeyPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiKeyPreferencesComponent ]
    })
    .compileComponents();
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
