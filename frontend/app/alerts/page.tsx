"use client";

import { useState, useEffect } from "react";

type Alert = {
  id: number;
  title: string;
  message: string;
  date: string;
  type: "Urgent" | "General";
  read: boolean;
};

const defaultAlerts: Alert[] = [
  { id: 1, title: "School Closes Early Tomorrow", message: "Please note that the school will close at 12:00 PM tomorrow due to a staff meeting.", date: "24 October 2026", type: "Urgent", read: false },
  { id: 2, title: "Term 3 Report Cards Available", message: "The Term 3 report cards have been uploaded. You can view your child's marks in the Marks section.", date: "20 October 2026", type: "General", read: true },
];

export default function ParentAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("schoolLoopAlerts");
    if (saved) {
      setAlerts(JSON.parse(saved));
    } else {
      localStorage.setItem("schoolLoopAlerts", JSON.stringify(defaultAlerts));
      setAlerts(defaultAlerts);
    }
    setLoading(false);
  }, []);

  const markAsRead = (id: number) => {
    const updated = alerts.map((a) => a.id === id ? { ...a, read: true } : a);
    localStorage.setItem("schoolLoopAlerts", JSON.stringify(updated));
    setAlerts(updated);
  };

  // Simulate Principal sending a new alert
  const simulatePrincipalAlert = () => {
    const newAlert: Alert = {
      id: Date.now(),
      title: "Urgent: Water Outage",
      message: "Please be advised that the school will be closing at 10:00 AM due to a municipal water outage.",
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
      type: "Urgent",
      read: false,
    };
    const updated = [newAlert, ...alerts];
    localStorage.setItem("schoolLoopAlerts", JSON.stringify(updated));
    setAlerts(updated);
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading alerts...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Alerts & Notices</h1>
          <p className="text-gray-500 mt-1">Important announcements from the school.</p>
        </div>
        
        {/* TEST BUTTON: This simulates the Principal sending an alert */}
        <button onClick={simulatePrincipalAlert} className="text-xs bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded-lg font-semibold text-gray-700 transition">
          Simulate Principal Alert
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const isUrgent = alert.type === "Urgent";
          
          return (
            <div key={alert.id} onClick={() => markAsRead(alert.id)} className={`bg-white rounded-2xl shadow-sm border cursor-pointer transition overflow-hidden ${!alert.read ? "border-[#6B4FA0] ring-1 ring-[#6B4FA0]/20" : "border-gray-100"}`}>
              <div className="p-5 sm:p-6 flex gap-4 items-start">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isUrgent ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                  {isUrgent ? "!" : "i"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${isUrgent ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"}`}>
                          {alert.type}
                        </span>
                        {!alert.read && <span className="text-[10px] font-bold text-[#6B4FA0]">• New</span>}
                      </div>
                      <h3 className={`text-base sm:text-lg ${!alert.read ? "font-bold text-gray-900" : "font-semibold text-gray-700"}`}>{alert.title}</h3>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{alert.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{alert.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}