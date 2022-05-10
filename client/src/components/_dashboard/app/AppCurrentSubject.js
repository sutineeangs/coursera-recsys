import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': {
    height: CHART_HEIGHT
  },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: 'Portfolio', data: [20, 30, 40] },
  { name: 'Average', data: [50, 50, 50] }
];

export default function AppCurrentSubject() {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: 1 },
    fill: { opacity: 0.48 },
    legend: { floating: true, horizontalAlign: 'center' },
    yaxis: {
      show: false,
      min: 0,
      max: 100
    },
    xaxis: {
      categories: ['Past Performance', 'Risk Adjusted Return', 'Maximum Drawdown'],
      labels: {
        style: {
          colors: [
            theme.palette.text.secondary,
            theme.palette.text.secondary
            // theme.palette.text.secondary,
            // theme.palette.text.secondary,
            // theme.palette.text.secondary,
            // theme.palette.text.secondary
          ]
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Investment Diagram" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="radar" series={CHART_DATA} options={chartOptions} height={340} />
      </ChartWrapperStyle>
    </Card>
  );
}
