/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { RxBell, RxPencil1, RxChevronDown } from "react-icons/rx";
import { X, CheckCircle, Menu } from "lucide-react";

export default function Navbar({ toggleSidebar }) {
  const location = useLocation();
  
  const { user } =
    useContext(AuthContext) || {
      user: {
        name: "John Doe",
        profile: "Admin",
      },
    };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    role: user?.profile || "Admin",
  });
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Toast title",
      message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
      time: "2 days ago",
      read: false
    },
    {
      id: 2,
      title: "Toast title",
      message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
      time: "1 month ago",
      read: false
    },
    {
      id: 3,
      title: "Toast title",
      message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
      time: "1 week ago",
      read: false
    },
    {
      id: 4,
      title: "Toast title",
      message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
      time: "4 days ago",
      read: false
    },
  ]);

  const dropdownRef = useRef(null);
  const userButtonRef = useRef(null);
  const notificationRef = useRef(null);
  const notificationButtonRef = useRef(null);

  // Get page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    const titleMap = {
      '/dashboard': 'Dashboard',
      '/categories': 'Categories',
      '/reports': 'Reports',
      '/legal-policy': 'Legal Policy',
      '/location': 'Location',
      '/rating': 'Rating',
    };
    return titleMap[path] || 'Dashboard';
  };

  // 👉 Generate Alphabet Avatar
  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const initials = getInitials(user?.name || "U");

  useEffect(() => {
    function handleClickOutside(event) {
      // Handle user dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
      
      // Handle notification panel
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        notificationButtonRef.current &&
        !notificationButtonRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  // Remove notification
  const removeNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle profile input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Save profile changes
  const handleSaveProfile = () => {
    // TODO: API call to update profile
    // await updateProfile(profileData);
    
    // For now, just close the modal
    setShowProfileEdit(false);
    alert('Profile updated successfully!');
  };

  // Logout function
  const handleLogout = () => {
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax";
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return (
    <>
      <header className="w-full bg-white shadow-sm px-3 sm:px-6 py-3 flex items-center justify-between border-b border-gray-100">
        {/* Left Side - Menu + Title */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          
          {/* Page Title - Hidden on small screens */}
          <div className="text-lg sm:text-xl font-semibold text-gray-900">
            <span className="hidden sm:inline">{getPageTitle()}</span>
            <span className="sm:hidden">{getPageTitle().split(' ')[0]}</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4 relative">
          {/* Notification Button */}
          <div className="relative">
            <button 
              ref={notificationButtonRef}
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <RxBell className="h-6 w-6 text-gray-700" />
            </button>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-5 w-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-bold">
                {unreadCount}
              </span>
            )}
          </div>

          {/* User Avatar */}
          <button
            ref={userButtonRef}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center justify-center h-10 w-10 rounded-full bg-teal-600 text-white font-semibold shadow cursor-pointer transition ${
              isDropdownOpen ? "ring-2 ring-teal-400" : ""
            }`}
          >
            {initials}
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-14 mt-2 w-72 bg-white rounded-xl shadow-2xl p-4 z-50 border border-gray-100"
            >
              {/* User Info */}
              <div className="flex items-start pb-4 border-b border-gray-200">
                <div className="h-12 w-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                  {initials}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-gray-900">
                      {user.name}
                    </span>

                    <button
                      className="text-gray-500 hover:text-gray-700 p-1"
                      onClick={() => {
                        setShowProfileEdit(true);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <RxPencil1 className="w-5 h-5" />
                    </button>
                  </div>

                  <button className="w-full text-left flex items-center justify-between text-sm px-3 py-1 border border-gray-300 rounded-md bg-gray-50">
                    <span>{user.profile}</span>
                    <RxChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => setLogoutDialog(true)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Notification Panel */}
      {showNotifications && (
        <div 
          ref={notificationRef}
          className="fixed right-3 sm:right-6 top-16 w-[calc(100vw-24px)] sm:w-[480px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[calc(100vh-80px)] sm:max-h-[600px] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
            <h2 className="text-xl font-bold text-gray-900">Notification</h2>
            <button 
              onClick={() => setShowNotifications(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <RxBell className="w-16 h-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium">No notifications</p>
                <p className="text-sm">You're all caught up!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notif.read ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Check Icon */}
                      <div className={`mt-1 ${
                        notif.read ? 'text-gray-400' : 'text-green-500'
                      }`}>
                        <CheckCircle className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {notif.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-2">
                          {notif.message}
                        </p>
                        <p className="text-xs text-gray-400">{notif.time}</p>
                        
                        {/* Mark as read button */}
                        {!notif.read && (
                          <button
                            onClick={() => markAsRead(notif.id)}
                            className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeNotification(notif.id)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Logout Dialog */}
      {logoutDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white w-96 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Are you sure?
            </h2>
            <p className="text-gray-600 mb-6">
              Do you really want to logout from your account?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setLogoutDialog(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showProfileEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-teal-600">
              <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
              <button
                onClick={() => setShowProfileEdit(false)}
                className="p-1 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Profile Avatar */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-3xl">
                    {initials}
                  </div>
                  <button className="absolute bottom-0 right-0 h-8 w-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-teal-500 hover:bg-gray-50 transition-colors">
                    <RxPencil1 className="w-4 h-4 text-teal-600" />
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Enter your phone"
                  />
                </div>

                {/* Role Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    name="role"
                    value={profileData.role}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="User">User</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowProfileEdit(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium shadow-md hover:shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
