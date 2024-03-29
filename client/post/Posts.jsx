import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import {list} from './api-post.js'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 800,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgb(41, 41, 41)',

  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: 'white',
    textAlign: 'center',
    fontSize: '1.2em',
  },
  avatar:{
    width: 100,
    height: 100
  },
  subheading: {
    color: 'white',  
  },
  
  postTitle: {
    fontSize: '1.2em',
    marginBottom: '5px',
    color: 'white',
  },
  details: {
    padding: '24px'
  }
}))
export default function Posts(){
  const classes = useStyles()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    list(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setPosts(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [])

    return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Posts
        </Typography>
        <List dense>
          {posts.map((post, i) => {
            return  <Link to={"/posts/"+post._id} key={i} style={{ textDecoration: 'none' }}>
              <Divider/>
              <ListItem button>
                {/* <ListItemAvatar>
                  <Avatar className={classes.avatar}  src={'/api/shops/logo/'+shop._id+"?" + new Date().getTime()}/>
                </ListItemAvatar> */}
                <div className={classes.details}>
                  <Typography type="headline" component="h2" color="primary" className={classes.postTitle}>
                    {post.subject}
                  </Typography>
                  <Typography type="subheading" component="h4" className={classes.subheading}>
                    {post.description}
                  </Typography>
                </div>
              </ListItem>
              <Divider/>
            </Link>})}
        </List>
      </Paper>
    </div>)
}
