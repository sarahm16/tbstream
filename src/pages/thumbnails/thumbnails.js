import axios from "axios";
import React, { useEffect, useState } from "react";
import PageLayout from "../../components/pageLayout/pageLayout";
import ThumbnailCard from "../../components/card/card";

function Thumbnails() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get('https://my-tb-cors.herokuapp.com/https://connect-fns.azurewebsites.net/api/getall?containerId=stream').then(res => {
            console.log(res.data)
            if(res.data !== 'No items found') {
                setVideos(res.data);
            }
        })
    }, [])

    return(
        <>
            <PageLayout>
                {videos.map(video => (
                    <ThumbnailCard video={video} />
                ))}
            </PageLayout>
        </>
    )
}

export default Thumbnails;