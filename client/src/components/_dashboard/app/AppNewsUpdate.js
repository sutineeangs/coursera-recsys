import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { mockImgCover } from '../../../utils/mockImages';
//
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

const NEWS = [
  {
    title: `Peloton, Pfizer, Meta Platforms Fall Premarket; Coty, Harley-Davidson Rise	Peloton, Pfizer, Meta Platforms Fall Premarket; Coty, Harley-Davidson Rise`,
    description: `By Peter Nurse Investing.com -- Stocks in focus in premarket trade on Tuesday, February 8th. Please refresh for updates. Peloton (NASDAQ:PTON) stock fell 1.6% after the exercise...`,
    image: mockImgCover(1),
    postedAt: faker.date.soon()
  },
  {
    title: `Bond Auctions, Peloton Shake-Up, Ukraine Diplomacy - What's Moving Markets	Bond Auctions, Peloton Shake-Up, Ukraine Diplomacy - What's Moving Markets`,
    description: `By Geoffrey Smith  Investing.com -- Bond markets remain under pressure ahead of a test of strength in the shape of three big Treasury auctions this week. The first of those takes...`,
    image: mockImgCover(2),
    postedAt: faker.date.soon()
  },
  {
    title: `'End of the road' for euro clearing in London after June 2025, says EU official`,
    description: `By Huw Jones LONDON (Reuters) -The European Union agreed on Tuesday to prolong until June 30, 2025 permission for Britain's clearing houses to continue serving customers in the...`,
    image: mockImgCover(3),
    postedAt: faker.date.soon()
  },
  {
    title: `SoftBank dumps sale of Arm over regulatory hurdles, to IPO instead`,
    description: `By Jane Lanhee Lee and Josh Horwitz SAN FRANCISCO/SHANGHAI (Reuters) - SoftBank Group Corp has shelved its blockbuster sale of Arm Ltd to U.S. chipmaker Nvidia (NASDAQ:NVDA) Corp...`,
    image: mockImgCover(4),
    postedAt: faker.date.soon()
  },
  {
    title: `Energy prices lift BP profits to 8-year high`,
    description: `By Ron Bousso LONDON (Reuters) - BP (NYSE:BP)'s profits hit their highest in eight years in 2021, lifted by soaring gas and oil prices, as the company boosted share repurchases...`,
    image: mockImgCover(5),
    postedAt: faker.date.soon()
  }
];

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

function NewsItem({ news }) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {formatDistance(postedAt, new Date())}
      </Typography>
    </Stack>
  );
}

export default function AppNewsUpdate() {
  return (
    <Card>
      <CardHeader title="News Update" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {NEWS.map((news) => (
            <NewsItem key={news.title} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}
