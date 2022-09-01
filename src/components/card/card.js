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
import { ChatBubble, ChatBubbleOutline, PlayArrow, PlayCircleOutline } from '@mui/icons-material';
import { Badge, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function ThumbnailCard(props) {
    const navigate = useNavigate()
    const { video } = props;
    const { date, id, thumbnail, comments, likes } = video;
    const numComments = comments.length;

    function redirect() {
        navigate(`/videos/${id}`)
    }

    return (
        <Card sx={{ width: '100%' }}>
            <CardHeader
                title="5 Minute Friday"
                subheader={new Date(date).toLocaleDateString()}
            />
            <CardMedia
                component="img"
                height="194"
                image={thumbnail || ''}
                alt="Paella dish"
            />
            {/* <CardContent>
                <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
                </Typography>
            </CardContent> */}
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