import { CompanyEntity } from "src/company/entities/company.entity";
import { userEntity } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("qrcode")
export class QrCodeEntity {
  @PrimaryGeneratedColumn()
  idQrCode: number;

  @Column({ unique: true })
  uuid: number;

  @Column({ unique: true })
  idUser: number;

  @Column("boolean", { default: false })
  isScanned: boolean;

  @ManyToMany(() => CompanyEntity, (company) => company.qrcode, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "idCompany" })
  company: CompanyEntity;

  @OneToOne(() => userEntity, (user: userEntity) => user.qrcode, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "idUser" })
  users: userEntity;
}
