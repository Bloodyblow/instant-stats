import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Category } from "@/app/types";
import { CategoryIcon } from "./CategoryIcon";

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
        <ListItem disablePadding key={item.id}>
          <ListItemButton
            onClick={() => onClick(item.id)}
            sx={{
              "&:hover": {
                backgroundColor: "#e8ff0021",
              },
            }}
          >
            <ListItemIcon>
              <CategoryIcon name={item.icon} />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
