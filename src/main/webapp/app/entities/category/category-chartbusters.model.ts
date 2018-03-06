import { BaseEntity } from './../../shared';

export class CategoryChartbusters implements BaseEntity {
    constructor(
        public id?: number,
        public countryName?: string,
        public products?: BaseEntity[],
    ) {
    }
}
