export const getError = err => {
  if (!err || !err.response || !err.response.data || !err.response.data.error)
    return 'Erro Interno';

  const { error } = err.response.data;

  if (error.user_msg) {
    return err.response.data.error.user_msg;
  }

  switch (typeof error) {
    case 'string':
      return error;
    default: {
      if (error.length && error.length > 0) return error[0];

      return 'Erro Interno';
    }
  }
};
