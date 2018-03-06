import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReviewChartbusters } from './review-chartbusters.model';
import { ReviewChartbustersPopupService } from './review-chartbusters-popup.service';
import { ReviewChartbustersService } from './review-chartbusters.service';

@Component({
    selector: 'jhi-review-chartbusters-delete-dialog',
    templateUrl: './review-chartbusters-delete-dialog.component.html'
})
export class ReviewChartbustersDeleteDialogComponent {

    review: ReviewChartbusters;

    constructor(
        private reviewService: ReviewChartbustersService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reviewService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'reviewListModification',
                content: 'Deleted an review'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-review-chartbusters-delete-popup',
    template: ''
})
export class ReviewChartbustersDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reviewPopupService: ReviewChartbustersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.reviewPopupService
                .open(ReviewChartbustersDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
