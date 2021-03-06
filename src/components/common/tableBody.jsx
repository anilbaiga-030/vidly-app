import React from "react";
import _ from "lodash";

class TableBody extends React.Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.columnName);
  };

  //  Creating the combined key for the uniqe key

  createKey = (item, column) => {
    return item._id + (column.columnName || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
