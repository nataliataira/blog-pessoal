import { IsNotEmpty } from "class-validator";
import { Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export class Tema {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    descricao: string;
}