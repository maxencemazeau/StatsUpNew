import React, { useEffect, useState } from "react"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { getActivity, deleteActivity, updateCompletedActivity } from "../../axiosPath/axiosPath";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useQueryClient } from "react-query";
import { Check, Trash2 } from "@tamagui/lucide-icons";
import HomeCardSkeleton from "../skeleton/homeCardSkeleton";
import { Message } from '../../reduxState/message/messageSlice';
import { useLoadMoreActivity } from "../../hooks/apiCall/activity/loadMoreActivity";
import { Separator, Card, Button, SizableText, Paragraph } from "tamagui";
import { loadingError } from "../../reduxState/error/loadingErrorSlice";
import { cancelPopUp } from "../../reduxState/popUp/cancelPopUpSlice";
import { showDelete } from "../../reduxState/popUp/showDelete";

export default function ActivityCard({ activityOffset, appState }) {

    // const [timer, setTimer] = useState(false)
    // const [timerText, setTimerText] = useState("START")
    const showDeleteIcon = useSelector((state) => state.showDelete.value)
    const isMoreDataLoading = useSelector((state) => state.isActivityLoading.value)
    const queryClient = useQueryClient();
    const dispatch = useDispatch()
    const User = useSelector((state) => state.login.user)
    const UserId = User.user[0].UserID
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const day = String(today.getDate()).padStart(2, '0');
    console.log(appState)
    const formattedDate = `${year}-${month}-${day}`;
    const [activityListDuplicate, setActivityListDuplicate] = useState([])
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

    useEffect(() => {
        if (appState === "background") {

        }
    }, [appState])

    const handlePressOut = () => {
        dispatch(showDelete(true))
        dispatch(cancelPopUp(true))
    };

    const deleteUserActivity = async (id) => {
        try {
            dispatch(showDelete(false))
            dispatch(cancelPopUp(false))
            const response = await axios.delete(deleteActivity, { params: { id } })
            if (response.data === "SUCCESS") {
                queryClient.setQueryData('activityList', oldData => oldData.filter(activity => activity.ActivityID !== id))
                dispatch(Message({ messageType: "SUCCESS", messageText: "Activity deleted" }));
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

    const toggleActivityChecked = async (id) => {
        const foundActivity = activityList.find(activity =>
            activity.ActivityID === id && activity.TimeStamp === formattedDate
        );
        const foundInDuplicate = activityListDuplicate?.find(activityDuplicate => activityDuplicate.ActivityID === id)
        if (foundActivity !== undefined) {
            queryClient.setQueryData('activityList', oldData => {
                if (!oldData) return;
                return oldData.map(activities =>
                    activities.ActivityID === id ? { ...activities, TimeStamp: null } : activities
                );
            });
        } else {
            queryClient.setQueryData('activityList', oldData => {
                if (!oldData) return;
                return oldData.map(activities =>
                    activities.ActivityID === id ? { ...activities, TimeStamp: formattedDate } : activities
                );
            });
        }

        if (foundInDuplicate !== undefined) {
            if (foundActivity !== undefined) {
                setActivityListDuplicate(prevState => prevState.map(activities => (
                    activities.ActivityID === id ? { ...activities, TimeStamp: null } : activities
                )))
            } else {
                setActivityListDuplicate(prevState => prevState.map(activities => (
                    activities.ActivityID === id ? { ...activities, TimeStamp: formattedDate } : activities
                )))
            }
        } else {
            if (foundActivity !== undefined) {
                setActivityListDuplicate(prevState => [...prevState, { ActivityID: id, TimeStamp: null }])
            } else {
                setActivityListDuplicate(prevState => [...prevState, { ActivityID: id, TimeStamp: formattedDate }])
            }
        }
    }

    console.log(activityListDuplicate)
    return (
        <>
            <View style={styles.container}>
                {activityList?.map(activities => (
                    <Card key={activities.ActivityID} style={styles.card}>
                        {showDeleteIcon && <Button style={styles.trashContainer} onPress={() => deleteUserActivity(activities.ActivityID)}><Trash2 color={"red"} size="$2" /></Button>}
                        <TouchableWithoutFeedback onLongPress={() => handlePressOut()}>
                            <Card.Header style={styles.cardHeader}>
                                <View>
                                    <SizableText style={styles.typography} size={"$6"} fontWeight="800">{activities.ActivityName}</SizableText>
                                    {activities.GoalName !== null ?
                                        <Paragraph style={styles.typography}>{activities.GoalName} : 0/{activities.Frequence}</Paragraph>
                                        :
                                        <Paragraph style={styles.typography}>No goal linked</Paragraph>}
                                </View>
                                <Button icon={<Check size="$1" />} style={{ backgroundColor: activities.TimeStamp === formattedDate ? "#DD7A34" : "grey", borderRadius: 25, height: 50 }}
                                    onPress={() => toggleActivityChecked(activities.ActivityID)} />
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
        top: -20,
        left: -20,
        backgroundColor: "#00000000",
        borderRadius: 50,
        height: 50,
        width: 50
    }
})