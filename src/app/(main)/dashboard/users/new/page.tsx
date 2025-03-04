import { SupplierForm } from "@/components/forms/supplier-form";
import { UserForm } from "@/components/forms/user-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ScrollArea } from "@/components/ui/scroll-area";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Suppliers", link: "/dashboard/suppliers" },
  { title: "Create", link: "/dashboard/suppliers/create" },
];

export default function Page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <UserForm
          roles={[
            { _id: "admin", name: "Admin" },
            // { _id: "user", name: "pants" },
            { _id: "manager", name: "Manager" },
          ]}
          action="Create"
          description="Create a new user"
          title="Create user"
        />
      </div>
    </ScrollArea>
  );
}
