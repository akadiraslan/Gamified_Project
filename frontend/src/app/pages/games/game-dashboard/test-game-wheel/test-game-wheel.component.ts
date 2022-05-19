
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
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
export class TestGameWheelComponent implements OnInit {

  @ViewChild(NgxWheelComponent, { static: false }) wheel;
  @ViewChild(ChoiceComponent) childChoice: any;
  @ViewChild(SelectionComponent) childSelect: any;
  @Input() gameData: any;
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
  case = 'main';
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
  constructor(public windowRef: NbWindowRef) { }

  ngOnInit(): void {
    this.setGameSettings();
    this.animate();
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
    this.gameData.data.setting['show_leader_board'] === '1' ? this.isLeaderBoard = true : this.isLeaderBoard = false;
    this.gameData.data.setting['show_user_answer'] === '1' ? this.showUserAnswer = true : this.showUserAnswer = false;
    this.playability = this.gameData.data.setting['playability'];
    this.gameData.data.setting['pass_wrong_answer'] === '0' ? this.passWrongAnswer = true
      : this.passWrongAnswer = false;
    this.gameData.data.setting['show_correct_answer'] === '1' ? this.showCorrectAnswer = true
      : this.showCorrectAnswer = false;
    this.gameData.data.setting['joker_is_active'] === '1' ? this.isJoker = true : this.isJoker = false;
    this.sumQuestion = this.gameData.data.questions.length;
    this.totalQuestion = this.gameData.data.questions.length;
    for (let i = 0; i < this.gameData.data.questions.length; i++) {
      if (this.gameData.data.questions[i].question_type === this.questionType.open_type) {
        this.sumQuestion--;
      }
    }

    this.gameData.data.setting['game_minute'] ?
      this.counter = this.gameData.data.setting['game_minute'] * 60 : this.counter = null;
    this.gameData.data.setting['joker_is_active'] === '1' ? this.isJoker = true : this.isJoker = false;
    this.gameData.data.setting['again'] === '1' ? this.againPlay = true : this.againPlay = false;
    this.gameData.data.gift ? this.isGift = true : this.isGift = false;

  }

