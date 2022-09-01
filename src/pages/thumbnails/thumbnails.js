import axios from "axios";
import React, { useEffect, useState } from "react";
import PageLayout from "../../components/pageLayout/pageLayout";
import ThumbnailCard from "../../components/card/card";
import { Grid } from "@mui/material";

function Thumbnails() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get('https://my-tb-cors.herokuapp.com/https://connect-fns.azurewebsites.net/api/getall?containerId=stream').then(res => {
            console.log(res.data)
            if(res.data !== 'No items found') {
                setVideos(res.data.sort((a, b) => {
                    if(a.date < b.date) return 1
                    if(a.date > b.date) return -1
                    return 0
                }));
            }
        })
    }, [])

    return(
        <>
            <PageLayout>
                {videos.length > 0 &&
                
                    <Grid container spacing={2}>
                        {videos.map(video => (
                            <Grid item key={video.id}>
                                <ThumbnailCard video={video} />
                            </Grid>
                        ))}
                    </Grid>
                }
            </PageLayout>
        </>
    )
}

export default Thumbnails;