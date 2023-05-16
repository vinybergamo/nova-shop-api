export class CreateProductDto {
  readonly name: string;
  readonly price: number;
  readonly promotion_price?: number;
  readonly cost_price?: number;
  readonly description?: string;
  readonly quantity: number;
  readonly active: boolean;
}
