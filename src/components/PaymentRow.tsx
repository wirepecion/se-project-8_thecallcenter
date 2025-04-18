"use client";

import { useState } from "react";
import { updatePayment } from "@/libs/Payment/updatePayment";
import { deletePayment } from "@/libs/Payment/deletePayment";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Tooltip, IconButton } from '@mui/material';


export default function PaymentRow({
  payment,
  booking,
  onStatusChange,
  onDelete,
}: {
  payment: PaymentItem;
  booking: BookingItem;
  onStatusChange: (id: string, newStatus: string) => void;
  onDelete: (id: string) => void;
}) {
  const { data: session } = useSession();

  const [updateOpen, setUpdateOpen] = useState(false);
  const [statusForChoose, setStatusForChoose] = useState<string | undefined>(payment.status);
  const [method, setMethod] = useState<string | undefined>(payment.method);
  const [amount, setAmount] = useState<number | undefined>(Number(payment.amount));
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleUpdate = async () => {
    if (statusForChoose === "failed") {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to change the status to FAILED!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const updatedStatus = statusForChoose ?? undefined;
            await updatePayment(
              payment._id,
              { status: updatedStatus, method, amount },
              session?.user.token
            );

            setSnackbarMessage("Payment updated successfully");
            setSnackbarOpen(true);
            setUpdateOpen(false);

            if (updatedStatus) {
              onStatusChange(payment._id, updatedStatus);
            }

            Swal.fire({
              title: "Success!",
              text: "The status has been changed to FAILED.",
              icon: "success"
            });
          } catch (err) {
            setSnackbarMessage("Failed to update payment");
            setSnackbarOpen(true);
          }
        }
      });
    } else if (method) {
      try {
        await updatePayment(
          payment._id,
          { status: statusForChoose, method, amount },
          session?.user.token
        );

        setSnackbarMessage("Payment updated successfully");
        setSnackbarOpen(true);
        setUpdateOpen(false);

        onStatusChange(payment._id, statusForChoose || payment.status);

        Swal.fire({
          title: "Success!",
          text: "The payment method has been updated successfully.",
          icon: "success"
        });
      } catch (err) {
        setSnackbarMessage("Failed to update payment");
        setSnackbarOpen(true);
      }
    }
  };

  const handleComplete = async () => {
    try {
      await updatePayment(
        payment._id,
        { status: "completed" },
        session?.user.token
      );

      setSnackbarMessage("Payment updated successfully");
      setSnackbarOpen(true);
      setUpdateOpen(false);


      Swal.fire({
        title: "Success!",
        text: "The payment method has been updated successfully.",
        icon: "success"
      });
    } catch (err) {
      setSnackbarMessage("Failed to update payment");
      setSnackbarOpen(true);
    }
  };



  const handleDelete = async () => {
    try {
      await deletePayment(payment._id, session?.user.token);
      setSnackbarMessage("Payment deleted");
      setSnackbarOpen(true);
      onDelete(payment._id);
    } catch (err) {
      setSnackbarMessage("Failed to delete payment");
      setSnackbarOpen(true);
    }
  };

  const getStatusStyle = (status: string | undefined) => {
    switch (status) {
      case "pending":
        return "text-yellow-500 bg-yellow-100";
      case "completed":
        return "text-green-500 bg-green-100";
      case "failed":
        return "text-red-500 bg-red-100";
      case "canceled":
        return "text-red-800 bg-red-100";
      default:
        return "text-gray-500 bg-gray-200";
    }
  };

  return (
    <>
      <tr className="border-t border-gray-200 bg-gray-50">
        <td className="p-3 text-center px-10">{payment.amount ? String(payment.amount) : 'N/A'}</td>
        <td className="p-3 text-center px-10">{payment.method || "N/A"}</td>
        <td className="p-3 text-center px-10">
          {payment.paymentDate
            ? new Date(payment.paymentDate).toLocaleDateString()
            : "N/A"}
        </td>
        <td className="p-4 text-center px-5">
          <span className={`rounded-xl p-1 px-2 ${getStatusStyle(payment.status)}`}>
            {payment.status}
          </span>
        </td>
        <td className="p-5 text-center px-5">{booking.user.name || "N/A"}</td>
        <td className="p-5 text-center">
          <div className="inline-flex items-center gap-1">
            <Tooltip title="Update">
              <IconButton onClick={() => setUpdateOpen(true)} color="primary" size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Complete">
              <IconButton onClick={handleComplete} color="success" size="small">
              <CheckCircleIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton onClick={handleDelete} color="error" size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </td>

      </tr>

      {/* Update Dialog */}
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
        <DialogTitle>Update Payment</DialogTitle>
        <DialogContent>
          <div className="my-4">
            <label className="block mb-1 font-medium">Status:</label>
            <div className="flex flex-row gap-4 items-center">
              <Select fullWidth value={statusForChoose} onChange={(e) => setStatusForChoose(e.target.value)}>
                <MenuItem value="unpaid">Unpaid</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
              </Select>
              {/* <Button onClick={() => setStatusForChoose(undefined)} variant="contained" color="primary">
                Clear
              </Button> */}
            </div>
          </div>

          <div className="my-4">
            <label className="block mb-1 font-medium">Method:</label>
            <div className="flex flex-row gap-4 items-center">
              <Select fullWidth value={method} onChange={(e) => setMethod(e.target.value)}>
                <MenuItem value="Card">Card</MenuItem>
                <MenuItem value="Bank">Bank</MenuItem>
                <MenuItem value="ThaiQR">ThaiQR</MenuItem>
              </Select>
              {/* <Button onClick={() => setMethod(undefined)} variant="contained" color="primary">
                Clear
              </Button> */}
            </div>
          </div>

          <div className="my-4">
            <label className="block mb-1 font-medium">Amount:</label>
            <div className="flex flex-row gap-4 items-center">
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={amount ?? ""}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter new amount"
              />
              {/* <Button onClick={() => setAmount(undefined)} variant="contained" color="primary">
                Clear
              </Button> */}
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setUpdateOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
