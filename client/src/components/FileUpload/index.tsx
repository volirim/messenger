import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { IfilesConfig } from '../../constants/filesConfigs';
import { SocketContext } from '../../context/socketContext';
import { sendFilesFunc } from '../../utils/inputAreaFunctions';
import { faFile } from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const uniqId = require('uniqid');
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IFileUpload {
  fileConfig: IfilesConfig
}

// const imageMimeType = /image\/(png|jpg|jpeg)/i;

const FileUpload = ({fileConfig}: IFileUpload) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [imagesList, setImagesList] = useState<{id: number, image: string}[]>([]);
  const [fileDataURL, setFileDataURL] = useState('./assets/backgrounds/upload.svg');
  const socket = useContext(SocketContext);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      console.log(file.type);
      if (!file.type.match(fileConfig.type)) {
      // eslint-disable-next-line no-alert
        alert(`${fileConfig.media} mime type is not valid`);
        return;
      }
      setFile(file);
      e.target.value = '';
    }
  };

  useEffect(() => {
    let fileReader: any, isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const { result } = e.target;
        console.log(result);
        if (result && !isCancel) {
          setImagesList((prev) => [...prev, {id: uniqId(), image: result}]);
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };

  }, [file]);

  const onDeleteButton = (id: number) => {
    const newList = imagesList.filter((img) => img.id !== id);
    setImagesList(newList);
  };

  const hadleSend = async () => {
    if (fileDataURL !== './assets/backgrounds/upload.svg') {
      await sendFilesFunc(imagesList, fileConfig.media, socket);
      setFile(undefined);
      setFileDataURL('./assets/backgrounds/upload.svg');
    }
  };

  return (
    <div className='modal-fileUpload'>
      <h3 className='modal-fileUploadTitle'>Upload your media</h3>
      <div className='fileUploadImagesArea'>
        <div className='modal-fileUploadInput' style={{backgroundImage: 'url(./assets/backgrounds/upload.svg)', backgroundSize: '100%', backgroundPosition: 'center center'}}>
          <input type='file' accept="image/*" multiple={false} onChange={changeHandler} className='modal-imageinput' ref={inputRef} ></input>
        </div>
        <div className='imagesInput-imgContainer'>
          {imagesList.map((image) => (
            <div className='incertedImageContainer' key={image.id} >
              <button className='removeImgButton' id={image.id.toString()} onClick={() => onDeleteButton(image.id)}></button>
              {fileConfig.media === 'image' ? <img src={image.image} className='incertedImage' /> : null}
              {fileConfig.media === 'video' ? <video src={image.image} controls className='incertedImage' /> : null}
              {fileConfig.media === 'application' ? <FontAwesomeIcon icon={faFile} className='incertedImage' /> : null}
            </div>
          ))}
        </div>
      </div>
      <button onClick={hadleSend}>Send pictures</button>
    </div>
  );
};

export default FileUpload;
