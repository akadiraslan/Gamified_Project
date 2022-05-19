import { Component, Input, OnInit } from '@angular/core';
import { bounceInAnimation, flipAnimation, tadaAnimation } from 'angular-animations';
import { environment } from 'environments/environment';


@Component({
    selector: 'test-game-gifts',
    templateUrl: './gifts.component.html',
    styleUrls: ['./gifts.component.scss'],
    animations: [
        bounceInAnimation(),
        flipAnimation(),
        tadaAnimation(),
    ],
})
export class GiftsComponent implements OnInit {

    @Input() gameData: any;
    baseUrl = environment.baseUrl + '/';
    imageDirectory: any;
    giftIndex = 0;
    giftItems: any;
    animationState = false;

    constructor() {
    }

    ngOnInit(): void {
        this.imageDirectory = this.gameData.data.gift.gift_items[this.giftIndex]['media'] ?
            this.gameData.data.gift.gift_items[this.giftIndex]['media']['directory'] : null;
        this.giftItems = this.gameData.data.gift.gift_items;
        this.animate();
    }

    animate() {
        this.animationState = false;
        setTimeout(() => {
            this.animationState = !this.animationState;
        }, 1);
    }

    setGift($event) {
        if ($event === 'next' && this.giftItems[this.giftIndex + 1]) {
            this.giftIndex++;
            this.imageDirectory = this.gameData.data.gift.gift_items[this.giftIndex]['media'] ?
                this.gameData.data.gift.gift_items[this.giftIndex]['media']['directory'] : null;

        } else if ($event === 'previous' && this.giftItems[this.giftIndex - 1]) {
            this.giftIndex--;
            this.imageDirectory = this.gameData.data.gift.gift_items[this.giftIndex]['media'] ?
                this.gameData.data.gift.gift_items[this.giftIndex]['media']['directory'] : null;
        }
        this.animate();
    }

}
