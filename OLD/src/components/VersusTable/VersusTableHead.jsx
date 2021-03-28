import React, { Component } from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

class VersusTableHead extends Component {
  render() {
    const {
      columns, rowCount, selected, onSelectAll, onSort, order, orderBy, multiSelect,
    } = this.props;
    return (
      <TableHead>
        <TableRow>
          { (() => {
            if (multiSelect) {
              return (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected > 0 && selected < rowCount}
                    checked={selected > 0 && selected === rowCount}
                    onChange={onSelectAll}
                  />
                </TableCell>
              );
            }
          })() }
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
}

VersusTableHead.propTypes = {
  columns: PropTypes.array.isRequired,
  rowCount: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  multiSelect: PropTypes.bool.isRequired,
};
VersusTableHead.defaultProps = {
  multiSelect: false,
};

export default VersusTableHead;
