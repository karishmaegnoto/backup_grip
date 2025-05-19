import React, { useEffect } from "react";

const SeoTags = ({ title, description }) => {
  useEffect(() => {
    // If neither title nor description is provided, don't execute the rest of the code
    if (!title && !description) return;

    // Update the document title if provided
    if (title) {
      document.title = title;
    }

    // Update or create the meta description tag
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
    }

    // Add or update the manifest link tag
    let manifestLink = document.querySelector('link[rel="manifest"]');
    if (!manifestLink) {
      manifestLink = document.createElement("link");
      manifestLink.rel = "manifest";
      manifestLink.href = "/manifest.webmanifest";
      document.head.appendChild(manifestLink);
    } else {
      manifestLink.href = "/manifest.webmanifest";
    }
  }, [title, description]);

  // If no title or description is provided, return null to prevent rendering the effect
  if (!title && !description) return null;

  return null;
};

export default SeoTags;
