import {
  Entity,
  Column,
  JoinTable,
  ObjectIdColumn,
  ObjectID,
  OneToMany,
} from 'typeorm';
import { FeaturesPermission } from './FeaturesPermission';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  roleName: string;

  @Column({ nullable: true })
  roleId: number;

  @OneToMany(() => FeaturesPermission, (featuresPermission) => featuresPermission.user)
  @JoinTable()
  permissions: FeaturesPermission[];
};
