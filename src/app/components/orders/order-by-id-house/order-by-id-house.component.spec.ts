import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderByIdHouseComponent } from './order-by-id-house.component';

describe('OrderByIdHouseComponent', () => {
  let component: OrderByIdHouseComponent;
  let fixture: ComponentFixture<OrderByIdHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderByIdHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderByIdHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
