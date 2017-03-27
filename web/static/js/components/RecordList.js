import React, { Component } from 'react';

import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import EditIcon from 'grommet/components/icons/base/Edit';
import TrashIcon from 'grommet/components/icons/base/Trash';
import Button from 'grommet/components/Button';

export default class RecordList extends Component {
  constructor(props) {
    super(props);
  }

  formatDate(str) {
    return new Date(str).toLocaleDateString("en-GB");
  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th><b>Hours</b></th>
            <th><b>Game</b></th>
            <th><b>Person</b></th>
            <th><b>Type</b></th>
            <th><b>Date</b></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.records.map(record => {
            return (
              <TableRow key={record.id}>
                <td>{record.hours}</td>
                <td>{record.game.title}</td>
                <td>{record.person.name}</td>
                <td>{record.work_type}</td>
                <td>{this.formatDate(record.date)}</td>
                <td><Button path={`records/${record.id}/edit`} icon={<EditIcon />}/></td>
                <td><TrashIcon /></td>
              </TableRow>
            )
          })}
        </tbody>
      </Table>  
    )
  }
}