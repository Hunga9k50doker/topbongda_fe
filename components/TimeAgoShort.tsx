import React from "react";
import dynamic from "next/dynamic";
import { getFromNowShort } from "@/utils";

interface TimeAgoShortProps {
  datetimeStr: Date;
  showSuffix?: boolean;
  exact?: boolean;
}

function TimeAgoShort({
  datetimeStr,
  showSuffix,
  exact,
  ...props
}: TimeAgoShortProps) {
  return <>{getFromNowShort(datetimeStr, showSuffix, exact)}</>;
}

export default dynamic(() => Promise.resolve(TimeAgoShort), { ssr: false });
