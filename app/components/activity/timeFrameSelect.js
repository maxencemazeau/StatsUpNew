import React, { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Check } from '@tamagui/lucide-icons'
import { Select } from "tamagui"
import { Adapt, Sheet, YStack } from 'tamagui'
import { timeFrame } from "../../data/timeFrame"

export default function TimeFrameSelect({ defaultValue = 0, onChange, checkGoalChanged = null }) {

    const [val, setVal] = useState(defaultValue)

    useEffect(() => {
        setVal(defaultValue)
    }, [defaultValue])

    const handleValueChange = (value) => {
        setVal(value);
        onChange(value);
        if (typeof checkGoalChanged === 'function') {
            checkGoalChanged("timeFrame", value)
        }
    }

    return (
        <Select value={val} onValueChange={(value) => handleValueChange(value)} disablePreventBodyScroll>
            <Select.Trigger iconAfter={< ChevronDown color={"black"} size={20} />} style={{ backgroundColor: "white", height: 50 }}>
                <Select.Value color={"black"} />
            </Select.Trigger >

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
                        {timeFrame.map(timeFrames => (

                            <Select.Item
                                key={timeFrames.id}
                                value={timeFrames.id}
                                style={{ backgroundColor: "white" }}
                            >
                                <Select.ItemText color={"black"}>{timeFrames.frame}</Select.ItemText>
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