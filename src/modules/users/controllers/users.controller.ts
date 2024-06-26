import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from 'src/core/utils/jwt.guard';
import { User } from 'src/core/utils/user.decorator';
import { UserDecoratorModel } from 'src/models/user-decorator-model';
import { UserModel } from 'src/models/user-model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@User() user: UserDecoratorModel): Promise<UserModel> {
    return await this.usersService.getUserProfile(user.email);
  }
}
