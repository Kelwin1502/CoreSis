import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User, Menu } from "lucide-react";
import { format } from "date-fns";

interface DashboardHeaderProps {
  userName?: string;
  companyName?: string;
  transactionLimit?: string;
  loginTime?: Date;
  position?: string;
  onLogout?: () => void;
  onMenuClick?: () => void;
  isCollapsed?: boolean;
}

const DashboardHeader = ({
  userName = "John Doe",
  companyName = "Graha Kreasi Solusindo",
  transactionLimit = "Rp 1.000.000.000",
  loginTime = new Date(),
  position = "Administrator",
  onLogout = () => console.log("Logout clicked"),
  onMenuClick,
  isCollapsed = false,
}: DashboardHeaderProps) => {
  return (
    <header className="w-full h-16 bg-[#1a4b8c] text-white px-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-4 lg:space-x-6">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-[#c5a572] hover:bg-[#1a4b8c]/90"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5 text-[#c5a572]" />
        </Button>
        <h1 className="text-lg font-semibold truncate">{companyName}</h1>
        <div className="hidden sm:flex items-center space-x-2">
          <span className="text-sm">Welcome,</span>
          <span className="text-sm font-medium">{userName}</span>
        </div>
      </div>

      <div className="flex items-center">
        <div className="hidden lg:flex items-center space-x-6 mr-6">
          <div className="flex flex-col items-start whitespace-nowrap">
            <span className="text-xs text-[#c5a572]">Transaction Limit</span>
            <span className="text-sm">{transactionLimit}</span>
          </div>
          <div className="flex flex-col items-start whitespace-nowrap">
            <span className="text-xs text-[#c5a572]">Login Time</span>
            <span className="text-sm">
              {format(loginTime, "dd/MM/yyyy HH:mm:ss")}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm whitespace-nowrap">
            <User className="w-4 h-4" />
            <span>{position}</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-[#c5a572] hover:bg-[#1a4b8c]/90"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
