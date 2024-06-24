import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./navigation/navigationSlice"
import activityOffsetReducer from "./offset/activityOffsetSlice"
import goalOffsetReducer from "./offset/goalOffsetSlice";
import hasMoreActivityDataReducer from "./offset/hasMoreDataActivity";
import hasMoreGoalDataReducer from "./offset/hasMoreDataGoal";
import loginReducer from './authentication/loginSlice';
import isActivityLoadingReducer from "./offset/activityLoadingSlice";
import isGoalLoadingReducer from "./offset/goalLoadingSlice";
import loadingErrorReducer from "./error/loadingErrorSlice";

export const store = configureStore({
    reducer: {
        navigation : navigationReducer,
        activityOffset: activityOffsetReducer,
        goalOffset: goalOffsetReducer,
        hasMoreActivityData : hasMoreActivityDataReducer,
        hasMoreGoalData : hasMoreGoalDataReducer,
        login: loginReducer,
        isActivityLoading : isActivityLoadingReducer,
        isGoalLoading : isGoalLoadingReducer,
        loadingError : loadingErrorReducer
    },
});

