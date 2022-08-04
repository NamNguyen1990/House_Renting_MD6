import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyhouseDetailComponent } from './myhouse-detail.component';

describe('MyhouseDetailComponent', () => {
  let component: MyhouseDetailComponent;
  let fixture: ComponentFixture<MyhouseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyhouseDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyhouseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
