import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyhouseComponent } from './myhouse.component';

describe('MyhouseComponent', () => {
  let component: MyhouseComponent;
  let fixture: ComponentFixture<MyhouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyhouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
