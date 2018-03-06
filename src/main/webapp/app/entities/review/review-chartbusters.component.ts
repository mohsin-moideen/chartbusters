import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { ReviewChartbusters } from './review-chartbusters.model';
import { ReviewChartbustersService } from './review-chartbusters.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-review-chartbusters',
    templateUrl: './review-chartbusters.component.html'
})
export class ReviewChartbustersComponent implements OnInit, OnDestroy {
reviews: ReviewChartbusters[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private reviewService: ReviewChartbustersService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.reviewService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.reviews = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.reviewService.query().subscribe(
            (res: ResponseWrapper) => {
                this.reviews = res.json;
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
        this.registerChangeInReviews();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ReviewChartbusters) {
        return item.id;
    }
    registerChangeInReviews() {
        this.eventSubscriber = this.eventManager.subscribe('reviewListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
