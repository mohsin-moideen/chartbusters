import { BaseEntity } from './../../shared';

export class Product_AttrChartbusters implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public value?: string,
        public product?: BaseEntity,
    ) {
    }
}
