import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ReviewChartbusters } from './review-chartbusters.model';
import { ReviewChartbustersService } from './review-chartbusters.service';

@Injectable()
export class ReviewChartbustersPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private reviewService: ReviewChartbustersService

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
                this.reviewService.find(id).subscribe((review) => {
                    review.datePublished = this.datePipe
                        .transform(review.datePublished, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.reviewModalRef(component, review);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.reviewModalRef(component, new ReviewChartbusters());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    reviewModalRef(component: Component, review: ReviewChartbusters): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.review = review;
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
