import { BrandModel } from './brand-model';
import { CategoryModel } from './category-model';
import { SupplierModel } from './suplier-model';
import { UserModel } from './user-model';

export class ProductsModel {
  _id?: any;
  medicineName: string;
  category?: CategoryModel['_id'];
  brands?: BrandModel['_id'];
  supplier?: SupplierModel['_id'];
  user?: UserModel['_id'];
  buyPrice: number;
  sellPrice: number;
  quantity: number;
  expireDate: Date;
}
