import React, { useEffect } from "react"
import { View, StyleSheet } from "react-native";
import { Text } from "tamagui";
import { useDispatch, useSelector } from "react-redux"
import { loadingError } from "../../reduxState/error/loadingErrorSlice";

export default function PopUpAxios() {

    const typeMessage = useSelector((state) => state.message.messageType)
    const textMessage = useSelector((state) => state.message.messageText)
    const dispatch = useDispatch()
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(loadingError(false))
        }, 2000);
        return () => clearInterval(interval);
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ ...styles.secondContainer, backgroundColor: typeMessage === "SUCCESS" ? "#CFFDBC" : "#D34146" }}>
                <Text style={{ fontSize: 16, alignSelf: "center", color: typeMessage === "SUCCESS" ? "black" : "white" }}>{textMessage}</Text>
            </View>
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
        backgroundColor: "#D34146",
        borderRadius: 25,
        height: 40,
        width: "80%"
    }
})