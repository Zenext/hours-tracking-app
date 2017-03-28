import React from 'react';
import Button from 'grommet/components/Button';
import Notification from 'grommet/components/Notification';

export default function PopupDelete(props) {
  return (
    <Notification
      status="critical"
      closer={true}
      onClose={props.onNotificationClose}
      size="small"
      state={props.state}
      message={props.message}>
      
      <br />
      <Button
        label="Delete"
        onClick={props.onDeleteButtonClick}/>
    </Notification>
  )
};