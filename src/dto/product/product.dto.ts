export class CreateProductDto {
  readonly title: string;
  readonly handle: string;
  readonly description: string;
  readonly vendor: string;
  readonly type: string;
  readonly tags: string[];
  readonly price: number;
  readonly price_min: number;
  readonly available: boolean;
  readonly price_varies: boolean;
}
