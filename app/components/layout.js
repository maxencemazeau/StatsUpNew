import React, { useEffect } from 'react';
import { Slot } from 'expo-router';
import { View } from 'react-native';
import BottomMenu from '../navigation/bottomMenu'
import PopUpAxios from './error/popUpAxios';
import { useSelector, useDispatch } from 'react-redux';
import CancelDelete from './popUp/cancelDelete';
import { loadingError } from '../reduxState/error/loadingErrorSlice';

function Layout() {

  const error = useSelector((state) => state.loadingError.value)
  const cancelDelete = useSelector((state) => state.cancelPopUp.value)

  return (
    <>
      <View style={{ height: '100%', width: '100%', padding: 0 }}>
        <Slot />
      </View>
      {error && <PopUpAxios />}
      {cancelDelete && <CancelDelete />}
      <BottomMenu />
    </>

  );
}

export default Layout
