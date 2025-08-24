export default function createApiClient(baseURL) {
  return async function apiRequest(
    endpoint,
    method,
    body,
    requireAuth = false,
    customHeaders = {}
  ) {
    try {
      let authToken = "";

      if (requireAuth) {
        if (typeof window === "undefined") {
          try {
            const nextCookies = await import("next/headers");
            const cookieStore = await nextCookies.cookies();
            authToken = cookieStore.get("auth_token")?.value || "";
          } catch (e) {}
        }

        if (!authToken && typeof window !== "undefined") {
          try {
            const clientCookies = await import("@/utils/cookies");
            authToken = clientCookies.getCookie("auth_token") || "";
          } catch (e) {}
        }
      }

      let requestBody = body;
      let isFormData = false;

      if (body && typeof body === "object" && !(body instanceof FormData)) {
        const hasFile = Object.values(body).some(
          (value) => value instanceof File
        );
        if (hasFile) {
          const formData = new FormData();
          Object.entries(body).forEach(([key, value]) => {
            formData.append(key, value);
          });
          requestBody = formData;
          isFormData = true;
        }
      }

      const headers = {
        ...customHeaders,
      };

      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      if (requireAuth && authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      } else if (requireAuth && !authToken) {
      }

      const response = await fetch(`${baseURL}/${endpoint}`, {
        method,
        headers,
        body: requestBody
          ? isFormData
            ? requestBody
            : JSON.stringify(requestBody)
          : null,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || `HTTP Error: ${response.status}`);
      }

      return data;
    } catch (error) {
      return { error: error.message };
    }
  };
}
