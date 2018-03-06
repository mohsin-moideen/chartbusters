import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReviewChartbusters } from './review-chartbusters.model';
import { ReviewChartbustersPopupService } from './review-chartbusters-popup.service';
import { ReviewChartbustersService } from './review-chartbusters.service';

@Component({
    selector: 'jhi-review-chartbusters-dialog',
    templateUrl: './review-chartbusters-dialog.component.html'
})
export class ReviewChartbustersDialogComponent implements OnInit {

    review: ReviewChartbusters;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private reviewService: ReviewChartbustersService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.review.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reviewService.update(this.review));
        } else {
            this.subscribeToSaveResponse(
                this.reviewService.create(this.review));
        }
    }

    private subscribeToSaveResponse(result: Observable<ReviewChartbusters>) {
        result.subscribe((res: ReviewChartbusters) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ReviewChartbusters) {
        this.eventManager.broadcast({ name: 'reviewListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-review-chartbusters-popup',
    template: ''
})
export class ReviewChartbustersPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reviewPopupService: ReviewChartbustersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reviewPopupService
                    .open(ReviewChartbustersDialogComponent as Component, params['id']);
            } else {
                this.reviewPopupService
                    .open(ReviewChartbustersDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
