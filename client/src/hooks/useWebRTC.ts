import { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../context/socketContext';
import { RootState } from '../store/store';
import { IAnswer, ICandidate, IOffer } from '../types/rtc';

const LOCAL_VIDEO = 'LOCAL_VIDEO';
const REMOTE_VIDEO = 'REMOTE_VIDEO';

const useWebRTC = (video: boolean, offerFrom?: IOffer) => {
  const activeUserId = useSelector((state: RootState) => state.activeUser.userId);
  const userToWriteId = useSelector((state: RootState) => state.users.userToWrite.userId);
  const socket = useContext(SocketContext);

  const openConnection = () => {
    const connection = new RTCPeerConnection({
      iceServers: [{ urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ] }]});
    return connection;
  };
  const peerConnection = openConnection();

  const handleCandidate = (candidate: ICandidate) => {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate.candidate));
  };

  const handleAnswer = async (answer: IAnswer) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer.answer));
  };

  const handleOffer = async (offer: IOffer) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer.offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('answerRTCToServer', {
      from: offer.to,
      to: offer.from,
      answer,
    });
  };

  const setLocalVideo = (localStream: any) => {
    const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];
    if (localVideoElement) {
      localVideoElement.srcObject = localStream;
      localVideoElement.volume = 0;
    }
  };

  const setRemoteVideo = (remoteStream: any) => {
    const remoteVideoElement = peerMediaElements.current.REMOTE_VIDEO;
    if (remoteVideoElement) {
      remoteVideoElement.srcObject = remoteStream;
    }
  };

  const remoteMediaStream = useRef<MediaStream | null>(null);
  const localMediaStream = useRef<MediaStream | null>(null);
  const peerMediaElements = useRef<any>({
    [LOCAL_VIDEO]: null,
    [REMOTE_VIDEO]: null,
  });

  useEffect(()=> {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({ audio: true, video });
      localMediaStream.current.getTracks().forEach(track => peerConnection.addTrack(
        track,
        localMediaStream.current!,
      ));
      setLocalVideo(localMediaStream.current);
      peerConnection.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit('candidateRTCToServer', {
            from: activeUserId,
            to: offerFrom ? offerFrom.from : userToWriteId,
            candidate: e.candidate.toJSON(),
          });
        }
      };

      remoteMediaStream.current = new MediaStream();
      peerConnection.ontrack = (e) => {
        e.streams.forEach((s) => {
          s.getTracks().forEach((t) => {
            remoteMediaStream.current?.addTrack(t);
          });
        });
      };
      setRemoteVideo(remoteMediaStream.current);

      if (offerFrom) {
        await handleOffer(offerFrom);
      } else {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit('joinRTCRoomToServer', {
          from: activeUserId,
          to: userToWriteId,
          offer,
        });
        socket.on('answerRTCToClient', async (answer: IAnswer) => {
          await handleAnswer(answer);
        });
      }
      socket.on('candidateRTCToClient', (candidate: ICandidate) => {
        handleCandidate(candidate);
      });

    };
    startCapture();

    return (
      () => {
        peerConnection.close();
        localMediaStream.current?.getTracks().forEach(track => track.stop());
        remoteMediaStream.current?.getTracks().forEach(track => track.stop());
        socket.emit('disconnectRTCToServer', {
          from: activeUserId,
          to: offerFrom ? offerFrom.from : userToWriteId,
        });
        socket.removeListener('answerRTCToClient');
        socket.removeListener('candidateRTCToClient');
      }
    );
  }, []);

  const provideMediaRef = (id: any, node: any)=> {
    peerMediaElements.current[id] = node;
  };

  return { provideMediaRef, client: LOCAL_VIDEO, remoteClient: REMOTE_VIDEO };
};

export default useWebRTC;
