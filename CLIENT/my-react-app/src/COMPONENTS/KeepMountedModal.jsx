// KeepMountedModal.jsx

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const card = (
  <React.Fragment>
    <CardContent sx={{ color: 'white', background: '#080808', padding: 5, paddingRight: 10, display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left', textAlign: 'left' }}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 70, height: 70, mb: 1.5 }} />

      <Typography variant="h5" component="div" gutterBottom sx={{ fontFamily: 'Poppins' }}>
        Anonymous 1
      </Typography>
      <Typography sx={{ fontSize:12,mb: 1.5, fontFamily: 'Poppins' }}>
        3rd year
      </Typography>
      <Typography sx={{ fontSize:12,fontFamily: 'Poppins' }}>
        BIO
      </Typography>
    </CardContent>
    <CardActions sx={{ color: 'white', background: '#080808', padding: 5, paddingRight: 5, display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
      <Button
        size="small"
        sx={{
          background: '#F53816',
          fontFamily: 'Poppins',
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'transparent',
  p: 0,
};

export default function KeepMountedModal({ open, onClose }) {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={onClose}
      
    >
      <Box sx={style}>
        <Card sx={{ border: '1px solid grey', borderRadius: 10 }}>{card}</Card>
      </Box>
    </Modal>
  );
}
