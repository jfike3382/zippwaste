"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  formatNumberInput,
  unformatNumberInput,
} from "@/utils/format-data/number";

export default function Input({
  name,
  type = "text",
  label,
  value,
  onChange,
  onFocus,
  onKeyPress,
  autoComplete,
  required = false,
  optional = false,
  error = false,
  visible = true,
  placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const textareaRef = useRef(null);
  const [internalValue, setInternalValue] = useState(value || "");

  useEffect(() => {
    if (type === "number") {
      setInternalValue(formatNumberInput(value ? String(value) : ""));
    } else {
      setInternalValue(value || "");
    }
  }, [value, type]);

  useEffect(() => {
    if (type === "textarea" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, type]);

  const handleInput = (e) => {
    if (type === "number") {
      let raw = unformatNumberInput(e.target.value).replace(/\D/g, "");
      setInternalValue(formatNumberInput(raw));
      if (onChange) {
        onChange({
          ...e,
          target: {
            ...e.target,
            name: name,
            value: raw,
          },
        });
      }
    } else {
      setInternalValue(e.target.value);
      if (onChange) onChange(e);
    }
  };

  const inputStyles = `input ${error ? "border-red-400 ring-red-400" : ""}`;

  return (
    <div className={`flex flex-col gap-2 ${visible ? "" : "hidden"}`}>
      {label && (
        <p className="input-label">
          {label}
          {optional && (
            <span className="text-xs text-neutral-600"> (Optional)</span>
          )}
        </p>
      )}
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            ref={textareaRef}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            required={required}
            placeholder={placeholder}
            className={`${inputStyles} resize-none overflow-hidden`}
            rows={3}
          />
        ) : (
          <input
            type={
              type === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : "text"
            }
            name={name}
            value={type === "number" ? internalValue : value}
            autoComplete={autoComplete}
            onInput={handleInput}
            onFocus={onFocus}
            onKeyPress={onKeyPress}
            required={required}
            placeholder={placeholder}
            className={`input ${error ? "border-red-400 ring-red-400" : ""}`}
            inputMode={type === "number" ? "numeric" : undefined}
          />
        )}

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
          >
            <Image
              src={
                showPassword
                  ? "/assets/icons/eye_off.svg"
                  : "/assets/icons/eye.svg"
              }
              alt={showPassword ? "Hide password" : "Show password"}
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
    </div>
  );
}
