import { BoletimModel } from './boletins.model';
import { UsuarioModel } from './usuarios.model';

export enum FavoriteTypeModel {
    STAR = 0,
    LIKE = 1,
    SUBS = 2
}

export class FavoriteModel {
    public constructor(
        public user: UsuarioModel,
        public news: BoletimModel,
        public favoriteType: FavoriteTypeModel,
        public id?: number) { }
}