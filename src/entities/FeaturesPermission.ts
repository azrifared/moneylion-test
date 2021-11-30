import {
  Entity,
  Column,
  ManyToOne,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';
import { User } from './User'

@Entity()
export class FeaturesPermission {
  @ObjectIdColumn()
  id: ObjectID;

  @ManyToOne(() => User, (user) => user.permissions)
  user: User;

  @Column()
  featureId: string;

  @Column()
  featureName: string;

  @Column('boolean', { default: false })
  readAccess: boolean;

  @Column('boolean', { default: false })
  writeAccess: boolean;
};
