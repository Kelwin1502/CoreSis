import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface SidebarCategoryProps {
  icon?: React.ReactNode;
  label?: string;
  isActive?: boolean;
  isExpanded?: boolean;
  hasChildren?: boolean;
  onClick?: () => void;
}

const SidebarCategory = ({
  icon,
  label = "Category",
  isActive = false,
  isExpanded = false,
  hasChildren = false,
  onClick,
}: SidebarCategoryProps) => {
  return (
    <div
      className={cn(
        "flex items-center w-full px-4 h-12 cursor-pointer bg-white",
        "hover:bg-slate-50 transition-colors duration-200",
        isActive && "bg-blue-50 text-blue-700 font-medium",
      )}
      onClick={onClick}
    >
      <div className="flex items-center flex-1 space-x-3">
        {icon && <div className="w-5 h-5">{icon}</div>}
        {label && (
          <span className="text-sm transition-opacity duration-300">
            {label}
          </span>
        )}
      </div>
      {hasChildren && (
        <ChevronRight
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isExpanded && "transform rotate-90",
          )}
        />
      )}
    </div>
  );
};

export default SidebarCategory;
