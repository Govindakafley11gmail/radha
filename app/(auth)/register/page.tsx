"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import { Checkbox } from "@/components/ui/checkbox";
import { RippleWaveButton } from "@/component/ripple-button/RippleButton";
import FormikController from "@/component/formik-controller";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { formSignUpFields, initialRegisterValues } from "../data";
import { AuthLogoHeader } from "@/common-component/auth-logo-header";

// Mock WaveBackground component - replace with actual import if available
const WaveBackground = () => <div className="absolute inset-0 opacity-10" />;

// Replace this with your real validation schema
const validationSignUpSchema = null;

export default function SignUp() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-gray-50 to-orange-100 relative">

      {/* Fixed background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <WaveBackground />
      </div>

      {/* Scrollable content */}
      <div className="min-h-screen flex items-center justify-center px-4 py-10 sm:py-16">

        <div
          className={`bg-white rounded-2xl shadow-sm px-6 py-8 sm:px-8 max-w-md w-full relative z-10
          transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >

       
          <AuthLogoHeader Title="Create Account" subTitle="Sign up for your Raddha account" />

          {/* Card */}
          <div className="flex justify-center">
            <Card className="w-full border-none shadow-none">
              <CardHeader>
                <CardTitle className="text-center font-bold">Sign Up</CardTitle>
                <CardDescription className="text-center text-sm">
                  Enter your details to create your account
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Formik
                  initialValues={initialRegisterValues}
                  validationSchema={validationSignUpSchema}
                  onSubmit={(values) => {
                    console.log("Sign Up values:", values);
                  }}
                >
                  {() => (
                    <Form className="flex flex-col gap-4">
                      {formSignUpFields.map((field, index) => (
                        <FormikController
                          key={field.name ?? index}
                          fieldConfig={field}
                          className="flex flex-col"
                          inputWidthIconStyle="pl-10 w-full p-2 border border-gray-200 shadow-sm rounded-md focus:outline-none"
                          label={field.label}
                          name={field.name}
                        />
                      ))}

                      {/* Terms checkbox */}
                      <div className="flex items-start gap-3">
                        <Checkbox className="mt-1" />
                        <span className="text-sm text-gray-700">
                          I agree to the{" "}
                          <button type="button" className="text-orange-500 hover:text-orange-800 font-medium">
                            Terms of Service
                          </button>{" "}
                          and{" "}
                          <button type="button" className="text-orange-500 hover:text-orange-800 font-medium">
                            Privacy Policy
                          </button>
                        </span>
                      </div>

                      {/* Submit Button */}
                      <RippleWaveButton
                        type="submit"
                        variant="default"
                        enableWave={true}
                        enableRipple={true}
                        className="mt-4 w-full h-[50px] rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium"
                      >
                        Create Account
                      </RippleWaveButton>

                      {/* Sign in link */}
                      <div className="text-center">
                        <span className="text-gray-600">
                          Already have an account?{" "}
                        </span>
                        <button
                          type="button"
                          onClick={() => router.push("login")}
                          className="text-orange-600 hover:text-orange-800 font-medium"
                        >
                          Sign in
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

 

    </div>
  );
}
