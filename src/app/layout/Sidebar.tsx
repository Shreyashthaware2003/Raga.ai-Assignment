import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
    Search,
    Home,
    Inbox,
    Library,
    FileText,
    ChevronLeft,
    ChevronRight,
    Sun,
    Moon,
    CircleQuestionMark,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ collapsed, setCollapsed }: Props) {
    const { theme, setTheme } = useTheme();

    const [helpOpen, setHelpOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "/") {
                e.preventDefault();
                setCollapsed((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [setCollapsed]);

    return (
        <>
            <div
                className={`h-screen flex flex-col  ${collapsed ? "w-[60px] transition-all duration-300" : "w-[260px] transition-all duration-300"
                    } bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300`}
            >
                <div className="px-3 py-3 flex items-center justify-between">
                    {!collapsed && (
                        <span className="text-sm font-medium">Clinical OS</span>
                    )}

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => setCollapsed(!collapsed)}
                                className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer"
                            >
                                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side={collapsed ? "right" : "top"} className="flex flex-col flex-nowrap items-start text-xs">
                            <p>{collapsed ? "Expand sidebar" : "Close sidebar"}</p>
                            <p>Ctrl+/</p>
                        </TooltipContent>
                    </Tooltip>
                </div>

                <div className="px-2 pb-2">
                    <SidebarItem
                        icon={<Search size={16} />}
                        label="Search"
                        collapsed={collapsed}
                    />
                </div>

                <ScrollArea className="flex-1 px-2">
                    <div className="space-y-1">
                        <SidebarItem
                            icon={<Home size={16} />}
                            label="Home"
                            active
                            collapsed={collapsed}
                        />
                        <SidebarItem
                            icon={<Inbox size={16} />}
                            label="Inbox"
                            collapsed={collapsed}
                        />
                        <SidebarItem
                            icon={<Library size={16} />}
                            label="Library"
                            collapsed={collapsed}
                        />
                    </div>

                    <Section title="Recents" collapsed={collapsed}>
                        <SidebarItem
                            icon={<FileText size={14} />}
                            label="Networking"
                            collapsed={collapsed}
                        />
                        <SidebarItem
                            icon={<FileText size={14} />}
                            label="JavaScript Notes"
                            collapsed={collapsed}
                        />
                    </Section>

                    <Section title="Private" collapsed={collapsed}>
                        <SidebarItem
                            icon={<FileText size={14} />}
                            label="React Notes"
                            collapsed={collapsed}
                        />
                    </Section>
                </ScrollArea>

                <div className="p-2 border-t border-gray-200 dark:border-gray-800 flex items-center flex-wrap gap-1">

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Popover open={helpOpen} onOpenChange={setHelpOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        onClick={() => {
                                            setHelpOpen((prev) => !prev);
                                        }}
                                        className="w-fit flex items-center justify-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                                    >
                                        <CircleQuestionMark />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="w-80 bg-white dark:bg-[#252525] border-2 dark:border-[#302f2f] ">
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <h4 className="leading-none font-medium">Dimensions</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Set the dimensions for the layer.
                                            </p>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TooltipTrigger>
                        <TooltipContent side={collapsed ? "right" : "top"}>
                            <p>Help, contact, more...</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>

                            <Button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="w-fit flex items-center justify-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                            >
                                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side={collapsed ? "right" : "top"}>
                            <p>Toggle theme</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>


        </>
    );
}

function SidebarItem({
    icon,
    label,
    active,
    collapsed,
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    collapsed?: boolean;
}) {
    return (
        <div
            className={`group flex items-center ${collapsed ? "justify-center" : "gap-2"
                } px-2 py-1.5 rounded-md text-sm cursor-pointer ${active
                    ? "bg-gray-100 dark:bg-[#2a2a2a] text-black dark:text-white"
                    : "hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-gray-700 dark:text-gray-300"
                }`}
        >
            <span className="opacity-80">{icon}</span>
            {!collapsed && <span className="truncate">{label}</span>}
        </div>
    );
}

function Section({
    title,
    children,
    collapsed,
}: {
    title: string;
    children: React.ReactNode;
    collapsed?: boolean;
}) {
    if (collapsed) return null;

    return (
        <div className="mt-4">
            <p className="px-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                {title}
            </p>
            <div className="space-y-1">{children}</div>
        </div>
    );
}