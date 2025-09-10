import React from "react";

export default function EmptyState() {
  return (
    <div className="flex-1 py-20 flex-col items-center justify-center flex gap-3">
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4"
      >
        <rect x="12" y="16" width="56" height="48" rx="2" fill="#723C3117" />
        <rect x="20" y="24" width="40" height="4" rx="1" fill="#723C3133" />
        <rect x="20" y="32" width="40" height="4" rx="1" fill="#723C3133" />
        <rect x="20" y="40" width="40" height="4" rx="1" fill="#723C3133" />
        <rect x="20" y="48" width="40" height="4" rx="1" fill="#723C3133" />
        <rect x="20" y="56" width="40" height="4" rx="1" fill="#723C3133" />
      </svg>
      <p className="text-[#281D1B] dark:text-[#E4DAD7] text-sm">
        Please select a cohort and date to view the results
      </p>
    </div>
  );
}
