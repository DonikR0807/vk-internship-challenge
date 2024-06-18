import React from "react";
import {
  REQUEST_STATUSES,
  RequestStatusesType,
} from "../../utils/constants/requestStatuses";

interface ConditionalListProps {
  renderOnSuccess: React.ReactNode;
  renderOnFailed: React.ReactNode;
  renderOnIdle: React.ReactNode;
  renderOnPending: React.ReactNode;
  statusToCheck: RequestStatusesType;
}

function ConditionalList({
  renderOnIdle,
  statusToCheck,
  renderOnPending,
  renderOnSuccess,
  renderOnFailed,
}: ConditionalListProps) {
  let listToRender = renderOnIdle;

  if (statusToCheck === REQUEST_STATUSES.pending) {
    listToRender = renderOnPending;
  } else if (statusToCheck === REQUEST_STATUSES.success) {
    listToRender = renderOnSuccess;
  } else if (statusToCheck === REQUEST_STATUSES.failed) {
    listToRender = renderOnFailed;
  }

  return <>{listToRender}</>;
}

export default ConditionalList;
