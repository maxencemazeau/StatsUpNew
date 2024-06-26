import React, { useEffect } from 'react';
import { Slot } from 'expo-router';
import { View } from 'react-native';
import BottomMenu from '../navigation/bottomMenu'
import PopUpAxiosError from './error/popUpAxiosError';
import { useSelector, useDispatch } from 'react-redux';
import {loadingError} from '../reduxState/error/loadingErrorSlice';

function Layout() {

  const error = useSelector((state) => state.loadingError.value)

  return (
    <>
      <View style={{ height: '100%', width: '100%', padding: 0 }}>
        <Slot />
      </View>
      {error && <PopUpAxiosError />}
      <BottomMenu />
    </>
  );
}

export default Layout
