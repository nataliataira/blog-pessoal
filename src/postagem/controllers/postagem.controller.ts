import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult } from "typeorm";

@Controller("/postagens")
export class PostagemController {
    constructor(private readonly postagemService: PostagemService) { }
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.create(postagem);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findByID(@Param('id', ParseIntPipe)id: number): Promise<Postagem> {
        return this.postagemService.findByID(id);
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param('titulo')titulo: string): Promise<Postagem> {
        return this.postagemService.findByTitulo(titulo);
    }

    @Get('entre-datas/:dataInicial/:dataFinal')
    @HttpCode(HttpStatus.OK)
    findEntreDatas(
        @Param('dataInicial')dataInicial: string, 
        @Param('dataFinal')dataFinal: string
    ): Promise<Postagem[]> {
        return this.postagemService.findEntreDatas(
            new Date(parseInt(dataInicial)), 
            new Date(parseInt(dataFinal))
        );
    }

    @Put()
    @HttpCode(HttpStatus.OK) 
    update(@Body()postagem: Postagem): Promise<Postagem> {
        return this.postagemService.update(postagem);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id: number) {
        return this.postagemService.findByID(id);
    }
}