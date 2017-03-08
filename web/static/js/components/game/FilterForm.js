import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import FormField from 'grommet/components/FormField';
import DateTime from 'grommet/components/DateTime';
import UpdateIcon from 'grommet/components/icons/base/Update';
import Button from 'grommet/components/Button';

export default class FilterForm extends Component {
  render() {
    return (
       <Box size="small">
        <Label>Start date</Label>
        <FormField>
          <DateTime name="startDate"
            format='D/M/YYYY'
            value={this.props.startDate}
            onChange={this.props.onStartDateChange} />
        </FormField>  
        
        <Label>End date</Label>
        <FormField>
          <DateTime name="endDate"
            format='D/M/YYYY'
            value={this.props.endDate}
            onChange={this.props.onEndDateChange} />
        </FormField> 
        
        <br />
        <Button icon={<UpdateIcon />} 
          label="Update"
          primary={true}
          onClick={this.props.onUpdate} />
      </Box> 
    )
  }
}