import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Product_AttrChartbusters } from './product-attr-chartbusters.model';
import { Product_AttrChartbustersService } from './product-attr-chartbusters.service';

@Component({
    selector: 'jhi-product-attr-chartbusters-detail',
    templateUrl: './product-attr-chartbusters-detail.component.html'
})
export class Product_AttrChartbustersDetailComponent implements OnInit, OnDestroy {

    product_Attr: Product_AttrChartbusters;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private product_AttrService: Product_AttrChartbustersService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProduct_Attrs();
    }

    load(id) {
        this.product_AttrService.find(id).subscribe((product_Attr) => {
            this.product_Attr = product_Attr;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProduct_Attrs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'product_AttrListModification',
            (response) => this.load(this.product_Attr.id)
        );
    }
}
