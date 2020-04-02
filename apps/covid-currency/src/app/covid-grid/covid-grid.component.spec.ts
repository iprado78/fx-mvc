import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidGridComponent } from './covid-grid.component';

describe('CovidGridComponent', () => {
  let component: CovidGridComponent;
  let fixture: ComponentFixture<CovidGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
