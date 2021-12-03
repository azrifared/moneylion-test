import { Column } from 'typeorm';

export class FeaturesPermission {
  @Column()
  featureName: string;

  @Column()
  canAccess: boolean;

  constructor(featureName: string, canAccess: boolean) {
    this.featureName = featureName;
    this.canAccess = canAccess;
  }
}
