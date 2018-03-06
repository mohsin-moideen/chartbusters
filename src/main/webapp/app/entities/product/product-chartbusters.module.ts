import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChartbustersSharedModule } from '../../shared';
import {
    ProductChartbustersService,
    ProductChartbustersPopupService,
    ProductChartbustersComponent,
    ProductChartbustersDetailComponent,
    ProductChartbustersDialogComponent,
    ProductChartbustersPopupComponent,
    ProductChartbustersDeletePopupComponent,
    ProductChartbustersDeleteDialogComponent,
    productRoute,
    productPopupRoute,
} from './';

const ENTITY_STATES = [
    ...productRoute,
    ...productPopupRoute,
];

@NgModule({
    imports: [
        ChartbustersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProductChartbustersComponent,
        ProductChartbustersDetailComponent,
        ProductChartbustersDialogComponent,
        ProductChartbustersDeleteDialogComponent,
        ProductChartbustersPopupComponent,
        ProductChartbustersDeletePopupComponent,
    ],
    entryComponents: [
        ProductChartbustersComponent,
        ProductChartbustersDialogComponent,
        ProductChartbustersPopupComponent,
        ProductChartbustersDeleteDialogComponent,
        ProductChartbustersDeletePopupComponent,
    ],
    providers: [
        ProductChartbustersService,
        ProductChartbustersPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChartbustersProductChartbustersModule {}
