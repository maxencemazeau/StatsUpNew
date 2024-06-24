// import React, { useState } from "react"
// import { View, ScrollView } from 'react-native';
// import { Link, useLocalSearchParams } from "expo-router"
// import { Container, Typography, Box, FormControl, FormGroup, FormControlLabel, InputLabel, Select, MenuItem, Checkbox, TextField, Button } from "@mui/material"
// import { LineChart } from '@mui/x-charts/LineChart';
// import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import LinkedActivity from "../../components/goalComponent/linkedActivity";

// export default function GoalDetail() {

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
//             <View style={{ height: "90%" }}>
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
//                             }}>GOAL NAME</Typography>
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
//                         <Container sx={{ paddingLeft: 2, paddingRight: 2, paddingTop: 2 }}>
//                             <Typography sx={{ fontFamily: "Poppins_700Bold", fontSize: 18 }}>Details</Typography>
//                             <Box sx={{
//                                 display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 1
//                             }}>
//                                 <TextField id="outlined-basic" label="Goal Name" color={"warning"} variant="outlined" margin="normal" fullWidth />
//                             </Box>
//                             <Box sx={{
//                                 display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 1
//                             }}>
//                                 <Typography sx={{ fontFamily: "Poppins_400Regular", fontSize: 14 }}>Add timer ?</Typography>
//                                 <Checkbox sx={{
//                                     '&.Mui-checked': {color: "#DD7A34",},}} onChange={changeActivityTimer}/>
//                              </Box>   
//                             <Box sx={{
//                                 display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 1
//                             }}>

//                                 <Typography sx={{ fontFamily: "Poppins_400Regular", fontSize: 14 }}>Frequency</Typography>
//                                 <TextField
//                                     id="outlined-number"
//                                     type="number"
//                                     label="Number"
//                                     size="small"
//                                     color={"warning"} variant="outlined"
//                                     sx={{ width: 100 }}
//                                 />
//                             </Box>
//                             <FormGroup sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
//                                 {goalPeriod.map(goalPeriods => (
//                                     <FormControlLabel control={<Checkbox sx={{
//                                         '&.Mui-checked': {
//                                             color: "#DD7A34",
//                                         },
//                                     }} />} key={goalPeriods.id} label={goalPeriods.periodName} checked={goalPeriods.checked} onChange={() => changeGoalPeriod(goalPeriods.id)}/>
//                                 ))}
//                             </FormGroup>
//                             <Button variant={"contained"} sx={{ bgcolor: "#DD7A34", marginTop: 1, width: "100%", height:50, fontSize:16,  fontFamily: "Poppins_400Regular"}} 
//                             color={"warning"} disableElevation>Save</Button>
//                         </Container>
//                             <LinkedActivity />
//                     </Container>
//                 </ScrollView >
//             </View>
//         </>
//     )
// }
