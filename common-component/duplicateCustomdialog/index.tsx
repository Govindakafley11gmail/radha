/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { Formik, Field, FieldProps } from "formik";
import * as Yup from "yup";

// Field types
export type FieldType =
  | "text"
  | "date"
  | "select"
  | "checkbox"
  | "checkbox-group"
  | "number"
  | "file"
  | "image";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: any;
  validation?: any;
  optionGroups?: {
    groupName: string;
    options: { label: string; value: string | number }[];
  }[];
  options?: { label: string; value: string | number }[];
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  fullWidth?: boolean; // New prop to make field span full width
}

// Props for Custom Dialog
interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: FieldConfig[];
  OnSubmitTitle?: string;
  onSubmit: (values: Record<string, any>) => void;
  defaultValues?: Record<string, any>;
}

// Simple UI Components (inline to avoid external dependencies)
export const Input = ({ className = "", ...props }: any) => (
  <input
    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${className}`}
    {...props}
  />
);

const Button = ({ className = "", variant = "default", ...props }: any) => {
  const baseStyles = "px-4 py-2 rounded-lg font-semibold transition-all";
  const variantStyles =
    variant === "outline"
      ? "border-2 border-gray-300 hover:bg-gray-100"
      : "bg-orange-500 text-white hover:bg-orange-600";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    />
  );
};

export function CustomBroadDialogBox({
  isOpen,
  onClose,
  title,
  fields,
  onSubmit,
  OnSubmitTitle = "Submit",
  defaultValues = {},
}: CustomDialogProps) {
  const initialValues = useMemo(
    () =>
      fields.reduce(
        (acc, f) => ({
          ...acc,
          [f.name]:
            defaultValues[f.name] ??
            (f.type === "checkbox"
              ? false
              : f.type === "checkbox-group"
                ? []
                : f.type === "number"
                  ? undefined
                  : f.type === "file"
                    ? null
                    : ""),
        }),
        {} as Record<string, any>,
      ),
    [fields, defaultValues],
  );

  const validationSchema = useMemo(
    () =>
      Yup.object(
        fields.reduce(
          (acc, f) => {
            if (f.validation) acc[f.name] = f.validation;
            return acc;
          },
          {} as Record<string, any>,
        ),
      ),
    [fields],
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50">
      <div
        className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 w-full overflow-hidden flex flex-col"
        style={{ maxWidth: "1200px", maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="bg-orange-500 px-6 md:px-8 py-6 flex-shrink-0 relative">
          <h2 className="text-xl md:text-2xl font-bold text-white m-0">
            {title}
          </h2>

          {/* Close "X" button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values);
            onClose();
          }}
        >
          {({ values, setFieldValue, errors, touched, handleSubmit }) => (
            <>
              {/* Scrollable Content Area with 3 Column Grid */}
              <div className="px-6 md:px-8 py-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {fields.map((field) => (
                    <div
                      key={field.name}
                      className={`flex flex-col ${
                        field.fullWidth ||
                        field.type === "checkbox-group" ||
                        field.type === "file"
                          ? "md:col-span-3"
                          : ""
                      }`}
                    >
                      {field.type !== "checkbox" &&
                        field.type !== "checkbox-group" && (
                          <label className="text-sm font-semibold text-gray-900 mb-2">
                            {field.label}
                          </label>
                        )}

                      {/* Field Rendering */}
                      {(() => {
                        switch (field.type) {
                          case "text":
                            return (
                              <div className="relative">
                                <Field name={field.name}>
                                  {({ field: f }: FieldProps) => (
                                    <>
                                      <Input
                                        {...f}
                                        placeholder={field.placeholder}
                                        className={`h-12 bg-white border-2 border-gray-300 rounded-xl transition-all duration-200 focus:border-orange-500 focus:ring-orange-200 text-gray-900 placeholder:text-gray-500 ${
                                          field.Icon ? "pl-12" : "pl-4"
                                        }`}
                                      />
                                      {field.Icon && (
                                        <field.Icon
                                          className="absolute left-3 top-3 text-gray-500 pointer-events-none"
                                          width={20}
                                          height={20}
                                        />
                                      )}
                                    </>
                                  )}
                                </Field>
                                {errors[field.name] && touched[field.name] && (
                                  <span className="text-xs text-red-500 mt-1.5 ml-1 font-medium">
                                    {String(errors[field.name])}
                                  </span>
                                )}
                              </div>
                            );

                          case "date":
                            return (
                              <div className="relative">
                                <Field name={field.name}>
                                  {({ field: f }: FieldProps) => (
                                    <Input
                                      type="date"
                                      {...f}
                                      className="h-12 bg-white border-2 border-gray-300 rounded-xl transition-all duration-200 focus:border-orange-500 focus:ring-orange-200 text-gray-900 px-4"
                                    />
                                  )}
                                </Field>
                                {errors[field.name] && touched[field.name] && (
                                  <span className="text-xs text-red-500 mt-1.5 ml-1 font-medium">
                                    {String(errors[field.name])}
                                  </span>
                                )}
                              </div>
                            );

                          case "number":
                            return (
                              <div className="relative">
                                <Field name={field.name}>
                                  {({ field: f }: FieldProps) => (
                                    <>
                                      <Input
                                        type="number"
                                        {...f}
                                        value={f.value ?? ""}
                                        onChange={(e: any) =>
                                          setFieldValue(
                                            field.name,
                                            e.target.value === ""
                                              ? undefined
                                              : Number(e.target.value),
                                          )
                                        }
                                        placeholder={field.placeholder}
                                        className={`h-12 bg-white border-2 border-gray-300 rounded-xl transition-all duration-200 focus:border-orange-500 focus:ring-orange-200 text-gray-900 ${
                                          field.Icon ? "pl-12" : "pl-4"
                                        }`}
                                      />
                                      {field.Icon && (
                                        <field.Icon
                                          className="absolute left-3 top-3 text-gray-500 pointer-events-none"
                                          width={20}
                                          height={20}
                                        />
                                      )}
                                    </>
                                  )}
                                </Field>
                                {errors[field.name] && touched[field.name] && (
                                  <span className="text-xs text-red-500 mt-1.5 ml-1 font-medium">
                                    {String(errors[field.name])}
                                  </span>
                                )}
                              </div>
                            );

                          case "select":
                            return (
                              <div className="relative">
                                <Field name={field.name}>
                                  {({ field: f }: FieldProps) => (
                                    <select
                                      {...f}
                                      className="h-12 w-full bg-white border-2 border-gray-200 rounded-xl px-4 text-gray-900 transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none appearance-none cursor-pointer"
                                    >
                                      <option
                                        value=""
                                        disabled
                                        className="text-gray-400 mt-1"
                                      >
                                        {field.placeholder || "Select..."}
                                      </option>
                                      {field.options?.map((opt) => (
                                        <option
                                          key={opt.value}
                                          value={opt.value}
                                          className="text-gray-800"
                                        >
                                          {opt.label}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                </Field>
                                {/* Custom dropdown arrow */}
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                  <svg
                                    className="fill-current h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                  </svg>
                                </div>
                                {errors[field.name] && touched[field.name] && (
                                  <span className="text-xs text-red-500 mt-1.5 ml-1 font-medium">
                                    {String(errors[field.name])}
                                  </span>
                                )}
                              </div>
                            );

                          case "checkbox":
                            return (
                              <Field name={field.name}>
                                {({ field: f }: FieldProps) => (
                                  <div
                                    className="flex items-center gap-3 cursor-pointer"
                                    onClick={() =>
                                      setFieldValue(field.name, !f.value)
                                    }
                                  >
                                    <div
                                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                                        f.value
                                          ? "bg-orange-500"
                                          : "bg-gray-300"
                                      }`}
                                    >
                                      <div
                                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                                          f.value
                                            ? "translate-x-5"
                                            : "translate-x-0"
                                        }`}
                                      />
                                    </div>
                                    <span className="text-gray-800 font-medium">
                                      {field.label}
                                    </span>
                                  </div>
                                )}
                              </Field>
                            );

                          case "checkbox-group":
                            return (
                              <div className="border-2 border-gray-200 rounded-xl p-4 space-y-3 bg-white">
                                <Field name={field.name}>
                                  {({ field: f }: FieldProps) => {
                                    const valueArray: string[] = Array.isArray(
                                      f.value,
                                    )
                                      ? f.value
                                      : [];

                                    return (
                                      <div className="space-y-6">
                                        {field.optionGroups?.map((group) => (
                                          <div
                                            key={group.groupName}
                                            className="space-y-3"
                                          >
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                              {group.options.map((opt: any) => {
                                                const checked =
                                                  valueArray.includes(
                                                    opt.value,
                                                  );

                                                return (
                                                  <div
                                                    key={opt.value}
                                                    className="flex items-center space-x-2"
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      id={`${field.name}-${opt.value}`}
                                                      checked={checked}
                                                      onChange={() => {
                                                        if (checked) {
                                                          setFieldValue(
                                                            field.name,
                                                            valueArray.filter(
                                                              (v) =>
                                                                v !== opt.value,
                                                            ),
                                                          );
                                                        } else {
                                                          setFieldValue(
                                                            field.name,
                                                            [
                                                              ...valueArray,
                                                              opt.value,
                                                            ],
                                                          );
                                                        }
                                                      }}
                                                      className="peer h-5 w-5 shrink-0 rounded border-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer appearance-none checked:bg-orange-500 checked:border-orange-500 relative checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-xs checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:font-bold"
                                                    />
                                                    <label
                                                      htmlFor={`${field.name}-${opt.value}`}
                                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-900"
                                                    >
                                                      {opt.label}
                                                    </label>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    );
                                  }}
                                </Field>
                              </div>
                            );

                          // ✅ KEEP and UPDATE this combined block:
                          case "file":
                          case "image":
                            return (
                              <Field name={field.name}>
                                {({ field: f, form }: FieldProps) => {
                                  const value = f.value;
                                  const file: File | null =
                                    value instanceof File ? value : null;
                                  const isImage =
                                    file?.type?.startsWith("image/") ?? false;
                                  const existingFile =
                                    !file && value && !(value instanceof File)
                                      ? value
                                      : null;
                                  const isEditing = !!existingFile || !!file;

                                  return (
                                    <div className="space-y-4">
                                      {/* Image preview */}
                                      {isImage && file && (
                                        <div className="relative w-full flex justify-center">
                                          <img
                                            src={URL.createObjectURL(file)}
                                            alt="preview"
                                            className="h-40 w-40 rounded-2xl object-cover border-2 border-orange-200 shadow-lg"
                                          />
                                        </div>
                                      )}

                                      {isEditing ? (
                                        /* ✅ Edit mode: everything inside one unified card */
                                        <div className="border-2 border-orange-200 rounded-xl overflow-hidden bg-orange-50">
                                          {/* File name row + remove */}
                                          <div className="flex items-center justify-between px-4 py-3 border-b border-orange-200">
                                            <div className="flex items-center gap-2 min-w-0">
                                              <svg
                                                className="w-4 h-4 text-orange-500 flex-shrink-0"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                                />
                                              </svg>
                                              <p className="text-sm text-gray-700 font-medium truncate">
                                                {file
                                                  ? file.name
                                                  : typeof existingFile ===
                                                      "string"
                                                    ? existingFile
                                                    : existingFile.name}
                                              </p>
                                            </div>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                form.setFieldValue(
                                                  field.name,
                                                  null,
                                                )
                                              }
                                              className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-orange-600 hover:bg-orange-200 transition-colors text-xs font-semibold ml-2"
                                            >
                                              <svg
                                                className="w-3.5 h-3.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M6 18L18 6M6 6l12 12"
                                                />
                                              </svg>
                                              Remove
                                            </button>
                                          </div>

                                          {/* ✅ Replace/Change input — inside the same card */}
                                          <label
                                            htmlFor={field.name}
                                            className="flex items-center justify-center gap-2 px-4 py-3 cursor-pointer hover:bg-orange-100 transition-colors"
                                          >
                                            <svg
                                              className="w-4 h-4 text-orange-500"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                              />
                                            </svg>
                                            <span className="text-sm text-orange-600 font-semibold">
                                              {file ? "Change" : "Replace"}{" "}
                                              {field.type === "image"
                                                ? "image"
                                                : "file"}
                                            </span>
                                            <input
                                              id={field.name}
                                              type="file"
                                              accept={
                                                field.type === "image"
                                                  ? "image/*"
                                                  : "image/*,application/pdf,.doc,.docx,.txt"
                                              }
                                              onChange={(e) => {
                                                const selectedFile =
                                                  e.currentTarget.files?.[0] ||
                                                  null;
                                                form.setFieldValue(
                                                  field.name,
                                                  selectedFile,
                                                );
                                              }}
                                              className="hidden"
                                            />
                                          </label>
                                        </div>
                                      ) : (
                                        /* Create mode: standard dashed upload area */
                                        <label
                                          htmlFor={field.name}
                                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-orange-300 rounded-2xl cursor-pointer bg-orange-50 hover:bg-orange-100 transition-colors group"
                                        >
                                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                              className="w-8 h-8 mb-2 text-orange-500 group-hover:text-orange-600 transition-colors"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                              />
                                            </svg>
                                            <p className="mb-1 text-sm text-orange-600 font-semibold">
                                              Click to upload{" "}
                                              {field.type === "image"
                                                ? "image"
                                                : "file"}
                                            </p>
                                            <p className="text-xs text-orange-500">
                                              {field.type === "image"
                                                ? "PNG, JPG, GIF up to 10MB"
                                                : "PDF, DOC, DOCX, TXT up to 10MB"}
                                            </p>
                                          </div>
                                          <input
                                            id={field.name}
                                            type="file"
                                            accept={
                                              field.type === "image"
                                                ? "image/*"
                                                : "image/*,application/pdf,.doc,.docx,.txt"
                                            }
                                            onChange={(e) => {
                                              const selectedFile =
                                                e.currentTarget.files?.[0] ||
                                                null;
                                              form.setFieldValue(
                                                field.name,
                                                selectedFile,
                                              );
                                            }}
                                            className="hidden"
                                          />
                                        </label>
                                      )}

                                      {/* Validation error */}
                                      {form.errors[field.name] &&
                                        form.touched[field.name] && (
                                          <div className="text-red-500 text-sm mt-1">
                                            {String(form.errors[field.name])}
                                          </div>
                                        )}
                                    </div>
                                  );
                                }}
                              </Field>
                            );

                          default:
                            return null;
                        }
                      })()}
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 px-6 md:px-8 py-4 border-t border-gray-200 flex-shrink-0 bg-white">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 h-11"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="w-full sm:w-auto px-6 py-2.5 h-11 shadow-lg"
                >
                  {OnSubmitTitle}
                </Button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}

// Demo Component
