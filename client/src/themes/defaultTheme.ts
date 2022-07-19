import { blue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    primary: blue,
  },
  components: {
    MuiListItemButton: {
      variants: [
        {
          props: {
            selected: true,
          },
          style: {
            backgroundColor: 'rgba(255, 255, 255, 0.9) !important',
            borderRadius: '20px !important',
            padding: '19px',
          },
        },
        {
          props: {
            selected: false,
          },
          style: {
            borderRadius: '20px !important',
            padding: '19px',
          },
        }
      ],
    },
    MuiButton: {
      variants: [
        {props: {
          variant: 'contained',
        },
        style: {
          backgroundColor: 'rgb(174,209,172) !important',
        }},
        {props: {
          variant: 'outlined',
        },
        style: {
          borderColor: 'rgb(174,209,172) !important',
          color: 'rgb(174,209,172) !important',
        }}
      ],
    },
    MuiInputBase: {
      variants: [
        {
          props: {
            multiline: true,
          },
          style: {
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
          },
        }
      ],
    },
  },
});
