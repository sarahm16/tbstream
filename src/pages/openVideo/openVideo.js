import { KeyboardBackspace } from "@mui/icons-material";
import { Button, Card, Divider, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/pageLayout/pageLayout";

function OpenVideo() {
    const id = useParams().id;
    console.log(id)
    const [video, setVideo] = useState({});

    useEffect(() => {
        axios.get(`https://my-tb-cors.herokuapp.com/https://connect-fns.azurewebsites.net/api/getById?containerId=stream&id=${id}`).then(res => {
            console.log(res.data)
            setVideo(res.data[0]);
        })
    }, [])

    return (
        <PageLayout>
            <Button
                component='a'
                href='/videos'
                startIcon={<KeyboardBackspace />}
            >
                back to vidoes
            </Button>
            {Object.keys(video).length > 0 &&
                <Paper sx={{p: 3, mt: 2}}>
                    <Typography 
                        variant='h5'
                        sx={{mb: 3}}
                    >
                        {new Date(video.date).toLocaleDateString()}
                    </Typography>
                    <div dangerouslySetInnerHTML={{__html: video.iframe}} />
                    <Divider sx={{mt: 4}} />
                    <Typography variant='h6' sx={{mb: 3, mt: 2}}>Comments</Typography>
                </Paper>
            }
        </PageLayout>
    )

}

export default OpenVideo;