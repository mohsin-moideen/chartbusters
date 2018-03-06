import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChartbustersSharedModule } from '../../shared';
import {
    Rating_AttrChartbustersService,
    Rating_AttrChartbustersPopupService,
    Rating_AttrChartbustersComponent,
    Rating_AttrChartbustersDetailComponent,
    Rating_AttrChartbustersDialogComponent,
    Rating_AttrChartbustersPopupComponent,
    Rating_AttrChartbustersDeletePopupComponent,
    Rating_AttrChartbustersDeleteDialogComponent,
    rating_AttrRoute,
    rating_AttrPopupRoute,
} from './';

const ENTITY_STATES = [
    ...rating_AttrRoute,
    ...rating_AttrPopupRoute,
];

@NgModule({
    imports: [
        ChartbustersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        Rating_AttrChartbustersComponent,
        Rating_AttrChartbustersDetailComponent,
        Rating_AttrChartbustersDialogComponent,
        Rating_AttrChartbustersDeleteDialogComponent,
        Rating_AttrChartbustersPopupComponent,
        Rating_AttrChartbustersDeletePopupComponent,
    ],
    entryComponents: [
        Rating_AttrChartbustersComponent,
        Rating_AttrChartbustersDialogComponent,
        Rating_AttrChartbustersPopupComponent,
        Rating_AttrChartbustersDeleteDialogComponent,
        Rating_AttrChartbustersDeletePopupComponent,
    ],
    providers: [
        Rating_AttrChartbustersService,
        Rating_AttrChartbustersPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChartbustersRating_AttrChartbustersModule {}
