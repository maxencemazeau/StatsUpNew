import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Text, Input, Button, Checkbox, Form, Card } from 'tamagui';
import { Check } from '@tamagui/lucide-icons';
import { CheckDuplicate } from '../../utils/CheckDuplicate';
import { useQueryClient } from 'react-query';
import axios from 'axios';
import { addGoal, checkGoalNameDuplicate, updateGoal } from '../../axiosPath/axiosPath';
import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form';
import TimeFrameSelect from '../../components/activity/timeFrameSelect';
import LinkedActivity from '../../components/goal/linkedActivity';
import useGetUserId from '../../hooks/useGetUserId';

export default function GoalForm({ UserId, SuccessOrError, goalID = 0, token }) {
    //const linkedActivity = [];
    const [linkedActivity, setLinkedActivity] = useState([])
    const [nameDuplicate, setNameDuplicate] = useState(false);
    const [hasGoalChanged, setHasGoalChanged] = useState(false);
    let userGoal = []
    const queryClient = useQueryClient();


    // Get the cached data from the query key
    if (goalID !== 0) {
        userGoal = queryClient.getQueryData(['userGoal', goalID]) || {};
    }

    const defaultValues = {
        goalName: userGoal?.GoalName || '',
        timeFrame: userGoal?.TimeFrameID || 0,
        frequence: userGoal?.Frequence === null ? 0 : userGoal?.Frequence.toString() || '',
    }

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues });
    const onSubmit = async (data) => {
        try {
            Keyboard.dismiss()
            if (hasGoalChanged !== true && linkedActivity.length === 0) {
                return
            }
            let response = []
            const checkDuplicate = await CheckDuplicate("Goal", data.goalName, UserId, token)

            if (checkDuplicate == 0) {
                if (goalID === 0) {
                    response = await axios.post(addGoal, {
                        GoalName: data.goalName,
                        LinkActivity: linkedActivity,
                        TimeFrame: data.timeFrame,
                        Frequence: data.frequence,
                        UserId: UserId,
                    }, { headers: { Authorization: `Bearer ${token}` } }
                    );
                } else {
                    response = await axios.put(updateGoal, {
                        GoalsId: goalID,
                        GoalName: data.goalName,
                        TimeFrameID: data.timeFrame,
                        Frequence: data.frequence,
                        LinkActivity: linkedActivity
                    },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                }
                if (response.data == 1) {
                    setHasGoalChanged(false)
                    if (goalID === 0) {
                        SuccessOrError('SUCCESS', `Goal successfully created !`);
                    } else {
                        SuccessOrError('SUCCESS', `Goal successfully updated !`, data.goalName);
                    }

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
                            rules={{ required: true }}
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
                                {errors.Frequence && <Text color="red">Enter a frequence</Text>}
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
