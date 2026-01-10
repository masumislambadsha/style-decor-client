  import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import BookingCardSkeleton from "../../../../Components/Skeletons/BookingCardSkeleton";
const MyBookings = () => {
  useEffect(() => {
    document.title = "Style Decor | My Bookings";
  }, []);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const { data: bookings = [], refetch, isLoading } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  const handleCancel = async (booking) => {
    const result = await Swal.fire({
      title: "Cancel this booking?",
      html: `<strong>${booking.serviceName}</strong><br/>${new Date(
        booking.bookingDate
      ).toLocaleDateString()}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "No, keep it",
    });
    if (!result.isConfirmed) return;
    try {
      await axiosSecure.patch(`/bookings/${booking._id}/cancel`);
      await Swal.fire({
        icon: "success",
        title: "Cancelled",
        text: "Your booking has been cancelled.",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    } catch (err) {
      console.error("Cancel booking error:", err);
      Swal.fire("Error", "Failed to cancel booking", "error");
    }
  };
  const handlePay = async (booking) => {
    try {
      const paymentInfo = {
        bookingId: booking._id,
        serviceName: booking.serviceName,
        userEmail: booking.userEmail,
        cost: booking.cost,
      };
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );
      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error("Payment session failed");
      }
    } catch (err) {
      console.error("Payment error:", err.response?.data || err.message);
      toast.error("Payment failed");
    }
  };
  const filteredBookings =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
  const handleFilterClick = (status) => {
    setFilter(status);
    setCurrentPage(1);
  };
  const totalItems = filteredBookings.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const currentPageItems = filteredBookings.slice(
    startIndex,
    startIndex + pageSize
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 max-w-6xl mx-auto space-y-8">
        <h2 className="text-2xl mt-8 mb-10 sm:text-3xl font-bold text-base-content">
          My Bookings
        </h2>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {[
            "all",
            "pending_payment",
            "assigned_pending",
            "assigned",
            "cancelled",
          ].map((status) => (
            <button
              key={status}
              onClick={() => handleFilterClick(status)}
              className={`btn btn-xs sm:btn-sm ${
                filter === status ? "btn-active" : "btn-ghost"
              }`}
            >
              {status === "all"
                ? "All"
                : status
                    .split("_")
                    .map((s) => s[0].toUpperCase() + s.slice(1))
                    .join(" ")}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:gap-6">
        {isLoading ? (
          [...Array(pageSize)].map((_, i) => <BookingCardSkeleton key={i} />)
        ) : currentPageItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-base-content/60 text-sm sm:text-lg">
              No bookings found
            </p>
          </div>
        ) : (
          currentPageItems.map((booking) => (
            <div
              key={booking._id}
              className="bg-base-100 rounded-xl sm:rounded-3xl shadow-xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-base-content mb-2">
                  {booking.serviceName}
                </h3>
                <p className="text-xs sm:text-sm text-base-content/70 mb-1">
                  Date: {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
                <p className="text-xs sm:text-sm text-base-content/70 mb-1">
                  Location: {booking.location}
                </p>
                <span
                  className={`badge badge-sm sm:badge-lg ${
                    booking.status === "pending_payment"
                      ? "badge-warning"
                      : booking.status === "assigned" ||
                        booking.status === "assigned_pending" ||
                        booking.status === "confirmed"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {booking.status.toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center">
                {booking.status === "pending_payment" && (
                  <button
                    onClick={() => handlePay(booking)}
                    className="btn btn-xs sm:btn-sm bg-[#ff6a4a] hover:bg-black text-white"
                  >
                    Pay Now
                  </button>
                )}
                {(booking.status === "pending_payment" ||
                  booking.status === "assigned_pending") && (
                  <button
                    onClick={() => handleCancel(booking)}
                    className="btn btn-outline btn-xs sm:btn-sm text-red-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {totalItems > pageSize && (
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4">
          <button
            className="btn btn-xs sm:btn-sm"
            onClick={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="text-xs sm:text-sm text-base-content/70">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-xs sm:btn-sm"
            onClick={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
export default MyBookings;