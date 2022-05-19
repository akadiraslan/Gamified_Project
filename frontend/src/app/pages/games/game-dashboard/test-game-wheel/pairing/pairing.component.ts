import { Component, Input, OnInit } from '@angular/core';
import { Option } from 'app/@core/model/options';
import { environment } from 'environments/environment';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'pairing',
    templateUrl: './pairing.component.html',
    styleUrls: ['./pairing.component.scss']
})
export class PairingComponent implements OnInit {

    @Input() questionOption: any;

    baseUrl = environment.baseUrl + '/';
    firstOption = [];
    secondOption = [];
    pairing: any[] = [];

    constructor() {
    }

    ngOnInit(): void {
        const firstArr = [];
        console.log(this.questionOption);
        this.questionOption.option.forEach(data => {
            this.firstOption.push({
                first_id: data.first_id, first_image_id: data.first_image_id,
                first_media: data.first_media, first_option: data.first_option
            });
            this.secondOption.push({
                second_id: data.second_id, second_image_id: data.second_image_id,
                second_media: data.second_media, second_option: data.second_option
            });
            // this.secondOption.push(data.second_id, data.second_image_id, data.second_media, data.second_option);
        });
        console.log(firstArr);

        // this.secondOption = this.questionOption.option;
        this.setPairing();
    }


    setPairing() {
        this.firstOption.forEach((item: any, index) => {
            this.pairing.push({
                first_id: this.firstOption[index]['first_id'],
                second_id: this.secondOption[index]['second_id']
            });
        });
    }

    // reply(optionId: number) {
    //     const data = {
    //         question_id: this.question_id,
    //         reply_id: optionId,
    //         question_type: this.question_type

    //     };
    //     this.replyService.reply(data).subscribe(res => {
    //         console.log(res);
    //     });

    // }
    drop(event: CdkDragDrop<string[]>, options: any[]) {
        this.pairing = [];
        moveItemInArray(options, event.previousIndex, event.currentIndex);
        options.forEach((item: any, index) => {
            this.pairing.push({
                first_id: this.firstOption[index]['first_id'],
                second_id: item.second_id,
            });
        });

    }
}
