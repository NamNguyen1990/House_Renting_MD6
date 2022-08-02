import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyhouseCreateComponent } from './myhouse-create.component';

describe('MyhouseCreateComponent', () => {
  let component: MyhouseCreateComponent;
  let fixture: ComponentFixture<MyhouseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyhouseCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyhouseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
