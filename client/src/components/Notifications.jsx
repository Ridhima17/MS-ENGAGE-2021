import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import VideoContext from '../Context/VideoContext';

const Notifications = () => {
    const {answerCall, call, callAccepted, } = useContext(VideoContext);

    return (
        <>
            {call.isReceivedCall && !callAccepted &&(
                <div styles={{display: 'flex', justifyContent: 'center'}}>
                    <h1>
                        {call.name} is calling: 
                    </h1>
                    <Button variant="contained" color="primary" onClick={answerCall}>
                        Answer
                    </Button>
                </div>
            )}
        </>
    );
}
export default Notifications;