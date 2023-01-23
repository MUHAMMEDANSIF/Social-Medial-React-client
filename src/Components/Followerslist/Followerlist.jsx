import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import './Followlist.css';
import { getFollowerList } from '../../Api/User.Api';

export default function Followerlist() {
  const [nofollow, setnofollow] = React.useState('when you start follow people you will see them here');
  const [followerlist, setFollowerlist] = React.useState([]);

  const handleclick = (follower) => {
    getFollowerList(follower, (response) => {
      if (response.success) {
        setFollowerlist(response.followers);
        if (response.followers === null) {
          setFollowerlist([]);
        }
      }
    });
  };

  React.useEffect(() => {
    handleclick('followers');
  }, []);

  return (
    <div className="Followerlist">
      <div className="options-follow">
        <div>
          <span onClick={() => {
            handleclick('followers');
            setnofollow('when you start follow people you will see them here');
          }}
          >
            Followers

          </span>
        </div>
        <div>
          <span onClick={() => {
            handleclick('following');
            setnofollow('when people start follow you that time you can see them here');
          }}
          >
            Following

          </span>
        </div>
      </div>
      <hr />
      {
        followerlist.length > 0
          ? (
            <List sx={{ width: '100%' }}>
              {
                    followerlist.map((followerobj) => (
                      <>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={followerobj.followerid.profile ? followerobj.followerid.profile.profileurl : process.env.REACT_APP_PROFILE_URL} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={followerobj.followerid.firstname}
                            secondary={(
                              <>
                                @
                                {followerobj.followerid.username}
                              </>
            )}
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </>
                    ))
                  }
            </List>
          )
          : nofollow
}

    </div>
  );
}
