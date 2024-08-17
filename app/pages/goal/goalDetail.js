import React, { useState } from "react"
import { View, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router"
import LinkedActivity from '../../components/goal/linkedActivity';
import GoalForm from "../../components/goalComponent/goalForm";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios"
import useGetUserId from "../../hooks/useGetUserId";
import PageHeader from "../../components/pageHeader";
import { getUserGoalByID } from "../../axiosPath/axiosPath";
import LinkedActivityStats from "../../components/goalComponent/linkedActivityStats";

export default function GoalDetail() {

    const { goalID } = useLocalSearchParams();
    const router = useRouter()
    const UserId = useGetUserId()
    const linkedActivity = [];
    const queryClient = useQueryClient();

    const { data: goalInfo, isLoading } = useQuery({
        queryFn: async () => LoadGoalInfo(),
        queryKey: ["userGoal", goalID],
    })

    const LoadGoalInfo = async () => {
        const response = await axios.get(getUserGoalByID, { params: { GoalsID: goalID, UserID: UserId } });
        return response.data[0]
    };

    const SuccessOrError = (type, message, refresh) => {
        if (createNewActivityOrGoal == 0) {
            queryClient.invalidateQueries('activityList')
            console.log(refresh)
            if (refresh == true) {
                queryClient.invalidateQueries('goalList')
            }
            dispatch(noMoreActivityData(false))
            dispatch(resetActivityOffset())
        } else {
            queryClient.invalidateQueries('goalList')
            if (refresh == true) {
                queryClient.invalidateQueries('activityList')
            }
            dispatch(noMoreGoalData(false))
            dispatch(resetGoalOffset())
        }
        dispatch(Message({ messageType: type, messageText: message }));
        dispatch(loadingError(true));
        setOpen(false);
    };

    return (
        <>
            <View style={{ height: "95%" }}>
                <ScrollView>
                    <View style={{ backgroundColor: "#222121", padding: 0 }}>
                        <PageHeader Title={goalInfo?.GoalName} />
                        <View style={{ padding: 20 }}>
                            {goalInfo?.TimeFrameID &&
                                <LinkedActivityStats goalID={goalID} TimeFrameID={goalInfo.TimeFrameID} />
                            }
                        </View>
                    </View>
                    <View style={{ padding: 20 }}>
                        {!isLoading && <GoalForm UserID={UserId} SuccessOrError={SuccessOrError} goalID={goalID} />}
                    </View>
                </ScrollView >
            </View>
        </>
    )
}
