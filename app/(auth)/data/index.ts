import { Mail, Lock, Icon, User } from "lucide-react";
import { SignInAttributes, SignUpAttributes } from "../interface";
export const formloginFields = [
  {
    type: "inputwithicon",
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",

    Icon: Mail,
  },
  {
    type: "inputwithicon",
    name: "password", // Changed from "Password" to "password"
    label: "Password",
    Icon: Lock,
    placeholder: "Enter your Password",

    subType: "password",
  },
  {
    type: "checkbox",
    name: "checkbox",
    label: "Remember me", // Also consider changing this label
  },
];

export const initialValues: SignInAttributes = {
  email: "",
  password: "",
};

export const formSignUpFields = [
  {
    type: "inputwithicon",
    name: "fullName",
    label: "Full Name",
    placeholder: "Enter your full name",
    Icon: User,
  },
  {
    type: "inputwithicon",
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",

    Icon: Mail,
  },

  {
    type: "inputwithicon",
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    Icon: Lock,
  },
  {
    type: "inputwithicon",
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm your password",
    Icon: Lock,
  },
];

export const initialRegisterValues: SignUpAttributes = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
