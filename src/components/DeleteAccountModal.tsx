import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Stack,
  Typography,
  Card,
  Button,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { deleteUserAccount } from "@/app/apiService";
import { useSnackbar } from "notistack";
import { clearAll } from "@/app/store/categorySlice";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const buttonSx = {
  width: "fit-content",
  padding: "15px",
  height: "fit-content",
};

const DeleteAccountModal = ({
  onConfirm,
  onCancel,
  openModal,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  openModal: boolean;
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const email = session?.user?.email;

  const { enqueueSnackbar } = useSnackbar();

  const onDeleteAccount = async () => {
    console.log("delete account", session, email);
    await deleteUserAccount(email);
    await signOut({ redirect: false, callbackUrl: "/" });
    dispatch(clearAll());
    router.push("/");
    enqueueSnackbar(t("account-deleted"), {
      variant: "success",
    });
    onConfirm();
  };

  return (
    <Modal
      open={openModal}
      onClose={onCancel}
      aria-labelledby={t("delete-account")}
      aria-describedby={t("delete-user-account")}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& .MuiModal-backdrop": {
          backgroundColor: "#000000e3",
        },
      }}
    >
      <Stack
        direction="column"
        spacing={0}
        sx={{
          width: "80%",
          minWidth: "300px",
          maxWidth: "900px",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          id="delete-account"
          sx={{ color: "white" }}
        >
          {t("delete-your-account")}
        </Typography>
        {isLoading && <LinearProgress color="secondary" />}
        <Card
          sx={{
            backgroundColor: "#a21010",
            color: "secondary.contrastText",
            width: "100%",
            padding: "20px 40px",
          }}
        >
          <Typography variant="body1" component="p">
            <strong>{t("are-you-sure-delete-account")}</strong>
            <br />
            {t("action-irreversible-category-data-lost-forever")}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            style={{
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Tooltip title={t("delete-account-forever")}>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                onClick={onDeleteAccount}
                sx={buttonSx}
              >
                <CheckIcon />
              </Button>
            </Tooltip>
            <Tooltip title={t("cancel-keep-account")}>
              <Button
                variant="outlined"
                sx={buttonSx}
                onClick={onCancel}
                color="info"
              >
                <CloseIcon />
              </Button>
            </Tooltip>
          </Stack>
        </Card>
      </Stack>
    </Modal>
  );
};

export default DeleteAccountModal;
