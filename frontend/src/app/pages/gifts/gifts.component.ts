import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { ReportService } from 'app/@core/mock/common/report.service';
import { BaseComponent } from '../../@components/base/base.component';
import { ChartTypes, DataTypes } from 'app/@core/data/chart';
import { Types } from 'app/@core/model/report';
import { MessageService } from 'app/@core/mock/common/message.service';
import { GameService } from 'app/@core/mock/common/game.service';
import { ApiService } from 'app/@core/mock/common/api.service';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
    selector: 'gifts',
    templateUrl: './gifts.component.html',
    styleUrls: ['./gifts.component.scss']
})
export class GiftsComponent extends BaseComponent implements OnInit, OnDestroy {
    data: any;
    options: any;
    themeSubscription: any;
    organisationId: any;
    games = [];
    charts: Types[] = ChartTypes;
    totalQuestion = [];
    totalCorrect = [];
    totalWrong = [];
    case = 'barChart';

    dataTypes = DataTypes;
    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            order: {
                title: 'Order',
                type: 'number',
            },
            name: {
                title: 'Gift Name',
                type: 'string',
            }
        },
    };
    gifts = [];
    source: LocalDataSource = new LocalDataSource();

    constructor(private theme: NbThemeService, private reportService: ReportService,
        private messageService: MessageService, private gameService: GameService,
        private apiService: ApiService) {
        super();
    }

    ngOnInit(): void {
        this.spinnerShow();
        this.gameService.getGifts().subscribe((data: any) => {

            this.gifts = data[0].gifts;
            this.getGifts();
        });
    }

    getGifts() {

        const tableData = [];
        console.log('data');
        this.gifts.forEach((dat, index) => {
            tableData.push({
                order: index + 1, name: dat.gift
            })
        });
        setTimeout(() => {
            this.source.load(tableData);
            this.spinnerHide();
        }, 1000);
    }


    ngOnDestroy(): void {
        this.themeSubscription ? this.themeSubscription.unsubscribe() : null;
    }

}
