import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Input, Button, Label, Form, SizableText } from 'tamagui'
import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Message } from '../../reduxState/message/messageSlice';
import { loadingError } from '../../reduxState/error/loadingErrorSlice';
import { useQueryClient } from 'react-query';
import { CheckDuplicate } from '../../utils/CheckDuplicate';
import LinkedGoalSelect from './linkedGoalSelect';
import TimeFrameSelect from './timeFrameSelect';
import axios from 'axios'
import { updateActivity, updateGoal } from '../../axiosPath/axiosPath';
import useGetUserId from '../../hooks/useGetUserId';
import { noMoreActivityData } from '../../reduxState/offset/hasMoreDataActivity';
import { noMoreGoalData } from '../../reduxState/offset/hasMoreDataGoal';
import { resetActivityOffset } from '../../reduxState/offset/activityOffsetSlice';
import { resetGoalOffset } from '../../reduxState/offset/goalOffsetSlice';

export default function ActivityInformation({ activityID }) {

    const [activityNameDuplicate, setActivityNameDuplicate] = useState(false);
    const [goalNameDuplicate, setGoalNameDuplicate] = useState(false)
    const [showGoalNameInput, setShowGoalNameInput] = useState(false);
    const [hasActivityChanged, setHasActivityChanged] = useState(false);
    const [hasGoalChanged, setHasGoalChanged] = useState(false);
    const UserId = useGetUserId()
    let checkActivityDuplicate = 0
    let checkGoalDuplicate = 0
    const dispatch = useDispatch()

    const queryClient = useQueryClient();


    // Get the cached data from the query key
    const userActivity = queryClient.getQueryData(['userActivity', activityID]) || {};

    const defaultValues = {
        activityName: userActivity?.ActivityName || '',
        selectedIdGoal: userActivity?.GoalsID || 0,
        newGoalName: userActivity?.GoalName || '',
        timeFrame: userActivity?.TimeFrameID || '',
        Frequence: userActivity?.Frequence || '',
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues
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
            if (hasActivityChanged == true) {
                if (data.activityName !== defaultValues.activityName) {
                    checkActivityDuplicate = await CheckDuplicate("Activity", data.activityName, UserId)
                }
                if (checkActivityDuplicate == 0) {
                    const activityResponse = await axios.put(updateActivity, {
                        params: {
                            ActivityID: activityID,
                            ActivityName: data.activityName,
                            GoalsId: data.selectedIdGoal,
                            UserId: UserId,
                        },
                    });

                    if (activityResponse.data === 1) {
                        dispatch(Message({ messageType: "SUCCESS", messageText: "Activity update" }));
                        dispatch(loadingError(true));
                        queryClient.invalidateQueries('activityList')
                        dispatch(noMoreActivityData(false))
                        dispatch(resetActivityOffset())
                        setHasActivityChanged(false)
                    } else {
                        dispatch(Message({ messageType: "ERROR", messageText: "Error occured while updating" }))
                        dispatch(loadingError(true));
                        setHasGoalChanged(false)
                    }


                } else {
                    setActivityNameDuplicate(true);
                }
            }

            if (hasGoalChanged == true) {
                if (data.newGoalName !== defaultValues.newGoalName) {
                    checkGoalDuplicate = await CheckDuplicate("Goal", data.newGoalName, UserId)
                }

                if (checkGoalDuplicate == 0) {
                    const goalResponse = await axios.put(updateGoal, {
                        params: {
                            GoalsId: data.selectedIdGoal,
                            GoalName: data.newGoalName,
                            TimeFrameID: data.timeFrame,
                            Frequence: data.Frequence,
                            UserId: UserId,
                        }
                    })

                    if (goalResponse.data === 1) {
                        dispatch(Message({ messageType: "SUCCESS", messageText: "Goal updated" }));
                        dispatch(loadingError(true));
                        queryClient.invalidateQueries('goalList')
                        dispatch(noMoreGoalData(false))
                        dispatch(resetGoalOffset())
                        if (defaultValues.timeFrame !== data.TimeFrameID) {
                            queryClient.invalidateQueries('activityList')
                            dispatch(noMoreActivityData(false))
                            dispatch(resetActivityOffset())
                        }
                        setHasGoalChanged(false)
                    } else {
                        dispatch(Message({ messageType: "ERROR", messageText: "Error occured while updating" }))
                        dispatch(loadingError(true));
                        setHasGoalChanged(false)
                    }


                } else {
                    setGoalNameDuplicate(true);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const checkActivityChanged = (inputName, inputValue) => {
        switch (inputName) {
            case "activityName":
                if (inputValue !== defaultValues.activityName) {
                    setHasActivityChanged(true)
                }
                break;
            case "linkedGoal":
                if (inputValue !== defaultValues.selectedIdGoal) {
                    setHasActivityChanged(true)
                }
                break;
        }
    }

    const checkGoalChanged = (inputName, inputValue) => {
        switch (inputName) {
            case "newGoalName":
                if (inputValue !== defaultValues.newGoalName) {
                    setHasGoalChanged(true)
                }
                break;
            case "timeFrame":
                if (inputValue !== defaultValues.timeFrame) {
                    setHasGoalChanged(true)
                }
                break;
            case "frequence":
                if (inputValue !== defaultValues.Frequence) {
                    setHasGoalChanged(true)
                }
                break;
        }
    }

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
                                        onBlur={() => { onBlur(); checkActivityChanged("activityName", value) }}
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
                                    {activityNameDuplicate && <Text color="red">This name already exist</Text>}
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
                                        forUpdate={true}
                                        setShowGoalNameInput={setShowGoalNameInput}
                                        onChange={onChange}
                                        checkActivityChanged={checkActivityChanged}
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
                                                onBlur={() => { onBlur(); checkGoalChanged("newGoalName", value) }}
                                                onChangeText={onChange}
                                            />
                                            {goalNameDuplicate && <Text color="red">The goal name already existe</Text>}
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
                                                <TimeFrameSelect onChange={onChange} defaultValue={userActivity.TimeFrameID} checkGoalChanged={checkGoalChanged} />
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
                                                    onBlur={() => { onBlur(); checkGoalChanged("frequence", value) }}
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