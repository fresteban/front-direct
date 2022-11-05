import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasEsperaComponent } from './cuentas-espera.component';

describe('CuentasEsperaComponent', () => {
  let component: CuentasEsperaComponent;
  let fixture: ComponentFixture<CuentasEsperaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentasEsperaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentasEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
