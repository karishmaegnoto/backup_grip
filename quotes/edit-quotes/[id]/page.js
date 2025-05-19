// import React from "react";
// import styles from "./edit-quotes.module.scss";

// const EditQuotes = () => {
//   return (
//     <div>
//       <h1>This is a edit quotes</h1>
//     </div>
//   );
// };

// export default EditQuotes;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditQuotePage = () => {
  const router = useRouter();
  const { quoteId } = router.query;

  const [quoteLeadDetails, setQuoteLeadDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(" Quote Page Loaded, quoteId:", quoteId);

    if (quoteId && typeof quoteId === "string" && quoteId.trim() !== "") {
      fetchQuoteDataByQuoteId(quoteId);
    }
  }, [quoteId]);

  const fetchQuoteDataByQuoteId = async (id) => {
    try {
      console.log(" About to call API with quoteId:", id);
      setIsLoading(true);

      getQuoteDataByIdApi(id, notification, (loading, error, res) => {
        setIsLoading(false);

        if (error) {
          console.error(" API Error fetching quote:", error);
          return;
        }

        console.log(" API Response for quote:", res);

        if (res) {
          setQuoteLeadDetails(res);
        } else {
          console.warn("No data returned for quoteId:", id);
        }
      });
    } catch (error) {
      console.error(" Catch Block Error:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading Quote Details...</div>;
  }

  if (!quoteLeadDetails) {
    return <div>No Quote Data Found.</div>;
  }

  return (
    <div>
      {/* Render your quoteLeadDetails here */}
      <h1>Quote Details</h1>
      <pre>{JSON.stringify(quoteLeadDetails, null, 2)}</pre>
    </div>
  );
};

export default EditQuotePage;
