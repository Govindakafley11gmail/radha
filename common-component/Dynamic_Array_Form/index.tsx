/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useEffect } from "react";
import {
  Formik,
  Field,
  FieldArray,
  Form,
  useFormikContext,
  getIn,
  FieldProps,
  useField,
} from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// -------------------- Types --------------------
export type FieldType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "file"
  | "image"
  | "textarea";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: { label: string; value: string | number }[];
  validation?: any;
  storeLabel?: boolean; // store {value, label} instead of just value
  calc?: {
    multiply?: string[];
    sum?: string[];
    percentageOf?: string;
  };
  disabled?: boolean;
}

interface DynamicArrayFormProps {
  title?: string;
  topFields?: FieldConfig[];
  arrayFieldName?: string;
  arrayFields?: FieldConfig[];
  initialValues?: Record<string, any>;
  onValuesChange?: (values: Record<string, any>) => void;
  onSubmit: (values: Record<string, any>) => void;
  buttonTitle: string;
}

// -------------------- Formik Select Field --------------------
interface FormikSelectFieldProps {
  name: string;
  options: { label: string; value: any }[];
  storeLabel?: boolean;
  placeholder?: string;
  className?: string;
}

function FormikSelectField({
  name,
  options,
  storeLabel = false,
  placeholder,
  className = "",
}: FormikSelectFieldProps) {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<any>();
  const fieldValue = getIn(values, name);
  const currentValue = storeLabel
    ? (fieldValue?.value ?? "")
    : (fieldValue ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options.find(
      (opt) => String(opt.value) === e.target.value,
    );
    if (!selectedOption) return;

    setFieldValue(name, storeLabel ? selectedOption : selectedOption.value);
    setFieldTouched(name, true, true); // mark as touched for validation
  };

  return (
    <div className="relative">
      <select
        name={name}
        value={currentValue}
        onChange={handleChange}
        className={`h-12 w-full bg-white border-2 border-gray-200 rounded-xl px-4 pr-10 text-gray-900 transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none appearance-none cursor-pointer ${className}`}
      >
        <option value="">{placeholder || "Select an option"}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Custom arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

// -------------------- Universal Totals Watcher --------------------
function ItemsTotalWatcher({
  arrayFieldName,
  arrayFields,
  topFields,
}: {
  arrayFieldName: string;
  arrayFields: FieldConfig[];
  topFields: FieldConfig[];
}) {
  const { values, setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    if (!arrayFieldName || !Array.isArray(values[arrayFieldName])) return;

    values[arrayFieldName].forEach((item: any, index: number) => {
      arrayFields.forEach((field) => {
        if (!field.calc) return;

        if (field.calc.multiply) {
          const product = field.calc.multiply.reduce(
            (acc, key) => acc * (Number(item[key]) || 0),
            1,
          );
          if (item[field.name] !== product) {
            setFieldValue(`${arrayFieldName}.${index}.${field.name}`, product);
          }
        }

        if (field.calc.sum) {
          const sum = field.calc.sum.reduce(
            (acc, key) => acc + (Number(item[key]) || 0),
            0,
          );
          if (item[field.name] !== sum) {
            setFieldValue(`${arrayFieldName}.${index}.${field.name}`, sum);
          }
        }

        if (field.calc.percentageOf) {
          const base = Number(item[field.calc.percentageOf]) || 0;
          const percentValue = base * 0.05;
          if (item[field.name] !== percentValue) {
            setFieldValue(
              `${arrayFieldName}.${index}.${field.name}`,
              percentValue,
            );
          }
        }
      });
    });

    topFields.forEach((field) => {
      if (!field.calc || !field.calc.sum) return;
      const total = values[arrayFieldName].reduce((acc: number, item: any) => {
        const rowSum = field.calc!.sum!.reduce(
          (rowAcc, key) => rowAcc + (Number(item[key]) || 0),
          0,
        );
        return acc + rowSum;
      }, 0);
      if (values[field.name] !== total) {
        setFieldValue(field.name, total);
      }
    });
  }, [values, setFieldValue, arrayFieldName, arrayFields, topFields]);

  return null;
}

// -------------------- Date Difference Watcher --------------------
function DateDiffWatcher() {
  const { values, setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    const startDate = values.start_date;
    const endDate = values.end_date;

    if (!startDate || !endDate) {
      if ("total_days" in values) setFieldValue("total_days", undefined);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setFieldValue("total_days", 0);
      return;
    }

    if (end < start) {
      setFieldValue("total_days", 0);
      return;
    }

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (values.total_days !== diffDays) setFieldValue("total_days", diffDays);
  }, [values.start_date, values.end_date, setFieldValue]);

  return null;
}
// file Upload
// Add this component near the other field components

