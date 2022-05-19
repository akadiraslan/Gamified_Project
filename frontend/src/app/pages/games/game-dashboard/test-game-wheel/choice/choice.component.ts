import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { bounceInAnimation, shakeAnimation } from 'angular-animations';
import { MessageService } from 'app/@core/mock/common/message.service';
import { Option } from 'app/@core/model/options';
import { environment } from 'environments/environment';

@Component({
    selector: 'choice',
    templateUrl: './choice.component.html',
    styleUrls: ['./choice.component.scss'],
    animations: [
        bounceInAnimation(),
        shakeAnimation(),
        trigger('wrongAnswer', [
            // ...
            state('open', style({
                backgroundColor: '#FF0000',
            })),
            state('closed', style({
                backgroundColor: '#ffffff'
            }),
            ),
            transition('open => closed', [
                animate('1s')
            ]),

        ]),
        trigger('trueAnswer', [
            // ...
            state('open', style({
                backgroundColor: '#32CD32'
            })),
            state('closed', style({
                backgroundColor: '#ffffff'
            }),
            ),
            transition('open => closed', [
                animate('1s')
            ]),
        ]),
    ],
})

export class ChoiceComponent implements OnInit {

    @Input() questionOption: any;
    @Output() optionEmit = new EventEmitter<string>();
    baseUrl = environment.baseUrl + '/';

    option;
    disabled = [false, false, false, false, false];
    animationState = false;
    animationShake = [false, false, false, false, false];
    firstShow = true;
    shake = false;
    trueState = [false, false, false, false, false];
    opacityDelay = false;
    isChoice = false;
    constructor(private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.isChoice = true;
        this.animate();
    }

    animate(event = null, id = null) {

        this.animationState = false;
        this.animationShake = [false, false, false, false, false];
        this.trueState = [false, false, false, false, false];
        if (event === 'shake' && id) {
            setTimeout(() => {
                let wrongId = null;
                let trueId = null;
                this.questionOption.option.forEach((option, index) => {
                    if (option.id === id) {
                        trueId = index;
                    }
                    if (option.id === this.option) {
                        wrongId = index;
                    }
                });
                this.animationShake[wrongId] = !this.animationShake[wrongId];
                this.trueState[trueId] = !this.trueState[trueId];

            }, 1);
        } else if (event === 'shake' && !id) {
            setTimeout(() => {
                let wrongId = null;
                this.questionOption.option.forEach((option, index) => {
                    if (option.id === this.option) {
                        wrongId = index;
                    }
                });
                this.animationShake[wrongId] = !this.animationShake[wrongId];
            }, 1);
        } else if (event === 'trueAnswer') {
            setTimeout(() => {
                let trueId: number;
                this.questionOption.option.every((option, index) => {
                    if (option.id === this.option) {
                        trueId = index;
                        return false;
                    } else {
                        return true;
                    }
                });
                this.trueState[trueId] = !this.trueState[trueId];
            });
        } else {
            this.opacityDelay = false;
            setTimeout(() => {
                this.opacityDelay = true;
                this.animationState = !this.animationState;

            }, 1);
        }
    }

    getDelay() {
        if (this.messageService.questionFirstShow) {
            return 2000;
        } else {
            return 500;
        }
    }

    changeOption($event) {
        this.optionEmit.emit($event);
    }

}
