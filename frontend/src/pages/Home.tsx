import React, { ReactElement, FC, useState, useEffect } from "react";
import { Box, Button, Typography, Grid, Card, CardContent, Chip } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import axios from "axios";
import MealSummaryRow from '../components/MealSummaryRow';
import debounce from 'lodash.debounce';

interface Meal {
    _id: string;
    title: string;
    course: string;
    description: string;
}

interface PostType {
    _id: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    price: number;
    capacity: number;
    address: string;
    filters: string[];
    meals: Meal[];
}

interface Posts {
    allPosts: PostType[];
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Home: FC<any> = (): ReactElement => {
    const [postData, setPostData] = useState<Posts>({
        allPosts: []
    });

    useEffect(() => {
        async function fetchData() {
            const allPosts = await axios.get(`/api/posts/`);
            setPostData({ allPosts: allPosts.data });
        }
        fetchData();
    }, [])

    const debouncedSearch = debounce(async (criteria) => {
        const allPosts = await axios.get(`/api/search/${criteria.toLowerCase()}`);
        setPostData({ allPosts: allPosts.data });
      }, 300);
      
      async function requestSearch(e: React.ChangeEvent<HTMLInputElement>) {
        debouncedSearch(e.target.value);
      }


    return (
        <Box sx={{ backgroundColor:'whitesmoke'}}>
        <Box sx={{ mt:6, mb:6, ml:10, mr:10 }}>
            <Stack spacing={6} alignItems="center">
                <Box sx={{
                    flexGrow: 1,
                    backgroundColor: 'gainsboro',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search???"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={requestSearch}
                        />
                    </Search>
                </Box>
                <Typography variant="h3">Home</Typography>
                    {
                        postData.allPosts?.map((p) => (
                            <React.Fragment key={p._id}>
                                <MealSummaryRow id={p._id} title={p.title}
                                    address={p.address}  startTime={p.startTime}
                                    endTime={p.endTime} capacity={p.capacity}
                                    price={p.price} filters={p.filters} />
                            </React.Fragment>
                        ))
                    }

                {/* <Pagination count={5} /> */}
            </Stack>
        </Box>
        </Box>
    );
};

export default Home;