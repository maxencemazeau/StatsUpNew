import React, { useEffect } from "react"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { isActivityLoading } from '../../../reduxState/offset/activityLoadingSlice';
import { noMoreActivityData } from '../../../reduxState/offset/hasMoreDataActivity';
import { loadingError } from '../../../reduxState/error/loadingErrorSlice';
import { getActivity } from "../../../axiosPath/axiosPath";
import { useQuery, useQueryClient } from 'react-query';

export const  useLoadMoreActivity = async(activityOffset) =>{

    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const hasNoMoreData = useSelector((state) => state.hasMoreActivityData.value)
    const isMoreDataLoading = useSelector((state) => state.isActivityLoading.value)
    
    useEffect(() => {
        if (activityOffset > 0 && !hasNoMoreData && isMoreDataLoading == false) {
        const fetchMoreData = async() =>{
            try {
                dispatch(isActivityLoading(true))
                const response = await axios.get(getActivity, { params: { id: 1, offset: activityOffset } });
                dispatch(noMoreActivityData(response.data.noMoreData))
                queryClient.setQueryData("activityList", oldData => [
                    ...oldData,
                    ...response.data.activity
                ]);
                dispatch(isActivityLoading(false))
            } catch (err) {
                console.log(err)
                dispatch(isActivityLoading(false))
                dispatch(loadingError(true))
            }
        }

        fetchMoreData()
    }
    },[activityOffset])
    
    //return response.data.activity
}