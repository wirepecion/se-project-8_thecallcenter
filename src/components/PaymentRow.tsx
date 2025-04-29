"use client";

import { useEffect, useState } from "react";
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
import getUserProfile from "@/libs/Auth/getUserProfile";


export default function PaymentRow({
  payment,
  booking,
  onStatusChange,
  onDelete,
}: {
  payment: PaymentItem;
  booking: BookingItem;
  onStatusChange: (id: string, updatedData: object) => void;
  onDelete: (id: string) => void;
}) {
  const { data: session } = useSession();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [statusForChoose, setStatusForChoose] = useState<string | undefined>(payment.status);
  const [method, setMethod] = useState<string | undefined>(payment.method);
  const [amount, setAmount] = useState<number | undefined>(Number(payment.amount));
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserItem | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!session?.user?.token) return;
      const profile = await getUserProfile(session.user.token);
      setUserProfile(profile.data);
    }
    fetchData();
  }, [session]);

  const handleUpdate = async () => {
    //console.log(payment._id, statusForChoose, method, amount); 
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
              onStatusChange(payment._id, { status: updatedStatus});
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

        setSnackbarMessage("Payment updated successfully");
        setSnackbarOpen(true);
        setUpdateOpen(false);

        onStatusChange(payment._id, { status: statusForChoose, method, amount });

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
      if (userProfile?.role === "hotelManager" && payment.status !== "pending") throw new Error("Hotel Manager can only complete pending payments");
      await updatePayment(
        payment._id,
        { status: "completed" },
        session?.user.token
      );
             
      setSnackbarMessage("Payment updated successfully");
      setSnackbarOpen(true);
      setUpdateOpen(false);
      onStatusChange(payment._id , { status: 'completed' });
      
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
  console.log("check:", payment);

  return (
    <>
      <tr className="border-t justify-center align-middle">
        <td className="p-3 text-center px-8">{payment.amount ? String(payment.amount) : 'N/A'}</td>
        <td className="p-3 text-center px-8">{payment?.method?.trim?.() ? payment.method : "N/A"}</td>
        <td className="p-3 text-center px-6">
          {payment.paymentDate
            ? new Date(payment.paymentDate).toLocaleDateString()
            : "N/A"}
        </td>
        
        <td className="p-4 text-center px-3">
          <span className={`rounded-xl p-1 px-2 ${getStatusStyle(payment.status)}`}>
            {payment.status}
          </span>
        </td>

        <td className="p-5 text-center px-9">
          {booking.user.name || "N/A"}
        </td>

        <td className="p-5 text-center">
          <div className="inline-flex items-center gap-1">
            <Tooltip title="Update">
              <IconButton onClick={() => {
                userProfile?.role === "hotelManager" && payment.status !== "pending" ? (
                  setSnackbarMessage("Hotel Manager can only update pending payments"),
                  setSnackbarOpen(true)
                ) : setUpdateOpen(true)
              }} color="primary" size="small">
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
            { userProfile?.role === "admin" && (
              <select
                value={statusForChoose}
                onChange={(e) => setStatusForChoose(e.target.value)}
                className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-300"
              >
                <option value="unpaid">Unpaid</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="canceled">Canceled</option>
              </select>
            )}
            { userProfile?.role === "hotelManager" && (
              <select
              value={statusForChoose}
              onChange={(e) => setStatusForChoose(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-300"
            >
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          )}
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
