import { KeyboardBackspace } from "@mui/icons-material";
import { Button, Divider, Paper, Typography, List, TextField, Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/pageLayout/pageLayout";
import Comment from "../../components/comment/comment";
import { display } from "@mui/system";

function OpenVideo() {
    const id = useParams().id;
    const [video, setVideo] = useState({});
    const [displayForm, setDisplayForm] = useState(false);
    const [comment, setComment] = useState({});
    let user = localStorage.getItem('userName');

    useEffect(() => {
        axios.get(`https://my-tb-cors.herokuapp.com/https://connect-fns2.azurewebsites.net/api/getById?containerId=stream&id=${id}`).then(res => {
            console.log(res.data)
            setVideo(res.data[0]);
        })
    }, [])

    function addComment() {
        comment.date = new Date().getTime();
        comment.user = user;

        axios.post(`https://my-tb-cors.herokuapp.com/https://connect-fns2.azurewebsites.net/api/updateWithKey?containerId=stream&id=${id}&partitionKey=id`, {
            comments: [comment, ...video.comments]
        }).catch(err => {
            alert('Oops! There was an error saving your comment. Please try again')
        }).then(res => {
            setVideo({
                ...video,
                comments: [comment, ...video.comments]
            });
    
            setDisplayForm(false);
            setComment({});
        })
    }

    return (
        <PageLayout>
            <Button
                component='a'
                href='/videos'
                startIcon={<KeyboardBackspace />}
            >
                back to videos
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

                    {!displayForm &&
                        <Button
                            onClick={() => setDisplayForm(true)}
                        >
                            add comment
                        </Button>
                    }

                    {displayForm &&
                        <>
                            <TextField
                                value={comment.text}
                                onChange={(e) => setComment({
                                    ...comment,
                                    text: e.target.value
                                })}
                                fullWidth
                                multiline
                                minRows={3}
                            />
                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                                <Button
                                    sx={{fontSize: '10px', mr: 1}}
                                    color='error'
                                    variant='contained'
                                    onClick={() => setDisplayForm(false)}
                                >
                                    cancel
                                </Button>
                                <Button
                                    sx={{fontSize: '10px'}}
                                    color='success'
                                    variant='contained'
                                    onClick={addComment}
                                >
                                    save
                                </Button>
                            </Box>
                        </>
                    }

                    <List>
                        {video.comments.map(comment => {
                            return (
                                <Comment key={comment.id} comment={comment} />
                            )   
                        })}
                    </List>
                </Paper>
            }
        </PageLayout>
    )

}

export default OpenVideo;