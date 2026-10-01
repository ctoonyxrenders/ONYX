"use client";
import React, { useEffect, useState } from "react";
import { User, Mail, Edit3, Save, X, Camera, Lock, Phone } from "lucide-react";
import { Button } from "antd";
import { getClientProfile, updateClientProfie } from "@/app/api/backend/client";
import { changeAccountPassword } from "@/app/api/backend/auth";
import { useRouter } from "next/navigation";
import { Input } from "antd";
import { dispatch } from "d3";
import { logout } from "@/app/store/slices/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

interface ProfileData {
  name: string;
  phone: string;
  address: string;
  companyName: string;
  profilePic: string;
}

const ClientSettingPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Jane Client",
    phone: "jane.client@example.com",
    address: "",
    companyName: "",
    profilePic:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&h=150&fit=crop&crop=face",
  });

  const [editData, setEditData] = useState({
    name: profileData.name,
    phone: profileData.phone,
    address: profileData.address,
    companyName: profileData.companyName,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const response = async () => {
        const res = await getClientProfile();
        if (res.success) {
          setProfileData({
            name: res.data?.name ?? "",
            phone: res.data?.phoneNo ?? "",
            address: res.data?.address ?? "",
            companyName: res.data?.companyName ?? "",
            profilePic: res.data?.profilePic ?? "",
          });
        } else {
          console.error("Failed to fetch Client Profile");
        }
      };
      response();
    } catch (error) {
      console.error("Error fetching ClientProjects:", error);
    }
  }, []);
  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      name: profileData.name,
      phone: profileData.phone,
      address: profileData.address,
      companyName: profileData.companyName,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: profileData.name,
      phone: profileData.phone,
      address: profileData.address,
      companyName: profileData.companyName,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {

      const res = await updateClientProfie(editData)
      if (res.success) {

        setProfileData({
          name: res.data?.name ?? "",
          phone: res.data?.phoneNo ?? "",
          address: res.data?.address ?? "",
          companyName: res.data?.companyName ?? "",
          profilePic: res.data?.profilePic ?? "",
        });
        setEditData({
          name: res.data?.name ?? "",
          phone: res.data?.phoneNo ?? "",
          address: res.data?.address ?? "",
          companyName: res.data?.companyName ?? "",

        });
        setLoading(false)
      }
      else {
        console.error("Req failed", res.message)
      }
    }
    catch (error) {
      console.error(error)
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange("profilePic", e.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // 🔐 Handle password change
  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New Password and Confirm Password do not match.");
      return;
    }

    setPasswordLoading(true);
    const res = await changeAccountPassword(passwordData)
    setPasswordLoading(false)
    if (res.success) {
      dispatch(logout())
      localStorage.removeItem('token');
      router.replace('/dashboard/login/?role=client')
    }

  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Client Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your profile information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Profile Information
            </h2>
            {!isEditing && (
              <Button type="primary" onClick={handleEdit}>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>

          <div className="px-6 py-6">
            <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* profilePic */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={profileData.profilePic}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                  />
                </div>
              </div>

              {/* Form */}
              {/* ...existing code... */}
              <div className="flex-1 space-y-6">
                {/* Name */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-gray-400" /> Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 border rounded-md">
                      <span className="text-gray-900">{profileData.name}</span>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" /> Phone
                    Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 border rounded-md">
                      <span className="text-gray-900">{profileData.phone}</span>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 border rounded-md">
                      <span className="text-gray-900">
                        {profileData.address}
                      </span>
                    </div>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.companyName}
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 border rounded-md">
                      <span className="text-gray-900">
                        {profileData.companyName}
                      </span>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                {isEditing && (
                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="primary"
                      onClick={handleSave}
                      disabled={loading}

                    >
                      {loading ? (
                        "Saving..."
                      ) : (
                        <>
                          <Save className="w-4 h-4 inline mr-1 mb-1" /> Save Changes
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      disabled={loading}
                      type="default"
                    >
                      <X className="w-4 h-4 inline mr-1" /> Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-gray-500" /> Change Password
            </h2>
          </div>

          <div className="px-6 py-6 space-y-4">
            <Input.Password
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
              className="w-full px-3 py-2 border rounded-md"
            />

            <Input.Password
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
              className="w-full px-3 py-2 border rounded-md"
            />

            <Input.Password
              placeholder="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full px-3 py-2 border rounded-md"
            />

            <Button
              type="primary"
              loading={passwordLoading}
              onClick={handlePasswordChange}
              className="w-full"
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientSettingPage;
