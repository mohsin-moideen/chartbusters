/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ChartbustersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProductChartbustersDetailComponent } from '../../../../../../main/webapp/app/entities/product/product-chartbusters-detail.component';
import { ProductChartbustersService } from '../../../../../../main/webapp/app/entities/product/product-chartbusters.service';
import { ProductChartbusters } from '../../../../../../main/webapp/app/entities/product/product-chartbusters.model';

describe('Component Tests', () => {

    describe('ProductChartbusters Management Detail Component', () => {
        let comp: ProductChartbustersDetailComponent;
        let fixture: ComponentFixture<ProductChartbustersDetailComponent>;
        let service: ProductChartbustersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChartbustersTestModule],
                declarations: [ProductChartbustersDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProductChartbustersService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProductChartbustersDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductChartbustersDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductChartbustersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProductChartbusters(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.product).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
