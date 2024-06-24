// import React from 'react'

// export default function ActivityInformation({setActivityTimer, goalPeriod ,setGoalPeriod}){

//     const changeActivityTimer = () => {
//         setActivityTimer(prevState => !prevState)
//     }

//     const changeGoalPeriod = (id) => {
//         setGoalPeriod(prevGoalPeriods => prevGoalPeriods.map(goals => goals.id === id ? 
//             {...goals, checked: !goals.checked}
//             : {...goals, checked: false}
//         ))
//     }

//     return(
//         <Container sx={{ paddingLeft: 2, paddingRight: 2 }}>
//                             <Typography sx={{ fontFamily: "Poppins_700Bold", fontSize: 18, paddingBottom: 1 }}>Details</Typography>
//                             <Box sx={{
//                                 display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 1
//                             }}>
//                                 <TextField id="outlined-basic" label="Activity Name" color={"warning"} variant="outlined" margin="normal" />
//                                 <TextField id="outlined-basic" label="Goal Name" color={"warning"} variant="outlined" margin="normal" />
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
//     )
// }