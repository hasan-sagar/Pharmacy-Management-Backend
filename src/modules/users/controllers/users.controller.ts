import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from 'src/core/utils/jwt.guard';
import { User } from 'src/core/utils/user.decorator';
import { UserDecoratorModel } from 'src/models/user-decorator-model';
import { UserModel } from 'src/models/user-model';
import { ResponseModel } from 'src/models/response-model';
import { UpdateUserDto } from '../dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@User() user: UserDecoratorModel): Promise<UserModel> {
    return await this.usersService.getUserProfile(user.email);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  async updateUserProfile(
    @User() user: UserDecoratorModel,
    @Body() userDetails: UpdateUserDto,
  ): Promise<ResponseModel> {
    return await this.usersService.updateUserProfile(user.email, userDetails);
  }
}
