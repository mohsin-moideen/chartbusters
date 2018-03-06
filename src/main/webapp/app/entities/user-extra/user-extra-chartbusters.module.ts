import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChartbustersSharedModule } from '../../shared';
import {
    UserExtraChartbustersService,
    UserExtraChartbustersPopupService,
    UserExtraChartbustersComponent,
    UserExtraChartbustersDetailComponent,
    UserExtraChartbustersDialogComponent,
    UserExtraChartbustersPopupComponent,
    UserExtraChartbustersDeletePopupComponent,
    UserExtraChartbustersDeleteDialogComponent,
    userExtraRoute,
    userExtraPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userExtraRoute,
    ...userExtraPopupRoute,
];

@NgModule({
    imports: [
        ChartbustersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UserExtraChartbustersComponent,
        UserExtraChartbustersDetailComponent,
        UserExtraChartbustersDialogComponent,
        UserExtraChartbustersDeleteDialogComponent,
        UserExtraChartbustersPopupComponent,
        UserExtraChartbustersDeletePopupComponent,
    ],
    entryComponents: [
        UserExtraChartbustersComponent,
        UserExtraChartbustersDialogComponent,
        UserExtraChartbustersPopupComponent,
        UserExtraChartbustersDeleteDialogComponent,
        UserExtraChartbustersDeletePopupComponent,
    ],
    providers: [
        UserExtraChartbustersService,
        UserExtraChartbustersPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChartbustersUserExtraChartbustersModule {}
