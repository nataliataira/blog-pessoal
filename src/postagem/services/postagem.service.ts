import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { Between, DeleteResult, ILike, Repository } from "typeorm";
import { BadRequestException, HttpException, HttpStatus, Injectable, Param, ParseIntPipe } from "@nestjs/common";

@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private PostagemRepository: Repository<Postagem>
    ) { }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.PostagemRepository.save(postagem);
    }

    async findByID(id: number): Promise<Postagem> {
        const postagem = await this.PostagemRepository.findOne({
            where: {
                id
            }
        });

        if (!postagem) {
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
        }

        return postagem;
    }

    async findAllByTitulo(titulo: string): Promise<Postagem[]> {
        const postagem = await this.PostagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }
        });

        if (!postagem) {
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);
        }

        return postagem;
    }

    async findEntreDatas(dataInicial: Date, dataFinal: Date): Promise<Postagem[]> {
        if (dataInicial > dataFinal) {
            throw new BadRequestException('Data inicial não pode ser maior que a data final');
        }
        
        const postagem = await this.PostagemRepository.find({
            where: {
                data: Between(dataInicial, dataFinal)
            }
        });

        if (!postagem) {
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);
        }

        return postagem;
    }

    async findAll(): Promise<Postagem[]> {
        return await this.PostagemRepository.find();
    }

    async update(postagem: Postagem):Promise<Postagem> {
        await this.findByID(postagem.id);
        return this.PostagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findByID(id);
        return await this.PostagemRepository.delete(id);
    }
}