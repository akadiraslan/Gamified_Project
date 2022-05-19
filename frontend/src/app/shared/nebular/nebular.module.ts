import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbIconModule,
  NbInputModule, NbRadioModule, NbSelectModule,
  NbToggleModule,
  NbTooltipModule,
  NbStepperModule,
  NbAccordionModule,
  NbAlertModule, NbListModule, NbTreeGridModule,
  NbTabsetModule,
  NbAutocompleteModule
} from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbActionsModule,
    NbIconModule,
    NbRadioModule,
    NbSelectModule,
    NbToggleModule,
    NbTooltipModule,
    NbStepperModule,
    NbAccordionModule,
    NgSelectModule,
    NbAlertModule,
    NbListModule,
    NbTreeGridModule,
    NbTabsetModule,
    NbAutocompleteModule,
  ],
  exports: [
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbActionsModule,
    NbIconModule,
    NbRadioModule,
    NbSelectModule,
    NbToggleModule,
    NbTooltipModule,
    NbStepperModule,
    NbAccordionModule,
    NgSelectModule,
    NbAlertModule,
    NbListModule,
    NbTreeGridModule,
    NbTabsetModule,
    NbAutocompleteModule,

  ]
})
export class NebularModule {
}
