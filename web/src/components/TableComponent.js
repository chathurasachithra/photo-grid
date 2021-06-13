import React from 'react';
import { useTable } from 'react-table';
import { Table } from 'reactstrap';
import { TableContainer } from './TableContainer';
import { Pagination } from 'semantic-ui-react';

const TableContent = ({ columns, data, totalPages, onPageChange }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <div>
      <Table hover bordered striped responsive {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <nav className="d-flex justify-content-center">
        <Pagination
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          siblingRange={1}
          totalPages={totalPages}
          onPageChange={(e, data) => {
            onPageChange(data.activePage);
          }}
        />
      </nav>
    </div>
  );
};

export const TableComponent = props => {
  return (
    <div>
      <TableContainer {...props}>
        <TableContent {...props} />
      </TableContainer>
    </div>
  );
};
