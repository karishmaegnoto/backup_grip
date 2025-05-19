import React from "react";
import styles from "@/app/[slug]/quotes/add-quotes/add-quotes.module.scss";
import InputEditSvg from "@/assets/svgs/inputEditSvg";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import { Eye } from "lucide-react";

const QuotesProductInformation = ({
  ProfileStyle,
  setValue,
  register,
  errors,
  moduleType,
  watchedValues,
}) => {
  return (
    <div
      className={styles.add_input_info}
      style={moduleType === "view" ? { pointerEvents: "none" } : {}}
    >
      <div className={styles.add_input_info}>
        <div
          className={`${styles.form_floating} ${styles.product_information}`}
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
            disabled={moduleType === "view"}
            startLabel={false}
            className={styles.form_control}
            floatingLabel="Product Title"
            //   onBlur={() => {
            //     if (moduleType) {
            //       handleAddTimeline("Product title", watchedValues?.productTitle);
            //       handelEditApi(watchedValues);
            //     }
            //   }}
          />
          {moduleType == "view" && (
            <div className={ProfileStyle.beforeEdit}>
              <InputEditSvg />
            </div>
          )}
        </div>
        <div
          className={`${styles.form_floating} ${styles.product_information}`}
        >
          <CustomizedFormFields
            type="url"
            name="productUrl"
            placeholder="Enter product url."
            register={{
              ...register("productUrl", {
                required: false,
              }),
            }}
            disabled={moduleType === "view"}
            startLabel={false}
            className={styles.form_control}
            floatingLabel="Product URL"
            //   onBlur={() => {
            //     if (moduleType) {
            //       handleAddTimeline("Product Url", watchedValues?.productUrl);
            //       handelEditApi(watchedValues);
            //     }
            //   }}
          />
          {/*-------------------- Added eye icon to open the url in a new tab-------------- */}
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
          {/* {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )} */}
        </div>
        <div
          className={`${styles.form_floating} ${styles.product_information}`}
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
            disabled={moduleType === "view"}
            startLabel={false}
            className={styles.form_control}
            floatingLabel="Color Image URL"
            //   onBlur={() => {
            //     if (moduleType) {
            //       handleAddTimeline(
            //         "Color image Url",
            //         watchedValues?.colorImageUrl
            //       );
            //       handelEditApi(watchedValues);
            //     }
            //   }}
          />
          {/*-------------------- Added eye icon to open the url in a new tab-------------- */}
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
          {/* {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )} */}
        </div>
      </div>
    </div>
  );
};

export default QuotesProductInformation;
