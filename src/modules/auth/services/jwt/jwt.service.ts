import { BadRequestException, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';
import * as os from 'os';
import { UserRepositoryService } from '../../../repository/user/services/user-repository/user-repository.service';
import { AuthUserEntity } from '../../../repository/user/entities/auth-user.entity';

export const JWT_CONFIG = {
  accessTokenExpires: '1h',
  refreshTokenExpires: '18h',
  jwtSecret: 'MyS3cr3tK3YForLiwA2',
  jwtSession: {
    session: false,
  },
};

@Injectable()
export class JwtService {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  /**
   * Generates a new JWT token
   *
   * @param {User} user - The user to create the payload for the JWT
   * @returns {Promise} tokens - The access and the refresh token
   */
  async generateToken(user: AuthUserEntity): Promise<any> {
    const payload = {
      sub: {
        _id: user.id,
        email: user.email,
        username: user.username,
      },
      iss: os.hostname(),
    };
    const accessToken = await jwt.sign(payload, JWT_CONFIG.jwtSecret, {
      expiresIn: JWT_CONFIG.accessTokenExpires,
    });
    const refreshToken = await jwt.sign(payload, JWT_CONFIG.jwtSecret, {
      expiresIn: JWT_CONFIG.refreshTokenExpires,
    });

    return { accessToken, refreshToken };
  }

  /**
   * Validates the token
   *
   * @param {string} token - The JWT token to validate
   * @param {boolean} isWs - True tohandle WS exception instead of HTTP exception (default: false)
   */
  async verify(token: string, isWs = false): Promise<AuthUserEntity | null> {
    try {
      const payload = jwt.verify(token, JWT_CONFIG.jwtSecret) as any;
      const user = await this.userRepositoryService.findById(payload.sub._id);

      if (!user) {
        if (isWs) {
          throw new WsException('Unauthorized access');
        } else {
          throw new BadRequestException('Unauthorized access');
        }
      }

      return user;
    } catch (err) {
      if (isWs) {
        throw new WsException(err.message);
      } else {
        throw new BadRequestException(err.message);
      }
    }
  }
}
