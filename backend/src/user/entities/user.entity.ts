import { timestampEntites } from 'src/generics/timestampEntites';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyEntity } from './../../company/entities/company.entity';
import { QrCodeEntity } from './../../qr-code/entities/qr-code.entity';

@Entity('users')
export class userEntity extends timestampEntites {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({ unique: true })
  uuid: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: 'visitor' })
  role: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  urlRedirection: string;

  @Column()
  sectorOfActivity: string;

  @OneToOne(() => QrCodeEntity, (qrcode: QrCodeEntity) => qrcode.users, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  qrcode: QrCodeEntity;

  @ManyToMany(() => CompanyEntity, (company) => company.users, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idCompagny' })
  company: CompanyEntity[];
}
