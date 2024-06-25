import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OAuth2Client } from 'google-auth-library';
import { AuthService } from './auth.service';
import { UserModel } from 'src/models/user-model';
import { ResponseModel } from 'src/models/response-model';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private client: OAuth2Client;
  constructor(private readonly authService: AuthService) {
    this.client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
    );
  }

  @Post('/google')
  async login(@Body('token') token): Promise<ResponseModel> {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const userData = ticket.getPayload();

    return await this.authService.userAuthentication(
      userData.name,
      userData.email,
    );
  }
}
