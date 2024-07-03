import React, { useState, useRef } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Input, Button, Checkbox, Form, Card } from "tamagui"
import { Check } from '@tamagui/lucide-icons'
import axios from "axios"
import { addGoal } from "../../axiosPath/axiosPath"
import { useForm, SubmitHandler, FormProvider, Controller } from "react-hook-form"
import TimeFrameSelect from "../../components/activity/timeFrameSelect"
import LinkedActivity from "../../components/goal/linkedActivity"

export default function AddGoal({ UserId }) {

    const [showActivityList, setShowActivityList] = useState(false)
    const linkedActivity = []

    const { control, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(addGoal, { params: { GoalName: data.goalName, LinkActivity: linkedActivity, TimeFrame: data.timeFrame, Frequence: data.Frequence, UserId: UserId } })
        } catch (err) {
            console.log(err)
        }
    }

    const changeLinkActivity = () => {
        setShowActivityList(prevState => !prevState)
    }

    return (
        <>
            <View>
                <Text sixe="$4">Create a new activity</Text>
                <FormProvider {...control}>
                    <Form>
                        <Controller
                            name="goalName"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    placeholder="Goal name"
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    style={{ width: "100%", backgroundColor: "white", marginTop: 10, marginBottom: 10, color: "black", height: 50 }}
                                />
                            )}
                        />
                        <View style={{ ...styles.checkboxContainer, marginTop: 10 }}>
                            <View style={styles.line}>
                                <Text color={"black"}>Link this goal to an/mutilple activities ?</Text>
                                <Controller
                                    name="LinkActivity"
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Checkbox size="$6" onCheckedChange={(isChecked) => { onChange(isChecked); changeLinkActivity() }}>
                                            <Checkbox.Indicator>
                                                <Check />
                                            </Checkbox.Indicator>
                                        </Checkbox>
                                    )} />
                            </View>
                        </View>
                        <>
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
                        {showActivityList &&
                            <LinkedActivity linkedActivity={linkedActivity} UserId={UserId}/>
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
    },
})