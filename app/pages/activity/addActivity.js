import React, { useState, useRef } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Input, Button, Checkbox, Form } from "tamagui"
import { Check } from '@tamagui/lucide-icons'
import axios from "axios"
import { addActivity } from "../../axiosPath/axiosPath"
import { useForm, SubmitHandler, FormProvider, Controller } from "react-hook-form"
import LinkedGoalSelect from "../../components/activity/linkedGoalSelect"
import TimeFrameSelect from "../../components/activity/timeFrameSelect"

export default function AddActivity({ UserId, SuccessOrError }) {

  const [activateGoal, setActivateGoal] = useState(false)
  const [showGoalNameInput, setShowGoalNameInput] = useState(false)
  let createNewGoal = false

  const { control, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = async (data) => {
    try {
      if (activateGoal == true) {
        createNewGoal = data.selectedIdGoal !== 0 ? false : true
      } else {
        createNewGoal = false
        data.GoalsId = 0
      }
      const response = await axios.post(addActivity, { params: { ActivityName: data.activityName, Timer: data.timer, GoalsId: data.selectedIdGoal, CreateNewGoal: createNewGoal, GoalName: data.newGoalName, TimeFrame: data.timeFrame, Frequence: data.Frequence, UserId: UserId } })
      if (response.data == 1) {
          SuccessOrError("SUCCESS", "Activity successfully created !")
      } else {
        SuccessOrError("ERROR", "An unexpected error occurred")
      }
    } catch (err) {
      console.log(err)
      SuccessOrError("ERROR", "An unexpected error occurred")
    }
  }

  const changeActive = () => {
    setActivateGoal(prevState => !prevState)
  }

  return (
    <>
      <View>
        <Text sixe="$4">Create a new activity</Text>
        <FormProvider {...control}>
          <Form>
            <Controller
              name="activityName"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Activity name"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={{ width: "100%", backgroundColor: "white", marginTop: 10, marginBottom: 10, color: "black", height: 50 }}
                />
              )}
            />
            <View style={{ ...styles.checkboxContainer, marginTop: 10 }}>
              <View style={styles.line}>
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
              </View>
              <View style={styles.line}>
                <Text color={"black"}>Link this activity to a goal ?</Text>
                <Controller
                  name="linkGoal"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox size="$6" color={"black"} onCheckedChange={(isChecked) => { onChange(isChecked); changeActive() }} >
                      <Checkbox.Indicator>
                        <Check />
                      </Checkbox.Indicator>
                    </Checkbox>
                  )} />
              </View>
            </View>
            {activateGoal &&
              <>
                <Controller
                  name="selectedIdGoal"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <LinkedGoalSelect setShowGoalNameInput={setShowGoalNameInput} onChange={onChange} />
                  )} />
                {showGoalNameInput &&
                  <Controller
                    name="newGoalName" control={control} render={({ field: { onChange, onBlur, value } }) => (
                      <Input placeholder="Goal name" style={styles.inputField} value={value} onBlur={onBlur} onChangeText={onChange} />
                    )} />
                }
                <View style={styles.line}>
                  <Controller
                    name="timeFrame" control={control} render={({ field: { onChange, onBlur, value } }) => (
                      <TimeFrameSelect onChange={onChange} />
                    )} />
                  <Controller
                    name="Frequence" control={control} render={({ field: { onChange, onBlur, value } }) => (
                      <Input placeholder="Frequency" style={styles.inputField} value={value} onBlur={onBlur} onChangeText={onChange} keyboardType="numeric" />
                    )} />
                </View>
              </>
            }
            <Button style={{ backgroundColor: "#DD7A34", marginTop: 1, height: 50 }} onPress={handleSubmit(onSubmit)}>Save</Button>
          </Form>
        </FormProvider>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  checkboxContainer: {
    display: "flex",
    flexDirection: "column"
  },
  line: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  inputField: {
    backgroundColor: "white",
    color: "black",
    flexGrow: 1,
    height: 50
  }
})