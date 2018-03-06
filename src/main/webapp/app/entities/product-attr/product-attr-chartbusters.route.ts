import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { Product_AttrChartbustersComponent } from './product-attr-chartbusters.component';
import { Product_AttrChartbustersDetailComponent } from './product-attr-chartbusters-detail.component';
import { Product_AttrChartbustersPopupComponent } from './product-attr-chartbusters-dialog.component';
import { Product_AttrChartbustersDeletePopupComponent } from './product-attr-chartbusters-delete-dialog.component';

export const product_AttrRoute: Routes = [
    {
        path: 'product-attr-chartbusters',
        component: Product_AttrChartbustersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Product_Attrs'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-attr-chartbusters/:id',
        component: Product_AttrChartbustersDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Product_Attrs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const product_AttrPopupRoute: Routes = [
    {
        path: 'product-attr-chartbusters-new',
        component: Product_AttrChartbustersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Product_Attrs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-attr-chartbusters/:id/edit',
        component: Product_AttrChartbustersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Product_Attrs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-attr-chartbusters/:id/delete',
        component: Product_AttrChartbustersDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Product_Attrs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
