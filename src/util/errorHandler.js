// import NetInfo from '@react-native-community/netinfo';

export const getError = err => {
  // const { isConnected } = await NetInfo.fetch();
  // const isConnected = await NetInfo.isConnected.fetch();

  // if (isConnected) {
  //   return 'Você está offline, verifique sua conexão';
  // }

  if (!err || !err.response || !err.response.data || !err.response.data.error)
    return 'Erro Interno';

  const { error } = err.response.data;

  if (error.user_msg) {
    return error.user_msg;
  }

  switch (typeof error) {
    case 'string':
      return error;
    default: {
      if (error.length && error.length > 0) return error[0];

      return false;
    }
  }
};
