import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IDataProductToCart } from 'src/app/interfaces/IDataProductToCart';
import { IProducto } from 'src/app/interfaces/IProducto';

interface ExtraItem {
  nombre: string;
  precio: number;
  seleccionado: boolean;
}

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent  implements OnInit {
  @Input() dataProduct!: IProducto

  count: number = 1
  subtotal: number = 0
  extras: string[] = []
  extrasSeleccionados: ExtraItem[] = []

  extrasDisponibles: ExtraItem[] = [
    { nombre: 'QUESO', precio: 10, seleccionado: false },
    { nombre: 'GUACAMOLE', precio: 15, seleccionado: false },
    { nombre: 'CEBOLLA', precio: 5, seleccionado: false },
    { nombre: 'CILANTRO', precio: 5, seleccionado: false },
    { nombre: 'SALSA_EXTRA', precio: 8, seleccionado: false }
  ]

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    // this.subtotal =+ this.dataProduct.precio
    // console.log(JSON.stringify(this.dataProduct));
    this.calcularSubtotal()
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
    
    this.calcularSubtotal()
    // if (this.count > 0)
    //   this.subtotal += this.dataProduct.precio
  }

  decrement() {
    if (this.count > 1) {
      this.count--;
      this.calcularSubtotal();
    }
    /* this.count--;
    
    if (this.count >= 0)
      this.subtotal -= this.dataProduct.precio */
  }

  changeExtra(ev: any, precio: number, tipoExtra: string) {
    const extra = this.extrasDisponibles.find(e => e.nombre === tipoExtra);
    if (extra) {
      extra.seleccionado = ev.detail.checked;
      
      if (ev.detail.checked) {
        this.extras.push(tipoExtra);
      } else {
        this.extras = this.extras.filter(e => e !== tipoExtra);
      }
      
      this.calcularSubtotal();
    }
    /* this.extras.push(tipoExtra)

    let precioFix = 0;

    for (let i = 0; i < this.count; i++) {
      precioFix += precio
    }

    if (ev.detail.checked) {
      this.subtotal += precioFix 
    } else {
      this.subtotal -= precioFix
    } */
  }

  calcularSubtotal() {
    // Precio base del producto por cantidad
    let subtotal = this.dataProduct.precio * this.count;
    
    // Agregar precio de extras seleccionados
    this.extrasDisponibles.forEach(extra => {
      if (extra.seleccionado) {
        subtotal += extra.precio * this.count;
      }
    });
    
    this.subtotal = subtotal;
  }

}
