import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class timestampEntites {
  @CreateDateColumn({ default: null, update: false })
  createAt: Date;
  @UpdateDateColumn({ default: null })
  updatedAt: Date;

  @DeleteDateColumn({ default: null, update: true })
  deleteAt: Date;
}
