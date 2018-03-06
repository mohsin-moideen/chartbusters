import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { ObjectiveChartbusters } from './objective-chartbusters.model';
import { ObjectiveChartbustersService } from './objective-chartbusters.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-objective-chartbusters',
    templateUrl: './objective-chartbusters.component.html'
})
export class ObjectiveChartbustersComponent implements OnInit, OnDestroy {
objectives: ObjectiveChartbusters[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private objectiveService: ObjectiveChartbustersService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.objectiveService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.objectives = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.objectiveService.query().subscribe(
            (res: ResponseWrapper) => {
                this.objectives = res.json;
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
        this.registerChangeInObjectives();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ObjectiveChartbusters) {
        return item.id;
    }
    registerChangeInObjectives() {
        this.eventSubscriber = this.eventManager.subscribe('objectiveListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
