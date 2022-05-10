import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';
import Rating from '@mui/material/Rating';
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product, selectProduct }) {
  const { name, cover, price, colors, status, priceSale, } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle alt={name} src={cover} style={{ cursor: 'pointer' }} onClick={()=>{selectProduct(product)}} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" component={'button'} onClick={() => {
          window.open(product['Course URL'], '_blank');
        }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Rating name="read-only" value={parseFloat(product['Course Rating'])} readOnly size="small" />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" noWrap>
            {product['Difficulty Level']}
          </Typography>
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
