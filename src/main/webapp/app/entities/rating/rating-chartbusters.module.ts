import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChartbustersSharedModule } from '../../shared';
import { ChartbustersAdminModule } from '../../admin/admin.module';
import {
    RatingChartbustersService,
    RatingChartbustersPopupService,
    RatingChartbustersComponent,
    RatingChartbustersDetailComponent,
    RatingChartbustersDialogComponent,
    RatingChartbustersPopupComponent,
    RatingChartbustersDeletePopupComponent,
    RatingChartbustersDeleteDialogComponent,
    ratingRoute,
    ratingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ratingRoute,
    ...ratingPopupRoute,
];

@NgModule({
    imports: [
        ChartbustersSharedModule,
        ChartbustersAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RatingChartbustersComponent,
        RatingChartbustersDetailComponent,
        RatingChartbustersDialogComponent,
        RatingChartbustersDeleteDialogComponent,
        RatingChartbustersPopupComponent,
        RatingChartbustersDeletePopupComponent,
    ],
    entryComponents: [
        RatingChartbustersComponent,
        RatingChartbustersDialogComponent,
        RatingChartbustersPopupComponent,
        RatingChartbustersDeleteDialogComponent,
        RatingChartbustersDeletePopupComponent,
    ],
    providers: [
        RatingChartbustersService,
        RatingChartbustersPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChartbustersRatingChartbustersModule {}
