export interface IDataProductToCart {
    nombre: string;
    precio: number;
    tipoProducto: number;
    cantidad: number;
    productoId: number;
    extras:string[];
    subtotal: number;
}