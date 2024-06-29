import React, { useState, useRef } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Input, Button, Checkbox, Form } from "tamagui"
import { Check } from '@tamagui/lucide-icons'
import axios from "axios"
import { addActivity } from "../../axiosPath/axiosPath"
import { useForm, SubmitHandler, FormProvider, Controller } from "react-hook-form"
import LinkedGoalSelect from "../../components/activity/linkedGoalSelect"
import TimeFrameSelect from "../../components/activity/timeFrameSelect"

export default function AddActivity() {


  const [activateGoal, setActivateGoal] = useState(false)
  const [showGoalNameInput, setShowGoalNameInput] = useState(false)
  const [timerOption, setTimerOption] = useState(false)
  const [newActivity, setNewActivity] = useState({
    activityName: "",
    timer: false,
    goalId: 0,
    timeFrame: 0,
    frequency: 0,
    userId: 0,
    createNewGoal: false
  })

  const { control, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (data) => console.log(data)

  const changeActive = () => {
    setActivateGoal(prevState => !prevState)
  }

  const clearGoalNameInput = () => {
    if (goalNameInput.current) {
    goalNameInput.current.clear()
    }
  }


  // const changeTimerOption = (e) => {
  //   setTimerOption(prevState => !prevState)
  //   setNewActivity(prevState => ({ ...prevState, timer: timerOption }))
  // }
  // const [age, setAge] = React.useState('');

  // const handleChange = (e) => {
  //   setAge(e.target.value);
  //   if (e.target.value == 0) {
  //     setGoalName(true)
  //     setNewActivity(prevState => ({ ...prevState, goalId: 0, createNewGoal: true }))
  //   } else {
  //     setGoalName(false)
  //     setNewActivity(prevState => ({ ...prevState, goalId: e.target.value, createNewGoal: false }))
  //   }
  // }

  const addNewActivity = async () => {
    const response = await axios.post(addActivity, { params: { ActivityName: newActivity.activityName, Timer: newActivity.timer, GoalsId: newActivity.goalId, CreateNewGoal: newActivity.createNewGoal, UserId: 1 } })
  }

  // const handleTimeFrameChange = () => {
  //   setNewActivity(prevState => ({ ...prevState, timeFrame: e.target.value }))

  //onChange={(e) => setNewActivity(prevState => ({ ...prevState, activityName: e.target.value }))}
  // }

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
                    <LinkedGoalSelect setShowGoalNameInput={setShowGoalNameInput} onChange={onChange} clearGoalNameInput={clearGoalNameInput}/>
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
                      <TimeFrameSelect onChange={onChange}/>
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