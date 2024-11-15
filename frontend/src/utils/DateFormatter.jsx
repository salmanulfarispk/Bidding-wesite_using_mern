import React from "react";
import moment from "moment";

export const DateFormatter = ({ date }) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return <span>Invalid Date</span>;
  }

  return <span>{moment(date).format("DD MMM YYYY")}</span>;
};
