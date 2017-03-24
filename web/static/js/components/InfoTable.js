import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

const renderTableHead = (values) => {
  return (
    <thead>
      <tr>
        {values.map(value => {
          return <th key={value}>
            <b>{value}</b>
          </th>
        })}
      </tr>
    </thead>
  )
};

const renderTableBody = (values) => {
  return (
    <tbody>
      {values.map((value, index) => {
        return <TableRow key={index}>
          <td>
            <u>{value.type}</u>
          </td>
          <td>
            {value.hours}
          </td>
        </TableRow>
      })}
    </tbody>
  )
};

export default class InfoTable extends Component {
  render() {
    if (!Object.keys(this.props.hours).length) {
      return null;
    }
    
    return (
      <Box pad="large">
        <Table>
          {renderTableHead(['Type', 'Hours'])}
          {renderTableBody([
            {type: "Dev", hours: this.props.hours.dev},
            {type: "Design", hours: this.props.hours.design},
            {type: "Animations", hours: this.props.hours.animations},
            {type: "Art Total", hours: this.props.hours.design + this.props.hours.animations},
            {type: "QA", hours: this.props.hours.qa},
            {type: "PM", hours: this.props.hours.pm},
          ])}
        </Table>  
      </Box>
    )
  }
}