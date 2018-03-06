import { BaseEntity } from './../../shared';

export class ProductChartbusters implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public modelNumber?: string,
        public manufacturer?: string,
        public price?: number,
        public image?: string,
        public description?: string,
        public product?: BaseEntity,
        public products?: BaseEntity[],
        public category?: BaseEntity,
    ) {
    }
}
