import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function Comment(props) {
    const { comment } = props;

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={comment.user} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary={comment.user}
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {new Date(comment.date).toLocaleDateString()}
                    </Typography>
                        {` — ${comment.text}`}
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}
