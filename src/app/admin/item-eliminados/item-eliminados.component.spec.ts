import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEliminadosComponent } from './item-eliminados.component';

describe('ItemEliminadosComponent', () => {
  let component: ItemEliminadosComponent;
  let fixture: ComponentFixture<ItemEliminadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemEliminadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemEliminadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
