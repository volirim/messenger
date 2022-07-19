export interface IRTCDefaultData {
  from: string;
  to: string;
}

export interface ICandidate extends IRTCDefaultData {
  // eslint-disable-next-line no-undef
  candidate: RTCIceCandidateInit;
}

export interface IOffer extends IRTCDefaultData {
  // eslint-disable-next-line no-undef
  offer: RTCSessionDescriptionInit;
}

export interface IAnswer extends IRTCDefaultData {
  // eslint-disable-next-line no-undef
  answer: RTCSessionDescriptionInit;
}

export interface IRequest extends IRTCDefaultData {
  video: boolean;
}

export interface IResponse {
  to: number;
  accepted: boolean;
  video: boolean;
}
