import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { JwtPayLoad } from "../auth.interface";
import { UserService } from "../../../modules/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'Ll7nO1oxx9BMqoA4HRuSFQUeMpk6sx45'
        })
    }

    async validate(payload: JwtPayLoad,){
        console.log('payload:',payload);
        const { name } = payload;
        const entity = await this.userService.findByname(name);

        if(!entity){
            new UnauthorizedException('没找到用户')
        }

        return entity;
    }
}