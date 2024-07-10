import React, { useState } from "react"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { ArrowRight, Trash2 } from "@tamagui/lucide-icons";
import { Card, Button, SizableText, Paragraph } from "tamagui";
import { getUserGoals, deleteGoal } from "../../axiosPath/axiosPath"
import { useQuery, useQueryClient } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { Message } from '../../reduxState/message/messageSlice';
import axios from 'axios'
import HomeCardSkeleton from "../skeleton/homeCardSkeleton";
import { useLoadMoreGoal } from "../../hooks/apiCall/goal/loadMoreGoal";
import { loadingError } from "../../reduxState/error/loadingErrorSlice";
import { cancelPopUp } from "../../reduxState/popUp/cancelPopUpSlice";
import { showDelete } from "../../reduxState/popUp/showDelete";

export default function GoalCard({ goalOffset }) {

    const isMoreDataLoading = useSelector((state) => state.isGoalLoading.value)
    const showDeleteIcon = useSelector((state) => state.showDelete.value)
    const queryClient = useQueryClient();
    const dispatch = useDispatch()
    const User = useSelector((state) => state.login.user)
    const UserId = User.user[0].UserID
    useLoadMoreGoal(goalOffset)

    const { data: goalList } = useQuery({
        queryFn: async () => LoadUserGoals(),
        queryKey: ["goalList"],
        staleTime: Infinity
    })

    const LoadUserGoals = async () => {
        const response = await axios.get(getUserGoals, { params: { id: UserId, offset: 0 } });
        return response.data.goal
    };

    const handlePressOut = () => {
        dispatch(showDelete(true))
        dispatch(cancelPopUp(true))
    };

    const deleteUserGoal = async (id) => {
        try {
            dispatch(showDelete(false))
            dispatch(cancelPopUp(false))
            const response = await axios.delete(deleteGoal, { params: { id } })
            if (response.data === "SUCCESS") {
                queryClient.setQueryData('goalList', oldData => oldData.filter(goal => goal.GoalsID !== id))
                dispatch(Message({ messageType: "SUCCESS", messageText: "Goal deleted" }));
                dispatch(loadingError(true))
            } else {
                dispatch(showDelete(false))
                dispatch(cancelPopUp(false))
                dispatch(Message({ messageType: "ERROR", messageText: "An error occurred !" }));
                dispatch(loadingError(true))
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <View style={styles.container}>
            {goalList?.map(goals => (
                <Card key={goals.GoalsID} style={styles.card}>
                    {showDeleteIcon && <Button style={styles.trashContainer} onPress={() => deleteUserGoal(goals.GoalsID)}><Trash2 color={"red"} size="$2" /></Button>}
                    <TouchableWithoutFeedback onLongPress={() => handlePressOut()}>
                        <Card.Header style={styles.cardHeader}>
                            <View>
                                <SizableText style={styles.typography} size={"$6"} fontWeight="800">{goals.GoalName}</SizableText>
                                <Paragraph style={styles.typography}>{goals.Frame} : 0/{goals.Frequence}</Paragraph>
                            </View>
                            <Button icon={<ArrowRight size="$1" />} style={{ backgroundColor: "#DD7A34", borderRadius: 25, height: 50 }} />
                        </Card.Header>
                    </TouchableWithoutFeedback>
                </Card>
            ))}
            {isMoreDataLoading && <HomeCardSkeleton />}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    card: {
        backgroundColor: "white",
        marginBottom: 15
    },
    cardHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 10
    },
    typography: {
        color: "black"
    },
    trashContainer: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: -20,
        left: -20,
        backgroundColor: "#00000000",
        borderRadius: 50,
        height: 50,
        width: 50
    }
})