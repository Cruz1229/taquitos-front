import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from '../service/http.service';
import { IProducto } from '../interfaces/IProducto';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  producto!: IProducto

  nombre:string|null = null
  precio:number|null = null
  tipoProducto: number = 0
  backColorF:string = '#FFF'
  iconColorF:string = '#000'
  backColorD:string = '#FFF'
  iconColorD:string = '#000'

  constructor(
    private http: HttpService,
    private router: Router,
    private toast: ToastController
  ) {
    const navigation: Navigation | null = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state;
      
      if (state['item']) {
        this.producto = state['item']

        this.nombre = this.producto.nombre
        this.precio = this.producto.precio
        this.tipoProducto = this.producto.tipoProducto
      }

      console.log(JSON.stringify(state));
    }
  }

  ngOnInit() {
    if (this.tipoProducto == 1) {
      this.backColorF = '#000'
      this.iconColorF = '#FFF'
      this.backColorD = '#FFF'
      this.iconColorD = '#000'
    } else if (this.tipoProducto == 2) {
      this.backColorF = '#FFF'
      this.iconColorF = '#000'
      this.backColorD = '#000'
      this.iconColorD = '#FFF'
    }
  }

  handleTypeFoodChange(i: number) {
    this.tipoProducto = i

    if (this.tipoProducto == 1) {
      this.backColorF = '#000'
      this.iconColorF = '#FFF'
      this.backColorD = '#FFF'
      this.iconColorD = '#000'
    } else if (this.tipoProducto == 2) {
      this.backColorF = '#FFF'
      this.iconColorF = '#000'
      this.backColorD = '#000'
      this.iconColorD = '#FFF'
    }
  }

  handleInputName(ev: any) {
    this.nombre = ev.detail.value
  }

  handleInputPrice(ev: any) {
    this.precio = ev.detail.value
  }

  async confirm() {
    const data = {
      nombre: this.nombre,
      precio: this.precio,
      tipoProducto: this.tipoProducto
    }

    if (this.nombre == null) {
      const toast = await this.createToast('Debes ingresar un nombre')
      toast.present()
      return
    }

    if (this.precio == null) {
      const toast = await this.createToast('Debes ingresar un precio')
      toast.present()
      return
    }

    if (this.tipoProducto == 0) {
      const toast = await this.createToast('Debes elegir un tipo de producto')
      toast.present()
      return
    }

    if (this.producto) {
      this.http.putProducto(data, this.producto.id).subscribe({
        next: (value) => {},
        error: (err) => {},
      })
      
      const toast = await this.createToast('Producto actualizado')
  
      toast.present()
      this.router.navigate(['/all-products'])
    } else {

      this.http.postProducto(data).subscribe({
        next: (value) => {},
        error: (err) => {},
      })
      
      const toast = await this.createToast('Producto creado')
  
      toast.present()
      this.router.navigate(['/home'])

    }
  }

  createToast(message:string) {
    const toast = this.toast.create({
      message: message,
      duration: 1000,
      position: 'bottom'
    })
    return toast
  }
}
