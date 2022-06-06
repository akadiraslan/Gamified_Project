
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TypeId } from 'app/@core/data/selectBoxes';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';
import { ChoiceComponent } from './choice/choice.component';
import { Subscription, timer } from 'rxjs';
import { SelectionComponent } from './selection/selection.component';
import { environment } from 'environments/environment';
import { NAME } from 'app/@core/data/data';
import {
  bounceInAnimation,
  bounceInDownAnimation,
  bounceInLeftAnimation, bounceInRightAnimation, bounceInUpAnimation, bounceInUpOnEnterAnimation,
  fadeInLeftAnimation,
  fadeInRightAnimation,
  fadeInUpAnimation,
  flipAnimation, flipInXAnimation, flipInYAnimation, rotateAnimation, rotateInAnimation,
  rotateOutAnimation, tadaAnimation, zoomInAnimation, zoomInDownAnimation
} from 'angular-animations';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { GameService } from 'app/@core/mock/common/game.service';
import { StorageService } from 'app/services/storage.service';
import { LocalDataSource } from 'ng2-smart-table';
import { DialogMessageComponent } from 'app/@components/dialog-message/dialog-message.component';
import { NbDialogService } from '@nebular/theme';
import { MessageService } from 'app/@core/mock/common/message.service';
import { BaseComponent } from 'app/@components/base/base.component';
import { F } from '@angular/cdk/keycodes';
@Component({
  selector: 'test-game-wheel',
  styleUrls: ['./test-game-wheel.component.scss'],
  templateUrl: './test-game-wheel.component.html',
  animations: [
    flipAnimation({ duration: 1000 }),
    flipInYAnimation(),
    bounceInAnimation(),
    bounceInUpOnEnterAnimation({ anchor: 'enter1', duration: 1000 }),
    bounceInLeftAnimation(),
    bounceInRightAnimation(),
    zoomInAnimation({ delay: 300, duration: 1000 }),
    fadeInLeftAnimation(),
    fadeInRightAnimation(),
    flipInXAnimation(),
    bounceInUpAnimation(),
    fadeInUpAnimation(),
    bounceInDownAnimation(),
    zoomInDownAnimation(),
    rotateAnimation(),
    rotateInAnimation(),
    tadaAnimation(),
    trigger('openClose', [
      // ...
      state('open', style({})),
      state('closed', style({
        top: '{{previousTop}}',
        right: '{{previousRight}}',
        left: '{{previousLeft}}',
      }),
        { params: { previousTop: '50px', previousRight: '50px', previousDown: '50px', previousLeft: '50px' } }),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class TestGameWheelComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild(NgxWheelComponent, { static: false }) wheel;
  @ViewChild(ChoiceComponent) childChoice: any;
  @ViewChild(SelectionComponent) childSelect: any;

  gameData = [];
  catIndex: any;
  items: any[];
  seed = [];
  questionIndex: any;
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL;
  textAlignment: TextAlignment = TextAlignment.OUTER;
  questionType = TypeId;
  allCat = [];
  caseQuestion: any;
  categoryIndex: any;
  case = 'games';
  questionOption: any;
  isLeaderBoard = false;
  showUserAnswer = false;
  playability: any;
  passWrongAnswer = false;
  isJoker = false;
  isGifts = false;
  showCorrectAnswer = false;
  correctAnswer: any;
  isCorrectAnswer = false;
  child: any;
  score: number = 0;
  baseUrl = environment.baseUrl + '/';
  imageDirectory: any;
  sumQuestion: number;
  time = 0;
  countUp: Subscription;
  countDown: Subscription;
  counter: number;
  nextDisabled = true;
  content: any;
  againPlay = false;
  isGift = false;
  catName = false;
  isWise = 1;
  isHalf = 0;
  isDoubleAnswer = 0;
  isDeleteOneOption = 0;
  msbapAudioUrl: any[] = [];
  msaapDisplayVolumeControls = true;
  fastGame = false;
  animationState = false;
  opacityDelay = false;
  jokersDisabled = false;
  solvedQuestion = 0;
  totalQuestion = 0;
  testGames: any;
  testGameId: number;
  testName: string;
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
      name: {
        title: 'User name',
        type: 'string',
      },
      email: {
        title: 'User Email',
        type: 'email',
      },
      score: {
        title: 'Score',
        type: 'number',
      },
    },
  };
  audio = new Audio();

  constructor(private gameService: GameService, private storageService: StorageService,
    private dialogService: NbDialogService, private messageService: MessageService) {
    super();
  }

  ngOnInit(): void {
    this.getGames();

  }
  openGame(event) {
    let flag = false;
    this.gameService.getReport(event.id).subscribe((data: any) => {
      data.forEach(dat => {
        if (dat.user_id === this.storageService.getUserId())
          flag = true;
      });
      if (!flag) {
        this.gameService.getTestService(event.id).subscribe((data: any) => {

          this.gameData = data;
          this.testGameId = event.id;
          this.testName = event.name
          this.case = 'main';
          this.setGameSettings();
          this.animate();
        });
      } else {
        this.messageService.sendDialogMessage('sameGame');
        this.dialogService.open(DialogMessageComponent, {
          context: {
            submitMessage: 'Successfull',
          },
        });
      }

    });

  }
  getGames() {
    this.gameService.getAllTestService().subscribe((data: any) => {
      console.log('data');
      this.testGames = data;
      console.log(data);
    });
  }
  animationJokers = false;
  animationCat = false;
  opacityJokerDelay = false;
  opacityCatDelay = false;
  animate(event = null) {
    this.opacityDelay = false;
    this.animationState = false;

    if (event === 'jokers') {
      this.animationJokers = false;
      this.opacityJokerDelay = false;
    } else if (event === 'category') {
      this.animationCat = false;
      this.opacityCatDelay = false;
    }
    setTimeout(() => {

      if (event === 'jokers') {
        this.animationJokers = !this.animationJokers;
        this.opacityJokerDelay = true;
      } else if (event === 'category') {
        this.animationCat = !this.animationCat;
        this.opacityCatDelay = true;
      } else {

        this.animationState = !this.animationState;

        // this.getPoints();
      }
      this.opacityDelay = true;
    }, 1);
  }

  setGameSettings() {
    this.isLeaderBoard = false;
    this.showUserAnswer = true;
    this.passWrongAnswer = true;
    this.showCorrectAnswer = true; this.isJoker = true;
    this.sumQuestion = this.gameData['questions'].length;
    this.totalQuestion = this.gameData['questions'].length;
    for (let i = 0; i < this.gameData['questions'].length; i++) {
      if (this.gameData['questions'][i].question_type === this.questionType.open_type) {
        this.sumQuestion--;
      }
    }
    this.counter = null; this.isJoker = true;
    this.againPlay = false;
    this.isGift = true;

  }
  newCatColor = ["#00FF80", "#00FFFF", "#0080FF", "#00FF80", "#00FFFF", "#0080FF", "#00FF80", "#00FFFF", "#0080FF"];
  newCatName = [];
  setWheel() {
    this.gameData['questions'].forEach((themeData1, index) => {
      let flag = 0;
      this.newCatName.every((themeData2, index) => {
        if (themeData1.category.name === themeData2) {
          flag = 1;
          return false;
        } else {
          flag = 0;
          return true;
        }
      });
      if (flag === 0) {
        this.newCatName.push(themeData1.category.name);
      }
    });
    this.allCat = [];
    this.newCatName.forEach((data, index) => {
      const cat = [];
      cat[NAME] = data.toLowerCase();
      cat['color'] = this.newCatColor[index];
      this.allCat.push(cat);
      this.seed[index] = index;
    });

    this.gameData['questions'].forEach(question => {
      for (let i = 0; i < this.allCat.length; i++) {
        if (this.allCat[i][NAME] === question.category.name.toLowerCase()) {
          this.allCat[i].push(question);
          break;
        }
      }
    });

    for (let i = 0; i < this.allCat.length; i++) {
      this.allCat[i] = this.shuffle(this.allCat[i]);
      this.allCat[i].option ? this.shuffle(this.allCat[i].option) : this.allCat[i].option;
    }

    this.catIndex = this.seed[Math.floor(Math.random() * this.seed.length)];
    this.items = this.seed.map((value) => ({
      fillStyle: this.allCat[value].color,
      text: this.allCat[value].name,
      id: value,
      textFillStyle: 'white',
      textFontSize: '16'
    }));
  }
  repotData = [];
  source: LocalDataSource = new LocalDataSource();
  userName: any;
  eventMain($event) {
    switch ($event) {
      case 'showLeaderBoard':
        this.case = 'showLeaderBoard';
        this.repotData = [];
        this.spinnerShow();
        this.gameService.getReport(this.testGameId).subscribe((data: any) => {
          console.log('data');
          console.log(data);
          data.forEach((dat, index) => {
            this.gameService.getUserName(dat.user_id).subscribe((userNam: any) => {
              this.userName = userNam.name;
              this.repotData.push({
                name: userNam.name, score: dat.score, email: userNam.email
              });
            });
          });
        });
        setTimeout(() => {
          this.source.load(this.repotData);
          this.spinnerHide();

        }, 1000);
        break;
      case 'playGame':
        this.case = 'wheel';
        this.audio.src = 'assets/audio/music.mp3';
        this.audio.play();
        this.animate();
        this.countUp = timer(2000, 1000).subscribe(t => {
          this.time = t;
        });
        if (this.counter) {
          this.countDown = timer(2000, 1000).subscribe(t => {
            --this.counter;
            if (this.counter === 0) {
              this.case = 'report';
              this.score = Number(this.score.toFixed(2));
              this.countUp.unsubscribe();
              this.countDown = null;

            }
          });
        }
        this.setWheel();
        break;
      case 'showGifts':
        this.case = 'showGifts';
        this.isGifts = true;
        break;
      default:
        break;
    }
  }

  goBackLeader() {
    this.ngOnDestroy();
  }
  stopMusic() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  spinWheel() {
    this.catIndex === 'completed' ? console.log('All categories completed') : this.wheel.spin();
  }


  before() {
  }

  after() {
    this.catName = true;
    this.animate('category');
    this.questionIndex = 0;
    this.showQuestion(this.catIndex, 0);
    this.seed[this.catIndex] = 'completed';
    this.categoryIndex = this.catIndex;
    this.catIndex = this.seed[Math.floor(Math.random() * this.seed.length)];
    for (let i = 0; i < this.seed.length; i++) {
      if (this.catIndex === 'completed') {
        this.catIndex = this.seed[i];
      } else {
        break;
      }
    }
    setTimeout(() => {
      this.catName = false;

      this.case = 'questions';
      this.animate('jokers');
    }, 2000);
  }

  setJokers(event: any) {

    if (this.score >= 25 && this.isHalf === 0) {
      this.isHalf = 1;
    } else if (this.score >= 50 && this.isDoubleAnswer === 0) {
      this.isDoubleAnswer = 1;
    } else if (this.score >= 75 && this.isDeleteOneOption === 0) {
      this.isDeleteOneOption = 1;
    }


  }

  showQuestion(catIndex, questionIndex) {
    this.solvedQuestion++;
    this.nextDisabled = true;
    this.questionOption = this.allCat[catIndex][questionIndex];
    this.setJokers('default');
    this.caseQuestion = this.questionType.multiple_choice;
  }

  nextStep() {
    this.isCorrectAnswer = false;
    if (this.childChoice) {
      this.child = this.childChoice;
    } else if (this.childSelect) {
      this.child = this.childSelect;
    } else if (!this.child) {
      this.content = null;
      this.isCorrectAnswer = false;
      this.questionIndex++;
      if (this.allCat[this.categoryIndex][this.questionIndex]) {
        this.showQuestion(this.categoryIndex, this.questionIndex);
      } else if (!this.allCat[this.categoryIndex][this.questionIndex] && this.catIndex !== 'completed') {
        this.case = 'wheel';
        this.animate();
      } else if (!this.allCat[this.categoryIndex][this.questionIndex] && this.catIndex === 'completed') {
        this.countUp.unsubscribe();
        this.countDown = null;
        this.case = 'report';
        this.score = Number(this.score.toFixed(2));
        const sendData = {
          user_id: this.storageService.getUserId(),
          test_id: this.testGameId,
          test_name: this.testName,
          score: this.score,
        }
        this.gameService.setScore(sendData).subscribe((data: any) => {
          console.log('setted');

        });
      }
    } if (this.child) {
      this.showCorrectAnswer ? this.isCorrectAnswer = true : this.isCorrectAnswer = false;
      this.isCorrectAnswer ? this.animate() : null;
      this.answer(this.passWrongAnswer);
    }
  }

  answer(passWrongAnswer: any) {
    if (this.caseQuestion === this.questionType.multiple_choice) {
      for (let i = 0; i < this.child.disabled.length; i++) {
        this.child.disabled[i] = true;
      }
      this.imageDirectory = this.child['questionOption']['option'].find(x => x.id
        === this.child['questionOption']['correct'].correct)?.media?.directory;

      if (this.child.option === this.child['questionOption']['correct'].correct) {
        this.correctAnswer = 'True Answer';
        this.score += (1 / this.sumQuestion) * 100;
        this.score = Number(this.score.toFixed(2));
        this.imageDirectory = false;
        this.childChoice?.animate('trueAnswer');
      } else if (this.imageDirectory && this.child.option !== this.child['questionOption']['correct'].correct) {
        this.correctAnswer = 'Wrong! True Answer : ';
        this.childChoice.animate('shake', this.child['questionOption']['correct'].correct);
      } else {
        this.correctAnswer = 'Wrong! True Answer : ' +
          this.child['questionOption']['option'].find(x => x.id
            === this.child['questionOption']['correct'].correct).name;
        this.childChoice.animate('shake', this.child['questionOption']['correct'].correct);
      }
    }
    this.nextDisabled = true;
    if (this.isDoubleAnswer !== 2 || this.correctAnswer === 'True Answer') {
      if (this.passWrongAnswer && this.showCorrectAnswer) {
        setTimeout(() => {
          this.nextDisabled = false;
          this.isCorrectAnswer = false;
          this.questionIndex++;
          this.imageDirectory = null;
          if (this.caseQuestion === this.questionType.multiple_choice) {
            this.childChoice.selectedOption = null;
            this.childChoice.option = null;
          }
          for (let i = 0; i < this.child?.disabled?.length; i++) {
            this.child.disabled[i] = false;
            this.child.animationShake[i] = false;
            this.child.trueState[i] = false;
          }
          this.child = null;
          if (this.allCat[this.categoryIndex][this.questionIndex]) {
            this.showQuestion(this.categoryIndex, this.questionIndex);
          } else if (!this.allCat[this.categoryIndex][this.questionIndex] && this.catIndex !== 'completed') {
            this.case = 'wheel';
            this.animate();
          } else if (!this.allCat[this.categoryIndex][this.questionIndex] && this.catIndex === 'completed') {
            this.countUp.unsubscribe();
            this.countDown = null;
            this.case = 'report';

            this.score = Number(this.score.toFixed(2));
            const sendData = {
              user_id: this.storageService.getUserId(),
              test_id: this.testGameId,
              test_name: this.testName,
              score: this.score,
            }
            this.gameService.setScore(sendData).subscribe((data: any) => {
              console.log('setted');

            });
          }

        }, 4000);
      } else if (this.passWrongAnswer && !this.showCorrectAnswer) {
        this.nextDisabled = false;
        this.isCorrectAnswer = false;
        this.questionIndex++;
        this.imageDirectory = null;
        if (this.caseQuestion === this.questionType.multiple_choice) {
          this.childChoice.selectedOption = null;
          this.childChoice.option = null;
        }
        if (this.allCat[this.categoryIndex][this.questionIndex]) {
          this.showQuestion(this.categoryIndex, this.questionIndex);
        } else if (!this.allCat[this.categoryIndex][this.questionIndex] && this.catIndex !== 'completed') {
          this.case = 'wheel';
          this.animate();
        } else if (!this.allCat[this.categoryIndex][this.questionIndex] && this.catIndex === 'completed') {
          this.countUp.unsubscribe();
          this.countDown = null;
          this.case = 'report';
          this.score = Number(this.score.toFixed(2));
          const sendData = {
            user_id: this.storageService.getUserId(),
            test_id: this.testGameId,
            test_name: this.testName,
            score: this.score,
          }
          this.gameService.setScore(sendData).subscribe((data: any) => {
            console.log('setted');

          });
        }
        for (let i = 0; i < this.child?.disabled?.length; i++) {
          this.child.disabled[i] = false;
        }
        this.child = null;
      }
    } else {
      this.correctAnswer = 'Wrong Answer choose new Option';
      for (let i = 0; i < this.child?.disabled?.length; i++) {
        this.child.disabled[i] = false;
      }
      this.nextDisabled = false;
      this.imageDirectory = null;
      this.isDoubleAnswer = 3;
      setTimeout(() => {
        this.isCorrectAnswer = false;

      }, 2000);
    }
    this.isDoubleAnswer === 2 ? this.isDoubleAnswer = 3 : null;
  }

  goBack() {
    this.case = 'main';
  }

  reset() {
    this.wheel.reset();
  }

  controlOption($event) {
    this.nextDisabled = false;

  }

  clearOption() {
    if (this.childChoice) {
      this.childChoice.option = null;
    } else if (this.childSelect) {
      this.childSelect.selectedOption = [];
      this.childSelect.option = [];
    }
  }

  wise() {
    this.clearOption();
    this.isWise = 2;
    this.childChoice.option = null;
    this.childChoice.option = this.questionOption['correct'].correct;

    this.nextStep();
  }

  halfAndHalf() {
    this.clearOption();
    this.isHalf = 2;
    let controlSplice = 0;
    this.questionOption.option.every((option, index) => {
      if (this.questionOption.option.length <= 3 && option.id !== this.questionOption.correct.correct) {
        this.questionOption.option.splice(index, 1);
        controlSplice = 1;
        this.isHalf = 2;
        return false;
      } else if (this.questionOption.option.length > 3 && option.id !== this.questionOption.correct.correct
        && controlSplice < 2) {
        this.questionOption.option.splice(index, 1);
        controlSplice++;
        if (controlSplice === 2) {
          this.isHalf = 2;
          return false;
        }
        return true;
      }
    });

  }

  deleteOneOption() {
    this.clearOption();
    switch (this.caseQuestion) {
      case this.questionType.multiple_choice:
        this.questionOption.option.every((option, index) => {
          if (this.questionOption.option.length > 2 && option.id !== this.questionOption.correct.correct) {
            this.questionOption.option.splice(index, 1);
            this.isDeleteOneOption = 2;
            return false;
          } else {
            this.isDeleteOneOption = 1;
            return true;
          }
        });
        break;
    }
  }

  doubleAnswer() {
    this.isDoubleAnswer = 2;
  }

  getBaseUrl() {
    let baseUrl;
    if (environment.production) {
      baseUrl = environment.mainUrl;
    } else {
      baseUrl = '';
    }
    return baseUrl;
  }
  ngOnDestroy() {
    this.audio.pause();
  }
}
