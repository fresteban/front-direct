import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoMainPageComponent } from './empleado-main-page.component';

describe('EmpleadoMainPageComponent', () => {
  let component: EmpleadoMainPageComponent;
  let fixture: ComponentFixture<EmpleadoMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
