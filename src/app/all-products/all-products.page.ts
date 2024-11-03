import { Component, OnInit } from '@angular/core';
import { IProducto } from '../interfaces/IProducto';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.page.html',
  styleUrls: ['./all-products.page.scss'],
})
export class AllProductsPage implements OnInit {
  comidas: IProducto[] = []
  bebidas: IProducto[] = []

  constructor(private router: Router, private http: HttpService) { }

  async ngOnInit() {
    try {
      await this.getComida()
      await this.getBebidas()
    } catch (error) {
    }
  }

  async ionViewWillEnter() {
    try {
      await this.getComida()
      await this.getBebidas()
    } catch (error) {
    }
  }

  async getBebidas(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.getBebidas().subscribe({
        next: (response: IProducto[]) => {
          this.bebidas = response
          resolve()
        },
        error: (err) => {
          reject()
        },
      })
    })
  }

  async getComida(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.getComidas().subscribe({
        next: (response: IProducto[]) => {
          this.comidas = response
          resolve()
        },
        error: (err) => {
          reject()
        },
      })
    })
  }

  editProduct(item: IProducto) {
    this.router.navigate(['/product'], {state: {item}})
  }

}
