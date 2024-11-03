import { Component, OnInit } from '@angular/core';
import { IProducto } from '../interfaces/IProducto';
import { HttpService } from '../service/http.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { ProductsService } from '../service/products.service';
import { IDataProductToCart } from '../interfaces/IDataProductToCart';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.page.html',
  styleUrls: ['./drink.page.scss'],
})
export class DrinkPage implements OnInit {

  bebidas: IProducto[] = []

  constructor(
    private http: HttpService,
    private loadingCtrl: LoadingController,
    private productsService: ProductsService,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    try {
      await this.getBebidas()
    } catch (error) {
    }

  }

  async addToCart(product: IDataProductToCart) {
    this.productsService.addProduct(product);
    const toast = await this.toastController.create({
      message: `${product.nombre} agregado al carrito`,
      duration: 1000,
      position: 'bottom'
    });
    toast.present();
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

}
