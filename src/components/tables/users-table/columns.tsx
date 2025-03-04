"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "../cell-action";
import { deleteUser } from "@/api/user";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "profile.firstName",
    header: "FIRST NAME",
  },
  {
    accessorKey: "profile.lastName",
    header: "LAST NAME",
  },
  {
    accessorKey: "profile.phone",
    header: "PHONE",
  },
  {
    accessorKey: "profile.address.street",
    header: "ADDRESS",
  },
  {
    accessorKey: "role",
    header: "ROLE",
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <CellAction
        queryKey="users"
        data={row.original}
        deleteFunction={deleteUser}
        editUrl={(id) => `/dashboard/users/${id}/edit`}
      />
    ),
  },
];
