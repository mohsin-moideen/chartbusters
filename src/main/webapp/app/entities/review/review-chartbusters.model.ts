import { BaseEntity } from './../../shared';

export class ReviewChartbusters implements BaseEntity {
    constructor(
        public id?: number,
        public author?: string,
        public title?: string,
        public datePublished?: any,
        public reviewBody?: string,
    ) {
    }
}
