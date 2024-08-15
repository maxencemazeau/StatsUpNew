import React, { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, Check } from '@tamagui/lucide-icons'
import { Select } from "tamagui"
import { selectChartFrame } from "../../data/selectChartFrame"
import { Adapt, Label, Sheet, YStack, } from 'tamagui'
import axios from "axios"

export default function ChartFrameSelect({ setChartTimeFrame }) {

    const [val, setVal] = useState(1)

    return (
        <>
            <Label width={90} color={"black"}></Label>
            <Select value={val} onValueChange={(value) => setChartTimeFrame(value)} defaultValue={1}>
                <Select.Trigger iconAfter={<ChevronDown color={"white"} size={20} />} style={{ backgroundColor: "#191919", color: "white", height: 50, borderColor: "white" }}>
                    <Select.Value color={"white"} />
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
                            {selectChartFrame?.map(frames => (

                                <Select.Item
                                    index={frames.id}
                                    key={frames.id}
                                    value={frames.id}
                                    style={{ backgroundColor: "white", color: "white" }}
                                >
                                    <Select.ItemText color={"black"}>{frames.name}</Select.ItemText>
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