import React, { useContext } from 'react';
import { Grid,Typography,Paper,Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ChatIcon from '@material-ui/icons/Chat';
import VideoContext from '../Context/VideoContext';
import {socket} from "../Context/VideoState";
import { useEffect,useRef,useState } from 'react';
import Modal from 'react-modal';
import { Button, notification, Input} from 'antd';

Modal.setAppElement('#root')
const useStyles = makeStyles((theme) => ({
    video: {
      width: '550px',
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
    },
    gridContainer: {
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      padding: '10px',
      border: '2px solid black',
      margin: '10px',
    },
    IconsDiv:{
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '550px',
    },
    chatDiv:{
      display: 'grid',
      placeItems: 'center',
      height: '27rem',
    },
    input_message:{
      fontFamily: 'Gilroy-light',
      fontWeight: 'bold',
      marginTop: '1rem',
    },
    BoxForAvatar:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '550px',
      position: 'relative',
    },
    msg_sent:{
      alignSelf: 'flex-end',
    },
    msg_flex:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      height: '100%',
    }
}));

const {Search} = Input;
const VideoPlayer = () => {

    const classes = useStyles();
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, chat, setChat, msgRcv, sendMsg:sendMsgFunc, userName, myVideoStatus, userVideoStatus, myAudioStatus, userAudioStatus, updateVideo, updateAudio } = useContext(VideoContext);
    const [sendMsg,setSendMsg] = useState("");
    const [isModalVisible,setIsModalVisible] = useState(false);

    socket.on("msgRcv", ({name,msg:value,sender}) => {
      let msg = {};
      msg.msg = value;
      msg.type = "rcv";
      msg.sender = sender;
      msg.timeStamp = Date.now();
      setChat([...chat,msg]);
    });

    const dummy = useRef();
    useEffect(() => {
      if(dummy?.current) dummy.current.scrollIntoView({behavior: "smooth"});
    }, [chat]);


    const onSearch = (value) => {
      if(value && value.length) sendMsgFunc(value);
      setSendMsg("");
    };

    {/*For notifications on the screen*/}
    useEffect(() => {
      if(msgRcv.value && !isModalVisible){
        notification.open({
          message: "",
          description: `${msgRcv.sender}: ${msgRcv.value}`,
          icon: <MessageOutlinedIcon style={{color: "#108ee9"}}/>
        });
      }
    }, [msgRcv]);

    return (
        <Grid container className={classes.gridContainer}>
            {/*our own video */}
            {
              stream && (
                <Paper className={classes.paper}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        {name || 'Name'}
                    </Typography>
                    <video playsInline muted ref={myVideo} autoPlay className={classes.video} style={{opacity: `${myVideoStatus ? "1" : "0"}`, transform: "scaleX(-1)"}} />
                    <div className={classes.BoxForAvatar}>
                      <Avatar style={{backgroundColor: "#116", opacity: `${myVideoStatus ? "-1" : "2"}`}} icon={!name && <AccountCircleRoundedIcon/>} className={classes.AvatarStyle}> {name} </Avatar> 
                    </div>
                    <div className={classes.IconsDiv}>
                      <div onClick={()=>{updateAudio()}} tabIndex="0">
                        {
                          myAudioStatus ? (
                            <div><Fab><MicIcon/></Fab></div>
                          ) : (
                            <div><Fab><MicOffIcon/></Fab></div>
                          )
                        }
                      </div>
                      {  callAccepted && !callEnded && ( // for chat application
                        <div>
                            <Fab onClick={() => setIsModalVisible(true)} tabIndex="1"><ChatIcon/></Fab>
                            <Modal isOpen={isModalVisible} onRequestClose={() => setIsModalVisible(false)} style={{maxHeight: '100px'}}>
                              <h1 align="center"> Chat Messenger </h1>
                              {
                                chat.length ? (
                                  <div className={classes.msg_flex}>
                                    {
                                      chat.map((msg) => (
                                        <div className={msg.type === "sent" ? classes.msg_sent : classes.msg_rcv}> {msg.msg} </div>
                                      ))
                                    }
                                    <div ref={dummy}></div>
                                  </div>
                                ):(
                                  <div className={classes.chatDiv}>
                                    Write your message here
                                  </div>
                                )
                              }
                              <Search placeholder="Your message" allowClear className={classes.input_message} enterButton="Send" onChange={(e) => setSendMsg(e.target.value)} value={sendMsg} onSearch={onSearch} />
                            </Modal>
                        </div>
                      )}
                      <div onClick={()=>updateVideo()} tabIndex="0">
                        {myVideoStatus ? (
                          <div><Fab><VideocamIcon/></Fab></div>
                        ) : (
                          <div><Fab><VideocamOffIcon/></Fab></div>
                        )}
                      </div>
                    </div>
                  </Grid>
                </Paper>

              )
            }

             {/*User's video */}
             {
               callAccepted && !callEnded &&(
                <Paper className={classes.paper}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        {call.name || 'Name'}
                    </Typography>
                    <video playsInline ref={userVideo} autoPlay className={classes.video} style={{opacity: `${userVideoStatus ? "1" : "0"}`}}/>
                    <Avatar style={{backgroundColor: "#116", position: "absolute", opacity: `${userVideoStatus ? "-1" : "2"}`}} size={98} icon={!(userName || call.name) && <AccountCircleRoundedIcon/>}>{userName || call.name}</Avatar>
                  </Grid>
                </Paper>
               )
             }
        </Grid>
      )
}
export default VideoPlayer;