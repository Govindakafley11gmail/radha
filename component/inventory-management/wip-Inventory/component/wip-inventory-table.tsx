import { DataTable, Column } from "@/component/table";

import type { WIPInventoryData } from "../interface";

type Props = {
  data: WIPInventoryData[];
  columns: Column<WIPInventoryData>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: any;
  onRowClick?: (row: WIPInventoryData) => void; // ✅ ADD THIS
};

export default function WIPInventoryTable({
  data,
  columns,
  actions,
  onRowClick,
}: Props) {
  return (
    <DataTable
      data={data}
      columns={columns}
      actions={actions}
      selectable
      pageSize={5}
      onRowClick={onRowClick} // ✅ pass it down
    />
  );
}
