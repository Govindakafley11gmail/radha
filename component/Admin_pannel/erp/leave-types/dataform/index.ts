import * as Yup from "yup";
import { PermssionForm } from "@/component/Admin_pannel/permission/interface";

export const LeaveTypesFields: PermssionForm[] = [
  {
    name: "name",
    label: "Leave Name",
    type: "text",
    placeholder: "Enter your Leave Name",
    validation: Yup.string().required("Leave Name is required"),
  },
  {
    name: "description",
    label: "Leave Descriptiom",
    type: "text",
    placeholder: "Enter your Leave Descriptiom",
    validation: Yup.string().required("Leave Descriptiom is required"),
  },
//   {
//     name: "Leave From",
//     label: "Leave From",
//     type: "date",
//     placeholder: "Enter your Leave From",
//     validation: Yup.string().required("Leave From is required"),
//   },
//    {
//     name: "Leave To",
//     label: "Leave To",
//     type: "date",
//     placeholder: "Enter your Leave To",
//     validation: Yup.string().required("Leave To is required"),
//   },
 
  {
    name: "max_days",
    label: "Maximum Days",
    type: "number",
    placeholder: "Enter your Maximum Days",
    validation: Yup.number().required("Maximum Days is required"),
  },
 
];
