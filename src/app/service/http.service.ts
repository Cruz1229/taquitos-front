import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
// import { IProducto } from '../interfaces/IProducto';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private URL = environment.api;

  constructor(private http: HttpClient) {}

  getComidas() {
    return this.http.get<any>(`${this.URL}/producto/comida`)
  }

  getBebidas() {
    return this.http.get<any>(`${this.URL}/producto/bebida`)
  }

  postPedido(detallePedido: any[]) {
    return this.http.post<any>(`${this.URL}/detallePedido`, detallePedido)
  }

  postProducto(data: any) {
    return this.http.post<any>(`${this.URL}/producto`, data)
  }

  putProducto(data: any, id: number) {
    return this.http.put<any>(`${this.URL}/producto/${id}`, data)
  }

  deleteProducto(id: number) {
    return this.http.delete<any>(`${this.URL}/producto/${id}`)
  }
}
