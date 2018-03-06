import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ReviewChartbusters } from './review-chartbusters.model';
import { ReviewChartbustersService } from './review-chartbusters.service';

@Component({
    selector: 'jhi-review-chartbusters-detail',
    templateUrl: './review-chartbusters-detail.component.html'
})
export class ReviewChartbustersDetailComponent implements OnInit, OnDestroy {

    review: ReviewChartbusters;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private reviewService: ReviewChartbustersService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReviews();
    }

    load(id) {
        this.reviewService.find(id).subscribe((review) => {
            this.review = review;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReviews() {
        this.eventSubscriber = this.eventManager.subscribe(
            'reviewListModification',
            (response) => this.load(this.review.id)
        );
    }
}
