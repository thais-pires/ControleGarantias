// export class Produto {
//   constructor(
//   public id: number,
//   public nome: string,
//   public dataCompra: Date,
//   public duracaoGarantiaMeses: number,
//   public dataFimGarantia: string,
//   )
//   {}
// }

export interface Produto {
  id: number,
  nome: string,
  dataCompra: Date,
  duracaoGarantiaMeses: number,
  dataFimGarantia: Date
}
