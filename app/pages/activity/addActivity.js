import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Input, Button, Checkbox } from "tamagui"

import { Check } from '@tamagui/lucide-icons'
import axios from "axios"
import { addActivity } from "../../axiosPath/axiosPath"
import { useForm, SubmitHandler } from "react-hook-form"
import LinkedGoalSelect from "../../components/activity/linkedGoalSelect"
import TimeFrameSelect from "../../components/activity/timeFrameSelect"

export default function AddActivity() {



  const [activateGoal, setActivateGoal] = useState(false)
  const [goalName, setGoalName] = useState(false)
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

  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (data) => console.log(data)

  const changeActive = () => {
    setActivateGoal(prevState => !prevState)
  }


  const changeTimerOption = (e) => {
    setTimerOption(prevState => !prevState)
    setNewActivity(prevState => ({ ...prevState, timer: timerOption }))
  }
  const [age, setAge] = React.useState('');

  const handleChange = (e) => {
    setAge(e.target.value);
    if (e.target.value == 0) {
      setGoalName(true)
      setNewActivity(prevState => ({ ...prevState, goalId: 0, createNewGoal: true }))
    } else {
      setGoalName(false)
      setNewActivity(prevState => ({ ...prevState, goalId: e.target.value, createNewGoal: false }))
    }
  }

  const addNewActivity = async () => {
    console.log(newActivity)
    const response = await axios.post(addActivity, { params: { ActivityName: newActivity.activityName, Timer: newActivity.timer, GoalsId: newActivity.goalId, CreateNewGoal: newActivity.createNewGoal, UserId: 1 } })
  }

  const handleTimeFrameChange = () => {
    setNewActivity(prevState => ({ ...prevState, timeFrame: e.target.value }))
  }
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState('apple')
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <View>
        <Text sixe="$4">Create a new activity</Text>
        <Input size="$5"
          placeholder="Activity name"
          style={{ width: "100%", backgroundColor: "white", marginTop: 10, marginBottom: 10, color: "black" }} onChange={(e) => setNewActivity(prevState => ({ ...prevState, activityName: e.target.value }))} />
        <View style={{ ...styles.checkboxContainer, marginTop: 10 }}>
          <View style={styles.line}>
            <Text color={"black"}>Timer options ?</Text>
            <Checkbox size="$6" onCheckedChange={() => changeTimerOption()} >
              <Checkbox.Indicator>
                <Check />
              </Checkbox.Indicator>
            </Checkbox>
          </View>
          <View style={styles.line}>
            <Text color={"black"}>Link this activity to a goal ?</Text>
            <Checkbox size="$6" color={"black"} onCheckedChange={() => changeActive()} >
              <Checkbox.Indicator>
                <Check />
              </Checkbox.Indicator>
            </Checkbox>
          </View>
        </View>
        {activateGoal &&
          <> 
            <LinkedGoalSelect setGoalName={setGoalName}/>
            {goalName && <Input placeholder="Goal name" style={styles.inputField}/>}
            <View style={styles.line}>
                <TimeFrameSelect />
                <Input placeholder="Frequency" style={styles.inputField} />
            </View>
          </>
        }
        <Button style={{ backgroundColor: "#DD7A34", marginTop: 1, height: 50 }} onPress={addNewActivity}>Save</Button>
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
    marginBottom:10,
    alignItems: "center",
    width:"100%",
  },
  inputField: {
    backgroundColor: "white",
    color: "black",
    width:"auto",
    flexGrow:1
  }
})