import { DataTable, Column } from "@/component/table";
import { SupplierData } from "../interface";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type Props = {
  data: SupplierData[];
  columns: Column<SupplierData>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: any;
  onSelectionChange: (rows: SupplierData[]) => void;
  downloadMou: (id: string) => void;
  onRowClick?: (row: SupplierData) => void;
};

export default function SupplierTable({
  data,
  columns,
  actions,
  onSelectionChange,
  downloadMou,
  onRowClick,
}: Props) {
  const enhancedColumns: Column<SupplierData>[] = [
    ...columns,
    {
      header: "MOU DOC",
      render: (_, row) =>
        row.mouFile ? (
          <Button onClick={() => downloadMou(row.supplier_id)}>
            <Download className="w-5 h-5" />
          </Button>
        ) : (
          "-"
        ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={enhancedColumns}
      actions={actions}
      selectable
      onSelectionChange={onSelectionChange}
      pageSize={5}
      onRowClick={onRowClick}
    />
  );
}