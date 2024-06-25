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
                <Group orientation="horizontal" style={{display:"flex", justifyContent: "space-evenly", alignItems:"center",width:"100%", backgroundColor: "white", borderRadius:0}}>
                    <Group.Item>
                        <Button style={style.groupButton} icon={<Home size="$2" color={"black"}/>}/>
                    </Group.Item>
                    <Group.Item>
                        <Button style={style.groupButton} icon={<Plus size="$2" color={"black"}/>}/>
                    </Group.Item>
                    <Group.Item>
                        <Button style={style.groupButton} icon={<Search size="$2" color={"black"}/>}/>
                    </Group.Item>
                    <Group.Item>
                        <Avatar circular size="$3">
                            <Avatar.Image
                                accessibilityLabel="Cam"
                                source={require("../assets/maxence.jpg")}
                            />
                            <Avatar.Fallback bc="lightgrey" />
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
        right: 0,
        borderTopWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    },
    groupButton:{
        backgroundColor:"white",
        border:"transparent"
    }
})

export default BottomMenu