function FileUploadField({ name }: { name: string }) {
  const { setFieldValue } = useFormikContext<any>();
  const [meta] = useField(name);
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    setFieldValue(name, file); // stores the actual File object

    // Preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null); // non-image: just show filename
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="cursor-pointer flex items-center gap-2 border-2 border-dashed border-orange-300 rounded-xl px-4 py-3 text-sm text-gray-500 hover:border-orange-500 hover:text-orange-600 transition"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4"
          />
        </svg>
        {meta.value instanceof File
          ? meta.value.name
          : "Click to upload (image, PDF, doc…)"}
      </label>
      <input
        id={name}
        type="file"
        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
        onChange={handleChange}
        className="hidden"
      />
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="mt-2 h-20 w-auto rounded-lg object-contain border"
        />
      )}
    </div>
  );
}

// -------------------- Default value helper --------------------
function getDefaultValue(type: FieldType): string | number {
  switch (type) {
    case "number":
      return 0;
    case "text":
    case "date":
    case "select":
    default:
      return "";
  }
}

// -------------------- DynamicArrayForm --------------------
export default function DynamicArrayForm({
  title,
  topFields = [],
  arrayFieldName = "",
  arrayFields = [],
  initialValues = {},
  buttonTitle,
  onSubmit,
  onValuesChange,
}: DynamicArrayFormProps) {
  const arrayFieldKey = arrayFieldName;

  // top-level defaults
  const topFieldDefaults = topFields.reduce(
    (acc, field) => {
      acc[field.name] =
        initialValues[field.name] ?? getDefaultValue(field.type);
      return acc;
    },
    {} as Record<string, any>,
  );

  // array item defaults
  const arrayItemDefaults = arrayFields.reduce(
    (acc, f) => ({
      ...acc,
      [f.name]: getDefaultValue(f.type),
    }),
    {},
  );

  const initialArray =
    arrayFields && arrayFields.length > 0 ? [arrayItemDefaults] : [];

  const initialFormValues = {
    ...topFieldDefaults,
    ...initialValues,
    ...(arrayFieldKey
      ? {
          [arrayFieldKey]:
            initialValues[arrayFieldKey]?.length > 0
              ? initialValues[arrayFieldKey].map((item: any) => ({
                  ...arrayItemDefaults,
                  ...item,
                }))
              : initialArray,
        }
      : {}),
  };

  const validationSchema = useMemo(() => {
    const topFieldSchema = topFields.reduce(
      (acc, field) => {
        if (field.validation) acc[field.name] = field.validation;
        return acc;
      },
      {} as Record<string, any>,
    );

    const arrayFieldSchema = arrayFields.reduce(
      (acc, field) => {
        if (field.validation) acc[field.name] = field.validation;
        return acc;
      },
      {} as Record<string, any>,
    );

    return Yup.object().shape({
      ...topFieldSchema,
      ...(arrayFieldKey
        ? {
            [arrayFieldKey]: Yup.array().of(
              Yup.object().shape(arrayFieldSchema),
            ),
          }
        : {}),
    });
  }, [topFields, arrayFields, arrayFieldKey]);

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-orange-600 mb-4">
          {title}
        </h2>
      )}

      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, errors, touched }) => (
          <Form className="space-y-6">
            {/* ---------------- Top-level fields ---------------- */}
            {topFields.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {topFields.map((field) => (
                  <div key={field.name} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <>
                        <FormikSelectField
                          name={field.name}
                          options={field.options || []}
                          storeLabel={field.storeLabel}
                          placeholder={`Select ${field.label}`}
                        />
                        {getIn(touched, field.name) &&
                          getIn(errors, field.name) && (
                            <div className="text-red-500 text-sm mt-1">
                              {String(getIn(errors, field.name))}
                            </div>
                          )}
                      </>
                    ) : field.type === "textarea" ? (
                      <>
                        <Field
                          name={field.name}
                          as="textarea"
                          className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                        {getIn(touched, field.name) &&
                          getIn(errors, field.name) && (
                            <div className="text-red-500 text-sm mt-1">
                              {String(getIn(errors, field.name))}
                            </div>
                          )}
                      </>
                    ) : field.type === "file" || field.type === "image" ? (
                      <>
                        <>
                          <FileUploadField name={field.name} />
                          {getIn(touched, field.name) &&
                            getIn(errors, field.name) && (
                              <div className="text-red-500 text-sm mt-1">
                                {String(getIn(errors, field.name))}
                              </div>
                            )}
                        </>
                      </>
                    ) : (
                      <>
                        <Field
                          name={field.name}
                          type={field.type}
                          as={Input}
                          onValuesChange={onValuesChange}
                          className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                        {getIn(touched, field.name) &&
                          getIn(errors, field.name) && (
                            <div className="text-red-500 text-sm mt-1">
                              {String(getIn(errors, field.name))}
                            </div>
                          )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            <DateDiffWatcher />
            <ItemsTotalWatcher
              arrayFieldName={arrayFieldKey}
              arrayFields={arrayFields}
              topFields={topFields}
            />

            {/* ---------------- Dynamic array fields ---------------- */}
            {arrayFields.length > 0 && arrayFieldKey && (
              <FieldArray name={arrayFieldKey}>
                {({ push, remove }) => (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Enter Items
                    </h3>

                    {values[arrayFieldKey].map((_: any, index: number) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-xl shadow-sm transition-shadow hover:shadow-md"
                      >
                        {arrayFields.map((field) => (
                          <div key={field.name} className="flex flex-col">
                            <label className="text-sm font-medium text-gray-500 mb-1">
                              {field.label}
                            </label>
                            {field.type === "select" ? (
                              <>
                                <FormikSelectField
                                  name={`${arrayFieldKey}.${index}.${field.name}`}
                                  options={field.options || []}
                                  storeLabel={field.storeLabel}
                                  placeholder={`Select ${field.label}`}
                                />
                                {getIn(
                                  touched,
                                  `${arrayFieldKey}.${index}.${field.name}`,
                                ) &&
                                  getIn(
                                    errors,
                                    `${arrayFieldKey}.${index}.${field.name}`,
                                  ) && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {String(
                                        getIn(
                                          errors,
                                          `${arrayFieldKey}.${index}.${field.name}`,
                                        ),
                                      )}
                                    </div>
                                  )}
                              </>
                            ) : (
                              <>
                                <Field
                                  name={`${arrayFieldKey}.${index}.${field.name}`}
                                  type={field.type}
                                  as={Input}
                                  className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-500"
                                />
                                {getIn(
                                  touched,
                                  `${arrayFieldKey}.${index}.${field.name}`,
                                ) &&
                                  getIn(
                                    errors,
                                    `${arrayFieldKey}.${index}.${field.name}`,
                                  ) && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {String(
                                        getIn(
                                          errors,
                                          `${arrayFieldKey}.${index}.${field.name}`,
                                        ),
                                      )}
                                    </div>
                                  )}
                              </>
                            )}
                          </div>
                        ))}

                        {/* Add / Remove Buttons */}
                        <div className="flex mt-5 justify-center items-center gap-2 col-span-full">
                          <Button
                            type="button"
                            onClick={() => push(arrayItemDefaults)}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500 text-white hover:ring-2 hover:ring-orange-500 transition"
                          >
                            +
                          </Button>
                          {values[arrayFieldKey].length > 1 && (
                            <Button
                              type="button"
                              onClick={() => remove(index)}
                              className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 hover:ring-2 hover:ring-orange-500 transition"
                            >
                              -
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
            )}

            <Button type="submit" className="mt-4 bg-orange-500 text-white">
              {buttonTitle}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
