import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChartbustersSharedModule } from '../../shared';
import {
    ObjectiveChartbustersService,
    ObjectiveChartbustersPopupService,
    ObjectiveChartbustersComponent,
    ObjectiveChartbustersDetailComponent,
    ObjectiveChartbustersDialogComponent,
    ObjectiveChartbustersPopupComponent,
    ObjectiveChartbustersDeletePopupComponent,
    ObjectiveChartbustersDeleteDialogComponent,
    objectiveRoute,
    objectivePopupRoute,
} from './';

const ENTITY_STATES = [
    ...objectiveRoute,
    ...objectivePopupRoute,
];

@NgModule({
    imports: [
        ChartbustersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ObjectiveChartbustersComponent,
        ObjectiveChartbustersDetailComponent,
        ObjectiveChartbustersDialogComponent,
        ObjectiveChartbustersDeleteDialogComponent,
        ObjectiveChartbustersPopupComponent,
        ObjectiveChartbustersDeletePopupComponent,
    ],
    entryComponents: [
        ObjectiveChartbustersComponent,
        ObjectiveChartbustersDialogComponent,
        ObjectiveChartbustersPopupComponent,
        ObjectiveChartbustersDeleteDialogComponent,
        ObjectiveChartbustersDeletePopupComponent,
    ],
    providers: [
        ObjectiveChartbustersService,
        ObjectiveChartbustersPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChartbustersObjectiveChartbustersModule {}
