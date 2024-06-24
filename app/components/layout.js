import React from 'react';
import { Slot } from 'expo-router';
import { View } from 'react-native';
import BottomMenu from '../navigation/bottomMenu'

function Layout() {

  return (
    <>
      <View style={{ height: '100%', width: '100%', padding: 0 }}>
        <Slot />
      </View>
      <BottomMenu />
    </>
  );
}

export default Layout
