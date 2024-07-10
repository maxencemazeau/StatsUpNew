import React from "react"
import { View, StyleSheet } from "react-native"
import { Text, Button } from "tamagui"
import { X } from "@tamagui/lucide-icons"
import { useDispatch } from "react-redux"
import { cancelPopUp } from "../../reduxState/popUp/cancelPopUpSlice"
import { showDelete } from "../../reduxState/popUp/showDelete"

export default function CancelDelete() {

    const dispatch = useDispatch()

    const closePopUp = () => {
        dispatch(cancelPopUp(false))
        dispatch(showDelete(false))
    }

    return (
        <View style={styles.container}>
            <Button style={styles.secondContainer} icon={<X size="$4" />} onPress={() => closePopUp()} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        padding: 0,
        bottom: 60,
        width: "100%",
        zIndex: 0,
    },
    secondContainer: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 50,
        height: 60,
        width: "15%",
        backgroundColor: "grey"
    }
})
