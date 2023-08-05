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
import { setSelectedValue } from "../app/store/categorySlice";
import { deleteValue } from "@/app/apiService";
import { useMutation } from "@tanstack/react-query";
import ConfirmDialog from "./ConfirmDialog";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import { DATEFORMAT_en } from "@/app/constants";
import { useTranslation } from "react-i18next";
import styles from "./ValuesTable.module.css";

export default function ValuesTable({
  onValueDeleted,
}: {
  onValueDeleted: () => void;
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  const [valueToDelete, setValueToDelete] = React.useState<Value | null>(null);
  const { category, values } = useSelector(
    (state: RootState) => state.category
  );
  const { mutate: mutateDeleteValue, isLoading } = useMutation({
    mutationFn: deleteValue,
    onSuccess: (value: Value) => {
      dispatch(setSelectedValue(null));
      enqueueSnackbar(
        t("item-deleted", {
          item: t("value"),
        }),
        { variant: "success" }
      );
      onValueDeleted();
    },
    onError: () => {
      enqueueSnackbar(
        t("error-occured-while-deleting-item", {
          item: t("value"),
        }),
        {
          variant: "error",
        }
      );
    },
  });

  if (!category || values.length === 0) return null;

  const { unit } = category!!;

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
        className={styles.tableContainer}
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
              <TableCell align="left">{t("date")}</TableCell>
              <TableCell align="left">
                {t("values")}&nbsp;({t("unit")})
              </TableCell>
              <TableCell align="left">{t("actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(values || []).map((value: Value) => (
              <TableRow
                key={value.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "& td": { padding: "6px 16px" },
                  "&:hover": { backgroundColor: "#1b505999" },
                }}
              >
                <TableCell align="left">
                  {dayjs(value.date).format(DATEFORMAT_en)}
                </TableCell>
                <TableCell align="left">{value.value}</TableCell>
                <TableCell align="left">
                  <Tooltip title="Edit value">
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        dispatch(setSelectedValue(value));
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t("delete-item", { item: t("value") })}>
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
        title={t("delete-item", { item: t("value") })}
        content={t("confirm-delete-value-date", {
          value: valueToDelete?.value,
          date: dayjs(valueToDelete?.date).format(DATEFORMAT_en),
        })}
        type="delete"
      />
    </div>
  );
}
