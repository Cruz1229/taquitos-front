import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { IDataProductToCart } from '../interfaces/IDataProductToCart';
import { Subscription } from 'rxjs';
import { HttpService } from '../service/http.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  productos: IDataProductToCart[] = []
  detallePedido: {
    cantidad: number;
    producto: number; // id de producto
    pedidoId: number; // siempre 0
    extras: string[];
  }[] = []

  total: number = 0

  private productsChangedSubscription: Subscription | undefined;

  constructor(
    private productsService: ProductsService,
    private http: HttpService,
    private toast: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.productos = this.productsService.getSelectedProducts();
    
    this.productsChangedSubscription = this.productsService.productsChanged.subscribe(
      (updatedProducts: IDataProductToCart[]) => {
        this.productos = updatedProducts;
      }
    );

    this.productos.forEach(item => {
      this.total += item.subtotal
    })
  }

  removeFromCart(index: number) {
    this.productsService.removeProductByIndex(index);
  }

  ngOnDestroy() {
    if (this.productsChangedSubscription) {
      this.productsChangedSubscription.unsubscribe();
    }
  }

  async confirm() {
    this.productos.forEach(element => {
      this.detallePedido.push({
        cantidad: element.cantidad,
        producto: element.productoId,
        pedidoId: 0,
        extras: element.extras
      })
    });

    this.http.postPedido(this.detallePedido).subscribe({
      next: (value) => {},
      error: (err) => {},
    })
    
    const toast = await this.toast.create({
      message: 'Pedido registrado',
      duration: 1000,
      position: 'bottom'
    });

    toast.present();

    this.productsService.clearProducts()
    this.router.navigate(['/home'])
  }

}
