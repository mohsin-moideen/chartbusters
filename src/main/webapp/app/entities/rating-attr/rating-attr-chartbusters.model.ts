import { BaseEntity } from './../../shared';

export class Rating_AttrChartbusters implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public value?: string,
        public product?: BaseEntity,
        public rating?: BaseEntity,
    ) {
    }
}
