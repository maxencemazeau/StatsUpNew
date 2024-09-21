import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Text } from 'tamagui';
import { useSelector, useDispatch } from 'react-redux';
import { homeNavigation } from '../reduxState/navigation/navigationSlice';
import { showDelete } from '../reduxState/popUp/showDelete';
import { cancelPopUp } from '../reduxState/popUp/cancelPopUpSlice';

export default function HomeNavigation({ }) {

    const active = useSelector((state) => state.navigation.value)
    const dispatch = useDispatch()

    const handleDispatch = (navigateTo) => {
        dispatch(showDelete(false))
        dispatch(cancelPopUp(false))
        dispatch(homeNavigation(navigateTo))
    }

    return (
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", paddingRight: 20, paddingLeft: 20, paddingTop: 20 }}>
            <Text style={{
                ...styles.textStyle,
                color: active === 'ACTIVITY' ? '#DD7A34' : 'black', textDecorationLine: active === 'ACTIVITY' ? "underline" : "none",
                fontWeight: active === 'ACTIVITY' ? "700" : "400"
            }}
                onPress={() => handleDispatch("ACTIVITY")}>ACTIVITY</Text>
            <Text style={{
                ...styles.textStyle,
                fontWeight: active === 'GOALS' ? "700" : "400",
                color: active === 'GOALS' ? '#DD7A34' : 'black', textDecorationLine: active === 'GOALS' ? "underline" : "none"
            }}
                onPress={() => handleDispatch("GOALS")}>GOALS</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    textStyle: {
        textAlign: "center",
        fontSize: 18
    }
})
