import React, { useState } from "react"
import { View, StyleSheet, Image } from "react-native"
import { Home, Plus, Search } from "@tamagui/lucide-icons"
import { Link } from "expo-router"
import { Button, Group, Separator, Avatar } from "tamagui"
// import AddActivity from "../pages/activity/addActivity";
// import CreateActivityAndGoal from "../pages/swipeableDrawer/createActivityAndGoal";


function BottomMenu() {

    const [value, setValue] = useState(0)
    const [state, setModal] = useState(false)

    const toggle = () => {
        setModal(prevState => !prevState)
    }

    return (
        <>
            <View style={style.container}>
                <Separator />
                <Group>
                    <Group.Item>
                        <Button icon={<Home size="$4" color={"black"}/>}/>
                    </Group.Item>
                    <Group.Item>
                        <Button icon={<Plus size="$4" color={"black"}/>}/>
                    </Group.Item>
                    <Group.Item>
                        <Button icon={<Search size="$4" color={"black"}/>}/>
                    </Group.Item>
                    <Group.Item>
                        <Avatar circular size="$10">
                            {/* <Avatar.Image
                                accessibilityLabel="Cam"
                                source={require("../assets/maxence.jpg")}
                            /> */}
                        </Avatar>
                    </Group.Item>
                </Group>
            </View>

            {/* {state && <CreateActivityAndGoal state={state} setModal={setModal} />} */}

        </>
    )
}

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
})

export default BottomMenu