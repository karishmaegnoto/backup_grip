import { useEffect, useState } from "react";

const Timezone = () => {
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);
  }, []);

  return timezone;
};

export default Timezone;
