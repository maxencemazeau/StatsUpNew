import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { Home, Plus, Search, User } from "@tamagui/lucide-icons"
import { Button, Group } from "tamagui"
import { useRouter } from "expo-router"
import CreateActivityAndGoal from "../pages/swipeableDrawer/createActivityAndGoal";
import useGetUserId from "../hooks/useGetUserId"
import { useDispatch } from "react-redux"
import { showDelete } from "../reduxState/popUp/showDelete"
import { cancelPopUp } from "../reduxState/popUp/cancelPopUpSlice"
import { AddRoute } from "../reduxState/navigation/routingSlice"

function BottomMenu() {

    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState(0);
    const router = useRouter()
    const UserId = useGetUserId()
    const dispatch = useDispatch()

    const toggle = () => {
        dispatch(showDelete(false))
        dispatch(cancelPopUp(false))
        setOpen((x) => !x)
    }

    const navigateTo = (page) => {
        dispatch(AddRoute(`/pages/home/home`))
        dispatch(showDelete(false))
        dispatch(cancelPopUp(false))
        router.push({
            // pathname: '/pages/searchFriend/searchFriend'
            pathname: `/pages${page}`,
            ...(page === '/profil/profil' && { params: { UserID: UserId } })
        });
    }

    return (
        <>
            <View style={styles.container}>
                <Group orientation="horizontal" style={styles.group}>
                    <Group.Item>
                        <Button style={styles.groupButton} icon={<Home size="$2" color={"black"} />} onPress={() => navigateTo("/home/home")} />
                    </Group.Item>
                    <Group.Item>
                        <Button style={styles.groupButton} icon={<Plus size="$2" color={"black"} />} onPress={() => toggle()} />
                    </Group.Item>
                    <Group.Item>
                        <Button style={styles.groupButton} icon={<Search size="$2" color={"black"} />} onPress={() => navigateTo("/feed/feed")} />
                    </Group.Item>
                    <Group.Item>
                        <Button style={styles.groupButton} icon={<User size="$2" color={"black"} />} onPress={() => navigateTo("/profil/profil")}></Button>
                    </Group.Item>
                </Group>
            </View>

            {open && <CreateActivityAndGoal open={open} setOpen={setOpen} position={position} setPosition={setPosition} />}

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
        height: 50
    },
    group: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
        borderRadius: 0
    },
    groupButton: {
        backgroundColor: "white",
    }
})

export default BottomMenu