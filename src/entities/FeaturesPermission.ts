import { Column } from 'typeorm';

export class FeaturesPermission {
  @Column()
  featureName: string;

  @Column()
  isAllowed: boolean

  constructor(
    featureId: string,
    featureName: string,
    isAllowed: boolean,
  ) {
    this.featureName = featureName;
    this.isAllowed = isAllowed;
  }
};
