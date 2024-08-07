import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button, Checkbox, Form, Card } from 'tamagui';
import { Check } from '@tamagui/lucide-icons';
import axios from 'axios';
import { addGoal, checkGoalNameDuplicate } from '../../axiosPath/axiosPath';
import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form';
import TimeFrameSelect from '../../components/activity/timeFrameSelect';
import LinkedActivity from '../../components/goal/linkedActivity';

export default function AddGoal({ UserId, SuccessOrError }) {
  const linkedActivity = [];
  const [nameDuplicate, setNameDuplicate] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const checkDuplicate = await axios.get(checkGoalNameDuplicate, {
        params: { UserID: UserId, GoalName: data.goalName },
      });
      console.log(checkDuplicate.data)
      if (checkDuplicate.data == 0) {
        const response = await axios.post(addGoal, {
          params: {
            GoalName: data.goalName,
            LinkActivity: linkedActivity,
            TimeFrame: data.timeFrame,
            Frequence: data.Frequence,
            UserId: UserId,
          },
        });
        if (response.data == 1) {
          SuccessOrError('SUCCESS', 'Goal successfully created !');
        } else {
          SuccessOrError('ERROR', 'An unexpected error occurred');
        }
      } else {
        setNameDuplicate(true);
      }
    } catch (err) {
      console.log(err);
      SuccessOrError('ERROR', 'An unexpected error occurred');
    }
  };

  return (
    <>
      <View>
        <Text sixe="$4">Create a new activity</Text>
        <FormProvider {...control}>
          <Form>
            <Controller
              name="goalName"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Input
                    placeholder="Goal name"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={{
                      width: '100%',
                      backgroundColor: 'white',
                      marginTop: 10,
                      color: 'black',
                      height: 50,
                    }}
                  />
                  {nameDuplicate && <Text color="red">This name already exist</Text>}
                  {errors.goalName && <Text color="red">Select a time frame</Text>}
                </>
              )}
            />
            <>
              <View style={styles.line}>
                <Controller
                  name="timeFrame"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TimeFrameSelect onChange={onChange} />
                  )}
                />
                <Controller
                  name="Frequence"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Frequency"
                      style={styles.inputField}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
              <View style={styles.lineError}>
                {errors.timeFrame && <Text color="red">Select a time frame</Text>}
                {errors.Frequence && <Text color="red">Enter a frequence</Text>}
              </View>
            </>
            <LinkedActivity linkedActivity={linkedActivity} UserId={UserId} />
            <Button
              style={{ backgroundColor: '#DD7A34', marginTop: 1, height: 50 }}
              onPress={handleSubmit(onSubmit)}>
              Save
            </Button>
          </Form>
        </FormProvider>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  inputField: {
    backgroundColor: 'white',
    color: 'black',
    flexGrow: 1,
    height: 50,
  },
  lineError: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
