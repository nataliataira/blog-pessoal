import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Postagem } from "./postagem/entities/postagem.entity";
import { Tema } from "./tema/entities/tema.entity";
import { TemaModule } from "./tema/tema.module";
import { PostagemModule } from "./postagem/postagem.module";
import { AuthModule } from "./auth/auth.module";
import { Usuario } from "./usuario/entities/usuario.entity";
import { UsuarioModule } from "./usuario/usuario.module";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { ProdService } from "./data/services/prod.service";


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
        imports: [ConfigModule],
    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
