import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('driver')
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column({ unique: true })
  phone_number: string;

  @Column({ nullable: true })
  profile_photo: string;
}
