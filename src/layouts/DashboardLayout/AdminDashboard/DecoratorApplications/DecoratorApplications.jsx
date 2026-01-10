import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../../Components/Spinner/LoadingSpinner";
const DecoratorApplications = () => {
    useEffect(()=>{
      document.title = "Style Decor | Accept Decorator"
    },[])
  const axiosSecure = useAxiosSecure();
  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["decorator-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorator-applications?status=pending");
      return res.data;
    },
  });
  const handleReview = async (app, action) => {
    const confirm = await Swal.fire({
      title:
        action === "approve"
          ? "Approve this application?"
          : "Reject this application?",
      html:
        action === "approve"
          ? `<strong>${app.name}</strong><br/>${app.email}`
          : `This will reject <strong>${app.name}</strong>'s request.`,
      icon: action === "approve" ? "question" : "warning",
      showCancelButton: true,
      confirmButtonColor: action === "approve" ? "#16a34a" : "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: action === "approve" ? "Approve" : "Reject",
    });
    if (!confirm.isConfirmed) return;
    try {
      await axiosSecure.patch(`/decorator-applications/${app._id}/review`, {
        action,
      });
      await Swal.fire({
        icon: "success",
        title: action === "approve" ? "Application approved" : "Application rejected",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update application", "error");
    }
  };
  if (isLoading) {
     return (
      <LoadingSpinner/>
    );
  }
  return (
    <div className="min-h-screen bg-base-200 py-6 sm:py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-base-content">
            Decorator Applications
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-base-content/60 mt-2">
            Review new decorator requests and decide who joins the team.
          </p>
          <p className="text-sm sm:text-base text-[#ff6a4a] mt-1">
            {applications.length} pending application
            {applications.length !== 1 && "s"}
          </p>
        </div>
        {applications.length === 0 ? (
          <div className="bg-base-100 rounded-xl sm:rounded-2xl shadow-md p-8 sm:p-12 text-center border border-base-300">
            <div className="text-5xl sm:text-6xl mb-4">📥</div>
            <p className="text-lg sm:text-xl font-semibold text-base-content/80">
              No pending applications
            </p>
            <p className="text-base-content/60 mt-1">
              When someone applies to be a decorator, their request will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            {applications.map((app, idx) => (
              <div
                key={app._id}
                className="bg-base-100 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-base-300 p-4 sm:p-5"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-base-content/40 uppercase tracking-wide mb-1 sm:mb-0">
                    Application #{idx + 1}
                  </p>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-[#ff6a4a]/10 text-[#ff6a4a] border-[#ff6a4a]/30">
                    Pending review
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl overflow-hidden bg-[#ff6a4a]/5 border border-[#ff6a4a]/20 flex items-center justify-center text-lg sm:text-xl text-[#ff6a4a]/70">
                      {app.photoURL ? (
                        <img
                          src={app.photoURL || app.photo}
                          alt={app.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        app.name?.charAt(0)?.toUpperCase() || "🎨"
                      )}
                    </div>
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <h2 className="text-base sm:text-lg md:text-xl font-bold text-base-content">
                          {app.name}
                        </h2>
                        <p className="text-sm text-base-content/70">{app.email}</p>
                        <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm mt-2">
                          <span className="text-base-content/70">
                            <span className="text-base-content/40">Phone: </span>
                            <span className="font-semibold">{app.phone || "N/A"}</span>
                          </span>
                          <span className="text-base-content/70">
                            <span className="text-base-content/40">City: </span>
                            <span className="font-semibold">{app.city || "N/A"}</span>
                          </span>
                          <span className="text-base-content/70">
                            <span className="text-base-content/40">Experience:&nbsp;</span>
                            <span className="font-semibold">
                              {app.experienceYears} year{app.experienceYears === 1 ? "" : "s"}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2 w-full sm:w-36 md:w-44">
                        <button
                          onClick={() => handleReview(app, "reject")}
                          className="btn  bg-red-500 hover:bg-red-600 text-white w-full"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleReview(app, "approve")}
                          className="btn  bg-emerald-500 hover:bg-emerald-600 text-white w-full"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs font-medium text-base-content/40 mb-1">
                          Specialty
                        </p>
                        <p className="font-semibold text-sm sm:text-base text-base-content">
                          {app.specialty || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-base-content/40 mb-1">
                          Availability
                        </p>
                        <p className="font-semibold text-sm sm:text-base text-base-content capitalize">
                          {app.availability?.replace("_", " ") || "Not set"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs font-medium text-base-content/40 mb-1">
                        Short bio
                      </p>
                      <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
                        {app.bio || "No bio provided."}
                      </p>
                      {app.portfolioUrl && (
                        <a
                          href={app.portfolioUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block mt-2 text-xs sm:text-xs font-semibold text-[#ff6a4a] underline"
                        >
                          View portfolio
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default DecoratorApplications;