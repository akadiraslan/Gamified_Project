
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from 'app/@components/base/base.component';

@Component({
  selector: 'ngx-validation-message',
  styleUrls: ['./validation-message.component.scss'],
  template: `
      <div class="warning">
          <span class="caption status-danger"
             *ngIf="showMinLength"> Min {{ label }} length is {{ minLength }} symbols </span>
          <span class="caption status-danger"
             *ngIf="showMaxLength"> Max {{ label }} length is {{ maxLength }} symbols </span>
          <span class="caption status-danger" *ngIf="showPattern"> Incorrect {{ label }} </span>
          <span class="caption status-danger" *ngIf="showRequired"> {{ label }} is required</span>
          <span class="caption status-danger" *ngIf="showMin">Min value of {{ label }} is {{ min }}</span>
          <span class="caption status-danger" *ngIf="showMax">Max value of {{ label }} is {{ max }}</span>
          <span class="caption status-danger" *ngIf="max">Max photo size {{max}} mb!</span>
          <span class="caption status-danger" *ngIf="sameDefault"> You can not use this name. This is default Theme.</span>
          <span class="caption status-danger" *ngIf="sameTheme">There is already a theme with this name. You will overwrite on this theme. </span>
          <span class="caption status-danger" *ngIf="sameGift">There is already a theme with this name. You will overwrite on this theme. </span>
          <span class="caption status-danger" *ngIf="gameNameControl &&gameNameControl=='sameName'">You have a game with this name. Please change the name. </span>
          <span class="caption status-success" *ngIf="gameNameControl&&gameNameControl==='done'">You can use this name. </span>
      </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxValidationMessageComponent),
      multi: true,
    },
  ],
})
export class NgxValidationMessageComponent extends BaseComponent {
  @Input()
  label: string = '';

  @Input()
  showRequired?: boolean;

  @Input()
  min?: number;

  @Input()
  photoSize: number;

  @Input()
  showMin?: boolean;

  @Input()
  max?: number;

  @Input()
  showMax: boolean;

  @Input()
  minLength?: number;

  @Input()
  showMinLength?: boolean;

  @Input()
  maxLength?: number;

  @Input()
  showMaxLength?: boolean;

  @Input()
  showPattern?: boolean;

  @Input()
  sameDefault?: string;

  @Input()
  sameTheme?: string;

  @Input()
  sameGift?: string;

  @Input()
  gameNameControl?: string;

  constructor() {
    super();
  }
}
