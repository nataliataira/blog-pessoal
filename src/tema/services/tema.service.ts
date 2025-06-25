import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class TemaService {

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>) { }
    
    async findAll(): Promise<Tema[]> {
        return await this.temaRepository.find({
            relations: {
                postagem: true
            }
        });
    }

    async findById(id: number): Promise<Tema> {
        const tema = await this.temaRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        });

        if (!tema) {
            throw new HttpException("Tema não encontrado!", HttpStatus.NOT_FOUND);
        }

        return tema;
    }

    async findAllByDescricao(descricao: string) {
        const tema = await this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                postagem: true
            }
        });

        if (!tema) {
            throw new HttpException("Nenhum tema foi encontrado", HttpStatus.NOT_FOUND);
        }

        return tema;
    }

    async create(tema: Tema): Promise<Tema> {
        return this.temaRepository.save(tema);
    }

    async update(tema: Tema): Promise<Tema> {
        await this.findById(tema.id);

        return await this.temaRepository.save(tema);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        return await this.temaRepository.delete(id);
    }
}