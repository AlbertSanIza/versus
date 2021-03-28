import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import PropTypes from 'prop-types';

import VersusTableToolbar from './VersusTableToolbar';
import VersusTableHead from './VersusTableHead';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  return b[orderBy] > a[orderBy] ? 1 : 0;
}

const getSorting = (order, orderBy) => (order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy));

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

class VersusTable extends Component {
  constructor() {
    super();
    this.state = {
      order: 'asc',
      orderBy: '',
    };
  }

  handleSelectAll(event) {
    this.props.onSelect({ selected: event.target.checked ? this.props.data.map(row => row[this.props.id]) : [] });
  }

  handleOnSort(orderBy) {
    this.setState(prevState => ({ order: prevState.orderBy === orderBy && prevState.order === 'desc' ? 'asc' : 'desc', orderBy: orderBy }));
  }

  handleClick(key) {
    if (this.props.multiSelect) {
      const { selected } = this.props;
      const selectedIndex = selected.indexOf(key);
      let newSelected = [];
      if (selectedIndex === -1) {
        // Not in selected, add
        newSelected = newSelected.concat(selected, key);
      } else if (selectedIndex === 0) {
        // First item in selected, remove
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        // Last item in selected, remove
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        // Somewhere in the middle of selected, remove
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }
      this.props.onSelect({ selected: newSelected });
    }
  }

  isSelected(id) {
    return this.props.selected.indexOf(id) !== -1;
  }

  render() {
    const {
      id, columns, data, customToolbar, selected, multiSelect, hover,
    } = this.props;
    const { order, orderBy } = this.state;
    return (
      <>
        { multiSelect && (
          <VersusTableToolbar
            selected={selected}
            customToolbar={customToolbar}
          />
        ) }
        <Table>
          <VersusTableHead
            columns={columns}
            rowCount={data.length}
            selected={selected.length}
            onSelectAll={this.handleSelectAll}
            onSort={this.handleOnSort}
            order={order}
            orderBy={orderBy}
            multiSelect={multiSelect}
          />
          <TableBody>
            { stableSort(data, getSorting(order, orderBy)).map(row => {
              const isSelected = this.isSelected(row[id]);
              return (
                <TableRow
                  role="checkbox"
                  onClick={event => this.handleClick(row[id])}
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={row[id]}
                  selected={isSelected}
                  hover={hover}
                >
                  { multiSelect && (
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                  ) }
                  { columns.map((column, i) => (
                    <TableCell
                      key={i}
                      numeric={column.numeric}
                    >
                      { column.customCell ? column.customCell({ id: id, row: row }) : row[column.id] }
                    </TableCell>
                  )) }
                </TableRow>
              );
            }) }
          </TableBody>
        </Table>
      </>
    );
  }
}

VersusTable.propTypes = {
  hover: PropTypes.bool,
  selected: PropTypes.bool,
  multiSelect: PropTypes.bool,
  customToolbar: PropTypes.func,
  id: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};
VersusTable.defaultProps = {
  multiSelect: false,
  hover: false,
};

export default VersusTable;
