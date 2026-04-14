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
  onRowClick?: (row: SupplierData) => void;
};

export default function SupplierTable({
  data,
  columns,
  actions,
  onSelectionChange,
  onRowClick,
}: Props) {


  return (
    <DataTable
      data={data}
      columns={columns}
      actions={actions}
      selectable
      onSelectionChange={onSelectionChange}
      pageSize={5}
      onRowClick={onRowClick}
    />
  );
}