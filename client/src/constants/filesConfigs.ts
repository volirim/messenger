export interface IfilesConfig {
  media: string,
  type: RegExp,
}

export const imageConfig: IfilesConfig = {
  media: 'image',
  type: /image\/(png|jpg|jpeg)/i,
};

export const videoConfig: IfilesConfig = {
  media: 'video',
  type: /video\/(mp4|webm|GIF|gif)/i,
};

export const textConfig: IfilesConfig = {
  media: 'application',
  type: /application\/(doc|docx|txt|rft|log|vnd.openxmlformats-officedocument.wordprocessingml.document)/i,
};
