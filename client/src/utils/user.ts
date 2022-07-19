import apiConfig from '../apiConfig/apiConfig';
import getClientDate from './dateParser';

const handleUserStatus = async (id: string, userToWriteId: number) => {
  if (+id === userToWriteId) {
    const userStatus: string = await apiConfig.getUserStatus(+id);
    if (userStatus !== 'online') {
      const dateOnlineObject = getClientDate(userStatus);
      const dateOnlineString = `last seen in ${dateOnlineObject.hours}:${dateOnlineObject.minutes}`;
      return dateOnlineString;
    }
    return userStatus;

  }
};

export default handleUserStatus;
