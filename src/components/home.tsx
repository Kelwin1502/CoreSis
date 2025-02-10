import React, { useState } from "react";
import DashboardHeader from "./layout/DashboardHeader";
import Sidebar from "./layout/Sidebar";
import AddCIF from "./cif/AddCIF";
import InfoCIF from "./cif/InfoCIF";

interface HomeProps {
  userName?: string;
  companyName?: string;
  transactionLimit?: string;
  loginTime?: Date;
  position?: string;
}

const Home = ({
  userName = "John Doe",
  companyName = "Graha Kreasi Solusindo",
  transactionLimit = "Rp 1.000.000.000",
  loginTime = new Date(),
  position = "Administrator",
}: HomeProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("welcome");

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <DashboardHeader
        userName={userName}
        companyName={companyName}
        transactionLimit={transactionLimit}
        loginTime={loginTime}
        position={position}
        onLogout={handleLogout}
        onMenuClick={handleSidebarToggle}
        isCollapsed={isSidebarCollapsed}
      />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile sidebar backdrop */}
        {!isSidebarCollapsed && (
          <div
            className="fixed inset-0 bg-black/20 lg:hidden z-30"
            onClick={handleSidebarToggle}
          />
        )}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={handleSidebarToggle}
          onPageChange={setCurrentPage}
        />
        <main className="flex-1 p-4 lg:p-6 overflow-auto flex w-full">
          {currentPage === "welcome" && (
            <div className="bg-white rounded-lg shadow p-6 w-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome to Core Banking Dashboard
              </h2>
              <p className="text-gray-600">
                Select a menu item from the sidebar to get started.
              </p>
            </div>
          )}
          {currentPage === "add-cif" && <AddCIF />}
          {currentPage === "info-cif" && <InfoCIF />}
        </main>
      </div>
    </div>
  );
};

export default Home;
