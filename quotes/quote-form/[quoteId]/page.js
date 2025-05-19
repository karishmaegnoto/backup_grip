"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useSearchParams, useParams } from "next/navigation";

const QuoteForm = dynamic(() => import("components/lead/QuoteForm"), {
  ssr: false,
});

const QuoteFormPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const quoteId = params.quoteId;
  const leadId = searchParams.get("leadId");

  // Passed quoteId and leadId as props to QuoteForm
  return <QuoteForm quoteId={quoteId} leadId={leadId} />;
};

export default QuoteFormPage;
