import React, { useState } from "react"
import { View, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router"
import { Message } from "../../reduxState/message/messageSlice";
import { loadingError } from "../../reduxState/error/loadingErrorSlice";
import { noMoreActivityData } from '../../reduxState/offset/hasMoreDataActivity';
import { noMoreGoalData } from '../../reduxState/offset/hasMoreDataGoal';
import { resetActivityOffset } from '../../reduxState/offset/activityOffsetSlice';
import { resetGoalOffset } from '../../reduxState/offset/goalOffsetSlice';
import GoalForm from "../../components/goalComponent/goalForm";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios"
import useGetUserId from "../../hooks/useGetUserId";
import PageHeader from "../../components/pageHeader";
import { getUserGoalByID } from "../../axiosPath/axiosPath";
import LinkedActivityStats from "../../components/goalComponent/linkedActivityStats";
import { useDispatch } from "react-redux";

export default function GoalDetail() {

    const { goalID } = useLocalSearchParams();
    const router = useRouter()
    const UserId = useGetUserId()
    const linkedActivity = [];
    const queryClient = useQueryClient();
    const dispatch = useDispatch()

    const { data: goalInfo, isLoading } = useQuery({
        queryFn: async () => LoadGoalInfo(),
        queryKey: ["userGoal", goalID],
    })

    const LoadGoalInfo = async () => {
        const response = await axios.get(getUserGoalByID, { params: { GoalsID: goalID, UserID: UserId } });
        return response.data[0]
    };

    const SuccessOrError = (type, message, goalName) => {
        queryClient.invalidateQueries('goalList')
        queryClient.invalidateQueries('activityList')
        dispatch(resetActivityOffset())
        dispatch(noMoreActivityData(false))
        dispatch(noMoreGoalData(false))
        dispatch(resetGoalOffset())
        dispatch(Message({ messageType: type, messageText: message }));
        dispatch(loadingError(true));
        console.log(goalInfo)
        queryClient.setQueryData(["userGoal", goalID], oldData => {
            return { ...oldData, GoalName: goalName };
        });
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
