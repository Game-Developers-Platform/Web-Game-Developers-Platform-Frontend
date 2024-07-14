import { Box, Typography, Link } from '@mui/material';
import muiTheme from '../../themes/muiTheme';

const Footer = () => {
  return (
    <Box 
      sx={{
        backgroundColor: muiTheme.palette.secondary.main,
        color: muiTheme.palette.text.secondary,
        py: 2,
        px: 3,
        textAlign: 'center',
        bottom: 0,
        width: '100%',
      }}
    >
      <Box sx={{display:'flex', flexDirection:'column'}}>
        <span>© 2024 Lior Hassin | Software Developer</span>
        <span>
          <Link color={muiTheme.palette.text.link} href="mailto:liorhassin3@gmail.com" target="_blank" rel="noopener noreferrer">liorhassin3@gmail.com</Link> | 
          <Link color={muiTheme.palette.text.link} href="https://www.linkedin.com/in/lior-hassin" target="_blank" rel="noopener noreferrer"> LinkedIn</Link> | 
          <Link color={muiTheme.palette.text.link} href="https://github.com/liorhassin" target="_blank" rel="noopener noreferrer"> Github</Link>
        </span>
      </Box>
    </Box>
  );
};

export default Footer;
