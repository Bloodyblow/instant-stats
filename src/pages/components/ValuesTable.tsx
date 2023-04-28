import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Value } from "@/app/types";
import { IconButton, LinearProgress, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { RootState } from "@/app/store/store";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedValue } from "../../app/store/categorySlice";
import { deleteValue } from "@/app/apiService";
import { useMutation } from "@tanstack/react-query";
import ConfirmDialog from "./ConfirmDialog";

export default function ValuesTable({
  onValueDeleted,
}: {
  onValueDeleted: () => void;
}) {
  const dispatch = useDispatch();
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  const [valueToDelete, setValueToDelete] = React.useState<Value | null>(null);
  const { category } = useSelector((state: RootState) => state.category);
  const { mutate: mutateDeleteValue, isLoading } = useMutation({
    mutationFn: deleteValue,
    onSuccess: (value: Value) => {
      dispatch(setSelectedValue(null));
      onValueDeleted();
    },
  });

  if (!category || !category.values || category.values.length === 0)
    return null;

  const { values, unit } = category!!;

  const onCloseConfirmDialog = () => setOpenConfirmDelete(false);
  const onConfirmDialog = () => {
    setOpenConfirmDelete(false);
    if (!valueToDelete) return;
    mutateDeleteValue({
      valueId: valueToDelete?.id,
      categoryId: category.id,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      {isLoading && <LinearProgress color="secondary" />}
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
            {(values || []).map((value: Value) => (
              <TableRow
                key={value.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{value.date}</TableCell>
                <TableCell align="left">{value.value}</TableCell>
                <TableCell align="left">
                  <Tooltip title="Edit value">
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        dispatch(setSelectedValue(value));
                        console.log(value.id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete value">
                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      sx={{ color: "secondary.light" }}
                      onClick={() => {
                        setOpenConfirmDelete(true);
                        setValueToDelete(value);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDialog
        open={openConfirmDelete}
        onClose={onCloseConfirmDialog}
        onConfirm={onConfirmDialog}
        title="Delete value"
        content={`Are you sure you want to delete the value ${valueToDelete?.value} at the date ${valueToDelete?.date}?`}
      />
    </div>
  );
}
