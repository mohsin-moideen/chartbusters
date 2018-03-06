import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Rating_AttrChartbusters } from './rating-attr-chartbusters.model';
import { Rating_AttrChartbustersPopupService } from './rating-attr-chartbusters-popup.service';
import { Rating_AttrChartbustersService } from './rating-attr-chartbusters.service';

@Component({
    selector: 'jhi-rating-attr-chartbusters-delete-dialog',
    templateUrl: './rating-attr-chartbusters-delete-dialog.component.html'
})
export class Rating_AttrChartbustersDeleteDialogComponent {

    rating_Attr: Rating_AttrChartbusters;

    constructor(
        private rating_AttrService: Rating_AttrChartbustersService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rating_AttrService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rating_AttrListModification',
                content: 'Deleted an rating_Attr'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rating-attr-chartbusters-delete-popup',
    template: ''
})
export class Rating_AttrChartbustersDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rating_AttrPopupService: Rating_AttrChartbustersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rating_AttrPopupService
                .open(Rating_AttrChartbustersDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
