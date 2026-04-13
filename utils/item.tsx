import FixedAssetsApprovalComponent from "@/component/Admin_pannel/approval/fixed-assets-approval/fixed-assets-approval";
import PurchaseInvoicePaymentApproval from "@/component/Admin_pannel/approval/purchase-invoice-payment-approval/purchase-invoice-payment-approval";
import LeaveApplicationComponent from "@/component/Admin_pannel/erp/leave-application/leave-application";
import LeaveEncashmentComponent from "@/component/Admin_pannel/erp/leave-encashment/leave-encashment";
import LeaveTypesComponent from "@/component/Admin_pannel/erp/leave-types/leaves-types";
import PayRollComponent from "@/component/Admin_pannel/erp/payroll/payroll";
import FixedAssetsComponent from "@/component/Admin_pannel/fixed-assets/assets/fixed-assets";
import DashboardPage from "@/component/Admin_pannel/home/dashboard";
import TablePage from "@/component/Admin_pannel/home/table";
import AccountGroupComponent from "@/component/Admin_pannel/master/Account-Group/account-group";
import AccountTypeComponent from "@/component/Admin_pannel/master/Account-Type/account-type";
import Branch from "@/component/Admin_pannel/master/Branch/branch";
import CategoryComponent from "@/component/Admin_pannel/master/category/category";
import DepartmentComponent from "@/component/Admin_pannel/master/Department/department";
import RawMaterialComponent from "@/component/Admin_pannel/master/raw-materials/raw-materials";
import PurchaseInvoiceComponent from "@/component/Admin_pannel/Party/invoice/purchase-invoice";
import RawMaterialsReceiptComponent from "@/component/Admin_pannel/Party/raw-material-receipt/raw-material-receipt";
import SupplierComponent from "@/component/Admin_pannel/Party/Supplier/supplier";
import FixedAssetsPaymentComponent from "@/component/Admin_pannel/payments/fixed-asstes/fixed-assets-payment";
import PurchaseInvoicePaymentComponent from "@/component/Admin_pannel/payments/purchase_invoice_payments/purchase-invoice-payment";
import Permission from "@/component/Admin_pannel/permission/permission";
import LabourCostComponent from "@/component/Admin_pannel/production/labour-costs/lobour-costs";
import LabourComponent from "@/component/Admin_pannel/production/labour/labour";
import MachinesCostComponent from "@/component/Admin_pannel/production/machines-costs/machine-costs";
import MachinesComponent from "@/component/Admin_pannel/production/machines/machines";
import OtherProductionCostComponent from "@/component/Admin_pannel/production/other-production-cost/other-production-cost";
import ProductUnitCostComponent from "@/component/Admin_pannel/production/product-unit-cost/product-unit-cost";
import ProductionBatchComponent from "@/component/Admin_pannel/production/production-batch/production-batch";
import Role from "@/component/Admin_pannel/role/role";
import Customer from "@/component/Admin_pannel/sales/customer/customer";
import DiscountSchemeComponent from "@/component/Admin_pannel/sales/return-product/discount-scheme/discount-scheme";
import PriceListComponent from "@/component/Admin_pannel/sales/return-product/price-list/price-list";
import SalesReceiptComponent from "@/component/Admin_pannel/sales/sales-receipt/sales-receipt";
import SalesInvoicesComponent from "@/component/Admin_pannel/sales/sales/sales-invoice";
import UserDashboard from "@/component/Admin_pannel/User/user";
import RawMaterialInventoryComponent from "@/component/inventory-management/raw-material-inventory/raw-material-inventory";
import WIPInventoryComponent from "@/component/inventory-management/wip-Inventory/wip-inventory";
import {
  Home,
  Grid3X3,
  FileText,
  Edit3,
  Puzzle,
  MoreHorizontal,
  DollarSignIcon,
} from "lucide-react";

