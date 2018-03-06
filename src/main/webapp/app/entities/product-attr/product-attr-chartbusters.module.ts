import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChartbustersSharedModule } from '../../shared';
import {
    Product_AttrChartbustersService,
    Product_AttrChartbustersPopupService,
    Product_AttrChartbustersComponent,
    Product_AttrChartbustersDetailComponent,
    Product_AttrChartbustersDialogComponent,
    Product_AttrChartbustersPopupComponent,
    Product_AttrChartbustersDeletePopupComponent,
    Product_AttrChartbustersDeleteDialogComponent,
    product_AttrRoute,
    product_AttrPopupRoute,
} from './';

const ENTITY_STATES = [
    ...product_AttrRoute,
    ...product_AttrPopupRoute,
];

@NgModule({
    imports: [
        ChartbustersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        Product_AttrChartbustersComponent,
        Product_AttrChartbustersDetailComponent,
        Product_AttrChartbustersDialogComponent,
        Product_AttrChartbustersDeleteDialogComponent,
        Product_AttrChartbustersPopupComponent,
        Product_AttrChartbustersDeletePopupComponent,
    ],
    entryComponents: [
        Product_AttrChartbustersComponent,
        Product_AttrChartbustersDialogComponent,
        Product_AttrChartbustersPopupComponent,
        Product_AttrChartbustersDeleteDialogComponent,
        Product_AttrChartbustersDeletePopupComponent,
    ],
    providers: [
        Product_AttrChartbustersService,
        Product_AttrChartbustersPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChartbustersProduct_AttrChartbustersModule {}
