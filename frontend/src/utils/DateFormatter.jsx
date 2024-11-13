import React from "react";
const Moment = React.lazy(() => import("react-moment"));

export const DateFormatter = ({ date }) => {
  return (
    <React.Suspense fallback={<span>Loading...</span>}>
      <Moment format="D MMM YYYY" withTitle>
        {date}
      </Moment>
    </React.Suspense>
  );
};
