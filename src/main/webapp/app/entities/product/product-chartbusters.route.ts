import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProductChartbustersComponent } from './product-chartbusters.component';
import { ProductChartbustersDetailComponent } from './product-chartbusters-detail.component';
import { ProductChartbustersPopupComponent } from './product-chartbusters-dialog.component';
import { ProductChartbustersDeletePopupComponent } from './product-chartbusters-delete-dialog.component';

export const productRoute: Routes = [
    {
        path: 'product-chartbusters',
        component: ProductChartbustersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Products'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-chartbusters/:id',
        component: ProductChartbustersDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Products'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productPopupRoute: Routes = [
    {
        path: 'product-chartbusters-new',
        component: ProductChartbustersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Products'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-chartbusters/:id/edit',
        component: ProductChartbustersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Products'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-chartbusters/:id/delete',
        component: ProductChartbustersDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Products'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
