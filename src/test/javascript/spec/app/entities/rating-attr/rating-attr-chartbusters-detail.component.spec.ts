/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ChartbustersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { Rating_AttrChartbustersDetailComponent } from '../../../../../../main/webapp/app/entities/rating-attr/rating-attr-chartbusters-detail.component';
import { Rating_AttrChartbustersService } from '../../../../../../main/webapp/app/entities/rating-attr/rating-attr-chartbusters.service';
import { Rating_AttrChartbusters } from '../../../../../../main/webapp/app/entities/rating-attr/rating-attr-chartbusters.model';

describe('Component Tests', () => {

    describe('Rating_AttrChartbusters Management Detail Component', () => {
        let comp: Rating_AttrChartbustersDetailComponent;
        let fixture: ComponentFixture<Rating_AttrChartbustersDetailComponent>;
        let service: Rating_AttrChartbustersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChartbustersTestModule],
                declarations: [Rating_AttrChartbustersDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    Rating_AttrChartbustersService,
                    JhiEventManager
                ]
            }).overrideTemplate(Rating_AttrChartbustersDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Rating_AttrChartbustersDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Rating_AttrChartbustersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Rating_AttrChartbusters(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.rating_Attr).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
