const domain = "http://localhost:8080";

export const login = (credential) => {
  const loginUrl = `${domain}/authenticate`;
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to log in");
    }

    return response.json();
  });
};

export const register = (credential) => {
  const registerUrl = `${domain}/register`;
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to register");
    }
  });
};

export const getAllItems = () => {
  const listItemsUrl = `${domain}/items`;

  return fetch(listItemsUrl).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get all items");
    }

    return response.json();
  });
};

export const getItemById = () => {
  const authToken = localStorage.getItem("authToken");
  const listItemUrl = `${domain}/item/${itemId}`;

  return fetch(listItemUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get item");
    }

    return response.json();
  });
};

export const deleteItem = (itemId) => {
  const authToken = localStorage.getItem("authToken");
  const deleteItemUrl = `${domain}/item/${itemId}`;

  return fetch(deleteItemUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to delete item");
    }
  });
};

export const modifyItem = (data) => {
  const authToken = localStorage.getItem("authToken");
  const modifyItemUrl = `${domain}/item/${itemId}`;

  return fetch(modifyItemUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: data,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to upload item");
    }
  });
};

export const uploadItem = (data) => {
  const authToken = localStorage.getItem("authToken");
  const uploadItemUrl = `${domain}/item`;

  return fetch(uploadItemUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: data,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to upload item");
    }
  });
};
