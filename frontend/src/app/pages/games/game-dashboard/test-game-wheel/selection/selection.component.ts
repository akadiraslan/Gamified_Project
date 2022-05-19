import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { bounceInAnimation, shakeAnimation } from 'angular-animations';
import { MessageService } from 'app/@core/mock/common/message.service';
import { ReplyService } from 'app/@core/mock/common/reply.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'selection',
    templateUrl: './selection.component.html',
    styleUrls: ['./selection.component.scss'],
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
export class SelectionComponent implements OnInit {

    @Input() questionOption: any;
    sendData: any;
    reply_ids: number[] = [];
    baseUrl = environment.baseUrl + '/';
    option = [];
    @Output() optionEmit = new EventEmitter<any>();
    selectedOption = [];
    disabled = [false, false, false, false, false];
    animationState = false;
    animationShake = [false, false, false, false, false];
    firstShow = true;
    shake = false;
    trueState = [false, false, false, false, false];
    opacityDelay = false;
    constructor(private replyService: ReplyService, private messageService: MessageService) {

    }
    ngOnInit(): void {
        this.animate();
    }


    animate(event = null, ids = null) {

        this.animationState = false;
        this.animationShake = [false, false, false, false, false];
        this.trueState = [false, false, false, false, false];
        if (event === 'shake' && ids) {
            setTimeout(() => {
                this.selectedOption.forEach((option, index) => {
                    if (option === true) {
                        this.animationShake[index] = !this.animationShake[index];
                    }
                });
            }, 1);
            setTimeout(() => {
                this.trueState = [false, false, false, false, false];
                ids.forEach(id => {
                    this.questionOption.option.every((option, index) => {
                        if (option.id === id.correct) {
                            this.trueState[index] = !this.trueState[index];
                            return false;
                        } else {
                            return true;
                        }
                    });
                });

            }, 1000);

        } else if (event === 'shake' && !ids) {
            setTimeout(() => {
                this.selectedOption.forEach((option, index) => {
                    if (option === true) {
                        this.animationShake[index] = !this.animationShake[index];
                    }
                });
            }, 1);
        } else if (event === 'trueAnswer') {
            setTimeout(() => {
                this.selectedOption.forEach((option, index) => {
                    if (option === true) {
                        this.trueState[index] = !this.trueState[index];
                    }
                });
            });
        } else {
            this.opacityDelay = false;
            setTimeout(() => {
                this.opacityDelay = true;
                this.animationState = !this.animationState;
            }, 1);
        }
    }

    onCheckboxChange($event, index) {
        if ($event) {
            this.option.push(this.questionOption.option[index].id);
        } else {
            const data = this.option.indexOf(this.questionOption.option[index].id);
            this.option.splice(data, 1);
        }
        if (this.option.length === 0) {
            this.option = [];
            this.optionEmit.emit(false);
        } else {
            this.optionEmit.emit(true);
        }
    }

    getDelay() {
        if (this.messageService.questionFirstShow) {
            return 2000;
        } else {
            return 500;
        }
    }
}
