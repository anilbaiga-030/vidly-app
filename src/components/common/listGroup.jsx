import React from "react";

class ListGroup extends React.Component {
  activeClassManager = (item) => {
    // For setting the de All genre as default
    if (
      item.name === this.props.selectedItem.name &&
      this.props.selectedItem.name === "All Genres"
    )
      return "list-group-item active";

    if (item === this.props.selectedItem) return "list-group-item active";
    return "list-group-item ";
  };
  render() {
    const { items, onItemSelect } = this.props;
    return (
      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item._id !== undefined ? item._id : "no id"}
            //  item[valueProperty] !== undefined :- To handle the item who don't have _id property
            onClick={() => onItemSelect(item)}
            className={this.activeClassManager(item)}
            // If the genres are the same add 'active' class
            style={{ cursor: "pointer" }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  }
}

// const ListGroup = (props) => {

//   return (
//     <ul className="list-group">
//       {items.map((item) => (
//         <li
//           key={
//             item[valueProperty] !== undefined ? item[valueProperty] : "no id"
//           }
//           //  item[valueProperty] !== undefined :- To handle the item who don't have _id property
//           onClick={() => onItemSelect(item)}
//           className={    }
//           // If the genres are the same add 'active' class
//           style={{ cursor: "pointer" }}
//         >
//           {item[textProperty]}
//         </li>
//       ))}
//     </ul>
//   );

// };

// setting the defualt props
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
