import React, { Fragment } from "react";
import ErrorMessage from "./ErrorMessage";
import closeEye from "@/assets/svgs/eye-closee.svg";
import Eye from "@/assets/svgs/eye.svg";
import Image from "next/image";
import {
  alphaInput,
  floatInput,
  integerInput,
  removeMultiSpace,
} from "@/helper/helper";
// import StarLabel from "../Lable/StarLabel";

const CustomizedFormFields = (props) => {
  const {
    className,
    name,
    value,
    onChange,
    numInputs,
    renderInput,
    businessMargin,
    inputLabel,
    selectOptions,
    type,
    placeholder,
    maxLength = 50,
    register,
    errors,
    inputType,
    labelText,
    startLabel,
    selectOptionLabel,
    selectOption,
    setToggleEye,
    toggleEye,
    rows = 10,
    onKeyPress = true,
    startLabelClass = "",
    floatingLabel,
    watch,
    ...rest
  } = props;

  switch (type) {
    case "hidden":
      return (
        <input type={type} name={name} id={name} {...register} {...rest} />
      );

    case "text":
      return (
        <Fragment>
          <input
            type="text"
            placeholder={placeholder}
            className={className}
            name={name}
            {...register}
            onKeyPress={(e) =>
              onKeyPress
                ? name === "biCertification"
                  ? /^[A-Za-z0-9\s]*$/.test(e.key)
                    ? null
                    : e.preventDefault()
                  : inputType === "text"
                  ? alphaInput(e)
                  : inputType === "number"
                  ? integerInput(e)
                  : inputType === "float"
                  ? floatInput(e)
                  : null
                : {}
            }
            onInput={removeMultiSpace}
            maxLength={maxLength}
            {...rest}
          />
          {floatingLabel && <label htmlFor="">{floatingLabel} </label>}
          <ErrorMessage message={errors?.[name]?.message} />
        </Fragment>
      );

    case "email":
      return (
        <Fragment>
          <div className="relative">
            <input
              type="email"
              placeholder={placeholder}
              className={className}
              name={name}
              {...register}
              maxLength={maxLength}
              onInput={removeMultiSpace}
              {...rest}
            />
            {floatingLabel && (
              <label htmlFor="first_name">{floatingLabel}</label>
            )}
            <ErrorMessage message={errors?.[name]?.message} />
          </div>
        </Fragment>
      );
    case "url":
      return (
        <div className="relative">
          <input
            type="url"
            placeholder={placeholder}
            className={className}
            name={name}
            onInput={removeMultiSpace}
            {...register}
            {...rest}
          />
          {floatingLabel && <label htmlFor="">{floatingLabel}</label>}
          <ErrorMessage message={errors?.[name]?.message} />
        </div>
      );
    case "password":
      return (
        <Fragment>
          <div className="relative">
            <input
              type={toggleEye ? "text" : "password"}
              placeholder={placeholder}
              className={className}
              name={name}
              {...register}
              maxLength={maxLength}
              onInput={removeMultiSpace}
              {...rest}
            />
            {floatingLabel && (
              <label htmlFor="first_name">{floatingLabel}</label>
            )}
            <div className="absolute top-[4px] right-0 border-none p-[17px] bg-transparent z-[999]">
              <Image
                src={toggleEye ? closeEye : Eye}
                width={22}
                height={16}
                alt=""
                onClick={() => setToggleEye(!toggleEye)}
                className="cursor-pointer"
              />
            </div>
            <ErrorMessage message={errors?.[name]?.message} />
          </div>
        </Fragment>
      );

    case "select":
      return (
        <Fragment>
          <select
            name={name}
            {...register}
            className={className}
            {...rest}
            value={value}
          >
            <option value="">{selectOptionLabel}</option>
            {selectOption.map((item) => (
              <option key={item.id} value={item.value}>
                {item.title}
              </option>
            ))}
          </select>
          {floatingLabel && <label htmlFor="first_name">{floatingLabel}</label>}
          <ErrorMessage message={errors?.[name]?.message} />
        </Fragment>
      );

    case "number":
      return (
        <Fragment>
          <input
            type="text"
            placeholder={placeholder}
            className={className}
            name={name}
            {...register}
            onKeyPress={(e) =>
              inputType === "text"
                ? alphaInput(e)
                : inputType === "number"
                ? integerInput(e)
                : inputType === "float"
                ? floatInput(e)
                : alert("input type required")
            }
            maxLength={maxLength}
            onInput={removeMultiSpace}
            {...rest}
          />
          {floatingLabel && <label htmlFor="first_name">{floatingLabel}</label>}
          <ErrorMessage message={errors?.[name]?.message} />
        </Fragment>
      );

    case "textarea":
      return (
        <Fragment>
          <textarea
            rows={rows}
            placeholder={placeholder}
            className={className}
            name={name}
            onInput={removeMultiSpace}
            {...register}
            {...rest}
          />
          {floatingLabel && <label htmlFor="first_name">{floatingLabel}</label>}
          <ErrorMessage message={errors?.[name]?.message} />
        </Fragment>
      );

    default:
      return <p>Please provide some input props.</p>;
  }
};

export default CustomizedFormFields;
