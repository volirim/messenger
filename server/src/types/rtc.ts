export interface IRTCDefaultData {
  from: number;
  to: number;
}
export interface ICandidate extends IRTCDefaultData {
  candidate: string;
}

export interface IOffer extends IRTCDefaultData {
  offer: string;
}

export interface IAnswer extends IRTCDefaultData {
  answer: string;
}

export interface IRequest extends IRTCDefaultData {
  video: boolean;
}

export interface IResponse {
  to: number;
  accepted: boolean;
  video: boolean;
}
