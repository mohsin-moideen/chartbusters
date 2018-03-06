import { BaseEntity, User } from './../../shared';

export class RatingChartbusters implements BaseEntity {
    constructor(
        public id?: number,
        public ratingValue?: number,
        public reviewCount?: number,
        public hasReview?: boolean,
        public rating?: BaseEntity,
        public ratings?: BaseEntity[],
        public user?: User,
    ) {
        this.hasReview = false;
    }
}
