import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Postagem } from "src/postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_temas"})
export class Tema {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    descricao: string;

    @ApiProperty()
    @OneToMany(() => Postagem, postagem => postagem.tema)
    postagem: Postagem[];
}