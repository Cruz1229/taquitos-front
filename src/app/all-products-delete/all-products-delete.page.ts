import { Component, OnInit } from '@angular/core';
import { IProducto } from '../interfaces/IProducto';
import { HttpService } from '../service/http.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-all-products-delete',
  templateUrl: './all-products-delete.page.html',
  styleUrls: ['./all-products-delete.page.scss'],
})
export class AllProductsDeletePage implements OnInit {
  comidas:IProducto[] = []
  bebidas:IProducto[] = []
  IDs:number[] = []

  constructor(private http: HttpService, private toast: ToastController) { }

  async ngOnInit() {
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

  addProduct(ev: any, id: number) {
    if (ev.detail.checked) {
      this.IDs.push(id)
    } else {
      this.IDs = this.IDs.filter(item => item !== id) 
    }

    this.IDs.forEach(i => {
      console.log('id: ' + i);
    })
  }

  async confirm() {
    if (this.IDs.length == 0) {
      const toast = await this.toast.create({
        message: 'Debes seleccionar al menos un producto',
        duration: 1000,
        position: 'bottom'
      })

      toast.present()

      return
    }

    let response:boolean = false
    for (let i = 0; i < this.IDs.length; i++) {
      this.http.deleteProducto(this.IDs[i]).subscribe({
        next: (value) => {
          response = true
        },
        error: (err) => {
          response = false
        },
      })
    }

    if (response) {
      const toast = await this.toast.create({
        message: 'Productos eliminados',
        duration: 1000,
        position: 'bottom'
      })

      toast.present()
    }
  }

}
