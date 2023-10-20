import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackIconComponent } from './back-icon.component';

describe('BackIconComponent', () => {
  let component: BackIconComponent;
  let fixture: ComponentFixture<BackIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackIconComponent]
    });
    fixture = TestBed.createComponent(BackIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
