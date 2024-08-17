import axios from 'axios';
import { noMoreGoalData } from "../../../reduxState/offset/hasMoreDataGoal";
import { loadingError } from '../../../reduxState/error/loadingErrorSlice';
import { getUserGoals } from "../../../axiosPath/axiosPath";
import { isGoalLoading } from "../../../reduxState/offset/goalLoadingSlice";

export const LoadMoreGoal = async (dispatch, queryClient, goalOffset, UserId) => {

    try {
        dispatch(isGoalLoading(true))
        const response = await axios.get(getUserGoals, { params: { id: UserId, offset: goalOffset } });
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

