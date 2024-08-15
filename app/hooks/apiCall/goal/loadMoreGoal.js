import axios from 'axios';
import { noMoreGoalData } from "../../../reduxState/offset/hasMoreDataGoal";
import { loadingError } from '../../../reduxState/error/loadingErrorSlice';
import { getUserGoals } from "../../../axiosPath/axiosPath";
import { isGoalLoading } from "../../../reduxState/offset/goalLoadingSlice";

export const LoadMoreGoal = async (dispatch, queryClient, goalOffset, UserId) => {

    // const dispatch = useDispatch()
    // const queryClient = useQueryClient()
    // const hasNoMoreData = useSelector((state) => state.hasMoreGoalData.value)
    // const isMoreDataLoading = useSelector((state) => state.isGoalLoading.value)
    // const User = useSelector((state) => state.login.user)
    // const UserId = User.user[0].UserID

    //useEffect(() => {
    //if (goalOffset > 0 && !hasNoMoreData && isMoreDataLoading == false) {
    //const fetchMoreData = async() =>{
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

        //fetchMoreData()
    //}
    //},[goalOffset])
    
//}