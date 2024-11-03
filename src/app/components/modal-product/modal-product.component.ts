import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IDataProductToCart } from 'src/app/interfaces/IDataProductToCart';
import { IProducto } from 'src/app/interfaces/IProducto';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent  implements OnInit {
  @Input() dataProduct!: IProducto

  count:number = 1
  subtotal:number = 0

  extras:string[] = []

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.subtotal =+ this.dataProduct.precio
    console.log(JSON.stringify(this.dataProduct));
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const data: IDataProductToCart = {
      nombre: this.dataProduct.nombre,
      precio: this.dataProduct.precio,
      tipoProducto: this.dataProduct.tipoProducto,
      cantidad: this.count,
      productoId: this.dataProduct.id,
      extras: this.extras,
      subtotal: this.subtotal
    }

    return this.modalCtrl.dismiss(data, 'confirm');
  }

  increment() {
    this.count++
    
    if (this.count > 0)
      this.subtotal += this.dataProduct.precio
  }

  decrement() {
    this.count--;
    
    if (this.count >= 0)
      this.subtotal -= this.dataProduct.precio
  }

  changeExtra(ev: any, precio: number, tipoExtra: string) {
    this.extras.push(tipoExtra)

    if (ev.detail.checked) {
      this.subtotal += precio
    } else {
      this.subtotal -= precio
    }
  }

}
