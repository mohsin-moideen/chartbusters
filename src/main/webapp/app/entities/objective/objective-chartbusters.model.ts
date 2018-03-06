import { BaseEntity } from './../../shared';

export class ObjectiveChartbusters implements BaseEntity {
    constructor(
        public id?: number,
        public points?: number,
        public description?: string,
        public completed?: boolean,
    ) {
        this.completed = false;
    }
}
