import React, { useState } from "react"
import { View, StyleSheet, Image } from "react-native"
import { Home, Plus, Search } from "@tamagui/lucide-icons"
import { Button, Group, Avatar } from "tamagui"
import AddActivity from "../pages/activity/addActivity";
import CreateActivityAndGoal from "../pages/swipeableDrawer/createActivityAndGoal";
import { Sheet, Text } from "tamagui";

function BottomMenu() {

    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState(0);

    const [value, setValue] = useState(0)

    const toggle = () => {
        setModal(prevState => !prevState)
    }

    return (
        <>
            <View style={styles.container}>
                <Group orientation="horizontal" style={styles.group}>
                    <Group.Item>
                        <Button style={styles.groupButton} icon={<Home size="$2" color={"black"}/>}/>
                    </Group.Item>
                    <Group.Item>
                        <Button style={styles.groupButton} icon={<Plus size="$2" color={"black"}/>}  onPress={() => setOpen((x) => !x)}/>
                    </Group.Item>
                    <Group.Item>
                        <Button style={styles.groupButton} icon={<Search size="$2" color={"black"}/>}/>
                    </Group.Item>
                    <Group.Item>
                        <Avatar circular size="$3">
                            <Avatar.Image
                                source={require("../assets/maxence.jpg")}
                            />
                            <Avatar.Fallback bc="lightgrey" />
                        </Avatar>
                    </Group.Item>
                </Group>
            </View>
            
            {open && <CreateActivityAndGoal open={open} setOpen={setOpen} position={position} setPosition={setPosition}/>}

        </>
    )
}

const styles = StyleSheet.create({
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
        elevation: 5,
        height:50
    },
    group:{
        display:"flex", 
        justifyContent: "space-evenly", 
        alignItems:"center", 
        width:"100%", 
        backgroundColor: "white", 
        borderRadius:0
    },
    groupButton:{
        backgroundColor:"white",
    }
})

export default BottomMenu