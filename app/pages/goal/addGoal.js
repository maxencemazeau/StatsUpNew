import React, { useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Text, Input, Button, Form } from 'tamagui';
import { CheckDuplicate } from '../../utils/CheckDuplicate';
import { useQueryClient } from 'react-query';
import axios from 'axios';
import { addGoal, updateGoal } from '../../axiosPath/axiosPath';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import TimeFrameSelect from '../../components/activity/timeFrameSelect';
import LinkedActivity from '../../components/goal/linkedActivity';

export default function AddGoal({ UserId, SuccessOrError, goalID = 0, token }) {

  const [linkedActivity, setLinkedActivity] = useState([])
  const [nameDuplicate, setNameDuplicate] = useState(false);
  const [hasGoalChanged, setHasGoalChanged] = useState(false);
  let userGoal = []

  const defaultValues = {
    goalName: '',
    timeFrame: 0,
    frequence: '',
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });
  const onSubmit = async (data) => {
    try {
      Keyboard.dismiss()

      let response = []
      const checkDuplicate = await CheckDuplicate("Goal", data.goalName, UserId, token)

      if (checkDuplicate == 0) {
        response = await axios.post(addGoal, {
          GoalName: data.goalName,
          LinkActivity: linkedActivity,
          TimeFrame: data.timeFrame,
          Frequence: data.frequence,
          UserId: UserId,
        }, { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data == 1) {
          setHasGoalChanged(false)
          SuccessOrError('SUCCESS', `Goal successfully created !`);
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

  const checkGoalChanged = (inputName, inputValue) => {
    switch (inputName) {
      case "goalName":
        if (inputValue !== defaultValues.goalName) {
          setHasGoalChanged(true)
        }
        break;
      case "timeFrame":
        if (inputValue !== defaultValues.timeFrame) {
          setHasGoalChanged(true)
        }
        break;
      case "frequence":
        if (inputValue !== defaultValues.frequence) {
          setHasGoalChanged(true)
        }
        break;
    }
  }


  return (
    <>
      <View>
        {goalID === 0 &&
          <Text sixe="$4">Create a new goal</Text>
        }
        <FormProvider {...control}>
          <Form>
            <Text style={styles.TextStyle}>Goal name</Text>
            <Controller
              name="goalName"
              control={control}
              rules={{ required: true, maxLength: 20 }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Input
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(text) => { onChange(text); checkGoalChanged("goalName", text) }}
                    style={{
                      width: '100%',
                      backgroundColor: 'white',
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
                <View style={styles.inputWithText}>
                  <Text style={styles.TextStyle}>Time frame</Text>
                  <Controller
                    name="timeFrame"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TimeFrameSelect onChange={onChange} defaultValue={userGoal.TimeFrameID} checkGoalChanged={checkGoalChanged} />
                    )}
                  />
                </View>
                <View style={styles.inputWithText}>
                  <Text style={styles.TextStyle}>Frequence</Text>
                  <Controller
                    name="frequence"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        style={styles.inputField}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={(text) => { onChange(text); checkGoalChanged("frequence", text) }}
                        keyboardType="numeric"
                      />
                    )}
                  />
                </View>
              </View>
              <View style={styles.lineError}>
                {errors.timeFrame && <Text color="red">Select a time frame</Text>}
                {errors.frequence && <Text color="red">Enter a frequence</Text>}
              </View>
            </>
            <LinkedActivity setLinkedActivity={setLinkedActivity} linkedActivity={linkedActivity} UserId={UserId} GoalID={goalID} token={token} />
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
  TextStyle: {
    color: "black",
    marginBottom: 5,
    marginTop: 15
  },
  inputWithText: {
    flex: 1
  },
});
