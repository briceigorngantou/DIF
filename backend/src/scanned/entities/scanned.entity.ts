import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("scanned")
export class ScannedEntity {
  @PrimaryGeneratedColumn()
  idScanned: number;

  @Column()
  idCompany: number;

  @Column()
  uuid: number;
}
