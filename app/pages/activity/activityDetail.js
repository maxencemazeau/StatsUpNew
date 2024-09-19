import React, { useEffect, useState } from "react"
import { View, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from "expo-router"
import { Text } from "tamagui"
import { useQuery } from "react-query";
import axios from "axios"
import ActivityHistory from "../../components/activity/activityHistory";
import ActivityInformation from "../../components/activity/activityInformation";
import { getUserActivityByID } from "../../axiosPath/axiosPath";
import useGetUserId from "../../hooks/useGetUserId";
import ChartFrameSelect from "../../components/charts/chartFrameSelect";
import ActivityChart from "../../components/charts/ActivityChart";
import PageHeader from "../../components/pageHeader";
import useGetUserToken from "../../hooks/useGetUserToken";

export default function ActivityDetail() {

    const { activityID, userIdFromSearch } = useLocalSearchParams();
    const [bestActivityStreak, setBestActivityStreak] = useState(0)
    const [activityStats, setActivityStats] = useState([])
    const UserId = useGetUserId()
    const token = useGetUserToken()
    const [chartTimeFrame, setChartTimeFrame] = useState(1)

    const { data: userActivity, isLoading } = useQuery({
        queryFn: async () => LoadActivity(),
        queryKey: ["userActivity", activityID],
    })

    const LoadActivity = async () => {
        const response = await axios.get(getUserActivityByID, { params: { ActivityID: activityID, UserID: UserId }, headers: { Authorization: `Bearer ${token}` } });
        setActivityStats(response.data.activityStats)
        if (response.data.activityStats.totalTime !== 0) {
            convertFloatToHour(response.data.activityStats.totalTime)
        }
        setBestActivityStreak(response.data.bestStreak)
        return response.data.activity[0]
    };

    const convertFloatToHour = (time) => {

        // Extraire les heures et les minutes à partir du flottant
        const hours = Math.floor(time); // Heures
        const minutes = Math.round((time - hours) * 60); // Minutes

        // Retourner les heures et minutes
        setActivityStats(prevState => ({ ...prevState, Hour: hours, minutes: minutes }))
    }

    return (
        <View style={{ height: '95%' }}>
            <ScrollView >
                <View style={{ backgroundColor: "#191919", padding: 0 }}>
                    <PageHeader Title={userActivity?.ActivityName} UserID={userIdFromSearch} />
                    <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20, width: '50%' }}>
                        <ChartFrameSelect setChartTimeFrame={setChartTimeFrame} />
                    </View>
                    <View style={{ backgroundColor: "#191919" }}>
                        <ActivityChart UserId={UserId} ChartTimeFrame={chartTimeFrame} ActivityId={activityID} />
                    </View>
                </View>
                <View style={{ padding: 20 }}>
                    <View>
                        <View style={{
                            display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: "center",
                            justifyContent: "space-around", gap: 20, border: 1, borderRadius: 10, borderColor: "black", padding: 15,
                            backgroundColor: "white"
                        }}>
                            <View style={styles.statsTextcontainer}>
                                <Text style={styles.statsTextLabel}>Total</Text>
                                <Text style={styles.statsTextValue}>{activityStats.totalActivityCompleted}</Text>
                            </View>
                            <View style={styles.statsTextcontainer}>
                                <Text style={styles.statsTextLabel}>Best Streak</Text>
                                <Text style={styles.statsTextValue}>{bestActivityStreak}</Text>
                            </View>
                            <View style={styles.statsTextcontainer}>
                                <Text style={styles.statsTextLabel}>Reached</Text>
                                <Text style={styles.statsTextValue}>{activityStats.activityNbSucceed} / {activityStats.totalGoalNumber}</Text>
                            </View>
                            <View style={styles.statsTextcontainer}>
                                <Text style={styles.statsTextLabel}>Time</Text>
                                <Text style={styles.statsTextValue}>{activityStats.Hour > 10 ? activityStats.Hour + "h" : activityStats.Hour + "h" + activityStats.minutes}</Text>
                            </View>
                        </View>
                    </View>
                    {(!isLoading && parseInt(userIdFromSearch) === UserId) && <ActivityInformation activityID={activityID} />}
                    <ActivityHistory activityID={activityID} />
                </View>
            </ScrollView >
        </View>
    )
}

const styles = StyleSheet.create({
    statsTextLabel: {
        fontSize: 18,
        color: "#191919"
    },
    statsTextValue: {
        fontSize: 24,
        color: "#DD7A34",
        fontWeight: "bold"
    },
    statsTextcontainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5
    }
})
