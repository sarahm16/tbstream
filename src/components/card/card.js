import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ChatBubble, ChatBubbleOutline, Check, Edit, PlayArrow, PlayCircleOutline } from '@mui/icons-material';
import { Badge, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function ThumbnailCard(props) {
    const navigate = useNavigate()
    const { video } = props;
    const { date, id, thumbnail, comments, likes } = video;
    const numComments = comments.length;
    const [editOn, setEditOn] = React.useState(false);
    const [name, setName] = React.useState(video.name || "5 Minute Friday");
    const adminEmails = ['carters@transblue.org', 'jim.wescott@transblue.org'];
    const [admin, setAdmin] = React.useState(false);

    React.useEffect(() => {
        let userEmail = localStorage.getItem('email');
        if(adminEmails.indexOf(userEmail.toLowerCase()) > -1) {
            setAdmin(true)
        }
    }, [])

    function redirect() {
        navigate(`/videos/${id}`)
    }

    function handleEdit() {
        if(editOn) {
            axios.post(`https://my-tb-cors.herokuapp.com/https://connect-fns2.azurewebsites.net/api/updateWithKey?containerId=stream&id=${id}&partitionKey=id`, {
                name: name
            }).catch(err => {
                alert('Oops! There was an error. Please try again.')
            }).then(() => {
                setEditOn(!editOn)
            })
        }   
        else {
            setEditOn(!editOn)
        }
    }

    return (
        <Card sx={{ width: '100%' }}>
            <CardHeader
                title={
                    editOn 
                    ?   <TextField 
                            value={name} 
                            size='small'
                            onChange={(e) => setName(e.target.value)}
                        />
                    :   name
                }
                subheader={new Date(date).toLocaleDateString()}
                action={
                    admin 
                        ?   <IconButton
                                onClick={handleEdit}
                            >
                                {!editOn
                                    ? <Edit />
                                    : <Check sx={{color: 'green'}} />
                                }
                            </IconButton>
                        : ''
                    }
            />
            <Box
                component='a'
                href={`/videos/${id}`}
            >
                <CardMedia
                    component="img"
                    height="194"
                    image={thumbnail || ''}
                    alt="Thumbnail"
                />
            </Box>
            <CardActions disableSpacing>
                <IconButton 
                    aria-label="play"
                    onClick={redirect}
                >
                    <PlayCircleOutline sx={{fontSize: '30px'}} />
                </IconButton>
                <Box
                    sx={{marginLeft: 'auto', pr: 2}}
                >
                    {/* <Badge badgeContent={numComments} color='primary'>
                        <FavoriteIcon
                            sx={{fontSize: '25px'}}
                        />
                    </Badge> */}

                    <Badge badgeContent={numComments} color='primary'>
                        <ChatBubbleOutline
                            sx={{fontSize: '25px', color: '#ed6a22'}}
                        />
                    </Badge>
                </Box>
            </CardActions>
        </Card>
    );
}