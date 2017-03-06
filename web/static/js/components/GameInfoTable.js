import React from 'react';

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
            {value.type}
          </td>
          <td>
            {value.hours}
          </td>
          <td>
            {value.days}
          </td>
        </TableRow>
      })}
    </tbody>
  )
};

const gameInfoTable = (options) => {
  return (
    <Table>
      {renderTableHead(['Type', 'Hours', 'Days'])}
      {renderTableBody([
        {type: "DEV", hours: 180, days: 50},
        {type: "ART", hours: 120, days: 35},
        {type: "QA", hours: 60, days: 14},
      ])}
    </Table>
  )
};

export {
  gameInfoTable
}