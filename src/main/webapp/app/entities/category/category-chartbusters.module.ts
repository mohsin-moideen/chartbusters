import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChartbustersSharedModule } from '../../shared';
import {
    CategoryChartbustersService,
    CategoryChartbustersPopupService,
    CategoryChartbustersComponent,
    CategoryChartbustersDetailComponent,
    CategoryChartbustersDialogComponent,
    CategoryChartbustersPopupComponent,
    CategoryChartbustersDeletePopupComponent,
    CategoryChartbustersDeleteDialogComponent,
    categoryRoute,
    categoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...categoryRoute,
    ...categoryPopupRoute,
];

@NgModule({
    imports: [
        ChartbustersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CategoryChartbustersComponent,
        CategoryChartbustersDetailComponent,
        CategoryChartbustersDialogComponent,
        CategoryChartbustersDeleteDialogComponent,
        CategoryChartbustersPopupComponent,
        CategoryChartbustersDeletePopupComponent,
    ],
    entryComponents: [
        CategoryChartbustersComponent,
        CategoryChartbustersDialogComponent,
        CategoryChartbustersPopupComponent,
        CategoryChartbustersDeleteDialogComponent,
        CategoryChartbustersDeletePopupComponent,
    ],
    providers: [
        CategoryChartbustersService,
        CategoryChartbustersPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChartbustersCategoryChartbustersModule {}
