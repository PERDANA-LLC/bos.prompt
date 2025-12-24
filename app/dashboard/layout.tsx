import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { Separator } from "@/components/ui/separator" // need to create this separator
import { 
  Users, 
  BarChart, 
  Settings, 
  Calendar,
  Mail,
  UserCircle
} from "lucide-react"

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard",
    icon: <UserCircle className="h-4 w-4" />,
  },
  {
    title: "CRM Contacts",
    href: "/dashboard/crm",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Sales Pipeline",
    href: "/dashboard/pipeline",
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    title: "Campaigns",
    href: "/dashboard/campaigns",
    icon: <Mail className="h-4 w-4" />,
  },
   {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Affiliates",
    href: "/dashboard/affiliates",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-4 w-4" />,
  },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your account settings and business operations.
        </p>
      </div>
      {/* <Separator className="my-6" /> Separator placeholder */}
      <hr className="my-6 border-muted" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-4xl">{children}</div>
      </div>
    </div>
  )
}
