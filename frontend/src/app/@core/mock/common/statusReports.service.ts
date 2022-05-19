import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { StatusReport, StatusReportsData } from '../../interfaces/common/statusReports';

@Injectable()
export class StatusReportsService extends StatusReportsData {

  private data: StatusReport[] = [
    {
      id: 1,
      name: 'Organisation General Report',
      isOn: true,
      type: 'organisationGeneralReport',
      settings: {
        iconClass: 'nb-lightbulb',
        type: 'primary',
      },
    }, {
      id: 2,
      name: 'Game General Report',
      isOn: false,
      type: 'gameGeneralReport',
      settings: {
        iconClass: 'nb-compose',
        type: 'success',
      },
    }, {
      id: 3,
      name: 'The Best List Report',
      isOn: false,
      type: 'bestListReport',
      settings: {
        iconClass: 'far fa-hand-rock',
        type: 'info',
      },
    },
    {
      id: 4,
      name: 'Game Detail Report',
      isOn: false,
      type: 'gameDetailReport',
      settings: {
        iconClass: 'far fa-file-video',
        type: 'info',
      },
    },
    {
      id: 5,
      name: 'Category General Report',
      isOn: false,
      type: 'categoryGeneralReport',
      settings: {
        iconClass: 'far fa-file-word',
        type: 'info',
      },
    },
    {
      id: 6,
      name: 'Question General Report',
      isOn: false,
      type: 'questionGeneralReport',
      settings: {
        iconClass: 'nb-person',
        type: 'info',
      },
    },
    {
      id: 7,
      name: 'Pre Post Test Report',
      isOn: false,
      type: 'prePostTestReport',
      settings: {
        iconClass: 'nb-star',
        type: 'info',
      },
    },
    {
      id: 8,
      name: 'User General Report',
      isOn: false,
      type: 'userGeneralReport',
      settings: {
        iconClass: 'nb-person',
        type: 'info',
      },
    },

  ];

  list(): Observable<StatusReport[]> {
    return observableOf(this.data);
  }

  edit(device: StatusReport): Observable<StatusReport> {
    return observableOf(device);
  }
}
