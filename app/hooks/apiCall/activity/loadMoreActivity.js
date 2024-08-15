import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { isActivityLoading } from '../../../reduxState/offset/activityLoadingSlice';
import { noMoreActivityData } from '../../../reduxState/offset/hasMoreDataActivity';
import { loadingError } from '../../../reduxState/error/loadingErrorSlice';
import { getActivity } from "../../../axiosPath/axiosPath";
import { useQuery, useQueryClient } from 'react-query';

export const LoadMoreActivity = async (dispatch, queryClient, activityOffset, hasNoMoreData, isMoreDataLoading, UserId) => {
    console.log("ici")
    // const dispatch = useDispatch()
    // const queryClient = useQueryClient()
    // const hasNoMoreData = useSelector((state) => state.hasMoreActivityData.value)
    // const isMoreDataLoading = useSelector((state) => state.isActivityLoading.value)
    // const User = useSelector((state) => state.login.user)
    // const UserId = User.user[0].UserID

    //useEffect(() => {
    //if (activityOffset > 0 && !hasNoMoreData && isMoreDataLoading == false) {
    //const fetchMoreData = async () => {
    try {
        dispatch(isActivityLoading(true))
        const response = await axios.get(getActivity, { params: { id: UserId, offset: activityOffset } });
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
    //}

    //fetchMoreData()
    //}
    //}, [activityOffset])

    //return response.data.activity
}