import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';

const card = (
  <React.Fragment>
    <CardContent sx={{ color: 'white', background: '#080808', padding: 5, paddingRight: 10, display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left', textAlign: 'left' }}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 70, height: 70, mb: 1.5 }} />

      <Typography variant="h5" component="div" gutterBottom sx={{ fontFamily: 'Poppins'}}>
        Annonymous 1
      </Typography>
      <Typography  sx={{ mb: 1.5, fontFamily: 'Poppins' }}>
        3rd year
      </Typography>
      <Typography variant="p1" sx={{ fontFamily: 'Poppins'}}>
        My BIO
      </Typography>
    </CardContent>
    <CardActions sx={{ color: 'white', background: '#080808', padding: 5, paddingRight: 5, display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
      <Button
        size="small"
        sx={{
          background: '#F53816',
          color: 'white',
          border: '2px solid grey',
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

export default function KeepMountedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Profile</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        
      <Card sx={{ border: '1px solid grey',borderRadius: 10 }}>{card}</Card>
    </Box>
        
      </Modal>
    </div>
  );
}