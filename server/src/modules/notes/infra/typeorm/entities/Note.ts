import NoteColors from '@modules/notes/dtos/NoteColors';
import NoteStatus from '@modules/notes/dtos/NoteStatus';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notes')
class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  @Exclude()
  @Column('uuid')
  user_id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ enum: NoteColors })
  color: number;

  // TODO: Add tag field
  // @Column('uuid')
  // tag: string;

  @Column({ enum: NoteStatus })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Note;
