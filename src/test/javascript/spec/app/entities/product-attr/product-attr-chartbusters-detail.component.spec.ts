/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ChartbustersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { Product_AttrChartbustersDetailComponent } from '../../../../../../main/webapp/app/entities/product-attr/product-attr-chartbusters-detail.component';
import { Product_AttrChartbustersService } from '../../../../../../main/webapp/app/entities/product-attr/product-attr-chartbusters.service';
import { Product_AttrChartbusters } from '../../../../../../main/webapp/app/entities/product-attr/product-attr-chartbusters.model';

describe('Component Tests', () => {

    describe('Product_AttrChartbusters Management Detail Component', () => {
        let comp: Product_AttrChartbustersDetailComponent;
        let fixture: ComponentFixture<Product_AttrChartbustersDetailComponent>;
        let service: Product_AttrChartbustersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChartbustersTestModule],
                declarations: [Product_AttrChartbustersDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    Product_AttrChartbustersService,
                    JhiEventManager
                ]
            }).overrideTemplate(Product_AttrChartbustersDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Product_AttrChartbustersDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Product_AttrChartbustersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Product_AttrChartbusters(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.product_Attr).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
