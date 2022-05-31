import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEMO_GAME_COUNT, FAST_GAME, NAME } from '../../data/data';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private messageSource = new BehaviorSubject('');
    statusDialog = this.messageSource.asObservable();

    private messageSource2 = new BehaviorSubject(1);
    numberOfGifts = this.messageSource2.asObservable();

    private messageSource3 = new BehaviorSubject(false);
    pendingChanges = this.messageSource3.asObservable();

    private messageSource4 = new BehaviorSubject(DEMO_GAME_COUNT);
    totalGame = this.messageSource4.asObservable();

    private messageSource5 = new BehaviorSubject(NAME);
    selectedStep = this.messageSource5.asObservable();

    private messageSource6 = new BehaviorSubject(null);
    changeUserData = this.messageSource6.asObservable();

    private messageSource7 = new BehaviorSubject(null);
    setEventData = this.messageSource7.asObservable();

    private messageSource8 = new BehaviorSubject(null);
    setToggle = this.messageSource8.asObservable();

    changeCreditCardData = this.messageSource7.asObservable();

    public questionFirstShow = true;

    pendingChange = false;
    numOfCategories = 0;
    selectedTheme = 0;
    selectedQuestion = 0;
    totCategories: number;
    stepQuestion = [];
    startStep = [{ toggleControlChoice: [] }];
    gameNames = [];
    themes = [];
    organisationId: number;
    selectedUser: any;
    users: any;
    selectedAddress: any;
    selectedCreditCard: any;
    allAddress = [];
    constructor() {
    }

    sendDialogMessage(message: any) {

        this.messageSource.next(message);

    }

    sendNumberOfGifts(message: any) {

        this.messageSource2.next(message);

    }

    pendingChangesMessage(message: any) {

        this.messageSource3.next(message);

    }

    sendTotalGameNumber(message: number) {
        this.messageSource4.next(message);
    }

    selectStep(message: any) {
        this.messageSource5.next(message);
    }

    sendUserData(message: any) {
        this.messageSource6.next(message);
    }

    sendAddressData(message: any) {
        this.messageSource7.next(message);
    }

    sendAddressIdForToggle(message: any) {
        this.messageSource8.next(message);
    }

    loginData: any;

}
