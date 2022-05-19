
import { Component, EventEmitter, Input, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbMenuService, NbWindowService } from '@nebular/theme';
import { GameService } from 'app/@core/mock/common/game.service';
import { MessageService } from 'app/@core/mock/common/message.service';
import { BaseComponent } from '../base/base.component';
import { TestGameWheelComponent } from 'app/pages/games/game-dashboard/test-game-wheel/test-game-wheel.component';
import { DEMO, DEMO_GAME_COUNT, ERROR, INFO, NAME, SCORM_PACKAGE_VERSION, USER } from 'app/@core/data/data';
import { filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'dialog-message',
  templateUrl: 'dialog-message.component.html',
  styleUrls: ['dialog-message.component.scss'],
})
export class DialogMessageComponent extends BaseComponent implements OnInit {

  names: string[] = [];

  @Input() title: string;
  @Input() stepMessage: string;
  @Input() submittedGame: string;
  case: string;
  controlRm = 0;
  controlNewPage = 0;
  @Input() itemNum: any;
  @Input() submitMessage: any;
  scormVersion = [{ title: SCORM_PACKAGE_VERSION.v_12 }, { title: SCORM_PACKAGE_VERSION.v_2004 }];
  version: any;

  constructor(private fb: FormBuilder, protected ref: NbDialogRef<DialogMessageComponent>,
    private messageService: MessageService, private gameService: GameService, private windowService: NbWindowService,
    private nbMenuService: NbMenuService) {
    super();
  }

  ngOnInit() {
    this.messageService.statusDialog.subscribe(message => {
      this.case = message;
    });
  }

  removeFile() {
    this.controlRm = 1;
    this.ref.close(this.controlRm);
  }

  newPage() {
    this.ref.close(this.controlNewPage);
    this.controlNewPage = 1;

  }

  testGame() {
    this.spinnerShow();
    this.gameService.getGame(this.submittedGame['data'].game).subscribe((data: any) => {
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

  dismiss() {
    this.controlRm = 0;
    this.ref.close(this.controlRm);
  }

  downloadScorm() {
    this.version = this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'scorm-context-menu'),
        map(({ item: { title } }) => title),
        take(1))
      .subscribe(title => {
        this.getScormPackage(this.submittedGame['data'].game, title);
      });
  }

  getScormPackage(gameId: number, version: string) {
    this.spinnerShow();
    this.gameService.getScormPackage(gameId, version).subscribe((data: any) => {
      this.version.unsubscribe();
      this.spinnerHide();
      if (data.success) {
        window.location.href = data.data;
      } else {
        this.showMessage(
          this.translate('title.Game'),
          this.translate(data.message),
          ERROR
        );
      }
    },
      error => {
        this.version.unsubscribe();
        this.spinnerHide();
        this.showMessage(
          this.translate('title.Game'),
          this.translate(error.error.message),
          ERROR
        );
      });
  }

  editGame() {
    this.ref.close();
    this.router.navigate(['/games/edit/' + this.submittedGame['data'].game]);
    this.messageService.selectStep(NAME);
  }

  upgrade() {
    this.ref.close();
    this.router.navigateByUrl('/account/plans-billing');
  }
}
