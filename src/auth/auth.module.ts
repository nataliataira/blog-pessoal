import { forwardRef, Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { UsuarioModule } from "src/usuario/UsuarioModule";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
    imports: [
        forwardRef(() => UsuarioModule),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1h'}
        })
    ],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtModule],
    controllers: [AbortController],
    exports: [Bcrypt],
})
export class AuthModule {};