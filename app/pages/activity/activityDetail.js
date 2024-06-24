// import React, { useState } from "react"
// import { View, ScrollView } from 'react-native';
// import { Link, useLocalSearchParams } from "expo-router"
// import { Container, Typography, Box, FormControl, FormGroup, FormControlLabel, InputLabel, Select, MenuItem, Checkbox, TextField, Button } from "@mui/material"
// import { LineChart } from '@mui/x-charts/LineChart';
// import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ActivityHistory from "../../components/activity/activityHistory";
// import ActivityInformation from "../../components/activity/activityInformation";

// export default function ActivityDetail() {

//     const { lastPage } = useLocalSearchParams();
//     const [selectedChartPeriod, setSelectedChartPeriod] = useState(1)
//     const [activityTimer, setActivityTimer] = useState(false)
//     const [goalPeriod, setGoalPeriod] = useState([{id:1,periodName:"Daily", checked:false},{id:2,periodName:"Weekly",checked:false},{id:3,periodName:"Monthly",checked:false}])

//     const period = [{
//         id: 1,
//         value: "This week"
//     },
//     {
//         id: 2,
//         value: "This month"
//     },
//     {
//         id: 3,
//         value: "This year"
//     },
//     {
//         id: 4,
//         value: "Last 3 Month"
//     },
//     {
//         id: 5,
//         value: "Last 6 Month"
//     },
//     {
//         id: 6,
//         value: "All time"
//     },
//     ]
//     const [fontsLoad] = useFonts({
//         Poppins_400Regular, Poppins_700Bold,
//     })

//     const changeChartPeriod = (event) => {
//         setSelectedChartPeriod(event.target.value)
//     }

//     const changeActivityTimer = () => {
//         setActivityTimer(prevState => !prevState)
//     }

//     const changeGoalPeriod = (id) => {
//         setGoalPeriod(prevGoalPeriods => prevGoalPeriods.map(goals => goals.id === id ? 
//             {...goals, checked: !goals.checked}
//             : {...goals, checked: false}
//         ))
//     }

//     return (
//         <>
//             <View style={{ height: "92%" }}>
//                 <ScrollView>
//                     <Container sx={{ height: "100%", bgcolor: "#222121", padding: 0 }}>
//                         <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 2, gap: 2 }}>
//                             <Link href={{ pathname: lastPage }}>
//                                 <ArrowBackIcon sx={{ color: "white" }} />
//                             </Link>
//                             <Typography sx={{
//                                 padding: 0, color: "white",
//                                 fontWeight: "bold",
//                                 fontFamily: 'Poppins_400Regular', fontSize: 20
//                             }}>ACTIVITY NAME</Typography>
//                         </Box>
//                         <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, paddingLeft: 2 }}>
//                             <FormControl sx={{ width: 150, borderColor: "white" }}>
//                                 <InputLabel id="demo-simple-select-label" sx={{ color: "white", '&.Mui-focused': { color: "white" } }}>Period</InputLabel>
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     value={selectedChartPeriod}
//                                     label="Period"
//                                     onChange={changeChartPeriod}
//                                     sx={{
//                                         color: "white",
//                                         '.MuiOutlinedInput-notchedOutline': {
//                                             borderColor: 'white',
//                                         },
//                                         '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                                             borderColor: '#DD7A34',
//                                         },
//                                         '&:hover .MuiOutlinedInput-notchedOutline': {
//                                             borderColor: '#DD7A34',
//                                         },
//                                         '.MuiSvgIcon-root ': {
//                                             fill: "white !important",
//                                         }
//                                     }}
//                                 >
//                                     {period.map(periods => (
//                                         <MenuItem key={periods.id} value={periods.id}>{periods.value}</MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                         </Box>
//                         <LineChart
//                             xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
//                             series={[
//                                 {
//                                     data: [2, 5.5, 2, 8.5, 1.5, 5],
//                                     color: "#DD7A34"
//                                 },
//                             ]}
//                             sx={{ stroke: "white", witdh: "100%" }}
//                             height={250}
//                             fill={"white"}
//                         />
//                     </Container>
//                     <Container sx={{ position: "absolute", top: "98%", left: 0, right: 0, height: "45%", bgcolor: "white", padding: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
//                         <Container sx={{ padding: 2 }}>
//                             <Box sx={{
//                                 display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: "center",
//                                 justifyContent: "space-around", gap: 2, border: 1, borderRadius: 4, borderColor: "lightgrey", padding: 1
//                             }}>
//                                 <Box>
//                                     <Typography sx={{ fontFamily: "Poppins_700Bold", fontSize: 16 }}>Total</Typography>
//                                     <Typography sx={{ fontFamily: "Poppins_700Bold", fontSize: 18, color: "#DD7A34" }}>46</Typography>
//                                 </Box>
//                                 <Box>
//                                     <Typography sx={{ fontFamily: "Poppins_700Bold", fontSize: 16 }}>Best Streak</Typography>
//                                     <Typography sx={{ fontFamily: "Poppins_700Bold", fontSize: 18, color: "#DD7A34" }}>46</Typography>
//                                 </Box>
//                                 <Box>
//                                     <Typography sx={{ fontFamily: "Poppins_700Bold", fontSize: 16 }}>Goal</Typography>
//                                     <Typography sx={{ fontFamily: "Poppins_700Bold", fontSize: 18, color: "#DD7A34" }}>5/10</Typography>
//                                 </Box>
//                                 {activityTimer &&
//                                 <Box>
//                                     <Typography sx={{ fontFamily: "Poppins_700Bold", fontSize: 16 }}>Timer</Typography>
//                                     <Typography sx={{ fontFamily: "Poppins_700Bold", fontSize: 18, color: "#DD7A34" }}>100h</Typography>
//                                 </Box>
//                                  }
//                             </Box>
//                         </Container>
//                             <ActivityInformation goalPeriod={goalPeriod} setGoalPeriod={setGoalPeriod} setActivityTimer={setActivityTimer}/>
//                             <ActivityHistory />
//                     </Container>
//                 </ScrollView >
//             </View>
//         </>
//     )
// }
