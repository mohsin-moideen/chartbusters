/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ChartbustersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CategoryChartbustersDetailComponent } from '../../../../../../main/webapp/app/entities/category/category-chartbusters-detail.component';
import { CategoryChartbustersService } from '../../../../../../main/webapp/app/entities/category/category-chartbusters.service';
import { CategoryChartbusters } from '../../../../../../main/webapp/app/entities/category/category-chartbusters.model';

describe('Component Tests', () => {

    describe('CategoryChartbusters Management Detail Component', () => {
        let comp: CategoryChartbustersDetailComponent;
        let fixture: ComponentFixture<CategoryChartbustersDetailComponent>;
        let service: CategoryChartbustersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChartbustersTestModule],
                declarations: [CategoryChartbustersDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CategoryChartbustersService,
                    JhiEventManager
                ]
            }).overrideTemplate(CategoryChartbustersDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryChartbustersDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryChartbustersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CategoryChartbusters(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.category).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
