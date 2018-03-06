import { BaseEntity } from './../../shared';

export class UserExtraChartbusters implements BaseEntity {
    constructor(
        public id?: number,
        public points?: number,
        public level?: number,
        public numberOfRatings?: number,
        public numberOfReviews?: number,
    ) {
    }
}
