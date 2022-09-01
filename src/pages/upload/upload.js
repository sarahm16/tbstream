import { Box, Button, Divider, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import PageLayout from "../../components/pageLayout/pageLayout";
import { KeyboardBackspace, CameraAlt } from "@mui/icons-material";
import { v4 as uuidv4 } from 'uuid';
import toArrayBuffer from 'to-array-buffer';
import { useNavigate } from "react-router-dom";

const { BlobServiceClient } = require('@azure/storage-blob');
const blobSasUrl = 'https://tbconnectstorage.blob.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-12-31T08:17:12Z&st=2022-05-02T23:17:12Z&spr=https&sig=%2FdDWugm%2BMMmtEVnwHYBIi8pVEMJmGcZBngm0Jz4Z2ZA%3D';
const blobServiceClient = new BlobServiceClient(blobSasUrl);

function Upload() {
    const navigate = useNavigate();

    const [video, setVideo] = useState({
        likes: 0,
        comments: [],
        name: '5 Minute Friday'
    });

    function save() {
        const containerName = 'siteimages';
        const containerClient = blobServiceClient.getContainerClient(containerName);
        let uuid = uuidv4();
        let url = `https://tbconnectstorage.blob.core.windows.net/siteimages/${uuid}${video.thumbnail.name}`;
        const blockBlobClient = containerClient.getBlockBlobClient(`${uuid}${video.thumbnail.name}`);
        blockBlobClient.uploadBrowserData(video.thumbnail.buffer);


        video.date = new Date().getTime();
        video.thumbnail = url;
        video.iframe = video.iframe.replaceAll('"', "'" );

        console.log(video)

        axios.post(`https://my-tb-cors.herokuapp.com/https://connect-fns.azurewebsites.net/api/save?containerId=stream`, video).catch(err => {
            alert('Oops! There was an error saving video. Please try again.')
        }).then(res => {
            navigate('/videos')
        })
    }

    function handleImageChange(e) {
        e.preventDefault();

        let file = e.target.files[0];
        console.log(file)
        let reader = new FileReader();
            
        reader.onload = () => {
            var arrBuff = toArrayBuffer(reader.result);
            // tempFileArr.push({name: file.name, buffer: arrBuff, src: reader.result});

            setVideo({
                ...video,
                thumbnail: {
                    name: file.name,
                    src: reader.result,
                    buffer: arrBuff
                }
            })
        }

        reader.readAsDataURL(file);
    }

    return(
        <PageLayout>
            <Button
                component='a'
                href='/videos'
                startIcon={<KeyboardBackspace />}
            >
                back to videos
            </Button>
            <Paper sx={{p: 3, mt: 2, maxWidth: '600px'}}>
                <Typography variant="h5">
                    Upload a Video
                </Typography>
                <Divider sx={{my: 3}} />

                <Button sx={{fontSize: '11px'}} variant="contained" component="label" color="primary">
                    {" "}
                    <CameraAlt sx={{fontSize: '15px', mr: 1}} /> Upload Thumbnail
                    <input 
                        type="file" 
                        hidden onChange={handleImageChange} 
                        multiple />
                </Button>

                {video.thumbnail &&
                    <Box sx={{width: '100%', mt: 3}}>
                        <img src={video.thumbnail.src} style={{width: '200px'}} />
                    </Box>
                }

                <TextField
                    fullWidth
                    size='small'
                    sx={{mt: 3}}
                    label='Video Name'
                    value={video.name}
                    onChange={(e) => setVideo({
                        ...video,
                        name: e.target.value
                    })}
                />

                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label='Add iFrame Text'
                    value={video.iframe}
                    onChange={(e) => setVideo({
                        ...video,
                        iframe: e.target.value
                    })}
                    sx={{mt: 3}}
                />

                <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                    <Button
                        sx={{fontSize: '10px'}}
                        color='success'
                        variant='contained'
                        onClick={save}
                    >
                        save
                    </Button>
                </Box>
            </Paper>
        </PageLayout>
    )
}

export default Upload;