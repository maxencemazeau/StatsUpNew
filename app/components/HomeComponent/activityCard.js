import React, { useEffect, useState } from "react"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useRouter } from "expo-router"
import { getActivity, deleteActivity, deleteActivityHistory, addActivityHistory } from "../../axiosPath/axiosPath";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useQueryClient } from "react-query";
import { Check, Trash2 } from "@tamagui/lucide-icons";
import HomeCardSkeleton from "../skeleton/homeCardSkeleton";
import { Message } from '../../reduxState/message/messageSlice';
import { Card, Button, SizableText, Paragraph } from "tamagui";
import { loadingError } from "../../reduxState/error/loadingErrorSlice";
import { cancelPopUp } from "../../reduxState/popUp/cancelPopUpSlice";
import { showDelete } from "../../reduxState/popUp/showDelete";
import useGetUserId from "../../hooks/useGetUserId";
import { FormattedDate } from "../../utils/formattedDate";

export default function ActivityCard({ activityOffset, appState }) {

    const showDeleteIcon = useSelector((state) => state.showDelete.value)
    const isMoreDataLoading = useSelector((state) => state.isActivityLoading.value)
    const queryClient = useQueryClient();
    const dispatch = useDispatch()
    const UserId = useGetUserId()
    const formattedDate = FormattedDate('fullDate');
    const [activityListDuplicate, setActivityListDuplicate] = useState([])
    const router = useRouter()

    const { data: activityList, isLoading } = useQuery({
        queryFn: async () => LoadUserActivies(),
        queryKey: ["activityList"],
        staleTime: Infinity,
    })

    const LoadUserActivies = async () => {
        const response = await axios.get(getActivity, { params: { id: UserId, offset: 0 } });
        return response.data.activity
    };

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

    const updateActivityChecked = async (id, count, historyID) => {
        const formattedDate = FormattedDate('fullDate')

        const foundActivity = activityList.find(activity =>
            activity.ActivityID === id && activity.TimeStamp === formattedDate
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
                    activities.ActivityID === id ? { ...activities, TimeStamp: formattedDate, Count: count + 1 } : activities
                );
            });
        }

        const getActivityFrequence = activityList.find(activity => activity.ActivityID === id);

        if (foundInDuplicate !== undefined) {
            if (foundActivity !== undefined) {
                setActivityListDuplicate(prevState => prevState.map(activities => (
                    activities.ActivityID === id ? { ...activities, TimeStamp: formattedDate, Count: count - 1, ActivityHistoryID: historyID, action: 0, Frequence: getActivityFrequence.Frequence } : activities
                )))
            } else {
                setActivityListDuplicate(prevState => prevState.map(activities => (
                    activities.ActivityID === id ? { ...activities, TimeStamp: formattedDate, Count: count + 1, ActivityHistoryID: historyID, action: 1, Frequence: getActivityFrequence.Frequence } : activities
                )))
            }
        } else {
            if (foundActivity !== undefined) {
                setActivityListDuplicate(prevState => [...prevState, { ActivityID: id, TimeStamp: formattedDate, Count: count - 1, ActivityHistoryID: historyID, action: 0, Frequence: getActivityFrequence.Frequence }])
            } else {
                setActivityListDuplicate(prevState => [...prevState, { ActivityID: id, TimeStamp: formattedDate, Count: count + 1, ActivityHistoryID: historyID, action: 1, Frequence: getActivityFrequence.Frequence }])
            }
        }
    }

    useEffect(() => {
        const updateActivityHistory = async () => {
            if (appState == "background") {
                for (i = 0; i < activityListDuplicate.length; i++) {
                    if (activityListDuplicate[i].action !== 0) {
                        console.log(activityListDuplicate[i])
                        await axios.post(addActivityHistory, {
                            params: {
                                ActivityHistoryID: activityListDuplicate[i].ActivityHistoryID,
                                ActivityID: activityListDuplicate[i].ActivityID, TimeStamp: activityListDuplicate[i].TimeStamp,
                                Count: activityListDuplicate[i].Count, Frequence: activityListDuplicate[i].Frequence,
                                UserID: UserId
                            }
                        })
                    } else {
                        console.log("delete")
                        await axios.delete(deleteActivityHistory, {
                            params: {
                                ActivityHistoryID: activityListDuplicate[i].ActivityHistoryID,
                                ActivityID: activityListDuplicate[i].ActivityID, TimeStamp: activityListDuplicate[i].TimeStamp, Count: activityListDuplicate[i].Count
                            }
                        })
                    }
                }
            } else {
                setActivityListDuplicate([])
            }
        }

        updateActivityHistory()
    }, [appState])

    const navigateToDetails = (activityID) => {
        router.push({
            pathname: '/pages/activity/activityDetail',
            params: { activityID: activityID }
        });
    }

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
                                <Button icon={<Check size="$1" />} style={{ backgroundColor: activities.TimeStamp === formattedDate ? "#DD7A34" : "grey", borderRadius: 25, height: 50 }}
                                    onPress={() => updateActivityChecked(activities.ActivityID, activities.Count, activities.ActivityHistoryID)} />
                            </Card.Header>
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