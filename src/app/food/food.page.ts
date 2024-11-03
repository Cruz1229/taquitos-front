import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { IProducto } from '../interfaces/IProducto';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ProductsService } from '../service/products.service';
import { ModalProductComponent } from '../components/modal-product/modal-product.component';
import { IDataProductToCart } from '../interfaces/IDataProductToCart';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  comidas: IProducto[] = []

  constructor(
    private http: HttpService,
    private loadingCtrl: LoadingController,
    private productsService: ProductsService,
    private toastController: ToastController,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    try {
      await this.getComida()
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

  async openModalDetail(product: IProducto) {
    const modal = await this.modalCtrl.create({
      component: ModalProductComponent,
      componentProps: { dataProduct: product }
    })

    modal.present()

    const { data, role } = await modal.onWillDismiss()

    if (role === 'confirm') {
      console.log(JSON.stringify(data))
      this.addToCart(data)
    }
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
}
