// import React, { useState } from "react"
// import { Pressable, ScrollView } from "react-native"
// import Typography from "@mui/material/Typography"
// import { Container } from "@mui/material"
// import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import AddActivity from "../activity/addActivity"
// import AddGoal from "../goal/addGoal"

// export default function CreateActivityAndGoal({ state, setModal }) {

//     const [createNewActivityOrGoal, setCreateNewActivityOrGoal] = useState(0)

//     const toggleDrawer = (anchor, open) => (event) => {
//         if (
//             event &&
//             event.type === 'keydown' &&
//             (event.key === 'Tab' || event.key === 'Shift')
//         ) {
//             return;
//         }

//         setModal(open);
//     };


//     const [fontsLoad] = useFonts({
//         Poppins_400Regular, Poppins_700Bold,
//     })
//     console.log(createNewActivityOrGoal)
//     return (
//         <>
//             <ScrollView>
//                 <SwipeableDrawer
//                     anchor={'bottom'}
//                     open={state}
//                     onClose={toggleDrawer('bottom', false)}
//                     onOpen={toggleDrawer('bottom', true)}
//                 >
//                     <Container sx={{ padding: 3 }}>
//                             <Container sx={{display:"flex", flexDirection: "row", padding:0, paddingBottom:2, alignItems:"center", gap:2}}>
//                                 <ArrowBackIcon onClick={toggleDrawer('bottom', false)} />
//                                 <Pressable onPress={() => setCreateNewActivityOrGoal(0)}>
//                                     <Typography variant="h6" sx={{ fontFamily: "Poppins_400Regular", color: createNewActivityOrGoal == 0 ? "#DD7A34" : "black", textDecorationLine: createNewActivityOrGoal == 0 ? "underline": "none" }}>ACTIVITY</Typography>
//                                 </Pressable>
//                                 <Pressable onPress={() => setCreateNewActivityOrGoal(1)}>
//                                     <Typography variant="h6" sx={{ fontFamily: "Poppins_400Regular", color: createNewActivityOrGoal == 1 ? "#DD7A34" : "black", textDecorationLine: createNewActivityOrGoal == 1 ? "underline": "none" }}>GOAL</Typography>
//                                 </Pressable>
//                             </Container>
//                            {createNewActivityOrGoal == 0 ? <AddActivity/> : <AddGoal/>}
//                     </Container>
//                 </SwipeableDrawer>
//             </ScrollView>
//         </>
//     )
// }