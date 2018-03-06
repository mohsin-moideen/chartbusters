import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Rating_AttrChartbusters } from './rating-attr-chartbusters.model';
import { Rating_AttrChartbustersService } from './rating-attr-chartbusters.service';

@Component({
    selector: 'jhi-rating-attr-chartbusters-detail',
    templateUrl: './rating-attr-chartbusters-detail.component.html'
})
export class Rating_AttrChartbustersDetailComponent implements OnInit, OnDestroy {

    rating_Attr: Rating_AttrChartbusters;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rating_AttrService: Rating_AttrChartbustersService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRating_Attrs();
    }

    load(id) {
        this.rating_AttrService.find(id).subscribe((rating_Attr) => {
            this.rating_Attr = rating_Attr;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRating_Attrs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rating_AttrListModification',
            (response) => this.load(this.rating_Attr.id)
        );
    }
}
