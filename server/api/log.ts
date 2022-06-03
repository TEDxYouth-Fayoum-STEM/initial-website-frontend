import { useCookie, setCookie } from "h3";

export default defineEventHandler(async ({ req, res }) => {
  const config = useRuntimeConfig();
  if (config.log === "1") {
    let cookie = useCookie(req, "_id");
    try {
      if (!cookie) {
        const response = await $fetch<{ cookie: string }>(
          `${config.public.apiUrl}/logs/cookie`,
          {
            method: "POST",
            body: {
              pwd: config.logPwd,
            },
          }
        );
        cookie = response.cookie;
        // @ts-expect-error The attribute is thought as to be not optimal
        setCookie(res, "_id", cookie, {
          expires: new Date(Date.now() + 6 * 30 * 24 * 60 * 60),
          path: "/",
          httpOnly: true,
          secure: true,
        });
      }
      await $fetch(`${config.public.apiUrl}/logs/log`, {
        method: "POST",
        body: {
          pwd: config.logPwd,
          ip: req.socket.remoteAddress || "0.0.0.0",
          cookie,
          path: req.originalUrl,
          timestamp: Date.now(),
          headers: req.headers,
        },
      });
    } catch (error) {}
  }
  return true;
});
