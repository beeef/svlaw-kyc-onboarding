import axios from "axios";
import moment from "moment";
import { getAccessToken } from "./jwt";

function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
}

function jsonToFormData(data) {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
}

export const getAuthTokenForFormAndPin = (formId, pincode) =>
  axios.post(
    `http://localhost:4000/kycForm/auth/${formId}?_${moment().unix()}`,
    { pincode },
    { headers: { "content-type": "application/json" }, timeout: 5000 }
  );

export const getFormDataForId = (formId) => {
  const token = getAccessToken();

  if (token != null) {
    return axios.get(
      `http://localhost:4000/kycForm/get/${formId}?_${moment().unix()}`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  }

  return null;
};

export const saveCurrentState = (formId, currentState) => {
  const token = getAccessToken();

  if (token != null) {
    return axios.post(
      `http://localhost:4000/kycForm/tmpSave/${formId}?_${moment().unix()}`,
      { currentState },
      { headers: { "content-type": "multipart/form-data" } }
    );
  }

  return null;
};
