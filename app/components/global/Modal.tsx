import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { ModalInterface } from "../../interfaces";

export default function AlertDialogModal({
  is_open,
  on_hide,
  message,
  type,
  action,
}: ModalInterface) {
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="alert-dialog-modal-title"
        aria-describedby="alert-dialog-modal-description"
        open={is_open}
        onClose={on_hide}
      >
        <ModalDialog
          variant="outlined"
          sx={{
            borderRadius: 10,
            background: "white",
            maxWidth: "90%",
            width: 400,
          }}
          role="alertdialog"
        >
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            level="inherit"
            fontSize="1.25em"
            mb="0.25em"
          >
            Contact
          </Typography>
          <Divider sx={{ my: 2 }} />

          <div dangerouslySetInnerHTML={{ __html: message }}></div>

          <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
            <Button variant="plain" color="neutral" onClick={on_hide}>
              Cancel
            </Button>
            <div hidden={type !== "ERROR"}>
              <Button
                variant="solid"
                id="yes"
                sx={{ color: "red", border: "1px solid red", borderRadius: 0 }}
                color="danger"
                onClick={action}
              >
                Proceed
              </Button>
            </div>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
