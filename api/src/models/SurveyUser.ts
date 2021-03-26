import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Surveys } from './Surveys';
import { User } from './User';

@Entity('surveys_users')
class SurveyUser {
  @PrimaryColumn()
  readonly id: string;
  @Column()
  user_id: string;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @ManyToOne(() => Surveys)
  @JoinColumn({ name: 'survey_id' })
  survey: Surveys;
  @Column()
  survey_id: string;
  @Column()
  value: number;
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { SurveyUser };
