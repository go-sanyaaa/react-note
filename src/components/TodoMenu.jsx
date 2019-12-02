import React from "react";
import {Menu} from "semantic-ui-react";

function TodoMenu({items, active, onClick}) {
  return (
    <Menu fluid widths={items.length}>
      { items.map(menu => (
        <Menu.Item
          name={menu.title}
          key={menu.key}
          active={menu.key === active}
          onClick={() => onClick(menu.key)}
        />
      ))
      }
    </Menu>
  )
}

export default TodoMenu
