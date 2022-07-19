export interface ISendMessage {
    from: number;
    to: number;
    message: string;
    isViewed: boolean;
    type: string;
}

export interface ISendFile {
    from: number;
    to: number;
    message: File;
    isViewed: boolean;
    type: string;
}

export interface ISocketNotification {
    from: string;
    to: string;
}

export interface ISocketIsTypingNotification extends ISocketNotification {
    isTyping: boolean
}

export interface IMessageTime {
    hours: string;
    minutes: string;
    weekDay: string;
    month: string;
    year: string;
}

export interface ISetViewed {
    id: number;
    isViewed: boolean;
}

export interface ISocketViewed {
    from: number;
    to: number;
    messageId: number;
}
