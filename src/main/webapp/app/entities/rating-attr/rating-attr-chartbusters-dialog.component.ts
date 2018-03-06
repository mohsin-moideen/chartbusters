import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Rating_AttrChartbusters } from './rating-attr-chartbusters.model';
import { Rating_AttrChartbustersPopupService } from './rating-attr-chartbusters-popup.service';
import { Rating_AttrChartbustersService } from './rating-attr-chartbusters.service';
import { ProductChartbusters, ProductChartbustersService } from '../product';
import { RatingChartbusters, RatingChartbustersService } from '../rating';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rating-attr-chartbusters-dialog',
    templateUrl: './rating-attr-chartbusters-dialog.component.html'
})
export class Rating_AttrChartbustersDialogComponent implements OnInit {

    rating_Attr: Rating_AttrChartbusters;
    isSaving: boolean;

    products: ProductChartbusters[];

    ratings: RatingChartbusters[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private rating_AttrService: Rating_AttrChartbustersService,
        private productService: ProductChartbustersService,
        private ratingService: RatingChartbustersService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: ResponseWrapper) => { this.products = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.ratingService.query()
            .subscribe((res: ResponseWrapper) => { this.ratings = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rating_Attr.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rating_AttrService.update(this.rating_Attr));
        } else {
            this.subscribeToSaveResponse(
                this.rating_AttrService.create(this.rating_Attr));
        }
    }

    private subscribeToSaveResponse(result: Observable<Rating_AttrChartbusters>) {
        result.subscribe((res: Rating_AttrChartbusters) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Rating_AttrChartbusters) {
        this.eventManager.broadcast({ name: 'rating_AttrListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: ProductChartbusters) {
        return item.id;
    }

    trackRatingById(index: number, item: RatingChartbusters) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rating-attr-chartbusters-popup',
    template: ''
})
export class Rating_AttrChartbustersPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rating_AttrPopupService: Rating_AttrChartbustersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rating_AttrPopupService
                    .open(Rating_AttrChartbustersDialogComponent as Component, params['id']);
            } else {
                this.rating_AttrPopupService
                    .open(Rating_AttrChartbustersDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
