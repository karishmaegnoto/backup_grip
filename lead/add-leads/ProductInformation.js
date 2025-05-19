import React from "react";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import InputEditSvg from "@/assets/svgs/inputEditSvg";
import { Eye } from "lucide-react";

const ProductInformation = ({
  register,
  handelEditApi,
  moduleType,
  watchedValues,
  handleAddTimeline,
}) => {
  return (
    <div className={ProfileStyle.profile_info_details}>
      <div
        className={`${ProfileStyle.form_floating} ${ProfileStyle.form_productarea}`}
      >
        <CustomizedFormFields
          type="text"
          name="productTitle"
          placeholder="Enter product title."
          register={{
            ...register("productTitle", {
              required: false,
            }),
          }}
          maxLength={"undefined"}
          className={ProfileStyle.form_control}
          floatingLabel="Product Title"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("Product title", watchedValues?.productTitle);
              handelEditApi(watchedValues);
            }
          }}
        />
        {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>
      <div
        className={`${ProfileStyle.form_floating} ${ProfileStyle.form_productarea}`}
      >
        <div style={{ position: "relative" }}>
          <CustomizedFormFields
            type="url"
            name="productUrl"
            placeholder="Enter product url."
            register={{
              ...register("productUrl", {
                required: false,
              }),
            }}
            startLabel={false}
            className={ProfileStyle.form_control}
            floatingLabel="Product URL"
            onBlur={() => {
              if (moduleType) {
                handleAddTimeline("Product Url", watchedValues?.productUrl);
                handelEditApi(watchedValues);
              }
            }}
            style={{ paddingRight: "2.5rem" }}
          />
          {/*-------------------- Added eye icon to open the url in a new tab-------------- */}
          {(moduleType === "view" || moduleType === "edit") && (
            <div>
              <Eye
                onClick={() => {
                  window.open(watchedValues?.productUrl, "_blank");
                }}
                color="darkGray"
                className="pointer"
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            </div>
          )}
        </div>
        {/* {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )} */}
      </div>
      <div
        className={`${ProfileStyle.form_floating} ${ProfileStyle.form_productarea}`}
      >
        <CustomizedFormFields
          type="url"
          name="colorImageUrl"
          placeholder="Enter color image url."
          register={{
            ...register("colorImageUrl", {
              required: false,
            }),
          }}
          startLabel={false}
          className={ProfileStyle.form_control}
          floatingLabel="Color Image URL"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline(
                "Color image Url",
                watchedValues?.colorImageUrl
              );
              handelEditApi(watchedValues);
            }
          }}
        />
        {/*--------------------Added eye icon to open the url in a new tab-------------- */}
        {(moduleType === "view" || moduleType === "edit") && (
          <div>
            <Eye
              onClick={() => {
                window.open(watchedValues?.colorImageUrl, "_blank");
              }}
              color="darkGray"
              className="pointer"
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            />
          </div>
        )}

        {/* {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ProductInformation;
