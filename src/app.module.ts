import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Postagem } from "./postagem/entities/postagem.entity";
import { Tema } from "./tema/entities/tema.entity";
import { TemaModule } from "./tema/tema.module";
import { PostagemModule } from "./postagem/postagem.module";
import { AuthModule } from "./auth/auth.module";
import { Usuario } from "./usuario/entities/usuario.entity";
import { UsuarioModule } from "./usuario/usuario.module";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'westwing',
      database: 'db_blog_pessoal',
      entities: [Postagem, Tema, Usuario],
      synchronize: true,
    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
