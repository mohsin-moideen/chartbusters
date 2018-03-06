import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CategoryChartbustersComponent } from './category-chartbusters.component';
import { CategoryChartbustersDetailComponent } from './category-chartbusters-detail.component';
import { CategoryChartbustersPopupComponent } from './category-chartbusters-dialog.component';
import { CategoryChartbustersDeletePopupComponent } from './category-chartbusters-delete-dialog.component';

export const categoryRoute: Routes = [
    {
        path: 'category-chartbusters',
        component: CategoryChartbustersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'category-chartbusters/:id',
        component: CategoryChartbustersDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoryPopupRoute: Routes = [
    {
        path: 'category-chartbusters-new',
        component: CategoryChartbustersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-chartbusters/:id/edit',
        component: CategoryChartbustersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-chartbusters/:id/delete',
        component: CategoryChartbustersDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
