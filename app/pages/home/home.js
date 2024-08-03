import React, { useEffect, useState } from 'react';
import { ScrollView, View, AppState } from 'react-native';
import ActivityCard from '../../components/HomeComponent/activityCard';
import GraphCard from '../../components/HomeComponent/graphCard';
import HomeNavigation from '../../navigation/homeNavigation';
import ProgressBar from '../../components/HomeComponent/progressBar';
import TopHomeBar from '../../components/HomeComponent/topHomeBar';
import { useSelector, useDispatch } from 'react-redux';
import GoalCard from '../../components/HomeComponent/goalCard';
import { incrementActivityOffset } from '../../reduxState/offset/activityOffsetSlice';
import { incrementGoalOffset } from '../../reduxState/offset/goalOffsetSlice';
import { LoadMoreActivity } from '../../hooks/apiCall/activity/loadMoreActivity';
import { useQueryClient } from 'react-query';
import { LoadMoreGoal } from '../../hooks/apiCall/goal/loadMoreGoal';

export default function Home() {
  const active = useSelector((state) => state.navigation.value);
  const dispatch = useDispatch();
  const activityOffset = useSelector((state) => state.activityOffset.value);
  const goalOffset = useSelector((state) => state.goalOffset.value);
  const hasNoMoreActivityData = useSelector((state) => state.hasMoreActivityData.value);
  const hasNoMoreGoalData = useSelector((state) => state.hasMoreGoalData.value);
  const isActivityLoading = useSelector((state) => state.isActivityLoading.value);
  const isGoalLoading = useSelector((state) => state.isGoalLoading.value);
  const loadingError = useSelector((state) => state.loadingError.value);
  const [appState, setAppState] = useState(AppState.currentState);
  const queryClient = useQueryClient()
  const User = useSelector((state) => state.login.user)
  const UserId = User.user[0].UserID
  let newActivityOffset = activityOffset
  let newGoalOffset = goalOffset

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // Effectuer le traitement lorsque l'application revient au premier plan
      } else if (nextAppState.match(/inactive|background/)) {
        // Effectuer le traitement lorsque l'application passe en arrière-plan
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState]);

  const loadMoreData = async (event) => {
    //event.persist();
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (isCloseToBottom(event.nativeEvent)) {
      if (
        active === 'ACTIVITY' &&
        !hasNoMoreActivityData &&
        !isActivityLoading &&
        loadingError == false
      ) {
        dispatch(incrementActivityOffset());
        newActivityOffset += 6
        LoadMoreActivity(dispatch, queryClient, newActivityOffset, hasNoMoreActivityData, isActivityLoading, UserId)
      }

      if (active !== 'ACTIVITY' && !hasNoMoreGoalData && !isGoalLoading && loadingError == false) {
        dispatch(incrementGoalOffset());
        newGoalOffset += 6
        LoadMoreGoal(dispatch, queryClient, newGoalOffset, UserId)
      }
    }
  };

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  return (
    <View style={{ height: '95%' }}>
      <ScrollView onScroll={loadMoreData} scrollEventThrottle={16}>
        <TopHomeBar />
        <GraphCard />
        <ProgressBar />
        <HomeNavigation />
        {active === 'ACTIVITY' ? (
          <ActivityCard activityOffset={activityOffset} appState={appState} />
        ) : (
          <GoalCard goalOffset={goalOffset} />
        )}
      </ScrollView>
    </View>
  );
}
