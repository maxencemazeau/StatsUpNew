import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button, Checkbox, Form } from 'tamagui';
import { Check } from '@tamagui/lucide-icons';
import axios from 'axios';
import { addActivity, checkActivityNameDuplicate } from '../../axiosPath/axiosPath';
import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form';
import LinkedGoalSelect from '../../components/activity/linkedGoalSelect';
import TimeFrameSelect from '../../components/activity/timeFrameSelect';

export default function AddActivity({ UserId, SuccessOrError }) {
  const [activateGoal, setActivateGoal] = useState(false);
  const [nameDuplicate, setNameDuplicate] = useState(false);
  const [showGoalNameInput, setShowGoalNameInput] = useState(false);
  let createNewGoal = false;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const checkDuplicate = await axios.get(checkActivityNameDuplicate, {
        params: { UserID: UserId, ActivityName: data.activityName },
      });

      if (checkDuplicate.data == 0) {
        if (activateGoal == true) {
          createNewGoal = data.selectedIdGoal !== 0 ? false : true;
        } else {
          createNewGoal = false;
          data.GoalsId = 0;
        }
        const response = await axios.post(addActivity, {
          params: {
            ActivityName: data.activityName,
            Timer: data.timer,
            GoalsId: data.selectedIdGoal,
            CreateNewGoal: createNewGoal,
            GoalName: data.newGoalName,
            TimeFrame: 0,
            Frequence: data.Frequence,
            UserId: UserId,
          },
        });
        if (response.data.success == 1) {
          SuccessOrError('SUCCESS', 'Activity successfully created !');
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

  const changeActive = () => {
    setActivateGoal((prevState) => !prevState);
  };

  return (
    <>
      <View>
        <Text sixe="$4">Create a new activity</Text>
        <FormProvider {...control}>
          <Form>
            <Controller
              name="activityName"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Input
                    placeholder="Activity name"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(Text) => {
                      onChange(Text);
                      setNameDuplicate(false);
                    }}
                    style={{
                      width: '100%',
                      backgroundColor: 'white',
                      marginTop: 10,
                      marginBottom: 10,
                      color: 'black',
                      height: 50,
                    }}
                  />
                  {nameDuplicate && <Text color="red">This name already exist</Text>}
                  {errors.activityName && <Text color="red">The activity name is required</Text>}
                </>
              )}
            />
            <View style={{ ...styles.checkboxContainer, marginTop: 10 }}>
              {/* <View style={styles.line}>
                <Text color={"black"}>Timer options ?</Text>
                <Controller
                  name="timer"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox size="$6" onCheckedChange={onChange}>
                      <Checkbox.Indicator>
                        <Check />
                      </Checkbox.Indicator>
                    </Checkbox>
                  )} />
              </View> */}
              <View style={styles.line}>
                <Text color={'black'}>Link this activity to a goal ?</Text>
                <Button icon={activateGoal && <Check />} style={{ backgroundColor: "black", color: "white", width: 15, height: 30 }} onPress={() => changeActive()} />
                {/* <Controller
                  name="linkGoal"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox
                      size="$6"
                      color={'black'}
                      onCheckedChange={(isChecked) => {
                        onChange(isChecked);
                        changeActive();
                      }}>
                      <Checkbox.Indicator>
                        <Check />
                      </Checkbox.Indicator>
                    </Checkbox>
                  )}
                /> */}
              </View>
            </View>
            {activateGoal && (
              <>
                <Controller
                  name="selectedIdGoal"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <LinkedGoalSelect
                        setShowGoalNameInput={setShowGoalNameInput}
                        onChange={onChange}
                      />
                      {errors.selectedIdGoal && (
                        <Text color="red">Select a goal for the activity</Text>
                      )}
                    </>
                  )}
                />
                {showGoalNameInput && (
                  <Controller
                    name="newGoalName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        <Input
                          placeholder="Goal name"
                          style={styles.inputField}
                          value={value}
                          onBlur={onBlur}
                          onChangeText={onChange}
                        />
                        {errors.newGoalName && <Text color="red">The goal name is required</Text>}
                      </>
                    )}
                  />
                )}
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
            )}
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
    marginBottom: 10,
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
