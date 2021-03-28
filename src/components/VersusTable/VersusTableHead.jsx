import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

function VersusTableHead(props) {
  const {
    columns, rowCount, selected, onSelectAll, onSort, order, orderBy, multiSelect,
  } = props;
  return (
    <TableHead>
      <TableRow>
        { multiSelect && (
          <TableCell padding="checkbox">
            <Checkbox
              onChange={onSelectAll}
              checked={selected > 0 && selected === rowCount}
              indeterminate={selected > 0 && selected < rowCount}
            />
          </TableCell>
        ) }
        { columns.map(column => (
          <TableCell
            key={column.id}
            numeric={column.numeric}
            padding={column.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === column.id ? order : false}
          >
            { column.customHeader ? (column.customHeader()) : (
              <TableSortLabel
                active={orderBy === column.id}
                direction={order}
                onClick={() => onSort(column.id)}
              >
                <b>{ column.label }</b>
              </TableSortLabel>
            ) }
          </TableCell>
        )) }
      </TableRow>
    </TableHead>
  );
}

VersusTableHead.propTypes = {
  multiSelect: PropTypes.bool,
  onSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
VersusTableHead.defaultProps = {
  multiSelect: false,
};

export default VersusTableHead;
