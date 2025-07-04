import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {

    async criptografarSenha(senha: string): Promise<string> {
        let iteracoes: number = 10;
        return await bcrypt.hash(senha, iteracoes);
    }

    async compararSenhas(senhaDigitada: string, senhaBanco: string): Promise<boolean> {
        return await bcrypt.compare(senhaDigitada, senhaBanco);
    }
}