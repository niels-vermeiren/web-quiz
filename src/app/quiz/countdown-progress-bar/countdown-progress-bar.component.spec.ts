import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownProgressBarComponent } from './countdown-progress-bar.component';

describe('CountdownProgressBarComponent', () => {
  let component: CountdownProgressBarComponent;
  let fixture: ComponentFixture<CountdownProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountdownProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
