import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';
import { FeaturesPermission } from './FeaturesPermission';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  roleName: string;

  @Column({ nullable: true })
  roleId: number;

  @Column(type => FeaturesPermission)
  featuresPermission: FeaturesPermission[];
};
