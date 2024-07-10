import React, { useState } from "react"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { getActivity, deleteActivity } from "../../axiosPath/axiosPath";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useQueryClient } from "react-query";
import { ArrowRight, Trash2 } from "@tamagui/lucide-icons";
import HomeCardSkeleton from "../skeleton/homeCardSkeleton";
import { Message } from '../../reduxState/message/messageSlice';
import { useLoadMoreActivity } from "../../hooks/apiCall/activity/loadMoreActivity";
import { Separator, Card, Button, SizableText, Paragraph } from "tamagui";
import { loadingError } from "../../reduxState/error/loadingErrorSlice";

export default function ActivityCard({ activityOffset }) {

    // const [timer, setTimer] = useState(false)
    // const [timerText, setTimerText] = useState("START")
    const [trashVisible, setTrashVisible] = useState(false)
    const isMoreDataLoading = useSelector((state) => state.isActivityLoading.value)
    const queryClient = useQueryClient();
    const dispatch = useDispatch()
    const User = useSelector((state) => state.login.user)
    const UserId = User.user[0].UserID

    useLoadMoreActivity(activityOffset)

    const { data: activityList, isLoading } = useQuery({
        queryFn: async () => LoadUserActivies(),
        queryKey: ["activityList"],
        staleTime: Infinity,
    })

    const LoadUserActivies = async () => {
        const response = await axios.get(getActivity, { params: { id: UserId, offset: 0 } });
        return response.data.activity
    };

    // const changeTimer = () => {
    //     if (timer == false) {
    //         setTimer(true);
    //         setTimerText("STOP")
    //     } else {
    //         setTimer(false);
    //         setTimerText("START")
    //     }

    // }

    const handlePressOut = () => {
        setTrashVisible(true)
    };

    const deleteUserActivity = async (id) => {
        try {
            setTrashVisible(false)
            const response = await axios.delete(deleteActivity, { params: { id } })
            if (response.data === "SUCCESS") {
                queryClient.setQueryData('activityList', oldData => oldData.filter(activity => activity.ActivityID !== id))
                dispatch(Message({ messageType: "SUCCESS", messageText: "Activity deleted" }));
                dispatch(loadingError(true))
            } else {
                dispatch(Message({ messageType: "ERROR", messageText: "An error occurred !" }));
                dispatch(loadingError(true))
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <View style={styles.container}>
                {activityList?.map(activities => (
                    <Card key={activities.ActivityID} style={styles.card}>
                        {trashVisible && <Button style={styles.trashContainer} onPress={() => deleteUserActivity(activities.ActivityID)}><Trash2 color={"red"} size="$1" /></Button>}
                        <TouchableWithoutFeedback onLongPress={() => handlePressOut()}>
                            <Card.Header style={styles.cardHeader}>
                                <View>
                                    <SizableText style={styles.typography} size={"$6"} fontWeight="800">{activities.ActivityName}</SizableText>
                                    {activities.GoalName !== null ?
                                        <Paragraph style={styles.typography}>{activities.GoalName} : 0/{activities.Frequence}</Paragraph>
                                        :
                                        <Paragraph style={styles.typography}>No goal linked</Paragraph>}
                                </View>
                                <Button icon={<ArrowRight size="$1" />} style={{ backgroundColor: "#DD7A34", borderRadius: 25, height: 50 }} />
                            </Card.Header>
                            {/* {activities.Timer &&
                        <View style={{paddingRight:18, paddingLeft:18}}>
                            <Separator />
                            <View style={{...styles.cardHeader, paddingTop:10}}>     
                                <SizableText size={"$6"} color={timer == true ? 'red' : 'green'} fontWeight="800" onPress={() => changeTimer()}>{timerText}</SizableText>
                                <Paragraph color={"black"}>10:00:00</Paragraph>
                            </View>
                        </View>} */}
                        </TouchableWithoutFeedback>
                    </Card>

                ))}
                {isMoreDataLoading && <HomeCardSkeleton />}
            </View >
        </>
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
        top: -10,
        left: -10,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 50,
        height: 35,
        width: 35
    }
})