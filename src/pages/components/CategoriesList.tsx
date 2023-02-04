import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export type Category = { id: number; name: string; icon: JSX.Element };
export default function CategoriesList({
  onClick,
  categories,
}: {
  onClick: (id: number) => void;
  categories: Category[];
}) {
  return (
    <List sx={{ width: "100%" }}>
      {categories.map((item) => (
        <ListItem disablePadding>
          <ListItemButton onClick={() => onClick(item.id)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
