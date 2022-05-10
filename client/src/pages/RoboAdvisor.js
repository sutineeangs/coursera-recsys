import * as React from 'react';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Container,
  TextField,
  Typography
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { LoadingButton } from '@mui/lab';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useFormik, FormikProvider, Form } from 'formik';
import * as Yup from 'yup';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function RoboAdvisor() {
  const { Fragment } = React;
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [port, setPort] = React.useState('');
  const [riskLevel, setRiskLevel] = React.useState('');
  const [dates, setDates] = React.useState([null, null]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleSubmit = () => {
    console.log(555, {
      port,
      dates,
      riskLevel,
      amount
    });
    setOpen(true);
  };

  const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  ));

  return (
    <Page title="Dashboard: Recommend | Coursera">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Recommend</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Card>
              <CardHeader title="Set up your goal" />
              <CardContent>
                <Stack spacing={3}>
                  <FormControl fullWidth>
                    <InputLabel id="select-port-label">Select your investment</InputLabel>
                    <Select
                      labelId="select-port-label"
                      id="select-port-input"
                      value={port}
                      onChange={(event) => {
                        setPort(event.target.value);
                      }}
                      label="Select your investment"
                    >
                      <MenuItem value={0}>SET Immunity</MenuItem>
                      <MenuItem value={1}>First Million</MenuItem>
                      <MenuItem value={2}>All Balance</MenuItem>
                      <MenuItem value={3}>Tax Saving Fund</MenuItem>
                      <MenuItem value={4}>Global Income Focus</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateRangePicker
                        inputFormat="dd-MM-yyyy"
                        startText="Start date"
                        endText="End date"
                        value={dates}
                        onChange={(newValue) => {
                          setDates(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                          <Fragment>
                            <TextField {...startProps} style={{ width: '100%' }} />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField {...endProps} style={{ width: '100%' }} />
                          </Fragment>
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <Stack spacing={3} direction={{ xs: 'column', sm: 'row' }}>
                    <Grid item xs={12} md={6} lg={6}>
                      <FormControl fullWidth>
                        <InputLabel id="select-risk-label">Risk level</InputLabel>
                        <Select
                          labelId="select-risk-label"
                          id="select-risk-input"
                          value={riskLevel}
                          onChange={(event) => {
                            setRiskLevel(event.target.value);
                          }}
                          label="Risk level"
                        >
                          <MenuItem value={1}>Conservative</MenuItem>
                          <MenuItem value={2}>Moderately Conservative</MenuItem>
                          <MenuItem value={3}>Moderately Aggressive</MenuItem>
                          <MenuItem value={4}>Aggressive</MenuItem>
                          <MenuItem value={5}>Very Aggressive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <FormControl fullWidth>
                        <TextField
                          type="number"
                          label="Amount"
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          value={amount}
                          onChange={(event) => {
                            setAmount(event.target.value);
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Stack>
                  <Grid item xs={12} md={3} lg={3}>
                    <LoadingButton
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                      onClick={handleSubmit}
                    >
                      Create portfolio
                    </LoadingButton>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Card>
              <CardHeader title="Graph" />
              <CardContent>Graph</CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </Page>
  );
}
