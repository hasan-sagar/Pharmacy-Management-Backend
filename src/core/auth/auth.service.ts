import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseModel } from 'src/models/response-model';
import { UserModel } from 'src/models/user-model';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async userAuthentication(
    name: string,
    email: string,
  ): Promise<ResponseModel> {
    try {
      //check user exitst or not
      const checkUser = await this.userModel.findOne({
        email: email,
      });

      //registered not found users
      if (!checkUser) {
        return await this.userRegistration(name, email);
      }
      return await this.userLogin(checkUser);
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Authentication failed! Try again',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async userRegistration(
    name: string,
    email: string,
  ): Promise<ResponseModel> {
    try {
      const user: UserModel = await this.userModel.create({
        name: name,
        email: email,
      });

      const payload = {
        userId: user._id,
        email: user.email,
      };

      const access_token = this.jwtService.sign(payload);

      return {
        message: 'User registered success',
        status: HttpStatus.CREATED,
        access_token: access_token,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Authentication failed! Try again',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async userLogin(user: UserModel): Promise<ResponseModel> {
    try {
      const payload = {
        userId: user._id,
        email: user.email,
      };

      const access_token = this.jwtService.sign(payload);

      return {
        message: 'User login success',
        status: HttpStatus.OK,
        access_token: access_token,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Authentication failed! Try again',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
