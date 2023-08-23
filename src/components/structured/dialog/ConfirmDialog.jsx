import * as PrimeConfirmDialog from "primereact/confirmdialog";

function ConfirmDialog() {
  return <PrimeConfirmDialog.ConfirmDialog />;
}

function confirmDialog({ message, title, onAccept }) {
  return PrimeConfirmDialog.confirmDialog({
    message: message,
    header: title,
    position: "top",
    acceptLabel: "Sim",
    rejectLabel: "Não",
    accept: onAccept,
  });
}

export { ConfirmDialog, confirmDialog };
