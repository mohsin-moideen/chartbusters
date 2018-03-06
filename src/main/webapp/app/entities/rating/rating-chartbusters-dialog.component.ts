import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RatingChartbusters } from './rating-chartbusters.model';
import { RatingChartbustersPopupService } from './rating-chartbusters-popup.service';
import { RatingChartbustersService } from './rating-chartbusters.service';
import { ReviewChartbusters, ReviewChartbustersService } from '../review';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rating-chartbusters-dialog',
    templateUrl: './rating-chartbusters-dialog.component.html'
})
export class RatingChartbustersDialogComponent implements OnInit {

    rating: RatingChartbusters;
    isSaving: boolean;

    ratings: ReviewChartbusters[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private ratingService: RatingChartbustersService,
        private reviewService: ReviewChartbustersService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.reviewService
            .query({filter: 'rating-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.rating.rating || !this.rating.rating.id) {
                    this.ratings = res.json;
                } else {
                    this.reviewService
                        .find(this.rating.rating.id)
                        .subscribe((subRes: ReviewChartbusters) => {
                            this.ratings = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rating.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ratingService.update(this.rating));
        } else {
            this.subscribeToSaveResponse(
                this.ratingService.create(this.rating));
        }
    }

    private subscribeToSaveResponse(result: Observable<RatingChartbusters>) {
        result.subscribe((res: RatingChartbusters) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RatingChartbusters) {
        this.eventManager.broadcast({ name: 'ratingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackReviewById(index: number, item: ReviewChartbusters) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rating-chartbusters-popup',
    template: ''
})
export class RatingChartbustersPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ratingPopupService: RatingChartbustersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ratingPopupService
                    .open(RatingChartbustersDialogComponent as Component, params['id']);
            } else {
                this.ratingPopupService
                    .open(RatingChartbustersDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
