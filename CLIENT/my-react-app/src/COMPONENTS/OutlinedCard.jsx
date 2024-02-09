import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const card = (
  <React.Fragment>
    <CardContent sx={{ color: 'white', background: '#080808', padding: 5, paddingRight: 10, display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left', textAlign: 'left' }}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 70, height: 70, mb: 1.5 }} />

      <Typography variant="h2" component="div" gutterBottom sx={{ fontFamily: 'Poppins'}}>
        Annonymous 1
      </Typography>
      <Typography sx={{ mb: 1.5 ,fontFamily: 'Poppins' }}>
        3rd year
      </Typography>
      <Typography sx={{ fontSize: 84, fontFamily: 'Poppins'}}>
        Bio
      </Typography>
    </CardContent>
    <CardActions sx={{ color: 'white', background: '#080808', padding: 5, paddingRight: 5, display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
      <Button
        size="small"
        sx={{
          
          background: '#F53816',
          color: 'white',
          border: '2px solid white',
          borderRadius: 40,
          '&:hover': {
            background: '#FF6347', // Change the hover color as desired
          },
        }}
      >
        Edit Profile
      </Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ height: 400 }}>
      <Card sx={{ border: '1px solid grey',borderRadius: 10 }}>{card}</Card>
    </Box>
  );
}
