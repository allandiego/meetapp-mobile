import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import * as NavigationService from '~/services/navigation';

import createRouter from './routes';

export default function App() {
  useEffect(() => {
    NavigationService.setNavigator(this.navigator);
  }, []);

  const signed = useSelector(state => state.auth.signed);

  const Routes = createRouter(signed);

  return (
    <Routes
      ref={nav => {
        this.navigator = nav;
      }}
    />
  );
}
