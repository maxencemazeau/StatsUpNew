import React from "react"
import { getAllActivityGoalStats } from "../../axiosPath/axiosPath";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios"
import { View, StyleSheet } from "react-native"
import { Separator, Text } from "tamagui"

export default function LinkedActivityStats({ goalID, TimeFrameID }) {

    const LoadActivitiesStats = async () => {
        const response = await axios.get(getAllActivityGoalStats, { params: { GoalID: goalID, TimeFrame: TimeFrameID } });
        return response.data
    };

    const { data: activitiesStats, isLoading } = useQuery({
        queryFn: async () => LoadActivitiesStats(),
        queryKey: ["activitiesStats", goalID],
    })


    return (
        <>
            {activitiesStats?.map(activities => (
                <View key={activities.ActivityID} style={styles.Container}>
                    <Text style={styles.activityName}>{activities.ActivityName}</Text>
                    <View style={styles.StatsContainer}>
                        <View style={styles.SubStatsContainer}>
                            <Text style={styles.statsTitle}>Total:</Text>
                            <Text style={styles.text}>{activities.totalActivityCompleted}</Text>
                        </View>
                        <View style={styles.SubStatsContainer}>
                            <Text style={styles.statsTitle}>Best streak:</Text>
                            <Text style={styles.text}>{activities.BestStreak}</Text>
                        </View>
                        <View style={styles.SubStatsContainer}>
                            <Text style={styles.statsTitle}>Reached:</Text>
                            <Text style={styles.text}>{activities.activityNbSucceed} / {activities.totalGoalNumber}</Text>
                        </View>
                        <View style={styles.SubStatsContainer}>
                            <Text style={styles.statsTitle}>H:</Text>
                            <Text style={styles.text}>200H</Text>
                        </View>
                    </View>
                </View>
            ))}
        </>
    )
}

const styles = StyleSheet.create({
    Container: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5
    },
    StatsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    SubStatsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5
    },
    activityName: {
        color: "#FFFAFA",
        fontWeight: "bold",
        marginBottom: 5,
        fontSize: 16
    },
    statsTitle: {
        color: "orange",
        fontSize: 14
    },
    text: {
        color: "#FFFAFA",
        fontSize: 14
    }
})