import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 32, unique: true })
  email!: string;

  @Column('varchar', { length: 72 })
  password!: string;

  @Column('varchar', { length: 16 })
  first_name!: string;

  @Column('varchar', { length: 16 })
  last_name!: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;
}
