import { UserModel } from './user-model';

export class BrandModel {
  _id?: any;
  name: string;
  user?: UserModel['_id'];
}
