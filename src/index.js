import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import './config/ReactotronConfig';

import AlertHelper from '~/components/AlertHelper';

// import after reactotron for saga monitor!
import { store, persistor } from './store';

// wraper for <Routes> acess redux store
import App from './App';

export default function Index() {
  return (
    <>
      <Provider store={store}>
        {/* <PersistGate> holds render before redux state load */}
        <PersistGate persistor={persistor}>
          <StatusBar
            barStyle="light-content"
            background
            backgroundColor="#19161f"
          />
          <App />
          {/* <DropdownAlert
          ref={ref => AlertHelper.setDropDown(ref)}
          closeInterval={3000}
        /> */}
        </PersistGate>
      </Provider>
      <DropdownAlert
        defaultContainer={{
          padding: 8,
          paddingTop: StatusBar.currentHeight,
          flexDirection: 'row',
        }}
        ref={ref => AlertHelper.setDropDown(ref)}
        closeInterval={3000}
        onClose={() => AlertHelper.invokeOnClose()}
      />
    </>
  );
}
