import React, { useState, useContext } from 'react'
import { View } from 'react-native';
import { Text } from 'tamagui';
import { useSelector, useDispatch } from 'react-redux';
import { homeNavigation } from '../reduxState/navigation/navigationSlice';

export default function HomeNavigation({}) {

    const active = useSelector((state) => state.navigation.value) 
    const dispatch = useDispatch()

    return (
        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", paddingRight :20, paddingLeft : 20, paddingTop:20 }}>
                <Text style={{ fontWeight: "bold", textAlign:"center", 
                color :active === 'ACTIVITY' ? '#DD7A34' : 'black', textDecorationLine: active === 'ACTIVITY' ? "underline": "none" }} 
                onPress={() => dispatch(homeNavigation("ACTIVITY"))}>ACTIVITY</Text>
                <Text style={{ fontWeight: "bold", textAlign:"center", 
                color : active === 'GOALS' ? '#DD7A34' : 'black', textDecorationLine: active === 'GOALS' ? "underline": "none"}} 
                onPress={() => dispatch(homeNavigation("GOALS"))}>GOALS</Text>
        </View>
    )
}