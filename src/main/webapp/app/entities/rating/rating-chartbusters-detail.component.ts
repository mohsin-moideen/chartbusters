import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { RatingChartbusters } from './rating-chartbusters.model';
import { RatingChartbustersService } from './rating-chartbusters.service';

@Component({
    selector: 'jhi-rating-chartbusters-detail',
    templateUrl: './rating-chartbusters-detail.component.html'
})
export class RatingChartbustersDetailComponent implements OnInit, OnDestroy {

    rating: RatingChartbusters;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ratingService: RatingChartbustersService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRatings();
    }

    load(id) {
        this.ratingService.find(id).subscribe((rating) => {
            this.rating = rating;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRatings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ratingListModification',
            (response) => this.load(this.rating.id)
        );
    }
}
