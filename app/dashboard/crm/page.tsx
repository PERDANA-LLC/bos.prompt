import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

// Mock Data
const contacts = [
    { id: 1, name: "Alice Johnson", email: "alice@company.com", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@startup.io", status: "Lead" },
    { id: 3, name: "Charlie Davis", email: "charlie@enterprise.bg", status: "Customer" },
]

export default function CRMDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Contacts</h2>
          <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Contact
          </Button>
      </div>
      
      <div className="flex items-center space-x-2">
          <Input placeholder="Search contacts..." className="max-w-[300px]" />
          <Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
      </div>

       <div className="rounded-md border">
           <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm text-left">
                    <thead className="[&_tr]:border-b">
                         <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                             <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Name</th>
                             <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Email</th>
                             <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                             <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Actions</th>
                         </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                         {contacts.map((contact) => (
                             <tr key={contact.id} className="border-b transition-colors hover:bg-muted/50">
                                 <td className="p-4 align-middle font-medium">{contact.name}</td>
                                 <td className="p-4 align-middle">{contact.email}</td>
                                 <td className="p-4 align-middle">{contact.status}</td>
                                 <td className="p-4 align-middle"><Button variant="ghost" size="sm">Edit</Button></td>
                             </tr>
                         ))}
                    </tbody>
                </table>
           </div>
       </div>
    </div>
  )
}
