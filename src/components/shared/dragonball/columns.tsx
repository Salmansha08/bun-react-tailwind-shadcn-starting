import type { DragonballItems } from "@/interfaces"
import { type ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<DragonballItems>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "ki",
    header: "Ki",
  },
  // {
  //   accessorKey: "maxKi",
  //   header: "Max Ki",
  // },
  {
    accessorKey: "race",
    header: "Race",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  // },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt={row.original.name}
        className="w-20 object-cover"
      />
    ),
  },
  // {
  //   accessorKey: "affiliations",
  //   header: "Affiliations",
  // },
  // {
  //   accessorKey: "deletedAt",
  //   header: "Deleted At",
  // }
]