import React from "react"
import { getAllActivityGoalStats } from "../../axiosPath/axiosPath";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios"
import { View } from "react-native"
import { Separator, Text } from "tamagui"

export default function LinkedActivityStats({ goalID, TimeFrameID }) {
    const { data: activitiesStats, isLoading } = useQuery({
        queryFn: async () => LoadActivitiesStats(),
        queryKey: ["activitiesStats", goalID],
    })

    const LoadActivitiesStats = async () => {
        const response = await axios.get(getAllActivityGoalStats, { params: { GoalID: goalID, TimeFrame: TimeFrameID } });
        return response.data
    };

    console.log(activitiesStats)
    return (
        <>
            {activitiesStats?.map(activities => (
                <View key={activitiesStats.ActivityID} style={{ marginBottom: 5 }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>{activities?.ActivityName}</Text>
                    <Text style={{ color: "white", fontWeight: "bold" }}>{activities?.totalActivityCompleted}</Text>
                    <Text style={{ color: "white", fontWeight: "bold" }}>{activities?.BestStreak}</Text>
                    <Text style={{ color: "white", fontWeight: "bold" }}>{activities?.activityNbSucceed} / {activities.totalGoalNumber}</Text>
                    <Separator alignSelf="stretch" borderBottomWidth={2} borderColor="white" />
                </View>
            ))}
        </>
    )
}