import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Container, FormControl, Stack, TextField, Typography, Link } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import faker from 'faker';
import { sample } from 'lodash';
// components
import { mockImgProduct } from '../utils/mockImages';
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
//
import PRODUCTS from '../_mocks_/products';
// ----------------------------------------------------------------------
const filter = createFilterOptions();
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
const DescriptionStyle = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export default function EcommerceShop() {
  const [mode, setMode] = useState(false);
  const [category, setCategory] = useState('Course Name');
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [recommendCourses, setRecommendCourses] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  const [value, setValue] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const PRODUCT_COLOR = [
    '#00AB55',
    '#000000',
    '#FFFFFF',
    '#FFC0CB',
    '#FF4842',
    '#1890FF',
    '#94D82D',
    '#FFC107'
  ];
  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const getCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getCourses');
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const mapCourses = (product, index) => {
    const setIndex = index + 1;
    return Object.assign({}, product, {
      id: faker.datatype.uuid(),
      cover: mockImgProduct(setIndex % 10),
      name: product['Course Name'],
      price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
      priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
      colors:
        (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
        (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
        (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
        (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
        (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
        (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
        PRODUCT_COLOR,
      status: setIndex % 3 ? sample(['new', '', '']) : 'sale',
    });
  };

  const getCoursesWithFilter = (filter) => {
    if (!filter || filter == '') return courses;
    return courses.filter((item) => {
      return item?.[category]?.indexOf(filter) > -1;
    })
  }

  const selectCourse = (newValue) => {
    if (typeof newValue === 'string') {
      setValue({
        name: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      setValue({
        name: newValue.inputValue,
      });
    } else {
      setValue(newValue);
    }
    setCourse(newValue);
    recommend(newValue);
  }

  const recommend = async (item) => {
    if (!item) { return setRecommendCourses([]); }
    let search = item['Course Name'] ? item['Course Name'] : item['inputValue'];
    try {
      const response = await axios.get(`http://localhost:5000/api/recommend2?search=${search}`);
      console.log(item, response)
      let resCourses = response.data.map((product, index) => {
        const setIndex = index + 1;
        return Object.assign({}, product, {
          id: faker.datatype.uuid(),
          cover: `/static/mock-images/products/coursera-free-courses.png`,
          name: product['Course Name'],
          price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
          priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
          colors:
            (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
            (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
            (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
            (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
            (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
            (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
            PRODUCT_COLOR,
          status: setIndex % 3 ? sample(['new', '', '']) : 'sale',
        });
      })
      setRecommendCourses(resCourses);
    } catch (error) {
      console.error(error);
      setRecommendCourses([]);
    }
  }

  useEffect(async () => {
    const reqCourses = await getCourses();
    setCourses(reqCourses?.data?.map(mapCourses));
  }, []);

  return (
    <Page title="Dashboard: Courses | Coursera">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }} onClick={() => {
          setMode(!mode);
          setCourse(null);
          console.log(mode);
        }}>
          Courses
        </Typography>
        <FormControl fullWidth>
          {mode ?
            <TextField style={{ marginBottom: '40px' }}
              type="text"
              label="Search ..."
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
            /> :
            <Autocomplete style={{ marginBottom: '40px' }}
              value={value}
              onChange={(event, newValue) => {
                selectCourse(newValue);
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.name);
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    inputValue,
                    name: `Add "${inputValue}"`,
                  });
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={courses.slice(0, 40)}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.name;
              }}
              renderOption={(props, option) => <li {...props}>{option.name}</li>}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Search ..." />
              )}
            />}
        </FormControl>
        {course && course['Course Name'] ?
          <Card style={{ marginBottom: '40px' }}>
            <CardMedia
              component="img"
              height="250"
              image={course['cover']}
              alt="green iguana"
            />
            <CardContent>
              <Link color="inherit" underline="hover" component="button" onClick={() => {
                window.open(course['Course URL'], '_blank');
              }}>
                <Typography gutterBottom variant="h5" component="div">
                  {course['Course Name']}
                </Typography>
              </Link>
              <div style={{marginBottom: '8px'}}>
                <Rating name="read-only" value={parseFloat(course['Course Rating'])} readOnly size="small" style={{margin: '5px'}} />
                <Chip label={course['Difficulty Level']} color="primary" variant="outlined" size="small" style={{margin: '5px'}} />
                <Chip label={course['University'].replaceAll('�', "'")} color="success" variant="outlined" size="small" style={{margin: '5px'}} />
              </div>
              <DescriptionStyle variant="body2" color="text.secondary">
                {course['Course Description'].replaceAll('�', "'")}
              </DescriptionStyle>
           
            </CardContent>
            <CardActions>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <div style={{ flex: 1 }}></div>
            
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  <b>Description</b><br />
                  {course['Course Description'].replaceAll('�', "'")}
                </Typography>
                <Typography paragraph>
                  <b>Skills</b><br />
                  {course['Skills'].replaceAll('�', "'")}
                </Typography>
              </CardContent>
            </Collapse>
          </Card> : null
        }
        {recommendCourses.length > 0 ? <Typography gutterBottom variant="h5" component="div" style={{ marginBottom: '40px' }}>
          Similar Courses
        </Typography> : null}
        {recommendCourses.length > 0 ? <ProductList products={recommendCourses} selectProduct={(product) => {
          selectCourse(product);
        }} style={{ marginBottom: '40px' }} /> : null}
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex"
          sx={{ mb: 5 }}
        >
          <Typography gutterTop gutterBottom variant="h5" component="div">
            All Courses
          </Typography>
          <div style={{ flex: 1 }}></div>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              onCategory={(item) => { item == "All" ? setCategory('Course Name') : setCategory(item) }}
            />
            <ProductSort />
          </Stack>
        </Stack>
        <ProductList products={getCoursesWithFilter(searchText).slice(0, 20)} selectProduct={(product) => {
          selectCourse(product);
        }} />
        <ProductCartWidget />
      </Container>
    </Page>
  );
}
