import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../../@components/base/base.component';
import { GameService } from '../../../@core/mock/common/game.service';
import { ADMIN, DEMO, DEMO_GAME_COUNT, ERROR, INFO, SCORM_PACKAGE_VERSION, USER } from '../../../@core/data/data';
import { ActivatedRoute, Params } from '@angular/router';
import { Shorting } from '../../../@core/model/shorting';
import { Shortings } from '../../../@core/data/selectBoxes';
import { MessageService } from '../../../@core/mock/common/message.service';

@Component({
    selector: 'game-dashboard',
    styleUrls: ['./game-dashboard.component.scss'],
    templateUrl: './game-dashboard.component.html',
})

export class GameDashboardComponent extends BaseComponent implements OnInit, OnDestroy {
    shortings: Shorting[] = Shortings;
    isMenu = [];

    items = [
        { title: 'Clone' },
        { title: 'Test Game' },
        { title: 'About Game' },
        { title: 'Remove' },

    ];
    games: any[] = [];
    currentPage = 11;
    totalItems: number;
    limit: number = 11;
    selectedGame: any;
    test: any;
    scormVersion = [{ title: SCORM_PACKAGE_VERSION.v_12 }, { title: SCORM_PACKAGE_VERSION.v_2004 }];
    version: any;
    role = {
        ROLE_USER: USER,
        ROLE_DEMO: DEMO,
        ROLE_ADMIN: ADMIN,
    };
    totalGame: number = 0;

    constructor(private gameService: GameService,
        private messageService: MessageService,
        private route: ActivatedRoute) {
        super();

    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
    }

    contextMenu() {

    }



    sortBy(sortBy: string) {
        if (sortBy === 'short-az') {
            this.games.sort((a, b) => a.name.toLowerCase().localeCompare(b.name));
        } else {
            this.games.sort((a, b) => b.name.toLowerCase().localeCompare(a.name));
        }

    }

    pageChange(newPage: number) {
        this.router.navigate([], {
            queryParams: {
                page: newPage,
            },
            queryParamsHandling: 'merge',
        });
    }

    changeOrganisation($event: any) {
        this.messageService.organisationId = $event;
    }

}
