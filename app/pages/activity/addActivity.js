// import React, { useState } from "react"
// import { View } from "react-native"
// import Button from "@mui/material/Button"
// import Typography from "@mui/material/Typography"
// import { Divider, Grid } from "@mui/material"
// import TextField from '@mui/material/TextField';
// import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'
// import Checkbox from "@mui/material/Checkbox"
// import Select from "@mui/material/Select"; import MenuItem from "@mui/material/MenuItem"
// import InputLabel from "@mui/material/InputLabel"; import FormControl from "@mui/material/FormControl"
// import axios from "axios"
// import { addActivity } from "../../axiosPath/axiosPath"
// import { timeFrame } from "../../data/timeFrame"
// import { useForm, SubmitHandler  } from "react-hook-form"

// export default function AddActivity() {

//     const goal = [
//         {
//             id: 1,
//             name: "1"
//         },
//         {
//             id: 2,
//             name: "2"
//         }
//     ]


//     const [activateGoal, setActivateGoal] = useState(false)
//     const [goalName, setGoalName] = useState(false)
//     const [timerOption, setTimerOption] = useState(false)
//     const [newActivity, setNewActivity] = useState({
//         activityName: "",
//         timer: false,
//         goalId: 0,
//         timeFrame : 0,
//         frequency : 0,
//         userId : 0,
//         createNewGoal : false
//     })

//     const { register, handleSubmit, formState: { errors } } = useForm()
//     const onSubmit = (data) => console.log(data)

//     const changeActive = () => {
//         setActivateGoal(prevState => !prevState)
//     }

//     const changeTimerOption = (e) => {
//         setTimerOption(prevState => !prevState)
//         setNewActivity(prevState => ({...prevState, timer: e.target.value}))
//     }
//     const [age, setAge] = React.useState('');

//     const handleChange = (e) => {
//         setAge(e.target.value);
//         if (e.target.value == 0) {
//             setGoalName(true)
//             setNewActivity(prevState =>({...prevState, goalId: 0, createNewGoal: true}))
//         } else {
//             setGoalName(false)
//             setNewActivity(prevState =>({...prevState, goalId: e.target.value, createNewGoal:false}))
//         }
//     }

//     const addNewActivity = async() => {
//         console.log(newActivity)
//         const response = await axios.post(addActivity, {params :{ ActivityName: newActivity.activityName, Timer: newActivity.timer, GoalsId: newActivity.goalId, CreateNewGoal: newActivity.createNewGoal, UserId : 1 }})
//     }

//     const handleTimeFrameChange = () =>{
//         setNewActivity(prevState => ({...prevState, timeFrame: e.target.value}))
//     }

//     const [fontsLoad] = useFonts({
//         Poppins_400Regular, Poppins_700Bold,
//     })

//     return (
//         <>
//             <View>
//                 <Typography variant="h6" sx={{ fontFamily: "Poppins_700Bold" }}>Create a new activity</Typography>
//                 <form onSubmit={handleSubmit(onSubmit)}>

                    
//                 </form>
//                 <TextField id="outlined-basic" label="Name" color={"warning"} variant="outlined" margin="normal" onChange={(e) => setNewActivity(prevState => ({...prevState, activityName : e.target.value}))}/>
//                 <Grid direction={"row"} container sx={{ paddingTop: 1 }}>
//                     <Grid item xs={6} sx={{ marginBottom: 1 }}>
//                         <Typography>Timer options ?</Typography>
//                     </Grid>
//                     <Grid item xs={2}>
//                         <Checkbox sx={{ padding: 0 }} onChange={changeTimerOption} />
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Typography>Link this activity to a goal ?</Typography>
//                     </Grid>
//                     <Grid item xs={2}>
//                         <Checkbox sx={{ padding: 0 }} onChange={changeActive} />
//                     </Grid>
//                 </Grid>
//                 {activateGoal &&
//                     <>
//                         <FormControl fullWidth sx={{ marginTop: 1 }}>
//                             <InputLabel id="demo-simple-select-label" color={"warning"}>Linked goal</InputLabel>
//                             <Select
//                                 labelId="demo-simple-select-label"
//                                 id="demo-simple-select"
//                                 value={age}
//                                 label="Linked goal"
//                                 color={"warning"}
//                                 onChange={handleChange}
//                             >
//                                 <MenuItem value={0}>New goal</MenuItem>
//                                 <Divider />
//                                 {goal.map(goals =>
//                                     <MenuItem key={goals.id} value={goals.name}>{goals.name}</MenuItem>
//                                 )}
//                             </Select>
//                         </FormControl>
//                         {goalName && <TextField id="outlined-basic" label="Name" color={"warning"} variant="outlined" margin="normal" />}
//                         <Grid container spacing={3}>
//                             <Grid item xs={6}>
//                             <FormControl fullWidth sx={{ marginTop: 1 }}>
//                             <InputLabel id="demo-simple-select-label" color={"warning"}>Time frame</InputLabel>
//                             <Select
//                                 labelId="demo-simple-select-label"
//                                 id="demo-simple-select"
//                                 value={age}
//                                 label="Time frame"
//                                 color={"warning"}
//                                 onChange={handleTimeFrameChange}
//                             >
//                                 {timeFrame.map(timeFrame =>
//                                     <MenuItem key={timeFrame.id} value={timeFrame.frame}>{timeFrame.frame}</MenuItem>
//                                 )}
//                             </Select>
//                         </FormControl>
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <TextField id="outlined-basic" label="Frequency" variant="outlined" color={"warning"} margin="normal" />
//                             </Grid>
//                         </Grid>
//                     </>
//                 }
//                 <Button variant={"contained"} sx={{ bgcolor: "#DD7A34", marginTop: 1, height: 50 }} color={"warning"} disableElevation onClick={addNewActivity}>Save</Button>
//             </View>
//         </>
//     )
// }