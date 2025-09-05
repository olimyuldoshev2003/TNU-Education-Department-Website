function getToken() {
  let token: string | null = localStorage.getItem("access_token") ?? null;
  try {
    if (typeof token === "string") {
      return token;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
}

function destroyToken() {
  localStorage.removeItem("access_token");
}

export { getToken, destroyToken };
