export class CreateVariantDto {
    product_id: string;
    product_color_id: string;
    title: string;
    option: string[];
    sku: string;
    require_shipping: boolean;
    taxable: boolean;
    available: boolean;
    name: string;
    public_title: string;
    price: number;
    weight: number;
    barcode: string;
    quantity: number;
  }
  