import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyhouseListComponent } from './myhouse-list.component';

describe('MyhouseListComponent', () => {
  let component: MyhouseListComponent;
  let fixture: ComponentFixture<MyhouseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyhouseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyhouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
