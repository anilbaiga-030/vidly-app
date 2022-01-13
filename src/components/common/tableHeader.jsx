import React from "react";

/*    **  What the we need here / Interface
  :- Coloums - Array
  :- sortColumn - Object 
  :- onSort - function    */

class TableHeader extends React.Component {
  raiseSort = (columnName) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.columnName === columnName) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.columnName = columnName;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.columnName || column.key}
              onClick={() => this.raiseSort(column.columnName)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
