import { IncomingMessage } from "node:http";

/*
 * @params {request} extracted from request response, {setLocalhost} your localhost address
 * @return {object} objects of protocol, host and origin
 */
export const absoluteUrl = (
  req: IncomingMessage,
  setLocalhost?: string | string[]
) => {
  let protocol = "https:";
  let host = req
    ? req.headers["x-forwarded-host"] || req.headers["host"]
    : window.location.host;
  if (host && host.indexOf("localhost") > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = "http:";
  }
  return {
    protocol,
    host,
    origin: protocol + "//" + host,
    url: req,
  };
};
