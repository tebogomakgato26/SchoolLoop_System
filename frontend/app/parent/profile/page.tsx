"use client";

import { useState, useEffect } from "react";

export default function ParentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [parentData, setParentData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    childName: "",
    childGrade: "",
  });

  // Load data on page load
  useEffect(() => {
    const saved = localStorage.getItem("schoolLoopParent");
    if (saved) {
      setParentData(JSON.parse(saved));
    } else {
      // Fallback if no one registered yet
      setParentData({
        name: "Mrs. Mokoena",
        email: "mokoena.family@example.com",
        phone: "082 123 4567",
        address: "123 Main Street, Johannesburg",
        childName: "Yamkela Mgcubhe",
        childGrade: "9A",
      });
    }
  }, []);

  // Save changes to LocalStorage
  const handleSave = () => {
    localStorage.setItem("schoolLoopParent", JSON.stringify(parentData));
    setIsEditing(false);
  };

  const childInitials = parentData.childName
    ? parentData.childName.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
    : "?";

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-500 mt-1">Manage your account and contact information.</p>
      </div>

      {/* Student Card */}
      <div className="bg-gradient-to-br from-[#6B4FA0] to-[#4a3275] rounded-3xl shadow-lg p-1 relative overflow-hidden">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[1.3rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white text-[#6B4FA0] flex items-center justify-center text-4xl font-black shadow-xl border-4 border-white/30">
            {childInitials}
          </div>
          <div className="text-center sm:text-left flex-1 text-white">
            <p className="text-xs font-bold uppercase tracking-wider mb-1">Learner Record</p>
            <h2 className="text-2xl sm:text-3xl font-bold">{parentData.childName || "Not provided"}</h2>
            <p className="text-purple-100 font-medium mt-1">Grade {parentData.childGrade || "--"} • Active Enrollment</p>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
          </div>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="text-sm font-semibold text-[#6B4FA0] hover:underline">
              Edit Profile
            </button>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <div className="space-y-6">
            {isEditing && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-[#F4F1FB] p-5 rounded-2xl border border-purple-100">
                <div className="sm:col-span-2">
                  <h3 className="font-bold text-[#6B4FA0] mb-1">Learner Details</h3>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Child's Full Name</label>
                  <input type="text" value={parentData.childName} onChange={(e) => setParentData({ ...parentData, childName: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6B4FA0] bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Child's Grade</label>
                  <input type="text" value={parentData.childGrade} onChange={(e) => setParentData({ ...parentData, childGrade: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6B4FA0] bg-white" />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <input type="text" disabled={!isEditing} value={parentData.name} onChange={(e) => setParentData({ ...parentData, name: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6B4FA0] disabled:bg-gray-50 disabled:text-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <input type="email" disabled={!isEditing} value={parentData.email} onChange={(e) => setParentData({ ...parentData, email: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6B4FA0] disabled:bg-gray-50 disabled:text-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                <input type="text" disabled={!isEditing} value={parentData.phone} onChange={(e) => setParentData({ ...parentData, phone: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6B4FA0] disabled:bg-gray-50 disabled:text-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Home Address</label>
                <input type="text" disabled={!isEditing} value={parentData.address} onChange={(e) => setParentData({ ...parentData, address: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6B4FA0] disabled:bg-gray-50 disabled:text-gray-500" />
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsEditing(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                <button type="button" onClick={handleSave} className="bg-[#6B4FA0] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#563c87] transition shadow-md">Save Changes</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}