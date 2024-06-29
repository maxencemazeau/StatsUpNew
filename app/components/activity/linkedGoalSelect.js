import React, { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, Check } from '@tamagui/lucide-icons'
import { Text, Input, Button, Checkbox, Separator, Form, Select } from "tamagui"
import { Adapt, Label, Sheet, XStack, YStack, getFontSize } from 'tamagui'

export default function LinkedGoalSelect({ setShowGoalNameInput, onChange }) {

    const [val, setVal] = useState('')
    const goal = [
        {
            id: 1,
            name: "Goal 1"
        },
        {
            id: 2,
            name: "Goal 2"
        }
    ]

    useEffect(() => {
        if (val === 0) {
            setShowGoalNameInput(true)
        } else {
            setShowGoalNameInput(false)
        }
    }, [val])

    return (
        <Select value={val} onValueChange={(value) => { setVal(value); onChange(value) }} disablePreventBodyScroll>
            <Select.Trigger width={220} iconAfter={<ChevronDown color={"black"} />} style={{ backgroundColor: "white", marginBottom: 10, height: 50 }}>
                <Select.Value placeholder="Linked goal" color={"black"} />
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
                            value={0}
                            style={{ backgroundColor: "white" }}
                        >
                            <Select.ItemText color={"black"}>New Goal</Select.ItemText>
                            <Select.ItemIndicator marginLeft="auto">
                                <Check size={16} />
                            </Select.ItemIndicator>
                        </Select.Item>
                        <Separator />
                        {goal.map((goals, i) => (

                            <Select.Item
                                index={i}
                                key={goals.id}
                                value={goals.id}
                                style={{ backgroundColor: "white" }}
                            >
                                <Select.ItemText color={"black"}>{goals.name}</Select.ItemText>
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

    )
}