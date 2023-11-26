import axios from "axios";
import _ from "lodash";
import validators from "../constants/validators";
import { setSessionData } from "../utility/commonUtility";
import config from "../config";
const {
  base_url,
  apiConfig: { universalCountries },
} = config;

export const getUserInfo = (user: any) => {
  const encPassword = Buffer.from(user.password).toString("base64");

  const payload = {
    email: _.get(user, "email", ""),
    password: encPassword,
  };

  return axios.post(`${base_url}/login`, payload)
    .then((res: any) => {
      if (_.get(res, "data.status") === validators.success) {
        const status = _.get(res, "data.status");
        const user = _.get(res, "data[_doc]");
        const userInfo = { status, user };

        setSessionData(validators.userInfo, userInfo);
        return validators.success;
      } else {
        return validators.failed;
      }
    })
    .catch((err: any) => console.log(err));
};

export const registerUser = (payload: { password: string; }) => {
  const encPassword = new Buffer(payload.password).toString("base64");
  payload.password = encPassword;

  return axios.post(`${base_url}/login/customerRegistration`, payload)
    .then((res: any) => {
      if (_.get(res, "data.status") === validators.success) {
        return _.get(res, "data.status");
      } else {
        return validators.failed;
      }
    })
    .catch((err: any) => {
      console.log(err);
      return validators.failed;
    });
};

export const duplicateEmailAddressValidate = (email: any) => {
  return axios.get(`${base_url}/login/customerRegistration/${email}`)
    .then((res: any) => {
      if (_.get(res, "data.status") === validators.passed) {
        return _.get(res, "data.status");
      } else {
        return validators.failed;
      }
    })
    .catch((err: { status: any; }) => {
      console.log("err", err.status);
      return validators.failed;
    });
};

export const fetchProductOfferings = () => {
  const url = `${base_url}/home`;

  return axios.get(url)
    .then((res: any) => {
      if (_.get(res, "data.status") === validators.success) {
        return _.get(res, "data.products");
      } else {
        return [];
      }
    })
    .catch((err: { status: any; }) => {
      console.log("err", err.status);
      return validators.failed;
    });
};

export const addProduct = (payload: any) => {
  const url = `${base_url}/profile/addProduct`;

  return axios.post(url, payload)
  .then((res: any) => {
    if (_.get(res, "data.status") === validators.success) {
      return _.get(res, "data.status");
    } else {
      return validators.failed;
    }
  })
  .catch((err: any) => {
    console.log(err);
    return validators.failed;
  });
}

export const productsCheckout = (payload: any) => {
  const url = `${base_url}/stripe/create-checkout-session`;
  return axios.post(url, payload)
  .then((res: any) => {
    if (_.get(res, "data.url")) {
      return _.get(res, "data");
    } else {
      return validators.failed;
    }
  })
  .catch((err: any) => {
    console.log(err);
    return validators.failed;
  });
}

export const fetchCountries = async () => {
  const url = `${universalCountries.href}/countries/`;

  const res: any = await restAPI_GET_METHOD(url);
  return res.data;
};

export const fetchStates = async (countryName: any) => {
  const url = `${universalCountries.href}/states/${countryName}`;

  const res: any = await restAPI_GET_METHOD(url);
  return res.data;
};

export const fetchCities = async (stateName: any) => {
  const url = `${universalCountries.href}/cities/${stateName}`;

  const res: any = await restAPI_GET_METHOD(url);
  return res.data;
};

const getAccessTokenForCountriesAPI = async () => {
  const accessToken =
    "Rhs-l67TVu51nFNZ8JB2sq0X9u9HsDo7y1CHWGiXU0fgwNtG1JBoCm7KSdqzhCv-exQ";
  const method = "GET";
  const headers = {
    "api-token": accessToken,
    Accept: "application/json",
    "user-email": "contactshadman@gmail.com",
  };
  const request = { method, headers };

  const res = await fetch(`${universalCountries.href}/getaccesstoken`, request)
    .then((res) => res.json())
    .catch((e) => console.log(e));

  return res.auth_token;
};

const restAPI_GET_METHOD = async (url: RequestInfo | URL) => {
  const auth_token = await getAccessTokenForCountriesAPI();

  const method = "GET";
  const headers = {
    Authorization: `Bearer ${auth_token}`,
    Accept: "application/json",
  };
  const request = { method, headers };

  try {
    let res = await fetch(url, request);
    let response: any = {};

    if (res.status >= 200 && res.status <= 299) {
      response.data = res.json();
      return response;
    } else {
      return response;
    }
  } catch (e) {
    return e;
  }
};
