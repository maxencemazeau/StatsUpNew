// import React from 'react'
// import usePoppinsFonts from '../../hooks/poppinsFont';

// export default function ActivityHistory(){

//     const fontsLoaded = usePoppinsFonts();

//     return (
//         <Container sx={{marginTop:4, paddingLeft:2, paddingRight:2}}>
//             <Typography sx={{fontFamily:'Poppins_700Bold', fontSize:18}}>History</Typography>
//             <Box sx={{ display: 'flex', flexDirection: 'Column', justifyContent: 'center', marginTop: 1, border : 1, borderRadius: 4, borderColor: 'lightgrey',padding:2 }}>
//                 <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
//                     <Typography sx={{fontFamily:'Poppins_400Regular', fontSize:14}}>2024-06-02</Typography>
//                     <Typography sx={{fontFamily:'Poppins_700Bold', fontSize:14, color:'green'}}>Done - 2/4</Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', flexDirection: 'row', marginTop : 1, justifyContent:'space-between' }}>
//                     <Typography sx={{fontFamily:'Poppins_400Regular', fontSize:14}}>2024-06-01</Typography>
//                     <Typography sx={{fontFamily:'Poppins_700Bold', fontSize:14, color:'green'}}>Done - 1/4</Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', marginTop : 1}}>
//                     <Typography sx={{fontFamily:'Poppins_400Regular', fontSize:14}}>2024-05-31</Typography>
//                     <Typography sx={{fontFamily:'Poppins_700Bold', fontSize:14, color:'red'}}>Goal failed - 3/4</Typography>
//                 </Box>
//             </Box>
//         </Container>
//     )
// }