export const menuContent: Record<string, React.ReactNode> = {
  Dashboard: (
    <div className="text-xl font-bold">
      <DashboardPage />
    </div>
  ),
  "Purchase Invoice Payment Approval": <PurchaseInvoicePaymentApproval />,
  "Fixed Assets Payment":<FixedAssetsPaymentComponent/>,
  User: <UserDashboard />,
  Permission: <Permission />,
  Role: <Role />,
  Branch: <Branch />,
  Department: <DepartmentComponent />,
  "Account Group": <AccountGroupComponent />,
  "Account Type": <AccountTypeComponent />,
  Category: <CategoryComponent />,
  "Raw-Materials": <RawMaterialComponent />,
  Webhooks: <DepartmentComponent />,
  "Purchase Invoice": <PurchaseInvoiceComponent />,
  "Raw Materials Receipt": <RawMaterialsReceiptComponent />,
  "Product Unit Cost": <ProductUnitCostComponent />,
  "Purchase Invoice Payment": <PurchaseInvoicePaymentComponent />,
  "Other Production Cost": <OtherProductionCostComponent />,
  "Labour Cost": <LabourCostComponent />,
  Labour: <LabourComponent />,
  "Machines Cost": <MachinesCostComponent />,
  Machines: <MachinesComponent />,
  "Production Batch": <ProductionBatchComponent />,
  Customer: <Customer />,
  "Sales Invoices": <SalesInvoicesComponent />,
  "Sales Receipt": <SalesReceiptComponent />,
  Forms: <div className="text-7xl font-bold">Forms</div>,
  "Price List": <PriceListComponent />,
  "Discount Scheme": <DiscountSchemeComponent />,
  //ERP
  "Leave Types": <LeaveTypesComponent />,
  "Leave Application": <LeaveApplicationComponent />,
  "Leave Encashment": <LeaveEncashmentComponent />,
  Payroll: <PayRollComponent />,
  "Purchase Approval": <PurchaseInvoicePaymentApproval />,
  "Fixed Assets approval":<FixedAssetsApprovalComponent/>,
  //INVENTORY MANAGEMENT
  "Raw Material Inventory": <RawMaterialInventoryComponent />,
  "WIP Inventory Component": <WIPInventoryComponent />,
  //Account Costing
  Categories: <RawMaterialComponent />,
  //Assets  "Fixed Assets": <div className="text-7xl font-bold">Fixed Assets</div>,
  "Fixed Assets": <FixedAssetsComponent />,
};
export const mainApps = [
  { label: "Access Management", icon: MoreHorizontal },
  { label: "Approval", icon: MoreHorizontal },
  { label: "Home", icon: Home },
  { label: "Applications", icon: Grid3X3 },
  { label: "Accounts Payable", icon: FileText },
  { label: "Payments", icon: DollarSignIcon },
  { label: "Sales", icon: Edit3 },
  { label: "Production Batch", icon: Puzzle },
  { label: "ERP", icon: Puzzle },
  { label: "Inventory Management", icon: MoreHorizontal },
  { label: "Master", icon: MoreHorizontal },
  { label: "Approval", icon: MoreHorizontal },
  { label: "Assets", icon: DollarSignIcon },
];

export const themeConfig = {
  light: {
    sidebarBg: "bg-white",
    headerBg: "bg-white",
    headerBorder: "border-gray-200",
    headerText: "text-gray-900",
    leftPanelBg: "bg-gray-50",
    rightPanelBg: "bg-white",
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-600",
    hoverBg: "hover:bg-gray-100",
    activeBg: "bg-blue-100",
    activeText: "text-blue-700",
    activeBorder: "border-blue-500",
    groupTitle: "text-blue-600",
    groupTitleInactive: "text-gray-500",
  },
  dark: {
    sidebarBg: "bg-gray-900",
    headerBg: "bg-gray-800",
    headerBorder: "border-gray-700",
    headerText: "text-white",
    leftPanelBg: "bg-gray-900",
    rightPanelBg: "bg-gray-900",
    textPrimary: "text-white",
    textSecondary: "text-gray-400",
    hoverBg: "hover:bg-gray-800",
    activeBg: "bg-gray-700",
    activeText: "text-white",
    activeBorder: "border-gray-400",
    groupTitle: "text-gray-300",
    groupTitleInactive: "text-gray-500",
  },
  orange: {
    sidebarBg: "bg-orange-50",
    headerBg: "bg-white",
    headerBorder: "border-orange-200",
    headerText: "text-orange-900",
    leftPanelBg: "bg-orange-100",
    rightPanelBg: "bg-orange-50",
    textPrimary: "text-orange-900",
    textSecondary: "text-orange-700",
    hoverBg: "hover:bg-orange-100",
    activeBg: "bg-orange-200",
    activeText: "text-orange-800",
    activeBorder: "border-orange-500",
    groupTitle: "text-orange-700",
    groupTitleInactive: "text-orange-500",
  },
  blue: {
    sidebarBg: "bg-blue-50",
    headerBg: "bg-white",
    headerBorder: "border-blue-200",
    headerText: "text-blue-900",
    leftPanelBg: "bg-blue-100",
    rightPanelBg: "bg-blue-50",
    textPrimary: "text-blue-900",
    textSecondary: "text-blue-700",
    hoverBg: "hover:bg-blue-100",
    activeBg: "bg-blue-200",
    activeText: "text-blue-800",
    activeBorder: "border-blue-500",
    groupTitle: "text-blue-700",
    groupTitleInactive: "text-blue-500",
  },
  green: {
    sidebarBg: "bg-green-50",
    headerBg: "bg-white",
    headerBorder: "border-green-200",
    headerText: "text-green-900",
    leftPanelBg: "bg-green-100",
    rightPanelBg: "bg-green-50",
    textPrimary: "text-green-900",
    textSecondary: "text-green-700",
    hoverBg: "hover:bg-green-100",
    activeBg: "bg-green-200",
    activeText: "text-green-800",
    activeBorder: "border-green-500",
    groupTitle: "text-green-700",
    groupTitleInactive: "text-green-500",
  },
};
