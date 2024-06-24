import React, { useEffect } from "react"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { noMoreGoalData } from "../../../reduxState/offset/hasMoreDataGoal";
import { loadingError } from '../../../reduxState/error/loadingErrorSlice';
import { getUserGoals } from "../../../axiosPath/axiosPath";
import { useQueryClient } from 'react-query';
import { isGoalLoading } from "../../../reduxState/offset/goalLoadingSlice";

export const  useLoadMoreGoal = async(goalOffset) =>{

    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const hasNoMoreData = useSelector((state) => state.hasMoreGoalData.value)
    const isMoreDataLoading = useSelector((state) => state.isGoalLoading.value)
    
    useEffect(() => {
        if (goalOffset > 0 && !hasNoMoreData && isMoreDataLoading == false) {
        const fetchMoreData = async() =>{
            try {
                dispatch(isGoalLoading(true))
                const response = await axios.get(getUserGoals, { params: { id: 1, offset: goalOffset } });
                dispatch(noMoreGoalData(response.data.noMoreData))
                queryClient.setQueryData("goalList", oldData => [
                    ...oldData,
                    ...response.data.goal
                ]);
                dispatch(isGoalLoading(false))
    
            } catch (err) {
                console.log(err)
                dispatch(isGoalLoading(false))
                dispatch(loadingError(true))
            }
        }

        fetchMoreData()
    }
    },[goalOffset])
    
}