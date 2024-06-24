// import React from 'react'
// import usePoppinsFonts from '../../hooks/poppinsFont';
// import { Link } from 'expo-router';

// export default function LinkedActivity(){

//     const fontsLoaded = usePoppinsFonts();

//     return(
//         <Container sx={{marginTop :2}}>
//             <Typography sx={{fontFamily : 'Poppins_700Bold'}}>Linked Activity</Typography>
//             <Box sx={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', border:1, borderColor: 'lightgrey', borderRadius:50, padding:1, marginTop:2 }}>
//                 <Typography sx={{fontFamily : 'Poppins_400Regular'}}>ActivityName</Typography>
//                 <Link href={{ pathname: "/pages/activity/activityDetail", params: { lastPage:"/pages/goal/goalDetail"} }}><Button sx={{color:'#DD7A34'}}>see more</Button></Link>
//             </Box>
//         </Container>
//     )
// }