import { Column } from 'typeorm';

export class FeaturesPermission {
  @Column()
  featureName: string;

  @Column()
  isAllowed: boolean

  constructor(
    featureName: string,
    isAllowed: boolean,
  ) {
    this.featureName = featureName;
    this.isAllowed = isAllowed;
  }
};
