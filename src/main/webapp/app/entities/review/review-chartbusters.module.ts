import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChartbustersSharedModule } from '../../shared';
import {
    ReviewChartbustersService,
    ReviewChartbustersPopupService,
    ReviewChartbustersComponent,
    ReviewChartbustersDetailComponent,
    ReviewChartbustersDialogComponent,
    ReviewChartbustersPopupComponent,
    ReviewChartbustersDeletePopupComponent,
    ReviewChartbustersDeleteDialogComponent,
    reviewRoute,
    reviewPopupRoute,
} from './';

const ENTITY_STATES = [
    ...reviewRoute,
    ...reviewPopupRoute,
];

@NgModule({
    imports: [
        ChartbustersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ReviewChartbustersComponent,
        ReviewChartbustersDetailComponent,
        ReviewChartbustersDialogComponent,
        ReviewChartbustersDeleteDialogComponent,
        ReviewChartbustersPopupComponent,
        ReviewChartbustersDeletePopupComponent,
    ],
    entryComponents: [
        ReviewChartbustersComponent,
        ReviewChartbustersDialogComponent,
        ReviewChartbustersPopupComponent,
        ReviewChartbustersDeleteDialogComponent,
        ReviewChartbustersDeletePopupComponent,
    ],
    providers: [
        ReviewChartbustersService,
        ReviewChartbustersPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChartbustersReviewChartbustersModule {}
