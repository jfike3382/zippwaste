const serializeCookie = (name, value, options = {}) => {
  const opts = {
    secure: true,
    sameSite: "Strict",
    expires: 365,
    ...options,
  };

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  const date = new Date();
  date.setTime(date.getTime() + opts.expires * 24 * 60 * 60 * 1000);
  cookieString += `; expires=${date.toUTCString()}`;

  if (opts.path) cookieString += `; path=${opts.path}`;
  if (opts.domain) cookieString += `; domain=${opts.domain}`;
  if (opts.secure) cookieString += "; secure";
  if (opts.httpOnly) cookieString += "; httpOnly";
  if (opts.sameSite) cookieString += `; samesite=${opts.sameSite}`;

  return cookieString;
};

export const setCookie = (name, value, options = {}) => {
  document.cookie = serializeCookie(name, value, options);
};

export const getCookie = (name) => {
  const nameEQ = encodeURIComponent(name) + "=";
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    let c = cookie.trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
};

export const removeCookie = (name, options = {}) => {
  setCookie(name, "", { ...options, expires: new Date(0) });
};

export const setAuthCookies = (user, auth_token) => {
  const authPaths = ["/login", "/forgot-password", "/register"];
  const currentPath = window.location.pathname;

  setCookie("auth_token", auth_token);
  setCookie("user_email", user.email);
  setCookie("user_pricing_plan", user.pricing_plan);
  setCookie("user_zip_codes", user.zip_codes);
  setCookie("user_logo", user.logo?.url || "");
  if (user.company_page) {
    setCookie("user_company", user.company_page);
  }
  window.location.href = authPaths.includes(currentPath) ? "/" : currentPath;
};

export const logout = () => {
  removeCookie("auth_token");
  removeCookie("user_email");
  removeCookie("user_pricing_plan");
  removeCookie("user_zip_codes");
  removeCookie("user_logo");
  removeCookie("user_company");
  window.location.href = "/";
};
