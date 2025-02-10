import React, { useState } from "react";
import { cn } from "@/lib/utils";
import SidebarCategory from "./SidebarCategory";
import {
  ChevronLeftCircle,
  Users,
  PiggyBank,
  Landmark,
  Wallet,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  onPageChange?: (pageId: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const defaultMenuItems: MenuItem[] = [
  {
    id: "cif",
    label: "CIF",
    icon: <Users className="w-5 h-5" />,
    children: [
      {
        id: "add-cif",
        label: "Tambah CIF",
        icon: <Users className="w-5 h-5" />,
      },
      {
        id: "edit-cif",
        label: "Ubah CIF",
        icon: <Users className="w-5 h-5" />,
      },
      {
        id: "info-cif",
        label: "Informasi CIF",
        icon: <Users className="w-5 h-5" />,
      },
    ],
  },
  {
    id: "savings",
    label: "Savings",
    icon: <PiggyBank className="w-5 h-5" />,
  },
  {
    id: "deposits",
    label: "Deposits",
    icon: <Landmark className="w-5 h-5" />,
  },
  {
    id: "loans",
    label: "Loans",
    icon: <Wallet className="w-5 h-5" />,
  },
  {
    id: "gl",
    label: "GL",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    id: "reports",
    label: "Reports",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "configuration",
    label: "Configuration",
    icon: <Settings className="w-5 h-5" />,
  },
];

interface SubMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const Sidebar = ({
  isCollapsed = false,
  onToggle = () => {},
  onPageChange = () => {},
}: SidebarProps) => {
  const [activeItem, setActiveItem] = useState<string>("");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const handleItemClick = (itemId: string) => {
    const menuItem = defaultMenuItems.find((item) => item.id === itemId);
    if (!menuItem?.children) {
      setActiveItem(itemId);
      onPageChange(itemId);
    } else {
      setExpandedItems((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
    }
  };

  return (
    <div
      className={cn(
        "h-screen bg-white border-r transition-all duration-300 ease-in-out flex flex-col overflow-hidden",
        isCollapsed ? "w-0" : "w-[280px]",
        "fixed lg:relative z-40", // Make sidebar fixed on mobile, relative on desktop
        isCollapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0", // Hide sidebar by default on mobile
      )}
    >
      <div className="flex-1 overflow-y-auto">
        {defaultMenuItems.map((item) => (
          <React.Fragment key={item.id}>
            <SidebarCategory
              icon={item.icon}
              label={isCollapsed ? "" : item.label}
              isActive={activeItem === item.id}
              isExpanded={expandedItems.has(item.id)}
              hasChildren={!!item.children?.length}
              onClick={() => handleItemClick(item.id)}
            />
            {item.children && expandedItems.has(item.id) && !isCollapsed && (
              <div className="pl-4 bg-slate-50">
                {item.children.map((child) => (
                  <SidebarCategory
                    key={child.id}
                    icon={child.icon}
                    label={child.label}
                    isActive={activeItem === child.id}
                    onClick={() => {
                      setActiveItem(child.id);
                      onPageChange?.(child.id);
                    }}
                  />
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
