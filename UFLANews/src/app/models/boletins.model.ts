export class BoletimModel{
  public constructor(
    public id? : number,
    public publicador? : string,
    public titulo? :string,
    public dataPublicacao?: Date,
    public sessao?:string,
    public imagem?: string,
    public likes?:number,
  ){}
}
