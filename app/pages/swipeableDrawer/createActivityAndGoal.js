import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import AddActivity from '../activity/addActivity';
import AddGoal from '../goal/addGoal';
import { Sheet, Text, Button, SizableText } from 'tamagui';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Message } from '../../reduxState/message/messageSlice';
import { loadingError } from '../../reduxState/error/loadingErrorSlice';
import { noMoreActivityData } from '../../reduxState/offset/hasMoreDataActivity';
import { noMoreGoalData } from '../../reduxState/offset/hasMoreDataGoal';
import { resetActivityOffset } from '../../reduxState/offset/activityOffsetSlice';
import { resetGoalOffset } from '../../reduxState/offset/goalOffsetSlice';
import { useQueryClient } from 'react-query';

export default function CreateActivityAndGoal({ open, setOpen, position, setPosition }) {
  const [createNewActivityOrGoal, setCreateNewActivityOrGoal] = useState(0);
  const dispatch = useDispatch();
  const User = useSelector((state) => state.login.user);
  const UserId = User.user[0].UserID;
  const queryClient = useQueryClient();

  const SuccessOrError = (type, message) => {
    if (createNewActivityOrGoal == 0) {
      queryClient.invalidateQueries('activityList')
      dispatch(noMoreActivityData(false))
      dispatch(resetActivityOffset())
    } else {
      queryClient.invalidateQueries('goalList')
      dispatch(noMoreGoalData(false))
      dispatch(resetGoalOffset())
    }
    dispatch(Message({ messageType: type, messageText: message }));
    dispatch(loadingError(true));
    setOpen(false);
  };

  return (
    <>
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        position={position}
        onPositionChange={setPosition}
        snapPoints={['fit']}
        snapPointsMode="fit"
        dismissOnSnapToBottom>
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center" style={{ backgroundColor: 'white' }}>
          {/* <Sheet.Handle /> */}
          <View style={{ width: '100%', height: '100%', backgroundColor: 'white', padding: 20 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: 0,
                paddingBottom: 2,
                alignItems: 'center',
                gap: 20,
              }}>
              <Button
                icon={<ArrowLeft size="$2" color={'black'} />}
                onPress={() => {
                  setOpen(false);
                }}
                style={{ backgroundColor: 'transparent' }}
              />
              <Pressable onPress={() => setCreateNewActivityOrGoal(0)}>
                <SizableText
                  size="$6"
                  style={{
                    color: createNewActivityOrGoal == 0 ? '#DD7A34' : 'black',
                    textDecorationLine: createNewActivityOrGoal == 0 ? 'underline' : 'none',
                  }}>
                  ACTIVITY
                </SizableText>
              </Pressable>
              <Pressable onPress={() => setCreateNewActivityOrGoal(1)}>
                <SizableText
                  size="$6"
                  style={{
                    color: createNewActivityOrGoal == 1 ? '#DD7A34' : 'black',
                    textDecorationLine: createNewActivityOrGoal == 1 ? 'underline' : 'none',
                  }}>
                  GOAL
                </SizableText>
              </Pressable>
            </View>
            {createNewActivityOrGoal == 0 ? (
              <AddActivity UserId={UserId} SuccessOrError={SuccessOrError} />
            ) : (
              <AddGoal UserId={UserId} SuccessOrError={SuccessOrError} />
            )}
          </View>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
