import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductoDto {

  @IsNotEmpty()
  @IsString()
  codProd: string;

  @IsNotEmpty()
  @IsString()
  nombreProd: string;

  @IsOptional()
  @IsString()
  descripcionProd: string;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  precioCompra: number;

  @IsNotEmpty()
  @IsNumber()
  precioVenta: number;



}