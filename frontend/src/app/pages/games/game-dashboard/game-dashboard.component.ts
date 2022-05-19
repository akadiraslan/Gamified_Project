import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../../@components/base/base.component';
import { GameService } from '../../../@core/mock/common/game.service';
import { ADMIN, DEMO, DEMO_GAME_COUNT, ERROR, INFO, SCORM_PACKAGE_VERSION, USER } from '../../../@core/data/data';
import { ActivatedRoute, Params } from '@angular/router';
import { Shorting } from '../../../@core/model/shorting';
import { Shortings } from '../../../@core/data/selectBoxes';
import { NbDialogService, NbMenuService, NbWindowService } from '@nebular/theme';
import { filter, map, take } from 'rxjs/operators';
import { TestGameWheelComponent } from './test-game-wheel/test-game-wheel.component';
import { MessageService } from '../../../@core/mock/common/message.service';
import { Organisation } from '../../../@core/model/account';
import { DialogMessageComponent } from 'app/@components/dialog-message/dialog-message.component';

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
        private nbMenuService: NbMenuService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private windowService: NbWindowService, private dialogService: NbDialogService) {
        super();

    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
    }

    contextMenu() {

    }
    testGame(selectedGame: any) {
        if (selectedGame.id) {
            this.spinnerShow();
            this.gameService.getGame(selectedGame.id).subscribe((data: any) => {
                this.spinnerHide();
                if (data.success) {
                    this.windowService.open(TestGameWheelComponent, {
                        context: {
                            title: `Test Game Wheel`,
                            gameData: data
                        },
                    });
                } else {
                    this.showMessage(
                        this.translate('title.Game'),
                        this.translate('games.no_game_error'),
                        ERROR
                    );
                }

            },
                error => {
                    this.spinnerHide();
                    this.showMessage(
                        this.translate('title.Game'),
                        this.translate(error.error.message),
                        ERROR
                    );
                }
            );
        }
    }



    getGames(pageNumber, organisationId: number = null) {
        this.spinnerShow();
        this.route.queryParams.subscribe((params: Params) => {
            typeof params.page === 'undefined' ? pageNumber = 1 : pageNumber = params.page;
            this.gameService.getGames(pageNumber, this.limit, organisationId).subscribe((data: any) => {
                this.spinnerHide();
                if (data.success) {
                    this.games = data.data.games;
                    this.currentPage = data.data.paginator.current_page;
                    this.totalItems = data.data.paginator.total_pages;
                    this.messageService.sendTotalGameNumber(this.games.length);
                } else {
                    this.showMessage(
                        this.translate('title.Game'),
                        this.translate(data.message),
                        ERROR
                    );
                }
            },
                error => {
                    this.spinnerHide();
                    this.showMessage(
                        this.translate('title.Game'),
                        this.translate(error.error.message),
                        ERROR
                    );
                });
        });
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
        this.getGames(1, $event);
        this.messageService.organisationId = $event;
    }

}
