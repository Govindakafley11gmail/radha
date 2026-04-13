import { DataTable, Column } from "@/component/table";
import type { FixedAssetsPaymentDataAttributes } from "../interface";


type Props = {
  data: FixedAssetsPaymentDataAttributes[];
  columns: Column<FixedAssetsPaymentDataAttributes>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions?: any;
  onRowClick?: (row: FixedAssetsPaymentDataAttributes) => void; // ✅ ADD THIS
};

export default function FixedAssetsPaymentTable({
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
