import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'
import config from './../../config/config'
import stripeButton from './../assets/images/stripeButton.png'
import MyOrders from './../order/MyOrders'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 800,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    backgroundColor: 'rgb(41, 41, 41)',
    color: 'white'
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: 'white'
  },
  stripe_connect: {
    marginRight: '10px',
  },
  stripe_connected: {
    verticalAlign: 'super',
    marginRight: '10px'
  }
}))

export default function Profile({ match }) {
  const classes = useStyles()
  const [user, setUser] = useState({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])

  if (redirectToSignin) {
    return <Redirect to='/signin'/>
  }
  return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
      primary={user.name}
      secondary={user.email}
      primaryTypographyProps={{ style: { color: 'white' } }}
      secondaryTypographyProps={{ style: { color: 'white' } }}
    />{
             auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id &&
             (<ListItemSecondaryAction>       
               <Link to={"/user/edit/" + user._id}>
                 <IconButton aria-label="Edit" color="primary">
                   <Edit/>
                 </IconButton>
               </Link>
               <DeleteUser userId={user._id}/>
             </ListItemSecondaryAction>)
            }
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText primary={"Joined: " + (
              new Date(user.created)).toDateString()}/>
          </ListItem>
        </List>
        <MyOrders/>
      </Paper>
    )
}
