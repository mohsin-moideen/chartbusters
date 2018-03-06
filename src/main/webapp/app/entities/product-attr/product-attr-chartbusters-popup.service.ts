import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Product_AttrChartbusters } from './product-attr-chartbusters.model';
import { Product_AttrChartbustersService } from './product-attr-chartbusters.service';

@Injectable()
export class Product_AttrChartbustersPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private product_AttrService: Product_AttrChartbustersService

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
                this.product_AttrService.find(id).subscribe((product_Attr) => {
                    this.ngbModalRef = this.product_AttrModalRef(component, product_Attr);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.product_AttrModalRef(component, new Product_AttrChartbusters());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    product_AttrModalRef(component: Component, product_Attr: Product_AttrChartbusters): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.product_Attr = product_Attr;
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
