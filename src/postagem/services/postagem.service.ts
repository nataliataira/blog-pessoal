import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { Between, DeleteResult, ILike, Repository } from "typeorm";
import { BadRequestException, HttpException, HttpStatus, Injectable, Param, ParseIntPipe } from "@nestjs/common";
import { TemaService } from "src/tema/services/tema.service";

@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private PostagemRepository: Repository<Postagem>,
        private temaService: TemaService
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.PostagemRepository.find({
            relations: {
                tema: true,
                usuario: true
            }
        });
    }

    async findByID(id: number): Promise<Postagem> {
        const postagem = await this.PostagemRepository.findOne({
            where: {
                id
            },
            relations:{
                tema: true,
                usuario: true
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
            },
            relations:{
                tema: true,
                usuario: true
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
            },
            relations: {
                tema: true,
                usuario: true
            }
        });

        if (!postagem) {
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);
        }

        return postagem;
    }

    async create(postagem: Postagem): Promise<Postagem> {
        await this.temaService.findById(postagem.tema.id);
        return await this.PostagemRepository.save(postagem);
    }

    async update(postagem: Postagem):Promise<Postagem> {
        await this.findByID(postagem.id);
        await this.temaService.findById(postagem.tema.id);
        return this.PostagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findByID(id);
        return await this.PostagemRepository.delete(id);
    }
}