import React, { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, Check } from '@tamagui/lucide-icons'
import { getAllUserGoal } from "../../axiosPath/axiosPath"
import { Separator, Select } from "tamagui"
import { Adapt, Text, Sheet, YStack, } from 'tamagui'
import axios from "axios"
import useGetUserToken from "../../hooks/useGetUserToken"

export default function LinkedGoalSelect({ defaultValue = -1, forUpdate = false, setShowGoalNameInput, onChange, checkActivityChanged = null, UserId, token, setUserActivity = null }) {

    const [val, setVal] = useState(defaultValue)
    const [goalList, setGoalList] = useState([])

    useEffect(() => {
        const fetchGoal = async () => {
            const response = await axios.get(getAllUserGoal, { params: { id: UserId }, headers: { Authorization: `Bearer ${token}` } });
            setGoalList(response.data)
        }

        fetchGoal()
    }, [])


    useEffect(() => {
        if (val == 0) {
            setShowGoalNameInput(true)
        } else {
            if (forUpdate !== false && val === -1) {
                setShowGoalNameInput(false)
            } else {
                if (forUpdate == false && (val > 0 || val == -1)) {
                    setShowGoalNameInput(false)
                } else {
                    setShowGoalNameInput(true)
                }
            }
        }
    }, [val])

    const handleValueChange = (value) => {
        onChange(value)
        if (checkActivityChanged) {
            checkActivityChanged("linkedGoal", value)
            if (setUserActivity !== null && value !== -1) {
                const selectedGoalDetail = goalList.filter((goal) => goal.GoalsID === value)
                setUserActivity((prevState) => ({
                    ...prevState, GoalName: selectedGoalDetail[0].GoalName,
                    GoalsID: selectedGoalDetail[0].GoalsID, Frequence: selectedGoalDetail[0].Frequence, TimeFrameID: selectedGoalDetail[0].TimeFrameID
                }))
            }
        }
    }

    return (
        <>
            <Text width={90} color={"black"} style={{ marginBottom: 5, marginTop: 15 }}>Link goal</Text>
            <Select value={val} onValueChange={(value) => { setVal(value); handleValueChange(value); }} onBlur={() => handleBlur(val)} disablePreventBodyScroll defaultValue={-1}>
                <Select.Trigger iconAfter={<ChevronDown color={"black"} size={20} />} style={{ backgroundColor: "white", height: 50 }}>
                    <Select.Value color={"black"} />
                </Select.Trigger>

                <Adapt when="sm" platform="touch">
                    <Sheet
                        modal
                        snapPoints={[85, 50]}
                        snapPointsMode="percent"
                        dismissOnSnapToBottom
                        animationConfig={{
                            type: 'spring',
                            damping: 20,
                            mass: 1.2,
                            stiffness: 250,
                        }}
                    >
                        <Sheet.Frame style={{ backgroundColor: "white" }}>
                            <Sheet.ScrollView>
                                <Adapt.Contents />
                            </Sheet.ScrollView>
                        </Sheet.Frame>
                        <Sheet.Overlay
                            animation="lazy"
                            enterStyle={{ opacity: 0 }}
                            exitStyle={{ opacity: 0 }}
                        />
                    </Sheet>
                </Adapt>

                <Select.Content zIndex={200000}>
                    <Select.ScrollUpButton
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                        width="100%"
                        height="$3"
                    >
                        <YStack zIndex={10}>
                            <ChevronUp size={20} />
                        </YStack>
                    </Select.ScrollUpButton>

                    <Select.Viewport
                        minWidth={200}
                    >
                        <Select.Group>
                            <Select.Item
                                value={-1}
                                style={{ backgroundColor: "white" }}
                            >
                                <Select.ItemText color={"black"}>No</Select.ItemText>
                                <Select.ItemIndicator marginLeft="auto">
                                    <Check size={16} />
                                </Select.ItemIndicator>
                            </Select.Item>
                            {forUpdate == false ?
                                <Select.Item
                                    value={0}
                                    style={{ backgroundColor: "white" }}
                                >
                                    <Select.ItemText color={"black"}>New Goal</Select.ItemText>
                                    <Select.ItemIndicator marginLeft="auto">
                                        <Check size={16} />
                                    </Select.ItemIndicator>
                                </Select.Item>
                                :
                                <>
                                </>
                            }
                            <Separator />
                            {goalList?.map(goals => (

                                <Select.Item
                                    index={goals.GoalsID}
                                    key={goals.GoalsID}
                                    value={goals.GoalsID}
                                    style={{ backgroundColor: "white" }}
                                >
                                    <Select.ItemText color={"black"}>{goals.GoalName}</Select.ItemText>
                                    <Select.ItemIndicator marginLeft="auto">
                                        <Check size={16} />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.Group>
                    </Select.Viewport>

                    <Select.ScrollDownButton
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                        width="100%"
                        height="$3"
                    >
                        <YStack zIndex={10}>
                            <ChevronDown size={20} />
                        </YStack>
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select>
        </>
    )
}