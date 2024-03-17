import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";


export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/round",
  }),
  logout: handleLogout({
    returnTo: "/",
  }),
  signup: handleLogin({
    authorizationParams: {
      screen_hint: "signup",
    },
    returnTo: "/round",
  }),
});