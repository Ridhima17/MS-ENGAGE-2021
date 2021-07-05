import React, {createContext, useState, useRef, useEffect} from 'react';
import VideoContext from './VideoContext';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';
import { NavigationOutlined } from '@material-ui/icons';

export const socket = io('http://localhost:5000'); //passing the url of the server

//everything necessary to run our video chat
//below 3 functions are all of that we need to support the video chat
const ContextProvider = ({children}) =>{

    const myVideo = useRef(null);
    const userVideo = useRef();
    const connectionRef = useRef();

    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState("");
    const [call, setCall] = useState({});
    const [me, setMe] = useState("");
    const [chat,setChat] = useState([]);
    const [userName,setUserName] = useState('');
    const [msgRcv,setMsgRcv] = useState("");
    const [otherUser,setOtherUser] = useState("");
    const [myVideoStatus,setMyVideoStatus] = useState(true);
    const [myAudioStatus,setMyAudioStatus] = useState(true);
    const [userVideoStatus,setUserVideoStatus] = useState();
    const [userAudioStatus,setUserAudioStatus] = useState();

    useEffect(()=>{   
        const getUserMedia = async () => {
            try {
              const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
              setStream(stream);
              myVideo.current.srcObject = stream;
            } catch (err) {
              console.log(err);
            }
        };
        getUserMedia();

        if(localStorage.getItem("name")){
            setName(localStorage.getItem("name"));
        }

        socket.on('me',(id) => setMe(id));

        socket.on("updateUserMedia", ({type,currentMediaStatus}) => {
            if(currentMediaStatus !== null || currentMediaStatus !== []){
                switch(type){
                    case "video":
                        setUserVideoStatus(currentMediaStatus);
                        break;
                    case "mic":
                        setUserAudioStatus(currentMediaStatus);
                        break;
                    default:
                        setUserAudioStatus(currentMediaStatus[0]);
                        setUserVideoStatus(currentMediaStatus[1]);
                }
            }
        });

        socket.on('calluser',({from,name: callerName,signal}) => {
            setCall({isReceivedCall: true, from, name: callerName, signal});
        });

        socket.on("msgRcv",({name,msg:value,sender}) => {
            setMsgRcv({value,sender});
            setTimeout(() => {
                setMsgRcv({});
            }, 2000);
        });
    }, []); //empty dependency at the end otherwise its always going to run 

    const answerCall = () => {
        setCallAccepted(true);
        setOtherUser(call.from);
        const peer = new Peer({initiator:false, trickle: false, stream});

        peer.on('signal',(data)=>{
            socket.emit('answerCall',{signal: data, to: call.from, userName: name, type: "both", myMediaStatus: [myAudioStatus,myVideoStatus]});
        });

        peer.on('stream',(currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) =>{
        const peer = new Peer({initiator:true, trickle: false, stream});
        setOtherUser(id);
        peer.on('signal',(data)=>{
            socket.emit('calluser',{userToCall: id, signalData: data,from: me,name});
        });

        peer.on('stream',(currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callaccepted',({signal,userName})=>{
            setCallAccepted(true);
            setUserName(userName);
            peer.signal(signal);
            socket.emit("updateMyMedia", {
                type: "both",
                currentMediaStatus: [myAudioStatus,myVideoStatus],
            });
        });

        connectionRef.current = peer;
    };

    const updateVideo = () => {
        setMyVideoStatus((currentStatus) => {
            socket.emit("updateMyMedia", {
                type: "video",
                currentMediaStatus: !currentStatus,
            });
            stream.getVideoTracks()[0].enabled = !currentStatus;
            return !currentStatus;
        });
    };

    const updateAudio = () => {
        setMyAudioStatus((currentStatus) => {
            socket.emit("updateMyMedia", {
                type: "mic",
                currentMediaStatus: !currentStatus,
            });
            stream.getAudioTracks()[0].enabled = !currentStatus;
            return !currentStatus;
        });
    };

    const leaveCall = () =>{
        setCallEnded(true);
        connectionRef.current.destroy();
        socket.emit("endCall",{id: otherUser});
        window.location.reload(); //reloads the page and provides the user with a new id
    }

    const leaveCall1 = () => {
        socket.emit("endCall",{id: otherUser});
    }


    const sendMsg = (value) =>{
        socket.emit("msgUser",{name,to: otherUser,msg:value,sender:name});
        let msg = {};
        msg.msg = value;
        msg.type = "sent";
        msg.timestamp = Date.now();
        msg.sender = name;
        setChat([...chat,msg]);
    };


    return(
        <VideoContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
            leaveCall1,
            chat,
            setChat,
            userName,
            setUserName,
            otherUser,
            setOtherUser,
            msgRcv,
            setMsgRcv,
            sendMsg,
            myVideoStatus,
            setMyVideoStatus,
            userVideoStatus,
            setUserAudioStatus,
            updateVideo,
            updateAudio,
            myAudioStatus,
            setMyAudioStatus
        }}>
            {children}
        </VideoContext.Provider>
    );
};
export default ContextProvider;
