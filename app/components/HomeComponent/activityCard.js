import React, { useEffect, useState } from "react"
import { View, StyleSheet, TouchableWithoutFeedback, Pressable } from "react-native";
import { useRouter } from "expo-router"
import { getActivity, deleteActivity, deleteActivityHistory, addActivityHistory } from "../../axiosPath/axiosPath";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useQueryClient } from "react-query";
import { Check, Trash2 } from "@tamagui/lucide-icons";
import HomeCardSkeleton from "../skeleton/homeCardSkeleton";
import { Message } from '../../reduxState/message/messageSlice';
import { Card, Button, SizableText, Paragraph, Separator } from "tamagui";
import { loadingError } from "../../reduxState/error/loadingErrorSlice";
import { cancelPopUp } from "../../reduxState/popUp/cancelPopUpSlice";
import { showDelete } from "../../reduxState/popUp/showDelete";
import useGetUserId from "../../hooks/useGetUserId";
import { todayFormattedDate } from "../../utils/todayFormattedDate";
import { AddRoute } from "../../reduxState/navigation/routingSlice";
import { startTimer, stopTimer, resetTimer } from '../../reduxState/timer/timer';
import { getCurrentTime } from "../../utils/getCurrentTime";

export default function ActivityCard({ activityOffset, appState }) {

    const showDeleteIcon = useSelector((state) => state.showDelete.value)
    const isMoreDataLoading = useSelector((state) => state.isActivityLoading.value)
    const queryClient = useQueryClient();
    const dispatch = useDispatch()
    const UserId = useGetUserId()
    const FormattedDate = todayFormattedDate('fullDate');
    const [activityListDuplicate, setActivityListDuplicate] = useState([])
    const [activityPressed, setActivityPressed] = useState(0)
    const router = useRouter()
    const isRunning = useSelector(state => state.timer.isRunning);
    const [time, setTime] = useState(0)
    const timer = useSelector((state) => state.timer.startHour)
    const timerActivityId = useSelector((state) => state.timer.activityId)

    const { data: activityList, isLoading } = useQuery({
        queryFn: async () => LoadUserActivies(),
        queryKey: ["activityList"],
        staleTime: Infinity,
    })

    const LoadUserActivies = async () => {
        const response = await axios.get(getActivity, { params: { id: UserId, offset: 0 } });
        return response.data.activity
    };

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

    const updateActivityChecked = async (id, count, historyID) => {
        const FormattedDate = todayFormattedDate('fullDate')

        const foundActivity = activityList.find(activity =>
            activity.ActivityID === id && activity.TimeStamp === FormattedDate
        );
        const foundInDuplicate = activityListDuplicate?.find(activityDuplicate => activityDuplicate.ActivityID === id)
        if (foundActivity !== undefined) {
            queryClient.setQueryData('activityList', oldData => {
                if (!oldData) return;
                return oldData.map(activities =>
                    activities.ActivityID === id ? { ...activities, TimeStamp: null, Count: count - 1 } : activities
                );
            });
        } else {
            queryClient.setQueryData('activityList', oldData => {
                if (!oldData) return;
                return oldData.map(activities =>
                    activities.ActivityID === id ? { ...activities, TimeStamp: FormattedDate, Count: count + 1 } : activities
                );
            });
        }

        const getActivityFrequence = activityList.find(activity => activity.ActivityID === id);

        if (foundInDuplicate !== undefined) {
            if (foundActivity !== undefined) {
                setActivityListDuplicate(prevState => prevState.map(activities => (
                    activities.ActivityID === id ? { ...activities, TimeStamp: FormattedDate, Count: count - 1, ActivityHistoryID: historyID, action: 0, Frequence: getActivityFrequence.Frequence } : activities
                )))
            } else {
                setActivityListDuplicate(prevState => prevState.map(activities => (
                    activities.ActivityID === id ? { ...activities, TimeStamp: FormattedDate, Count: count + 1, ActivityHistoryID: historyID, action: 1, Frequence: getActivityFrequence.Frequence } : activities
                )))
            }
        } else {
            if (foundActivity !== undefined) {
                setActivityListDuplicate(prevState => [...prevState, { ActivityID: id, TimeStamp: FormattedDate, Count: count - 1, ActivityHistoryID: historyID, action: 0, Frequence: getActivityFrequence.Frequence }])
            } else {
                setActivityListDuplicate(prevState => [...prevState, { ActivityID: id, TimeStamp: FormattedDate, Count: count + 1, ActivityHistoryID: historyID, action: 1, Frequence: getActivityFrequence.Frequence }])
            }
        }
    }

    const updateActivityHistory = async () => {
        for (i = 0; i < activityListDuplicate.length; i++) {
            if (activityListDuplicate[i].action !== 0) {
                await axios.post(addActivityHistory, {
                    params: {
                        ActivityHistoryID: activityListDuplicate[i].ActivityHistoryID,
                        ActivityID: activityListDuplicate[i].ActivityID, TimeStamp: activityListDuplicate[i].TimeStamp,
                        Count: activityListDuplicate[i].Count, Frequence: activityListDuplicate[i].Frequence,
                        UserID: UserId
                    }
                })
            } else {
                await axios.delete(deleteActivityHistory, {
                    params: {
                        ActivityHistoryID: activityListDuplicate[i].ActivityHistoryID,
                        ActivityID: activityListDuplicate[i].ActivityID, TimeStamp: activityListDuplicate[i].TimeStamp, Count: activityListDuplicate[i].Count
                    }
                })
            }
        }
    }



    useEffect(() => {
        if (appState == "background") {
            updateActivityHistory()
        } else {
            setActivityListDuplicate([])
            if (timer !== 0) {
                const now = new Date();
                const hours = now.getHours().toString().padStart(2, '0'); // Ajoute un zéro devant si nécessaire
                const minutes = now.getMinutes().toString().padStart(2, '0'); // Ajoute un zéro devant si nécessaire
                const seconds = now.getSeconds().toString().padStart(2, '0'); // Ajoute un zéro devant si nécessaire

                const currentTime = `${hours}:${minutes}:${seconds}`; // Format HH:MM:SS
                setTime(subtractTimes(currentTime, timer));
            }
        }
    }, [appState])

    useEffect(() => {
        if (timer !== 0 && timerActivityId !== 0) {
            setActivityPressed(timerActivityId)
            const currentTime = getCurrentTime()
            setTime(subtractTimes(currentTime, timer));
        }
    }, [])

    function timeToSeconds(time) {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return (hours * 3600) + (minutes * 60) + seconds;
    }

    function subtractTimes(time1, time2) {
        const timeInSeconds1 = timeToSeconds(time1);
        const timeInSeconds2 = timeToSeconds(time2);

        // Calculate the difference in seconds
        return Math.abs(timeInSeconds1 - timeInSeconds2);
    }

    const navigateToDetails = async (activityID) => {
        await updateActivityHistory()
        setActivityListDuplicate([])
        dispatch(AddRoute('/pages/home/home'))
        router.push({
            pathname: '/pages/activity/activityDetail',
            params: { activityID: activityID, userIdFromSearch: UserId }
        });
    }

    const handleTimerPress = (activityID, Count, ActivityHistoryID) => {
        const currentTime = getCurrentTime()
        if (activityPressed === activityID) {
            setActivityPressed(0)
            setTime(0)
            dispatch(stopTimer(currentTime))
            updateActivityChecked(activityID, Count, ActivityHistoryID)
        } else {
            if (activityPressed !== 0) {
                updateActivityChecked(activityPressed, Count, ActivityHistoryID)
            }
            setActivityPressed(activityID)
            setTime(0)
            dispatch(resetTimer())
            dispatch(startTimer({ currentTime, activityID }))

        }
    }

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!isRunning && time !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning, time]);

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <>
            <View style={styles.container}>
                {activityList?.map(activities => (
                    <Card key={activities.ActivityID} style={styles.card}>
                        {showDeleteIcon && <Button style={styles.trashContainer} onPress={() => deleteUserActivity(activities.ActivityID)}><Trash2 color={"red"} size="$2" /></Button>}
                        <TouchableWithoutFeedback onPress={() => navigateToDetails(activities.ActivityID)} onLongPress={() => handlePressOut()}>
                            <Card.Header style={styles.cardHeader}>
                                <View>
                                    <SizableText style={styles.typography} size={"$6"} fontWeight="800">{activities.ActivityName}</SizableText>
                                    {activities.GoalName !== null ?
                                        <Paragraph style={styles.typography}>{activities.GoalName} : {activities.Count === null ? 0 : activities.Count}/{activities.Frequence}</Paragraph>
                                        :
                                        <Paragraph style={styles.typography}>No goal linked</Paragraph>}
                                </View>
                                <Button icon={<Check size="$1" />} style={{ backgroundColor: activities.TimeStamp === FormattedDate ? "#DD7A34" : "grey", borderRadius: 25, height: 50 }}
                                    onPress={() => updateActivityChecked(activities.ActivityID, activities.Count, activities.ActivityHistoryID)} />
                            </Card.Header>
                        </TouchableWithoutFeedback>
                        <Separator />
                        <Pressable style={{ ...styles.cardHeader, paddingLeft: 20, paddingTop: 10, paddingBottom: 10, paddingRight: 20 }} onPress={() => handleTimerPress(activities.ActivityID, activities.Count, activities.ActivityHistoryID)}>
                            <SizableText size={'$6'} style={{ color: activityPressed === activities.ActivityID ? "red" : "green", fontWeight: "bold" }}>
                                {activityPressed === activities.ActivityID ? "STOP" : "START"}
                            </SizableText>
                            <Paragraph style={styles.typography}>{activityPressed === activities.ActivityID ? formatTime(time) : 0}</Paragraph>
                        </Pressable>
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
    },
    typography: {
        color: "black",
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