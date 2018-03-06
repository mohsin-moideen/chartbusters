import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserExtraChartbusters } from './user-extra-chartbusters.model';
import { UserExtraChartbustersPopupService } from './user-extra-chartbusters-popup.service';
import { UserExtraChartbustersService } from './user-extra-chartbusters.service';

@Component({
    selector: 'jhi-user-extra-chartbusters-dialog',
    templateUrl: './user-extra-chartbusters-dialog.component.html'
})
export class UserExtraChartbustersDialogComponent implements OnInit {

    userExtra: UserExtraChartbusters;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private userExtraService: UserExtraChartbustersService,
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
        if (this.userExtra.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userExtraService.update(this.userExtra));
        } else {
            this.subscribeToSaveResponse(
                this.userExtraService.create(this.userExtra));
        }
    }

    private subscribeToSaveResponse(result: Observable<UserExtraChartbusters>) {
        result.subscribe((res: UserExtraChartbusters) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: UserExtraChartbusters) {
        this.eventManager.broadcast({ name: 'userExtraListModification', content: 'OK'});
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
    selector: 'jhi-user-extra-chartbusters-popup',
    template: ''
})
export class UserExtraChartbustersPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userExtraPopupService: UserExtraChartbustersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userExtraPopupService
                    .open(UserExtraChartbustersDialogComponent as Component, params['id']);
            } else {
                this.userExtraPopupService
                    .open(UserExtraChartbustersDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
