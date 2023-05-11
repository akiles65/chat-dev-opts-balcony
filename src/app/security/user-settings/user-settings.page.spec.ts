import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSettings } from './user-settings.page';

describe('HomePage', () => {
  let component: UserSettings;
  let fixture: ComponentFixture<UserSettings>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
