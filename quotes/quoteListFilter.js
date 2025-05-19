import React, { useContext, useState } from "react";
import styles from "./quotes-comp.module.scss";
import SingleSelect from "../shared/FormFields/singleSearchableSelect";
import LeadContext from "@/hooks/context/LeadContext";
import { useForm } from "react-hook-form";
import ODatePicker from "../shared/datePicker/ODatePicker";
import DateRangePicker from "../shared/datePicker/ODateRangePicker";
import MultiSelect from "../shared/FormFields/multiSelect";
import CustomizedFormFields from "../shared/FormFields/CustomizedFormFields";
import { constantTypes } from "@/utils/constants/constant";
import { MaxLength } from "@/utils/constants/CharactersLength";
import leadStyle from "@/app/[slug]/leads/lead.module.scss";
import moment from "moment";

const QuoteListFilter = ({
  setVisibleFilter,
  fetchQuotesList,
  setPreventFilterData,
  preventFilterData,
}) => {
  let {
    leadOwnerDetails,
    leadSourceDetails,
    leadStateDetails,
    leadManufacturerDetails,
    leadStatusDetails,
    leadWebFormDetails,
  } = useContext(LeadContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  // ALL STATE
  const [filterValues, setFilterValues] = useState(
    Object?.keys(preventFilterData)?.length > 0
      ? preventFilterData
      : {
          createdBy: "",
          createdDate: "",
          leadSource: [],
          leadState: "",
          leadManufacturer: "",
          leadStatus: [],
          leadWebForms: "",
          leadOwner: "",
          modified: "",
          zipcode: "",
          startDate: "",
          endDate: "",
          modifyStartDate: "",
          modifyEndDate: "",
        }
  );

  const handleChange = (field) => (value) => {
    if (field === "createdDate") {
      setFilterValues((prev) => ({
        ...prev,
        [field]: value,
        startDate: "",
        endDate: "",
      }));
    } else if (field === "modified") {
      setFilterValues((prev) => ({
        ...prev,
        [field]: value,
        modifyStartDate: "",
        modifyEndDate: "",
      }));
    } else {
      setFilterValues((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const onSubmit = (data) => {
    const filterData = {};
    const keysToCheck = [
      "createdBy",
      "createdDate",
      "leadState",
      "leadManufacturer",
      "leadWebForms",
      "leadOwner",
      "modified",
    ];

    keysToCheck.forEach((key) => {
      if (filterValues?.[key]) {
        filterData[key] = filterValues[key].value;
      }
    });

    if (
      Array.isArray(filterValues?.leadSource) &&
      filterValues?.leadSource?.length > 0
    ) {
      filterData.leadSource = filterValues.leadSource
        .map((source) => source.value)
        .join(", ");
    }
    if (
      Array.isArray(filterValues?.leadStatus) &&
      filterValues?.leadStatus?.length > 0
    ) {
      filterData.leadStatus = filterValues?.leadStatus
        .map((status) => status?.value)
        .join(", ");
    }

    if (data?.zipcode) {
      filterData.zipCode = data?.zipcode;
    }

    if (filterData?.leadWebForms) {
      const foundLeadWebForm = leadWebFormDetails.find(
        (el) => el.value === filterData.leadWebForms
      );
      filterData.leadWebForms = foundLeadWebForm ? foundLeadWebForm?.title : "";
    }
    if (filterData?.leadState) {
      const foundLeadState = leadStateDetails?.find(
        (el) => el?.value === filterData?.leadState
      );
      filterData.leadState = foundLeadState ? foundLeadState?.title : "";
    }

    if (filterValues?.startDate) {
      filterData.startDate = moment(filterValues?.startDate).format(
        "YYYY-MM-DD"
      );
    }
    if (filterValues?.endDate) {
      filterData.endDate = moment(filterValues?.endDate).format("YYYY-MM-DD");
    }
    if (filterValues?.modifyStartDate) {
      filterData.modifyStartDate = moment(filterValues?.modifyStartDate).format(
        "YYYY-MM-DD"
      );
    }
    if (filterValues?.modifyEndDate) {
      filterData.modifyEndDate = moment(filterValues?.modifyEndDate).format(
        "YYYY-MM-DD"
      );
    }

    setPreventFilterData(filterValues);
    fetchQuotesList(filterData);
  };

  const handleCancel = () => {
    reset();
    fetchQuotesList();
    setFilterValues({
      createdBy: "",
      createdDate: "",
      leadSource: [],
      leadState: "",
      leadManufacturer: "",
      leadStatus: [],
      leadWebForms: "",
      leadOwner: "",
      modified: "",
      zipcode: "",
    });
    setPreventFilterData({});
    setVisibleFilter(false);
  };

  const handleChangeDate = (dates) => {
    const date = new Date(dates?.[0]).toString();
    setFilterValues((prev) => ({ ...prev, startDate: date }));
  };

  const handleStartDateChange = (dates) => {
    const date = new Date(dates).toString();
    console.log("date", date);
    setFilterValues((prev) => ({ ...prev, startDate: date }));
  };

  const handleEndDateChange = (dates) => {
    const date = new Date(dates).toString();
    setFilterValues((prev) => ({ ...prev, endDate: date }));
  };

  const handleModifiedChangeDate = (dates) => {
    const date = new Date(dates?.[0]).toString();
    setFilterValues((prev) => ({ ...prev, modifyStartDate: date }));
  };

  const handleModifiedStartDateChange = (dates) => {
    const date = new Date(dates).toString();
    setFilterValues((prev) => ({ ...prev, modifyStartDate: date }));
  };

  const handleModifiedEndDateChange = (dates) => {
    const date = new Date(dates).toString();
    setFilterValues((prev) => ({ ...prev, modifyEndDate: date }));
  };

  return (
    <div className={styles?.filter_container}>
      <form
        className={styles.contentWrapper}
        // onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <div className={styles.common_heading}>
          <h3>Filter by</h3>
        </div>

        {/* Created By Field */}
        <div className={styles.small_heading}>
          <b>Created By Field</b>
        </div>
        <div className={styles.profile_info_details}>
          <div className={`${styles.form_floating} form_select`}>
            <SingleSelect
              options={leadOwnerDetails}
              label={"Select"}
              onSelectionChange={handleChange("createdBy")}
              value={filterValues.createdBy}
            />
            <label>Created by</label>
          </div>
          <div className={`${styles.form_floating} form_select`}>
            <SingleSelect
              options={constantTypes?.leadDateFilterData}
              label={"Select"}
              onSelectionChange={handleChange("createdDate")}
              value={filterValues.createdDate}
            />
            <label>Created date</label>
          </div>
          {["on", "before", "after"].includes(
            filterValues?.createdDate?.value
          ) && (
            <div className={leadStyle.form_floating_flat}>
              <ODatePicker
                name="startDate"
                value={
                  filterValues?.startDate && new Date(filterValues?.startDate)
                }
                className={styles.form_control}
                placeholder={"start date."}
                errors={errors}
                onChange={handleChangeDate}
                dateFormat="Y-m-d"
              />
              <label htmlFor="date">YYYY-MM-DD</label>
            </div>
          )}

          {["between"].includes(filterValues?.createdDate?.value) && (
            <DateRangePicker
              startDate={
                filterValues?.startDate && new Date(filterValues?.startDate)
              }
              endDate={filterValues?.endDate && new Date(filterValues?.endDate)}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
              dateFormat="Y-m-d"
              placeholderStart="YYYY-MM-DD"
              placeholderEnd="YYYY-MM-DD"
              errors={errors}
              className={leadStyle.form_floating_flat}
              titleStateDate="Form"
              titleEndDate="To"
            />
          )}
          <div className={`${styles.form_floating} form_select`}>
            <MultiSelect
              options={leadSourceDetails}
              label={"Select"}
              onSelectionChange={handleChange("leadSource")}
              value={filterValues.leadSource}
            />
            <label>Lead Source</label>
          </div>
          <div className={`${styles.form_floating} form_select`}>
            <SingleSelect
              options={leadStateDetails}
              label={"Select"}
              onSelectionChange={handleChange("leadState")}
              value={filterValues.leadState}
            />
            <label>Lead state</label>
          </div>
          <div className={styles.form_floating}>
            <CustomizedFormFields
              type="number"
              name="zipcode"
              placeholder="Enter your zip code"
              register={register("zipcode", {
                required: false,
              })}
              inputType={"number"}
              errors={errors}
              maxLength={MaxLength.zipCode}
              floatingLabel="Zip Code"
            />
          </div>
          <div className={`${styles.form_floating} form_select`}>
            <SingleSelect
              options={leadManufacturerDetails}
              label={"Select"}
              onSelectionChange={handleChange("leadManufacturer")}
              value={filterValues.leadManufacturer}
            />
            <label>Select Manufacturer</label>
          </div>
          <div className={`${styles.form_floating} form_select`}>
            <MultiSelect
              options={leadStatusDetails}
              label={"Select"}
              onSelectionChange={handleChange("leadStatus")}
              value={filterValues.leadStatus}
            />
            <label>Lead Status</label>
          </div>
          <div className={`${styles.form_floating} form_select`}>
            <SingleSelect
              options={leadWebFormDetails}
              label={"Select"}
              onSelectionChange={handleChange("leadWebForms")}
              value={filterValues.leadWebForms}
            />
            <label>Web forms</label>
          </div>
        </div>

        {/* Modified By Field */}
        <div className={styles.small_heading}>
          <b>Modified By Field</b>
        </div>
        <div className={styles.profile_info_details}>
          <div className={`${styles.form_floating} form_select`}>
            <SingleSelect
              options={leadOwnerDetails}
              label={"Select"}
              onSelectionChange={handleChange("leadOwner")}
              value={filterValues.leadOwner}
            />
            <label>Lead Owner</label>
          </div>
          <div className={`${styles.form_floating} form_select`}>
            <SingleSelect
              options={constantTypes?.leadDateFilterData}
              label={"Select"}
              onSelectionChange={handleChange("modified")}
              value={filterValues.modified}
            />
            <label>Modified Date</label>
          </div>
          {["on", "before", "after"].includes(
            filterValues?.modified?.value
          ) && (
            <div className={leadStyle.form_floating_flat}>
              <ODatePicker
                name="modifiedStartDate"
                value={
                  filterValues?.modifiedStartDate &&
                  new Date(filterValues?.modifiedStartDate)
                }
                className={styles.form_control}
                placeholder={"start date."}
                errors={errors}
                onChange={handleModifiedChangeDate}
                dateFormat="Y-m-d"
              />
              <label htmlFor="date">YYYY-MM-DD</label>
            </div>
          )}

          {["between"].includes(filterValues?.modified?.value) && (
            <DateRangePicker
              startDate={
                filterValues?.modifyStartDate &&
                new Date(filterValues?.modifyStartDate)
              }
              endDate={
                filterValues?.modifyEndDate &&
                new Date(filterValues?.modifyEndDate)
              }
              onStartDateChange={handleModifiedStartDateChange}
              onEndDateChange={handleModifiedEndDateChange}
              dateFormat="Y-m-d"
              placeholderStart="YYYY-MM-DD"
              placeholderEnd="YYYY-MM-DD"
              errors={errors}
              className={leadStyle.form_floating_flat}
              titleStateDate="Form"
              titleEndDate="To"
            />
          )}
        </div>
      </form>

      <div className={styles.fixedButtons}>
        <button
          className={styles.filter_cancel_button}
          type="button"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
        <button
          className={styles.filter_save_button}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default QuoteListFilter;
