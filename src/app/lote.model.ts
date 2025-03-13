export class Lote {
  id!: string;
  manzana!: string;
  superficie!: number;
  frente!: number;
  fondo!: number;
  calle!: string;
  estado!: string;
  observaciones!: string;
  marcaAdicional!: string;
  coordenadas!: string;
  fechaActualizacion!: string;
  edificioPresente!: boolean;
  estadoEdificio!: string;
  notasLegales!: string;
  fotos!: string[];
  disponible!: boolean; // Booleano para disponibilidad
  precio!: number;
  constructor(lote?:Partial<Lote>) {
    Object.assign(this, {}, lote)
  }
}