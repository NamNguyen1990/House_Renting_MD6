import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyhouseEditComponent } from './myhouse-edit.component';

describe('MyhouseEditComponent', () => {
  let component: MyhouseEditComponent;
  let fixture: ComponentFixture<MyhouseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyhouseEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyhouseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
