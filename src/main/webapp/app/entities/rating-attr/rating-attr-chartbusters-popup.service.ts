import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Rating_AttrChartbusters } from './rating-attr-chartbusters.model';
import { Rating_AttrChartbustersService } from './rating-attr-chartbusters.service';

@Injectable()
export class Rating_AttrChartbustersPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private rating_AttrService: Rating_AttrChartbustersService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.rating_AttrService.find(id).subscribe((rating_Attr) => {
                    this.ngbModalRef = this.rating_AttrModalRef(component, rating_Attr);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rating_AttrModalRef(component, new Rating_AttrChartbusters());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rating_AttrModalRef(component: Component, rating_Attr: Rating_AttrChartbusters): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.rating_Attr = rating_Attr;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
