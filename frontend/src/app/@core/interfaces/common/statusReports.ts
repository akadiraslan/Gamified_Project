import { Observable } from 'rxjs';

export interface StatusReportViewSettings {
  iconClass: string;
  type: string;
}

export interface StatusReportParameter {
  id: number;
  name: string;
  value: number | string;
  min?: number;
  max?: number;
}

export interface StatusReport {
  id: number;
  isOn: boolean;
  name: string;
  type: string;
  settings?: StatusReportViewSettings;
  parameters?: StatusReportParameter[];
}

export abstract class StatusReportsData {
  abstract list(): Observable<StatusReport[]>;
  abstract edit(device: StatusReport): Observable<StatusReport>;
}
