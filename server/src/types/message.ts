export interface IMessageTime {
  hours: string;
  minutes: string;
  weekDay: string;
  month: string;
  year: string;
}

export interface IIsViewedData {
  id: number;
  isViewed: boolean;
}

export interface IreceivedFile {
  from: number;
  to: number;
  message: string;
  isViewed: boolean;
  type: string;
}
