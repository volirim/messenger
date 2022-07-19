import React, { useState } from 'react';
import './styles.css';

import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../Modal/Modal';
import FileUpload from '../FileUpload';
import { IfilesConfig, imageConfig, textConfig, videoConfig } from '../../constants/filesConfigs';

const PinButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileConfig, setFileConfig] = useState<IfilesConfig>(imageConfig);

  return (
    <div className='input-pinButton'>
      <FontAwesomeIcon icon={faClipboard}></FontAwesomeIcon>
      <ul className='input-pinMenu'>
        <li className='input-pinMenuItem' onClick={() => {setIsOpen(true); setFileConfig(imageConfig);}}>select image</li>
        <li className='input-pinMenuItem' onClick={() => {setIsOpen(true); setFileConfig(videoConfig);}}>select video</li>
        <li className='input-pinMenuItem' onClick={() => {setIsOpen(true); setFileConfig(textConfig);}}>select file</li>
      </ul>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <FileUpload fileConfig={fileConfig} />
      </Modal>
    </div>
  );
};

export default PinButton;
