import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [44, 20, 15, 10, 10, 5] }];

export default function AppConversionRates() {
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: [
        'Foreign Equity',
        'Foreign Balance',
        'Short Term Fixed Income',
        'Mid/Long Term Fixed Income',
        'Alternative',
        'Thai Equity'
        // 'South Korea',
        // 'Netherlands',
        // 'United States',
        // 'United Kingdom'
      ]
    }
  });

  return (
    <Card>
      <CardHeader title="Asset Class" subheader="(+43%) than last year" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
