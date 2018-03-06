import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ObjectiveChartbusters } from './objective-chartbusters.model';
import { ObjectiveChartbustersPopupService } from './objective-chartbusters-popup.service';
import { ObjectiveChartbustersService } from './objective-chartbusters.service';

@Component({
    selector: 'jhi-objective-chartbusters-delete-dialog',
    templateUrl: './objective-chartbusters-delete-dialog.component.html'
})
export class ObjectiveChartbustersDeleteDialogComponent {

    objective: ObjectiveChartbusters;

    constructor(
        private objectiveService: ObjectiveChartbustersService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.objectiveService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'objectiveListModification',
                content: 'Deleted an objective'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-objective-chartbusters-delete-popup',
    template: ''
})
export class ObjectiveChartbustersDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private objectivePopupService: ObjectiveChartbustersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.objectivePopupService
                .open(ObjectiveChartbustersDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
