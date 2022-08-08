import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTopComponent } from './find-top.component';

describe('FindTopComponent', () => {
  let component: FindTopComponent;
  let fixture: ComponentFixture<FindTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
