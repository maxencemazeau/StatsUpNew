import React, { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, Check } from '@tamagui/lucide-icons'
import { getAllUserGoal } from "../../axiosPath/axiosPath"
import { Separator, Select } from "tamagui"
import { Adapt, Label, Sheet, YStack, } from 'tamagui'
import axios from "axios"

export default function LinkedGoalSelect({ setShowGoalNameInput, onChange, UserId }) {

    const [val, setVal] = useState(-1)
    const [goalList, setGoalList] = useState([])

    useEffect(() => {
        const fetchGoal = async () => {
            const response = await axios.get(getAllUserGoal, { params: { id: UserId } });
            setGoalList(response.data)
        }

        fetchGoal()
    }, [])


    useEffect(() => {
        if (val == 0) {
            setShowGoalNameInput(true)
        } else {
            setShowGoalNameInput(false)
        }
    }, [val])

    return (
        <>
            <Label width={90} color={"black"}>Link goal</Label>
            <Select value={val} onValueChange={(value) => { setVal(value); onChange(value) }} disablePreventBodyScroll defaultValue={-1}>
                <Select.Trigger iconAfter={<ChevronDown color={"black"} size={20} />} style={{ backgroundColor: "white", height: 50 }}>
                    <Select.Value color={"black"} />
                </Select.Trigger>

                <Adapt when="sm" platform="touch">
                    <Sheet
                        modal
                        snapPoints={["fit"]}
                        snapPointsMode="fit"
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
                            <Select.Item
                                value={0}
                                style={{ backgroundColor: "white" }}
                            >
                                <Select.ItemText color={"black"}>New Goal</Select.ItemText>
                                <Select.ItemIndicator marginLeft="auto">
                                    <Check size={16} />
                                </Select.ItemIndicator>
                            </Select.Item>
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