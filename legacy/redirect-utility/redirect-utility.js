// ⚠️ This utility is no longer necessary as Webflow Optimize now supports redirect UTMs natively.
// Please use the built-in redirect feature in the platform instead.

(() => {
  window.wfTools = window.wfTools || {};

  const parseUrlParams = (override) => {
    const domParser = new DOMParser();
    const decode = (value) => {
      try {
        const decodedValue = decodeURIComponent(value);
        return decodedValue.length === value.length
          ? decodedValue
          : decode(decodedValue);
      } catch {
        return value;
      }
    };

    const sanitize = (name, value) => {
      const decodedValue = decode(value);
      const dom = domParser.parseFromString(
        `<!doctype html><body>${decodedValue}</body>`,
        "text/html"
      );
      if (dom.body.childElementCount > 0) {
        window.intellimize.log(
          `[url-params] unsafe url param |${name}| with value |${value}|${decodedValue}| generated ${dom.body.childElementCount} elements`,
          4
        );
        return "";
      }
      return [...dom.body.childNodes]
        .filter((node) => node.constructor.name === "Text")
        .map((node) => node.textContent || "")
        .join("");
    };

    const params = {};
    const valueToParse = override || window.location.search;
    if (!valueToParse) return params;

    valueToParse
      .slice(1)
      .split("&")
      .forEach((param) => {
        const [key, value = ""] = param.split("=");
        const safeValue = sanitize(key, value);
        if (!params[key]) params[key] = [];
        params[key].push(safeValue);
      });

    return params;
  };

  const redirectTo = (targetURL) => {
    const params = parseUrlParams();
    const keys = Object.keys(params);
    let newURL = targetURL;

    document.querySelector("html").classList.add("i-hide");
    keys.forEach((key, i) => {
      const separator = i > 0 || targetURL.includes("?") ? "&" : "?";
      newURL += separator + `${key}=${params[key][0]}`;
    });

    return newURL;
  };

  window.wfTools.redirectTo = redirectTo;
})();
