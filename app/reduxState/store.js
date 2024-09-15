import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"
import storage from "@react-native-async-storage/async-storage"
import navigationReducer from "./navigation/navigationSlice"
import activityOffsetReducer from "./offset/activityOffsetSlice"
import goalOffsetReducer from "./offset/goalOffsetSlice";
import hasMoreActivityDataReducer from "./offset/hasMoreDataActivity";
import hasMoreGoalDataReducer from "./offset/hasMoreDataGoal";
import loginReducer from './authentication/loginSlice';
import isActivityLoadingReducer from "./offset/activityLoadingSlice";
import isGoalLoadingReducer from "./offset/goalLoadingSlice";
import loadingErrorReducer from "./error/loadingErrorSlice";
import MessageReducer from "./message/messageSlice"
import CancelPopUpReducer from "./popUp/cancelPopUpSlice"
import ShowDeleteReducer from "./popUp/showDelete"
import showDelete from "./popUp/showDelete";
import RoutingReducer from "./navigation/routingSlice"
import timerReducer from './timer/timer'

const loginPersistConfig = {
    key: 'login',
    storage: storage
}

const persistLoginReducer = persistReducer(loginPersistConfig, loginReducer)

export const store = configureStore({
    reducer: {
        navigation: navigationReducer,
        activityOffset: activityOffsetReducer,
        goalOffset: goalOffsetReducer,
        hasMoreActivityData: hasMoreActivityDataReducer,
        hasMoreGoalData: hasMoreGoalDataReducer,
        login: persistLoginReducer,
        isActivityLoading: isActivityLoadingReducer,
        isGoalLoading: isGoalLoadingReducer,
        loadingError: loadingErrorReducer,
        message: MessageReducer,
        cancelPopUp: CancelPopUpReducer,
        showDelete: ShowDeleteReducer,
        globalNavigation: RoutingReducer,
        timer: timerReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore actions related to redux-persist
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

export const persistor = persistStore(store)

