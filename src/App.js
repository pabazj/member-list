
import React, { useState } from 'react'
import uniqid from 'uniqid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

import UserData from './components/UserData'

import { userList, userActivityList } from './userList'

import debounce from 'lodash.debounce';

const HeaderWrapperDiv = styled('div')(({ theme }) => ({
  padding: '20px'
}));

const TitleWrapperDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center'
}));

const SearchWrapperDiv = styled('div')(({ theme }) => ({
  float: 'left',
  paddingTop: '10px'
}));

const SelecterWrapperDiv = styled('div')(({ theme }) => ({
  float: 'right'
}));

function App() {

  const [memberList, setMemberList] = useState(userList);
  const [code, setCode] = useState('');
  const [searchTearm, setSearchTearm] = useState('');
  const [activityList, setActivityList] = useState(userActivityList)

  const handleSearch = debounce((country) => {
    setSearchTearm(country)
  }, 1000)

  const handleActivityChange = (event) => {
    setCode(event.target.value);
  };

  const byCategory = (member, code) => {
    if (code !== '') {

      if (member.activities.includes(code)) {
        return member
      }

    }
    else
      return member


  };

  const handleMemberList = (memberList, code, searchTearm) => {

    return memberList
      .filter(member => member.name.toLowerCase().includes(searchTearm.toLowerCase()))
      .filter(member => byCategory(member, code))

  }

  return (

    <Container fixed>
      <Box sx={{ flexGrow: 1 }} >
        <HeaderWrapperDiv >
          <TitleWrapperDiv>
            <Typography variant="h4" gutterBottom>
              User List
            </Typography>
          </TitleWrapperDiv>
          <div>
            <SearchWrapperDiv>
              <TextField
                size="small"
                type="search"
                name="search"
                id="outlined-basic"
                label="Search by Name"
                variant="outlined"
                onChange={e => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                    </InputAdornment>
                  ),
                }}
              />
            </SearchWrapperDiv>
            <SelecterWrapperDiv>
              <FormControl sx={{ m: 1, minWidth: 180 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Activity</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={code}
                  onChange={handleActivityChange}
                  autoWidth
                  label="Activity"
                  defaultValue={code}
                >
                   <MenuItem value="Select by Code" value=''>Select by Activity</MenuItem>
                  {activityList?.map(code => (
                    <MenuItem key={uniqid()} value={code}>{code}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </SelecterWrapperDiv>
          </div>
          <UserData userDataList={handleMemberList(memberList, code, searchTearm)} activity={code} />
        </HeaderWrapperDiv>
      </Box>
    </Container>
  );
}

export default App;
