export interface Venta {
    ID_Venta: number;
    Fecha: Date;
    Total: number;
    ID_Producto: number;
    TotalLinea: number;
    Cantidad: number;
    PrecioUnitario: number;
    Costo: number;
    Producto: string;
    Marca: string;
    Local: string;
  }