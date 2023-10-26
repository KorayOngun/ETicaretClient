import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdcutsComponent } from './prodcuts.component';

describe('ProdcutsComponent', () => {
  let component: ProdcutsComponent;
  let fixture: ComponentFixture<ProdcutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdcutsComponent]
    });
    fixture = TestBed.createComponent(ProdcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
