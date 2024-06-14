import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 32, unique: true })
  email!: string;

  @Column('varchar', { length: 72 }) // Hashed password length
  password!: string;

  @Column('varchar', { length: 16 })
  firstName!: string;

  @Column('varchar', { length: 16 })
  lastName!: string;

  @Column('date')
  dayOfBirth!: Date;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;
}
