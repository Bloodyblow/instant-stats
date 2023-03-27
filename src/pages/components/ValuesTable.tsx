import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Value } from "@/app/types";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function ValuesTable() {
  const { category } = useSelector((state: RootState) => state.category);
  if (!category) return null;
  const { values, unit } = category!!;
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        maxHeight: "300px",
        overflowY: "auto",
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Values&nbsp;({unit})</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((value: Value) => (
            <TableRow
              key={value.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{value.date}</TableCell>
              <TableCell align="left">{value.value}</TableCell>
              <TableCell align="left">
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={() => {
                    // dispatch(editValue(value.id));
                    console.log(value.id);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    // dispatch(deleteValue(value.id));
                    console.log(value.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
