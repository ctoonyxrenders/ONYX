"use client";
import React, { useEffect, useState } from "react";
import {
    User,
    Mail,
    Edit3,
    Save,
    X,
    Camera,
    Phone,
    MapPin,
    Building2,
} from "lucide-react";
import { Button, Skeleton } from "antd"; // 👈 import Skeleton
import { UserApiResponse, UpdateAdminBody } from "@/types/api";
import { getAdminProfile, updateAdminProfileApi } from "@/app/api/backend/admin";
import Image from "next/image";
import toast from "react-hot-toast";

const SettingPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false); // for saving
    const [fetching, setFetching] = useState(true); // 👈 for fetching profile
    const [profileData, setProfileData] = useState<UserApiResponse | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setFetching(true);
                const res = await getAdminProfile();
                if (res.success) {
                    setProfileData(res.data);
                }
            } finally {
                setFetching(false);
            }
        };
        fetchProfile();
    }, []);

    const [editData, setEditData] = useState<UpdateAdminBody>({
        name: "",
        companyName: "",
        address: "",
        phoneNo: "",
    });

    const handleEdit = () => {
        setIsEditing(true);
        setEditData({
            name: profileData?.name || "",
            companyName: (profileData as any)?.companyName || "",
            address: (profileData as any)?.address || "",
            phoneNo: (profileData as any)?.phoneNo || "",
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData({
            name: profileData?.name || "",
            companyName: (profileData as any)?.companyName || "",
            address: (profileData as any)?.address || "",
            phoneNo: (profileData as any)?.phoneNo || "",
        });
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateAdminProfileApi(editData);
            setProfileData({
                ...(profileData as UserApiResponse),
                ...editData,
            });
            setIsEditing(false);
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof UpdateAdminBody, value: string) => {
        setEditData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                toast.success("Avatar updated locally, needs backend support to save.");
            };
            reader.readAsDataURL(files[0]);
        }
    };

    // 👇 if still fetching, show skeleton loader instead of empty boxes
    if (fetching) {
        return (
            <div className="min-h-screen py-8 px-4">
                <div className="w-full mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile Settings</h1>
                    <Skeleton active paragraph={{ rows: 8 }} avatar />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="w-full mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
                    <p className="text-gray-600">Manage your profile information and preferences</p>
                </div>

                {/* Profile Card */}
                <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                        {!isEditing && (
                            <Button type="primary" onClick={handleEdit}>
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit Profile
                            </Button>
                        )}
                    </div>

                    <div className="px-6 py-6">
                        <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-8">
                            {/* Avatar */}
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative">
                                    <Image
                                        src={profileData?.profilePic || "/default-avatar.png"}
                                        alt="Profile"
                                        width={96}
                                        height={96}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                                    />
                                    {isEditing && (
                                        <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                                            <Camera className="w-4 h-4" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Form */}
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
                                            onChange={(e) => handleInputChange("name", e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <div className="px-3 py-2 bg-gray-50 border rounded-md">
                                            <span className="text-gray-900">{profileData?.name}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Company Name */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <Building2 className="w-4 h-4 mr-2 text-gray-400" /> Company Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.companyName}
                                            onChange={(e) => handleInputChange("companyName", e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <div className="px-3 py-2 bg-gray-50 border rounded-md">
                                            <span className="text-gray-900">{(profileData as any)?.companyName}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <MapPin className="w-4 h-4 mr-2 text-gray-400" /> Address
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.address}
                                            onChange={(e) => handleInputChange("address", e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <div className="px-3 py-2 bg-gray-50 border rounded-md">
                                            <span className="text-gray-900">{(profileData as any)?.address}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <Phone className="w-4 h-4 mr-2 text-gray-400" /> Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.phoneNo}
                                            onChange={(e) => handleInputChange("phoneNo", e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <div className="px-3 py-2 bg-gray-50 border rounded-md">
                                            <span className="text-gray-900">{(profileData as any)?.phoneNo}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Email (readonly) */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <Mail className="w-4 h-4 mr-2 text-gray-400" /> Email Address
                                    </label>
                                    <div className="px-3 py-2 bg-gray-50 border rounded-md">
                                        <span className="text-gray-600">{profileData?.email}</span>
                                        <span className="ml-2 text-xs text-gray-400">(Cannot be changed)</span>
                                    </div>
                                </div>

                                {/* Buttons */}
                                {isEditing && (
                                    <div className="flex space-x-3 pt-4">
                                        <Button onClick={handleSave} disabled={loading} type="primary">
                                            {loading ? (
                                                "Saving..."
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4 inline mr-1" /> Save Changes
                                                </>
                                            )}
                                        </Button>
                                        <Button onClick={handleCancel} disabled={loading} type="default">
                                            <X className="w-4 h-4 inline mr-1" /> Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;
