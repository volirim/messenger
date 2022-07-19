import React from 'react';
import useWebRTC from '../../hooks/useWebRTC';
import { IOffer } from '../../types/rtc';
import './styles.css';

interface IvideoChat {
  offerFrom?: IOffer;
  video: boolean;
}

const VideoChat = ({offerFrom, video}: IvideoChat) => {
  const { provideMediaRef, client, remoteClient }  = useWebRTC(video, offerFrom);

  return (
    <div className='videoChatModalContainer'>
      <div className='modal-video'>
        <video className='modal-videoWindow' poster='./assets/icons/userVideo.png' muted autoPlay playsInline ref={instance => {
          provideMediaRef(client, instance);
        }} />
        <video className='modal-videoWindow' autoPlay poster='./assets/icons/userVideo.png' playsInline ref={instance => {
          provideMediaRef(remoteClient, instance);
        }} />
      </div>
    </div>
  );
};

export default VideoChat;
