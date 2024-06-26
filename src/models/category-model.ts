import { UserModel } from './user-model';

export class CategoryModel {
  _id?: any;
  name: string;
  user?: UserModel['_id'];
}
