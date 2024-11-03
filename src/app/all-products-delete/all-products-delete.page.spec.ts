import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllProductsDeletePage } from './all-products-delete.page';

describe('AllProductsDeletePage', () => {
  let component: AllProductsDeletePage;
  let fixture: ComponentFixture<AllProductsDeletePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProductsDeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
