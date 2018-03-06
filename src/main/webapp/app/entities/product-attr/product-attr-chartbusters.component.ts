import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Product_AttrChartbusters } from './product-attr-chartbusters.model';
import { Product_AttrChartbustersService } from './product-attr-chartbusters.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-product-attr-chartbusters',
    templateUrl: './product-attr-chartbusters.component.html'
})
export class Product_AttrChartbustersComponent implements OnInit, OnDestroy {
product_Attrs: Product_AttrChartbusters[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private product_AttrService: Product_AttrChartbustersService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.product_AttrService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.product_Attrs = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.product_AttrService.query().subscribe(
            (res: ResponseWrapper) => {
                this.product_Attrs = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProduct_Attrs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Product_AttrChartbusters) {
        return item.id;
    }
    registerChangeInProduct_Attrs() {
        this.eventSubscriber = this.eventManager.subscribe('product_AttrListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
