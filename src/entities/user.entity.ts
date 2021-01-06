import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: null })
  thumbnail: string;

  @Column()
  password: string;

  @Column({ name: 'expired_token', default: null })
  expiredToken: string;

  @CreateDateColumn({ name: 'created_at ' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
