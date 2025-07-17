import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsEmail, MinLength } from "class-validator"
import { Postagem } from "src/postagem/entities/postagem.entity"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    nome: string

    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty({example: "email@email.com.br"})
    usuario: string

    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    senha: string

    @ApiProperty()
    @Column({length: 5000}) 
    foto: string

    @ApiProperty()
    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem: Postagem[]

}