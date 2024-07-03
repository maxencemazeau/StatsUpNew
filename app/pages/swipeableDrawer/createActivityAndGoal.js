import React, { useState, useEffect } from "react"
import { Pressable, ScrollView, View } from "react-native"
import AddActivity from "../activity/addActivity"
import AddGoal from "../goal/addGoal"
import { Sheet, Text, Button, SizableText } from "tamagui";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { useSelector } from "react-redux"
export default function CreateActivityAndGoal({ open, setOpen, position, setPosition }) {

    const [createNewActivityOrGoal, setCreateNewActivityOrGoal] = useState(0)
    const User = useSelector((state) => state.login.user)
    const UserId = User.user[0].UserID

    return (
        <>
            <Sheet
                modal
                open={open}
                onOpenChange={setOpen}
                position={position}
                onPositionChange={setPosition}
                snapPoints={["fit"]}
                snapPointsMode="fit"
                dismissOnSnapToBottom
            >
                <Sheet.Overlay />
                <Sheet.Frame ai="center" jc="center" style={{ backgroundColor: "white" }}>
                    {/* <Sheet.Handle /> */}
                    <View style={{ width: "100%", height: "100%", backgroundColor: "white", padding: 20 }}>
                        <View style={{ display: "flex", flexDirection: "row", padding: 0, paddingBottom: 2, alignItems: "center", gap: 20 }}>
                            <Button icon={<ArrowLeft size="$2" color={"black"} />} onPress={() => { setOpen(false) }} style={{ backgroundColor: "transparent" }} />
                            <Pressable onPress={() => setCreateNewActivityOrGoal(0)}>
                                <SizableText size="$6" style={{ color: createNewActivityOrGoal == 0 ? "#DD7A34" : "black", textDecorationLine: createNewActivityOrGoal == 0 ? "underline" : "none" }}>ACTIVITY</SizableText>
                            </Pressable>
                            <Pressable onPress={() => setCreateNewActivityOrGoal(1)}>
                                <SizableText size="$6" style={{ color: createNewActivityOrGoal == 1 ? "#DD7A34" : "black", textDecorationLine: createNewActivityOrGoal == 1 ? "underline" : "none" }}>GOAL</SizableText>
                            </Pressable>
                        </View>
                        {createNewActivityOrGoal == 0 ? <AddActivity UserId={UserId}/> : <AddGoal UserId={UserId}/>}
                    </View>
                </Sheet.Frame>
            </Sheet>
        </>
    )
}