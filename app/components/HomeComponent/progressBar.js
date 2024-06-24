// import * as React from 'react';
// import PropTypes from 'prop-types';
// import LinearProgress from '@mui/material/LinearProgress';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import Grid from "@mui/material/Grid"
// import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'

// export default function ProgressBar() {
//   const [progress, setProgress] = React.useState(10);

//   const [fontsLoad] = useFonts({
//     Poppins_400Regular, Poppins_700Bold,
// })

//   return (
//     <>
//     <Grid container direction="row" justifyContent={'space-between'}>
//      <Grid item xs={6}>
//         <Typography sx={{paddingLeft:3, fontFamily:'Poppins_400Regular'}}>Next reward</Typography>
//       </Grid>
//       <Grid item xs={6}>
//         <Typography sx={{paddingRight:3, textAlign:"right", fontFamily:'Poppins_400Regular'}}>{progress}%</Typography>
//       </Grid>
//     </Grid>
//     <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: 3, paddingRight:3, paddingBottom:3 }}>
//       <Box sx={{ width: '100%' }}>
//         <LinearProgress variant="determinate" value={progress} color={"warning"} sx={{height:20, borderRadius:10}}/>
//       </Box>
//     </Box>
//     </>
//   );
// }
