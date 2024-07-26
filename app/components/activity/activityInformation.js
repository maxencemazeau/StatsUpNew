import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Input, Button, Label, Form, SizableText } from 'tamagui'
import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { CheckDuplicate } from '../../utils/CheckDuplicate';
import LinkedGoalSelect from './linkedGoalSelect';
import TimeFrameSelect from './timeFrameSelect';
import axios from 'axios'
import useGetUserId from '../../hooks/useGetUserId';

export default function ActivityInformation() {

    const [nameDuplicate, setNameDuplicate] = useState(false);
    const [showGoalNameInput, setShowGoalNameInput] = useState(false);
    const UserId = useGetUserId()
    let checkActivityDuplicate = 0
    let checkGoalDuplicate = 0
    let createNewGoal = false;

    const queryClient = useQueryClient();

    // Get the cached data from the query key
    const userActivity = queryClient.getQueryData(['userActivity']) || {};
    console.log("userActivity:", userActivity); // Debugging line
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            activityName: userActivity?.ActivityName || '',
            selectedIdGoal: userActivity?.selectedIdGoal || 0,
            newGoalName: userActivity?.GoalName || '',
            timeFrame: userActivity?.Frame || '',
            Frequence: userActivity?.Frequence || '',
        }
    });

    useEffect(() => {
        if (userActivity) {
            if (userActivity.GoalName) {
                setShowGoalNameInput(true);
            }
        }
    }, [userActivity]);


    const onSubmit = async (data) => {
        try {
            checkActivityDuplicate = await CheckDuplicate("Activity", data.activityName, UserId)

            if (checkActivityDuplicate == 0) {
                if (data.selectedIdGoal !== 0) {
                    createNewGoal = false
                } else {
                    createNewGoal = true
                    checkGoalDuplicate = await CheckDuplicate("Goal", data.newGoalName, UserId)
                }

                if (checkGoalDuplicate == 0) {

                    const response = await axios.post(addActivity, {
                        params: {
                            ActivityName: data.activityName,
                            GoalsId: data.selectedIdGoal,
                            CreateNewGoal: createNewGoal,
                            GoalName: data.newGoalName,
                            TimeFrame: data.timeFrame,
                            Frequence: data.Frequence,
                            UserId: UserId,
                        },
                    });
                    if (response.data.success == 1) {
                        SuccessOrError('SUCCESS', 'Activity successfully created !', createNewGoal);
                    } else {
                        SuccessOrError('ERROR', 'An unexpected error occurred');
                    }
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
            <View style={{ marginTop: 20 }}>
                <SizableText color={"black"} style={{ fontWeight: "bold" }} size="$6">Activity details</SizableText>
                <FormProvider {...control}>
                    <Form>
                        <Controller
                            name="activityName"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <Label style={styles.labelStyle}>Activity Name</Label>
                                    <Input
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={(Text) => {
                                            onChange(Text);
                                            setNameDuplicate(false);
                                        }}
                                        style={{
                                            width: '100%',
                                            backgroundColor: 'white',
                                            color: 'black',
                                            height: 50,
                                        }}
                                    />
                                    {nameDuplicate && <Text color="red">This name already exist</Text>}
                                    {errors.activityName && <Text color="red">The activity name is required</Text>}
                                </>
                            )}
                        />
                        <Controller
                            name="selectedIdGoal"
                            control={control}
                            rules={{ required: false }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <LinkedGoalSelect
                                        defaultValue={userActivity.GoalsID}
                                        setShowGoalNameInput={setShowGoalNameInput}
                                        onChange={onChange}
                                        UserId={UserId}
                                    />
                                    {errors.selectedIdGoal && (
                                        <Text color="red">Select a goal for the activity</Text>
                                    )}
                                </>
                            )}
                        />
                        {showGoalNameInput && (
                            <>
                                <Controller
                                    name="newGoalName"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <>
                                            <Label style={styles.labelStyle}>Goal name</Label>
                                            <Input
                                                style={styles.inputField}
                                                value={value}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                            />
                                            {errors.newGoalName && <Text color="red">The goal name is required</Text>}
                                        </>
                                    )}
                                />
                                <View style={styles.line}>
                                    <View style={styles.inputWithLabel}>
                                        <Label style={styles.labelStyle}>Time frame</Label>
                                        <Controller
                                            name="timeFrame"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TimeFrameSelect onChange={onChange} defaultValue={userActivity.TimeFrameID} />
                                            )}
                                        />
                                    </View>
                                    <View style={styles.inputWithLabel}>
                                        <Label style={styles.labelStyle}>Frequence</Label>
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
                                </View>
                                <View style={styles.lineError}>
                                    {errors.timeFrame && <Text color="red">Select a time frame</Text>}
                                    {errors.Frequence && <Text color="red">Enter a frequence</Text>}
                                </View>
                            </>
                        )
                        }
                        <Button
                            style={{ backgroundColor: '#DD7A34', marginTop: 15, height: 50 }}
                            onPress={handleSubmit(onSubmit)}>
                            Save
                        </Button>
                    </Form >
                </FormProvider >
            </View >
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
    inputWithLabel: {
        flex: 1
    },
    labelStyle: {
        color: "black",
    }
});