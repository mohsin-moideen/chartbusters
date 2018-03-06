import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ChartbustersProductChartbustersModule } from './product/product-chartbusters.module';
import { ChartbustersProduct_AttrChartbustersModule } from './product-attr/product-attr-chartbusters.module';
import { ChartbustersRatingChartbustersModule } from './rating/rating-chartbusters.module';
import { ChartbustersReviewChartbustersModule } from './review/review-chartbusters.module';
import { ChartbustersCategoryChartbustersModule } from './category/category-chartbusters.module';
import { ChartbustersRating_AttrChartbustersModule } from './rating-attr/rating-attr-chartbusters.module';
import { ChartbustersObjectiveChartbustersModule } from './objective/objective-chartbusters.module';
import { ChartbustersUserExtraChartbustersModule } from './user-extra/user-extra-chartbusters.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ChartbustersProductChartbustersModule,
        ChartbustersProduct_AttrChartbustersModule,
        ChartbustersRatingChartbustersModule,
        ChartbustersReviewChartbustersModule,
        ChartbustersCategoryChartbustersModule,
        ChartbustersRating_AttrChartbustersModule,
        ChartbustersObjectiveChartbustersModule,
        ChartbustersUserExtraChartbustersModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChartbustersEntityModule {}
