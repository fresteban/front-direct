import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioModificarItemComponent } from './formulario-modificar-item.component';

describe('FormularioModificarItemComponent', () => {
  let component: FormularioModificarItemComponent;
  let fixture: ComponentFixture<FormularioModificarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioModificarItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioModificarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
