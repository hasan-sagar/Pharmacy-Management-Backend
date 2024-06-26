import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/models/user-model';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserModel>,
  ) {}

  //user profile get
  async getUserProfile(userEmail: string): Promise<UserModel> {
    try {
      return await this.userModel.findOne({
        email: userEmail,
      });
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
