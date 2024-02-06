import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetUsernamePage } from './set-username.page';

describe('SetUsernamePage', () => {
  let component: SetUsernamePage;
  let fixture: ComponentFixture<SetUsernamePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SetUsernamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
