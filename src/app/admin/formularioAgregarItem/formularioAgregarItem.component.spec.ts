import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAgregarItemComponent } from './formularioAgregarItem.component';

describe('FormularioAgregarItemComponent', () => {
  let component: FormularioAgregarItemComponent;
  let fixture: ComponentFixture<FormularioAgregarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioAgregarItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormularioAgregarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
