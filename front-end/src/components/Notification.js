import React, { useEffect } from 'react';
import { Trello } from 'react-feather';
import moment from 'moment'
import ReactMaterialUiNotifications from 'react-materialui-notifications';
const Notification = (props) =>{
    const {type, content,} = props;

    useEffect(()=>{
        if (type && content){
            ReactMaterialUiNotifications.showNotification({
                title: 'Title',
                additionalText: `Some message to be displayed`,
                icon: <Trello />,
                // iconBadgeColor: deepOrange500,
                overflowText: "me@gmail.com",
                timestamp: moment().format('h:mm A'),
                personalised: true,
                //avatar: "demo.png"
              })
        }
    },[type,content])
    

    return (
        <ReactMaterialUiNotifications
            desktop={true}
            transitionName={{
              leave: 'dummy',
              leaveActive: 'fadeOut',
              appear: 'dummy',
              appearActive: 'zoomInUp'
            }}
            transitionAppear={true}
            transitionLeave={true}
          />
    );
}

export default (Notification);