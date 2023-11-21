import { timestampEntites } from "src/generics/timestampEntites";
import { userEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { QrCodeEntity } from "../../qr-code/entities/qr-code.entity";

@Entity("company")
export class CompanyEntity extends timestampEntites {
  @PrimaryGeneratedColumn()
  idCompany: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column()
  sectorOfActivity: string;

  @Column({ unique: true })
  email: string;

  @Column()
  address: string;

  @Column()
  logo: string;

  @Column({ unique: true })
  token: number;

  @Column()
  phoneNumber: string;

  @Column({ default: 0 })
  numberVisitor: number;

  @Column()
  urlRedirection: string;

  @Column({ default: 0 })
  numberContact: number;

  @ManyToMany(() => userEntity, (user: userEntity) => user.company, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  users: userEntity[];

  @ManyToMany(() => QrCodeEntity, (qrcode: QrCodeEntity) => qrcode.company, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  qrcode: userEntity[];
}
