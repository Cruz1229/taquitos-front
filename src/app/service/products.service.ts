import { EventEmitter, Injectable } from '@angular/core';
import { IDataProductToCart } from '../interfaces/IDataProductToCart';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly STORAGE_KEY = 'selectedProducts';
  productsChanged = new EventEmitter<IDataProductToCart[]>();

  constructor() { }

  getSelectedProducts(): IDataProductToCart[] {
    const storedProducts = localStorage.getItem(this.STORAGE_KEY);
    return storedProducts ? JSON.parse(storedProducts) : [];
  }

  addProduct(product: IDataProductToCart): void {
    const currentProducts = this.getSelectedProducts();
    currentProducts.push(product);
    this.saveProducts(currentProducts);
    this.productsChanged.emit(currentProducts);
  }

  // Ahora usamos el índice para remover un producto específico
  removeProductByIndex(index: number): void {
    let currentProducts = this.getSelectedProducts();
    currentProducts.splice(index, 1);
    this.saveProducts(currentProducts);
    this.productsChanged.emit(currentProducts);
  }

  clearProducts(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.productsChanged.emit([]);
  }

  private saveProducts(products: IDataProductToCart[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
  }
}
