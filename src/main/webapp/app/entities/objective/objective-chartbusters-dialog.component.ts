import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ObjectiveChartbusters } from './objective-chartbusters.model';
import { ObjectiveChartbustersPopupService } from './objective-chartbusters-popup.service';
import { ObjectiveChartbustersService } from './objective-chartbusters.service';

@Component({
    selector: 'jhi-objective-chartbusters-dialog',
    templateUrl: './objective-chartbusters-dialog.component.html'
})
export class ObjectiveChartbustersDialogComponent implements OnInit {

    objective: ObjectiveChartbusters;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private objectiveService: ObjectiveChartbustersService,
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
        if (this.objective.id !== undefined) {
            this.subscribeToSaveResponse(
                this.objectiveService.update(this.objective));
        } else {
            this.subscribeToSaveResponse(
                this.objectiveService.create(this.objective));
        }
    }

    private subscribeToSaveResponse(result: Observable<ObjectiveChartbusters>) {
        result.subscribe((res: ObjectiveChartbusters) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ObjectiveChartbusters) {
        this.eventManager.broadcast({ name: 'objectiveListModification', content: 'OK'});
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
    selector: 'jhi-objective-chartbusters-popup',
    template: ''
})
export class ObjectiveChartbustersPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private objectivePopupService: ObjectiveChartbustersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.objectivePopupService
                    .open(ObjectiveChartbustersDialogComponent as Component, params['id']);
            } else {
                this.objectivePopupService
                    .open(ObjectiveChartbustersDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
