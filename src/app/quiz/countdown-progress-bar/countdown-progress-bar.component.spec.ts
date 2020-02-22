import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CountdownProgressBarComponent } from './countdown-progress-bar.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

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

  it('max time should be the same as input time', () => {
    component.time = 20;
    component.ngOnInit();
    expect(component.maxTime).toEqual(20);
  });

  it('timer calls updatetimer method every second', fakeAsync(() => {
    spyOn(component, 'updateTime');
    component.time = 3;
    component.ngOnInit();
    expect(component.updateTime).toHaveBeenCalledTimes(0);
    tick(1000);
    expect(component.updateTime).toHaveBeenCalledTimes(1);
    tick(1000);
    expect(component.updateTime).toHaveBeenCalledTimes(2);
    component.subscription.unsubscribe();
  }));

  it('timer resets itself a second after reaching 0', fakeAsync(() => {
    component.time = 3;
    component.ngOnInit();
    tick(4000);
    expect(component.time).toEqual(3);
    component.subscription.unsubscribe();
  }));

  it('stoptimer method sets time to 0', fakeAsync(() => {
    spyOn(component, 'updateTime');
    component.time = 3;
    component.ngOnInit();
    tick(1000);
    component.stopTimer();
    expect(component.time).toEqual(0);
    component.subscription.unsubscribe();
  }));
});
