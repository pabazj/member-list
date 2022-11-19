import React, { useState, useEffect } from 'react'

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    height: '80%'
}));

const CountWrapperDiv = styled(Typography)({
    float: 'right'
});

export default function UserData(props) {
    const [count, setCount] = useState(0);

    const { userDataList, activity } = props;


    useEffect(() => {
        if (activity !== '') {
            setCount(userDataList.length)
        }

    }, [userDataList, activity])


    return (

        <div>
            {activity !== '' ? <CountWrapperDiv gutterBottom> <b>User Count :</b> {count}</CountWrapperDiv> : null}

            <Grid container spacing={0.5} columns={{ xs: 4, sm: 8, md: 12 }}>
                {userDataList.map(user => (
                    <Grid item xs={2} sm={4} md={4} key={user.id}>
                        <Item>
                            <Typography variant="h6" color="text.secondary">
                                {user.name}
                            </Typography>
                            <Typography variant="overline" display="block" gutterBottom>
                                <b>Age: </b> {user.age}
                            </Typography>
                            <Typography variant="overline" display="block" gutterBottom>
                                <b>Rating: </b>  {user.rating}
                            </Typography>

                            <div >
                                <b>Activities: </b>
                                {user.activities.slice(-3).map(activity => (
                                    <li>
                                        {activity}
                                    </li>
                                ))}
                            </div>

                        </Item>
                    </Grid>
                ))}

            </Grid>
        </div>
    )
}
