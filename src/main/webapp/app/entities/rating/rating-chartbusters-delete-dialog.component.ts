import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RatingChartbusters } from './rating-chartbusters.model';
import { RatingChartbustersPopupService } from './rating-chartbusters-popup.service';
import { RatingChartbustersService } from './rating-chartbusters.service';

@Component({
    selector: 'jhi-rating-chartbusters-delete-dialog',
    templateUrl: './rating-chartbusters-delete-dialog.component.html'
})
export class RatingChartbustersDeleteDialogComponent {

    rating: RatingChartbusters;

    constructor(
        private ratingService: RatingChartbustersService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ratingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ratingListModification',
                content: 'Deleted an rating'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rating-chartbusters-delete-popup',
    template: ''
})
export class RatingChartbustersDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ratingPopupService: RatingChartbustersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ratingPopupService
                .open(RatingChartbustersDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
