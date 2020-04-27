import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveRateComponent } from './realtime-card.component';

describe('LiveRateComponent', () => {
  let component: LiveRateComponent;
  let fixture: ComponentFixture<LiveRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LiveRateComponent]
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
