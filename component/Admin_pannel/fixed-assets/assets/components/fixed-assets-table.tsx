import { DataTable, Column } from "@/component/table";
import type { FixedAssetsDataAttributes } from "../interface";


type Props = {
  data: FixedAssetsDataAttributes[];
  columns: Column<FixedAssetsDataAttributes>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions?: any;
  onRowClick?: (row: FixedAssetsDataAttributes) => void; // ✅ ADD THIS
};

export default function FixedAssetsTable({
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
