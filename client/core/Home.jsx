/*import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import unicornbikeImg from './../assets/images/unicornbike.jpg'

const useStyles = makeStyles(theme => ({ 
card: {
maxWidth: 600, 
margin: 'auto',
marginTop: theme.spacing(5) 
},
title: {
padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px 
${theme.spacing(2)}px`,
color: theme.palette.openTitle 
},
media: { 
minHeight: 400
} 
}))*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import logo from './../assets/images/logo.png';
   

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 1000,
    margin: 'auto',
    marginTop: theme.spacing(5),
    backgroundColor: 'rgb(41, 41, 41)',
      
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: 'white',
    textAlign: 'center',
  },
  media: {
    minHeight: 500,
    magin: 'auto',
  },
  description: {
    color: 'white',
  },
}));

export default function Home(){ 
const classes = useStyles()
return (
<Card className={classes.card}>
   
  <Typography variant="h6" className={classes.title}>Home Page</Typography>
<CardMedia className={classes.media}
image={logo} title="Blog Logouyh vb"/>
<CardContent>
<Typography variant="h10" component="p" className={classes.description}> 
At Blogit, our mission is to cultivate a vibrant and inclusive community of passionate programmers, developers, and tech enthusiasts. We strive to provide a dynamic platform where knowledge is shared, ideas are explored, and connections are forged. Through insightful articles, tutorials, and engaging discussions, we aim to empower individuals at every skill level to excel in the ever-evolving world of programming. Our commitment is to foster learning, inspire creativity, and contribute to the growth of a global network of professionals who are shaping the future of technology. Join us on this journey of continuous learning and innovation as we navigate the exciting landscape of programming together."
</Typography> 
</CardContent>

</Card> 
)
}

/*const MyComponent = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Card Title
        </Typography>
        <CardMedia
          className={classes.media}
          image={unicornbikeImg}
          title="Unicorn Bike"
        />
        <Typography variant="body2" component="p">
          Card content goes here.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MyComponent;*/

