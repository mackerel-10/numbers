import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 32 })
  email!: string;

  @Column('varchar', { length: 20 })
  password!: string;

  @Column('varchar', { length: 16 })
  firstName!: string;

  @Column('varchar', { length: 16 })
  lastName!: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;
}
