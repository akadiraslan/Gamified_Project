import { Component, Input, OnInit } from '@angular/core';
import { bounceInAnimation, flipAnimation, tadaAnimation } from 'angular-animations';
import { BaseComponent } from 'app/@components/base/base.component';
import { GameService } from 'app/@core/mock/common/game.service';
import { environment } from 'environments/environment';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
    selector: 'test-gifts',
    templateUrl: './gifts.component.html',
    styleUrls: ['./gifts.component.scss'],
    animations: [
        bounceInAnimation(),
        flipAnimation(),
        tadaAnimation(),
    ],
})
export class GiftsComponent extends BaseComponent implements OnInit {

    @Input() gameData: any;
    baseUrl = environment.baseUrl + '/';
    imageDirectory: any;
    giftIndex = 0;
    giftItems: any;
    animationState = false;
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
    constructor(private gameService: GameService) {
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


}
