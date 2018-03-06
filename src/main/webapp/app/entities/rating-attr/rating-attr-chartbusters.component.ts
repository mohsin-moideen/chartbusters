import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Rating_AttrChartbusters } from './rating-attr-chartbusters.model';
import { Rating_AttrChartbustersService } from './rating-attr-chartbusters.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-rating-attr-chartbusters',
    templateUrl: './rating-attr-chartbusters.component.html'
})
export class Rating_AttrChartbustersComponent implements OnInit, OnDestroy {
rating_Attrs: Rating_AttrChartbusters[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private rating_AttrService: Rating_AttrChartbustersService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.rating_AttrService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.rating_Attrs = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.rating_AttrService.query().subscribe(
            (res: ResponseWrapper) => {
                this.rating_Attrs = res.json;
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
        this.registerChangeInRating_Attrs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Rating_AttrChartbusters) {
        return item.id;
    }
    registerChangeInRating_Attrs() {
        this.eventSubscriber = this.eventManager.subscribe('rating_AttrListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
