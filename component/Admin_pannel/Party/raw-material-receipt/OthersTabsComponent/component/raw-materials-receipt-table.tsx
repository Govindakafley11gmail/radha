import { DataTable, Column } from "@/component/table";
import type { RawMaterialReceipt } from "../../interface";


type Props = {
  data: RawMaterialReceipt[];
  columns: Column<RawMaterialReceipt>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions?: any;
  onRowClick?: (row: RawMaterialReceipt) => void; // ✅ ADD THIS
};

export default function RawMaterialReceiptTable({
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
