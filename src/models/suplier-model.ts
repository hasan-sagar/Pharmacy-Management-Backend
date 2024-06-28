import { UserModel } from './user-model';

export class SupplierModel {
  _id?: string;
  name: string;
  phone?: string;
  companyName: string;
  address: string;
  user?: UserModel['_id'];
}