  setWheel() {
    this.allCat = [];
    this.gameData.data.theme.category_colors.forEach((themeData, index) => {
      const cat = [];
      cat[NAME] = themeData.categoryName.toLowerCase();
      cat['color'] = themeData.categoryColor;
      this.allCat.push(cat);
      this.seed[index] = index;
    });

    this.gameData.data.questions.forEach(question => {
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

  eventMain($event) {
    switch ($event) {
      case 'showLeaderBoard':
        this.case = 'showLeaderBoard';
        break;
      case 'playGame':
        this.case = 'wheel';
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

  close() {
    this.windowRef.close();
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
    switch (event) {
      case 'default':
        if (this.score >= 25 && this.isHalf === 0) {
          this.isHalf = 1;
        } else if (this.score >= 50 && this.isDoubleAnswer === 0) {
          this.isDoubleAnswer = 1;
        } else if (this.score >= 75 && this.isDeleteOneOption === 0) {
          this.isDeleteOneOption = 1;
        }
        break;
      case this.questionType.open_type:
        this.isWise !== 2 ? this.isWise = 0 : this.isWise = 2;
        this.isHalf !== 2 ? this.isHalf = 0 : this.isHalf = 2;
        this.isDoubleAnswer !== 2 ? this.isDoubleAnswer = 0 : this.isDoubleAnswer = 2;
        this.isDeleteOneOption !== 2 ? this.isDeleteOneOption = 0 : this.isDeleteOneOption = 2;
        break;
      default:
        break;
    }
  }

  showQuestion(catIndex, questionIndex) {
    this.solvedQuestion++;
    this.nextDisabled = true;
    this.questionOption = this.allCat[catIndex][questionIndex];
    this.setJokers('default');
    switch (this.allCat[catIndex][questionIndex].question_type) {
      case this.questionType.multiple_selection:
        this.caseQuestion = this.questionType.multiple_selection;
        break;
      case this.questionType.multiple_choice:
        this.caseQuestion = this.questionType.multiple_choice;
        break;
      case this.questionType.pairing_type:
        this.nextDisabled = false;
        this.caseQuestion = this.questionType.pairing_type;
        break;
      default:
        this.setJokers(this.questionType.open_type);
        this.caseQuestion = this.questionType.open_type;
        break;
    }
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
    } else if (this.caseQuestion === this.questionType.multiple_selection) {
      for (let i = 0; i < this.child.disabled.length; i++) {
        // if(this.child.option)
        this.child.disabled[i] = true;
      }
      let trueAnswer = false;
      if (this.child.option.length === this.child['questionOption']['correct'].length) {
        this.child.option.every(data1 => {
          trueAnswer = false;
          this.child['questionOption']['correct'].every(data2 => {
            if (data1 === data2.correct) {
              trueAnswer = true;
              return false;
            } else {
              trueAnswer = false;
              return true;
            }
          });
          if (!trueAnswer) {
            return false;
          } else {
            return true;
          }
        });
      }
      if (!this.imageDirectory && trueAnswer) {
        this.correctAnswer = 'True Answer';
        this.score += (1 / this.sumQuestion) * 100;
        this.score = Number(this.score.toFixed(2));
        this.imageDirectory = false;

        this.childSelect?.animate('trueAnswer');
      } else {
        this.correctAnswer = 'Wrong! True Answer : ';
        let i = 0;
        this.imageDirectory = [];
        this.child['questionOption']['correct'].forEach(correct => {
          this.child['questionOption']['option'].forEach(option => {

            if (option.id === correct.correct) {
              if (i === 0) {
                option.media ? this.imageDirectory.push(option.media.directory) : this.correctAnswer += option.name;
                i++;
              } else if (option.media) {
                this.imageDirectory.push(option.media.directory);
              } else {
                this.correctAnswer += ', ' + option.name;
              }
            }
          });
        });

        this.childSelect.animate('shake', this.child['questionOption'].correct);
      }
    }
    this.nextDisabled = true;
    if (this.isDoubleAnswer !== 2 || this.correctAnswer === 'True Answer') {
      if (!passWrongAnswer && this.correctAnswer === 'True Answer') {
        this.isCorrectAnswer = true;
        this.score = 100;
        setTimeout(() => {
          this.nextDisabled = false;
          this.isCorrectAnswer = false;
          this.questionIndex++;
          this.imageDirectory = null;
          if (this.caseQuestion === this.questionType.multiple_choice) {
            this.childChoice.selectedOption = null;
            this.childChoice.option = null;
          } else if (this.caseQuestion === this.questionType.multiple_selection) {
            this.childSelect.option = [];
            this.childSelect.selectedOption = [];
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
          }
          for (let i = 0; i < this.child?.disabled?.length; i++) {
            this.child.disabled[i] = false;
          }
          this.child = null;
        }, 1500);
      } else if (!this.passWrongAnswer && this.correctAnswer !== 'True Answer') {
        this.correctAnswer = 'Wrong Answer';
        this.isCorrectAnswer = true;
        this.score = 100;
        setTimeout(() => {
          this.isCorrectAnswer = false;
          this.nextDisabled = false;
          this.isCorrectAnswer = false;
          this.imageDirectory = null;
          if (this.caseQuestion === this.questionType.multiple_choice) {
            this.childChoice.selectedOption = null;
            this.childChoice.option = null;
          } else if (this.caseQuestion === this.questionType.multiple_selection) {
            this.childSelect.option = [];
            this.childSelect.selectedOption = [];
          }
          for (let i = 0; i < this.child?.disabled?.length; i++) {
            this.child.disabled[i] = false;
          }
          this.child = null;
        }, 1500);

      } else if (this.passWrongAnswer && this.showCorrectAnswer) {
        setTimeout(() => {
          this.nextDisabled = false;
          this.isCorrectAnswer = false;
          this.questionIndex++;
          this.imageDirectory = null;
          if (this.caseQuestion === this.questionType.multiple_choice) {
            this.childChoice.selectedOption = null;
            this.childChoice.option = null;
          } else if (this.caseQuestion === this.questionType.multiple_selection) {
            this.childSelect.option = [];
            this.childSelect.selectedOption = [];
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
          }
          for (let i = 0; i < this.child?.disabled?.length; i++) {
            this.child.disabled[i] = false;
          }
          this.child = null;
        }, 4000);
      } else if (this.passWrongAnswer && !this.showCorrectAnswer) {
        this.nextDisabled = false;
        this.isCorrectAnswer = false;
        this.questionIndex++;
        this.imageDirectory = null;
        if (this.caseQuestion === this.questionType.multiple_choice) {
          this.childChoice.selectedOption = null;
          this.childChoice.option = null;
        } else if (this.caseQuestion === this.questionType.multiple_selection) {
          this.childSelect.option = [];
          this.childSelect.selectedOption = [];
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
    if (this.fastGame && $event && this.caseQuestion === this.questionType.multiple_choice) {
      this.nextStep();
    } else if ((!this.fastGame || this.caseQuestion !== this.questionType.multiple_choice) && $event) {
      this.nextDisabled = false;
    }
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
    switch (this.caseQuestion) {
      case this.questionType.multiple_choice:
        this.childChoice.option = null;
        this.childChoice.option = this.questionOption['correct'].correct;
        break;
      case this.questionType.multiple_selection:
        this.childSelect['questionOption']['correct'].forEach(correct => {
          this.childSelect['questionOption']['option'].forEach((option, index) => {
            if (option.id === correct.correct) {
              this.childSelect.selectedOption[index] = true;
              this.childSelect.option.push(correct.correct);
            }
          });
        });
        break;
      default:
        break;
    }
    this.nextStep();
  }

  halfAndHalf() {
    this.clearOption();
    this.isHalf = 2;
    let controlSplice = 0;
    switch (this.caseQuestion) {
      case this.questionType.multiple_choice:
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
        break;
      case this.questionType.multiple_selection:
        this.questionOption.option.every((option, index) => {
          if ((this.questionOption.option.length - this.questionOption.correct.length <= 2)) {
            this.questionOption.correct.every((correct, index2) => {
              if (correct.correct === option.id) {
                return false;
              } else if (correct.correct !== option.id && index2 === this.questionOption.correct.length - 1) {
                const wrongId = (element) => element.id === option.id;
                this.questionOption.option.splice(this.questionOption.option.findIndex(wrongId), 1);
                this.isHalf = 2;
                return false;
              } else {
                return true;
              }
            });
            return true;
          } else if ((this.questionOption.option.length - this.questionOption.correct.length > 2)
            && controlSplice < 2) {
            this.questionOption.correct.every((correct, index2) => {

              if (correct.correct === option.id) {
                return false;
              } else if (correct.correct !== option.id && index2 === this.questionOption.correct.length - 1) {
                const wrongId = (element) => element.id === option.id;
                this.questionOption.option.splice(this.questionOption.option.findIndex(wrongId), 1);
                controlSplice++;
                this.isHalf = 2;
              }
              if (controlSplice === 2) {
                this.isHalf = 2;
                return false;
              } else {
                return true;
              }
            });
            return true;
          } else {
            this.isHalf = 1;
            return true;
          }
        });
        break;
      default:
        break;
    }
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
      case this.questionType.multiple_selection:
        this.questionOption.option.every((option, index) => {
          if ((this.questionOption.option.length - this.questionOption.correct.length > 0)) {
            this.questionOption.correct.every((correct, index2) => {
              if (correct.correct === option.id) {
                return false;
              } else if (correct.correct !== option.id && index2 === this.questionOption.correct.length - 1) {
                const wrongId = (element) => element.id === option.id;
                this.questionOption.option.splice(this.questionOption.option.findIndex(wrongId), 1);
                this.isDeleteOneOption = 2;
                return false;
              } else {
                return true;
              }
            });
            if (this.isDeleteOneOption === 2) {
              return false;
            } else {
              return true;
            }
          } else {
            this.isDeleteOneOption = 1;
            return false;
          }
        });
        break;
      default:
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
}
