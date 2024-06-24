// import React from "react"
// import { Link } from "expo-router"
// import { Typography, Button, Card, Container, CardContent } from "@mui/material";
// import Grid from "@mui/material/Grid"
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { getUserGoals } from "../../axiosPath/axiosPath"
// import { useQuery } from "react-query";
// import { useSelector } from "react-redux";
// import axios from 'axios'
// import HomeCardSkeleton from "../skeleton/homeCardSkeleton";
// import PopUpAxiosError from "../error/popUpAxiosError";
// import { useLoadMoreGoal } from "../../hooks/apiCall/goal/loadMoreGoal";

// export default function GoalCard({goalOffset}) {

//     const isMoreDataLoading = useSelector((state) => state.isGoalLoading.value)
//     const errorState = useSelector((state) => state.loadingError.value);
//     useLoadMoreGoal(goalOffset)
    
//     const { data : goalList } = useQuery({
//         queryFn: async() => LoadUserGoals(),
//         queryKey: ["goalList"],
//         staleTime: Infinity
//     })
 
//     const LoadUserGoals = async () => {
//         const response = await axios.get(getUserGoals, { params: { id: 1, offset : 0} });
//         return response.data.goal
//     };


//     return (
//         <Container maxWidth="md" sx={{ paddingRight: 2, paddingLeft: 2, paddingTop: 2 }}>
//             {goalList?.map(goalsList => (
//             <Card variant="outlined" sx={{ marginBottom: 3, borderRadius: 4 }} key={goalsList.GoalsID}>
//                 <CardContent>
//                     <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{margin:0}}>
//                         <Grid item xs={9} sm={10}>
//                             <Typography variant="h6" sx={{fontFamily:"Poppins_700Bold"}} gutterBottom>{goalsList.GoalName}</Typography>
//                             <Typography variant="body1" sx={{ marginTop: 1, fontFamily:'Poppins_400Regular' }} gutterBottom>{goalsList.Frame}</Typography>
//                         </Grid>
//                         <Grid item xs={2} sm={1}>
//                             <Link href={{ pathname: "/pages/goal/goalDetail", params: { lastPage:"/pages/home/reduxHomeProvider"} }}>
//                                 <Button sx={{ bgcolor: "#DD7A34", borderRadius: 25, height: 50 }}>
//                                     <ArrowForwardIosIcon  sx={{ color: "white" }} />
//                                 </Button>
//                             </Link>
//                         </Grid>
//                     </Grid>
//                 </CardContent>
//             </Card>
//             ))}
//             {isMoreDataLoading && <HomeCardSkeleton/> }
//             {errorState && <PopUpAxiosError/>}
//         </Container>
//     )

// }