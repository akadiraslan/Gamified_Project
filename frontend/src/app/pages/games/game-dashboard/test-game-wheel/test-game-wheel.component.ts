
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

  gameData = [{
    "name": "Test1",
    "questions": [
      {
        "category": {
          "id": 1,
          "name": "Film & TV"
        },
        "question_type": "multiple-choice",
        "id": 1,
        "name": "In which year was Dances with Wolves released?",
        "correct": {
          "question_id": 1,
          "correct": 3
        },
        "option": [
          {
            "id": 1,
            "name": "1982",
            "question_id": 1
          },
          {
            "question_id": 1,
            "id": 2,
            "name": "1986"
          },
          {
            "question_id": 1,
            "name": "1990",
            "id": 3
          },
          {
            "name": "1994",
            "id": 4,
            "question_id": 1
          }
        ]
      },
      {
        "question_type": "multiple-choice",
        "category": {
          "id": 1,
          "name": "Film & TV"
        },
        "option": [
          {
            "question_id": 2,
            "id": 1,
            "name": "2003"
          },
          {
            "question_id": 2,
            "id": 2,
            "name": "2006"
          },
          {
            "id": 3,
            "question_id": 2,
            "name": "2009"
          },
          {
            "id": 4,
            "name": "2003",
            "question_id": 2
          }
        ],
        "correct": {
          "correct": 1,
          "question_id": 2
        },
        "id": 2,
        "name": "In which year was Pirates of the Caribbean: The Curse of the Black Pearl first released in the cinema?"
      },
      {
        "option": [
          {
            "name": "On a journey to find the cure for a curse, a boy finds himself in the middle of a war.",
            "id": 1,
            "question_id": 3
          },
          {
            "question_id": 3,
            "name": "After awakening from a coma, a former assassin wreaks vengeance on those who betrayed her.",
            "id": 2
          },
          {
            "id": 3,
            "name": "The son of a former boxer is trained by his father for a mixed martial arts tournament.",
            "question_id": 3
          },
          {
            "id": 4,
            "name": "A slacker seeks restitution for a rug ruined by debt collectors.",
            "question_id": 3
          }
        ],
        "id": 3,
        "correct": {
          "correct": 4,
          "question_id": 3
        },
        "name": "What is the plot of the movie The Big Lebowski?",
        "category": {
          "id": 1,
          "name": "Film & TV"
        }
      },
      {
        "category": {
          "name": "Film & TV",
          "id": 1
        },
        "id": 4,
        "correct": {
          "correct": 2,
          "question_id": 4
        },
        "name": "Name the movie that matches the following plot summary: 'A car salesman's inept crime falls apart due to his and his henchmen's bungling.'",
        "option": [
          {
            "question_id": 4,
            "name": "12 Years a Slave",
            "id": 1
          },
          {
            "question_id": 4,
            "id": 2,
            "name": "Fargo"
          },
          {
            "name": "Rear Window",
            "question_id": 4,
            "id": 3
          },
          {
            "id": 4,
            "question_id": 4,
            "name": "A Beautiful Mind"
          }
        ]
      },
      {
        "option": [
          {
            "id": 1,
            "question_id": 5,
            "name": "Battle of Cold Harbor"
          },
          {
            "name": "Battle of Gettysburg",
            "id": 2,
            "question_id": 5
          },
          {
            "name": "Battle of Little Bighorn",
            "question_id": 5,
            "id": 3
          },
          {
            "id": 4,
            "question_id": 5,
            "name": "Battle of Stones River"
          }
        ],
        "correct": {
          "correct": 3,
          "question_id": 5
        },
        "category": {
          "id": 2,
          "name": "History"
        },
        "name": "In which battle was George A. Custer defeated?",
        "id": 5
      },
      {
        "name": "The American M4 tank is better known as what?",
        "option": [
          {
            "id": 1,
            "name": "The Sherman Tank",
            "question_id": 6
          },
          {
            "name": "The Berman Tank",
            "question_id": 6,
            "id": 2
          },
          {
            "name": "The Herman Tank",
            "id": 3,
            "question_id": 6
          },
          {
            "name": "The German Tank",
            "id": 4,
            "question_id": 6
          }
        ],
        "category": {
          "id": 2,
          "name": "History"
        },
        "correct": {
          "correct": 1,
          "question_id": 6
        },
        "id": 6
      },
      {
        "id": 7,
        "name": "The last line of which document is 'Working men of all countries, unite.'?",
        "category": {
          "id": 2,
          "name": "History"
        },
        "option": [
          {
            "question_id": 7,
            "name": "The Gettysberg Address",
            "id": 1
          },
          {
            "id": 2,
            "question_id": 7,
            "name": "Communist Manifesto"
          },
          {
            "name": "The American Declaration of Independence",
            "question_id": 7,
            "id": 3
          },
          {
            "question_id": 7,
            "id": 4,
            "name": "Magna Carta"
          }
        ],
        "correct": {
          "question_id": 7,
          "correct": 2
        }
      },
      {
        "option": [
          {
            "name": "Mark II",
            "id": 1,
            "question_id": 8
          },
          {
            "id": 2,
            "question_id": 8,
            "name": "Alfred I"
          },
          {
            "name": "Mark II",
            "id": 3,
            "question_id": 8
          },
          {
            "id": 4,
            "name": "Adrian IV.",
            "question_id": 8
          }
        ],
        "id": 8,
        "category": {
          "id": 2,
          "name": "History"
        },
        "correct": {
          "question_id": 8,
          "correct": 4
        },
        "name": "Who Was The Only British Pope?"
      },
      {
        "id": 9,
        "name": "Which Group Was Originally Called The Primettes?",
        "option": [
          {
            "name": "Casting Crowns",
            "question_id": 9,
            "id": 1
          },
          {
            "question_id": 9,
            "name": "The Temptations.",
            "id": 2
          },
          {
            "question_id": 9,
            "id": 3,
            "name": "The Supremes"
          },
          {
            "id": 4,
            "name": "The Vandellas",
            "question_id": 9
          }
        ],
        "correct": {
          "correct": 3,
          "question_id": 9
        },
        "category": {
          "id": 3,
          "name": "Music"
        }
      },
      {
        "name": "Which song begins with the lyrics: 'Hello? Is there anybody in there?'?",
        "correct": {
          "correct": 1,
          "question_id": 10
        },
        "category": {
          "name": "Music",
          "id": 3
        },
        "option": [
          {
            "id": 1,
            "question_id": 10,
            "name": "'Comfortably Numb' by Pink Floyd"
          },
          {
            "name": "'Rapper's Delight' by Sugarhill Gang",
            "question_id": 10,
            "id": 2
          },
          {
            "name": "'Welcome to the Black Parade' by My Chemical Romance",
            "id": 3,
            "question_id": 10
          },
          {
            "name": "'Baby Got Back' by Sir Mix-a-Lot",
            "id": 4,
            "question_id": 10
          }
        ],
        "id": 10
      },
      {
        "correct": {
          "correct": 2,
          "question_id": 11
        },
        "category": {
          "id": 3,
          "name": "Music"
        },
        "id": 11,
        "name": "With Which Instrument Is Les Paul Associated?",
        "option": [
          {
            "name": "Drums",
            "id": 1,
            "question_id": 11
          },
          {
            "id": 2,
            "question_id": 11,
            "name": "Guitar"
          },
          {
            "name": "Saxophone",
            "id": 3,
            "question_id": 11
          },
          {
            "name": "Piano",
            "question_id": 11,
            "id": 4
          }
        ]
      },
      {
        "name": "Who wrote the Opera 'The Magic Flute'?",
        "category": {
          "name": "Music",
          "id": 3
        },
        "id": 12,
        "correct": {
          "question_id": 12,
          "correct": 4
        },
        "option": [
          {
            "id": 1,
            "question_id": 12,
            "name": "Tchaikovsky"
          },
          {
            "question_id": 12,
            "id": 2,
            "name": "Stravinsky"
          },
          {
            "name": "Beethoven",
            "question_id": 12,
            "id": 3
          },
          {
            "id": 4,
            "question_id": 12,
            "name": "Mozart"
          }
        ]
      },
      {
        "name": "What is Psychopharmacology the study of?",
        "option": [
          {
            "name": "wonders, or monsters",
            "question_id": 13,
            "id": 1
          },
          {
            "question_id": 13,
            "id": 2,
            "name": "the signification and application of words"
          },
          {
            "question_id": 13,
            "name": "psychotropic or psychiatric drugs",
            "id": 3
          },
          {
            "id": 4,
            "name": "crop circles",
            "question_id": 13
          }
        ],
        "id": 13,
        "category": {
          "id": 4,
          "name": "Science"
        },
        "correct": {
          "question_id": 13,
          "correct": 3
        }
      },
      {
        "correct": {
          "correct": 1,
          "question_id": 14
        },
        "category": {
          "id": 4,
          "name": "Science"
        },
        "name": "What name is given to animals which only eat plants?",
        "id": 14,
        "option": [
          {
            "question_id": 14,
            "name": "Herbivore",
            "id": 1
          },
          {
            "id": 2,
            "name": "Vegitarian",
            "question_id": 14
          },
          {
            "name": "Vegivore",
            "question_id": 14,
            "id": 3
          },
          {
            "question_id": 14,
            "id": 4,
            "name": "Omnivore"
          }
        ]
      },
      {
        "option": [
          {
            "id": 1,
            "question_id": 15,
            "name": "Panda Bear"
          },
          {
            "name": "Polar Bear",
            "id": 2,
            "question_id": 15
          },
          {
            "name": "Black Bear",
            "id": 3,
            "question_id": 15
          },
          {
            "id": 4,
            "name": "Grizzly Bear",
            "question_id": 15
          }
        ],
        "name": "Which Is The Largest Land Carnivore?",
        "correct": {
          "question_id": 15,
          "correct": 2
        },
        "category": {
          "id": 4,
          "name": "Science"
        },
        "id": 15
      },
      {
        "category": {
          "name": "Science",
          "id": 4
        },
        "id": 16,
        "option": [
          {
            "name": "Liver",
            "question_id": 16,
            "id": 1
          },
          {
            "question_id": 16,
            "id": 2,
            "name": "Bladder"
          },
          {
            "name": "Kidney",
            "id": 3,
            "question_id": 16
          },
          {
            "question_id": 16,
            "name": "Stomach",
            "id": 4
          }
        ],
        "correct": {
          "question_id": 16,
          "correct": 3
        },
        "name": "Which Organ's Action Is Replaced By Artifical Dialysis?"
      },
      {
        "correct": {
          "correct": 2,
          "question_id": 17
        },
        "category": {
          "id": 5,
          "name": "General Knowledge"
        },
        "option": [
          {
            "question_id": 17,
            "name": "Finifugal",
            "id": 1
          },
          {
            "name": "Frankenfood",
            "id": 2,
            "question_id": 17
          },
          {
            "name": "Macrosmatic",
            "id": 3,
            "question_id": 17
          },
          {
            "question_id": 17,
            "name": "Poppycock",
            "id": 4
          }
        ],
        "name": "Which word is defined as 'genetically modified food'?",
        "id": 17
      },
      {
        "id": 18,
        "category": {
          "id": 5,
          "name": "General Knowledge"
        },
        "option": [
          {
            "question_id": 18,
            "id": 1,
            "name": "Norway"
          },
          {
            "question_id": 18,
            "name": "Chile",
            "id": 2
          },
          {
            "name": "Canada",
            "id": 3,
            "question_id": 18
          },
          {
            "id": 4,
            "name": "Japan",
            "question_id": 18
          }
        ],
        "name": "Which Country Is The Worlds Leading Exporter Of Salmon?",
        "correct": {
          "question_id": 18,
          "correct": 1
        }
      },
      {
        "id": 19,
        "category": {
          "id": 5,
          "name": "General Knowledge"
        },
        "name": "What was the first ship to reach the Titanic after it sank?",
        "correct": {
          "question_id": 19,
          "correct": 4
        },
        "option": [
          {
            "question_id": 19,
            "name": "Olympia",
            "id": 1
          },
          {
            "id": 2,
            "name": "Iberia",
            "question_id": 19
          },
          {
            "id": 3,
            "question_id": 19,
            "name": "Lusitania"
          },
          {
            "name": "Carpathia",
            "question_id": 19,
            "id": 4
          }
        ]
      },
      {
        "correct": {
          "question_id": 20,
          "correct": 2
        },
        "category": {
          "name": "General Knowledge",
          "id": 5
        },
        "option": [
          {
            "name": "David Beckett",
            "id": 1,
            "question_id": 20
          },
          {
            "question_id": 20,
            "id": 2,
            "name": "Michael Collins"
          },
          {
            "name": "Sam Norman",
            "id": 3,
            "question_id": 20
          },
          {
            "id": 4,
            "name": "Phillip Normandy",
            "question_id": 20
          }
        ],
        "id": 20,
        "name": "Neil Armstrong And Buzz Aldrin Landed On The Moon But Who Stayed Behind In The Command Capsule?"
      }
    ]
  }];
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
  constructor() { }

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
    this.isLeaderBoard = false;
    this.showUserAnswer = true;
    this.passWrongAnswer = true;
    this.showCorrectAnswer = true; this.isJoker = true;
    this.sumQuestion = this.gameData[0]['questions'].length;
    this.totalQuestion = this.gameData[0]['questions'].length;
    for (let i = 0; i < this.gameData[0]['questions'].length; i++) {
      if (this.gameData[0]['questions'][i].question_type === this.questionType.open_type) {
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
    this.gameData[0]['questions'].forEach((themeData1, index) => {
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
    console.log('asdasdas');

    console.log(this.newCatName);


    this.gameData[0]['questions'].forEach(question => {
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
}
