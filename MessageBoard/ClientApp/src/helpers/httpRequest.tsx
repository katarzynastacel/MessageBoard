export const MakeGetRequest = (url: string, token: string) => {
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
};

export const MakePostRequest = (url: string, data: any) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
