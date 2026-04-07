import { DataTable, Column } from "@/component/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { WIPInventoryData } from "../interface";

type Props = {
  data: WIPInventoryData[];
  columns: Column<WIPInventoryData>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: any;
  onSelectionChange: (rows: WIPInventoryData[]) => void;
    onRowClick?: (row: WIPInventoryData) => void; // ✅ ADD THIS


};

export default function WIPInventoryTable({
  data,
  columns,
  actions,
  onSelectionChange,
onRowClick
}: Props) {
 

  return (
    <DataTable
      data={data}
      columns={columns}
      actions={actions}
      selectable
      onSelectionChange={onSelectionChange}
      pageSize={5}
            onRowClick={onRowClick} // ✅ pass it down

    />
  );
}