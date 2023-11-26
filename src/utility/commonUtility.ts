import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import _get from "lodash/get";

export const setSessionData = (key: any, val: any, isString: any = false) => {
  const data: any = isString ? val : JSON.stringify(val);
  sessionStorage.setItem(key, data);
};
export const getSessionData = (key: string, isString: any) => {
  const data: any = sessionStorage.getItem(key);
  return isString ? data : JSON.parse(data);
};

export const validateEmail = (value: string) => {
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const isValidEmail = emailRegex.test(value);
  if (!isValidEmail) {
    return false;
  }
  if (isValidEmail) {
    return true;
  }
};


export const displayMoney = (n: number | bigint) => {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  // or use toLocaleString()
  return format.format(n);
};

export const calculateTotal = (arr: any[]) => {
  if (!arr || arr?.length === 0) return 0;

  const total = arr.reduce((acc, val) => acc + val, 0);

  return total.toFixed(2);
};

export const priceValueCalc = (val: any, quantity: number) => {
  const unit = _get(val, "unit", "USD");
  const value = _get(val, "value", "0.00");

  return `${value * quantity} ${unit}`;
};

export const priceValueFormatter = (val: any) => {
  const unit = _get(val, "unit", "USD");
  const value = _get(val, "value", "0.00");

  return `${unit} ${value}`;
};

export const usagePeriodConverter = (val: any) => {
  dayjs.extend(relativeTime);
  return dayjs(val).fromNow(true);
};

export const deepMergeObjectSum = (obj1: any, obj2: any) => {
  return Object.keys(obj1).reduce((acc: any, key: any) => {
    if (typeof obj2[key] === "object") {
      acc[key] = deepMergeObjectSum(obj1[key], obj2[key]);
    } else if (obj2.hasOwnProperty(key) && !isNaN(parseFloat(obj2[key]))) {
      acc[key] = obj1[key] + obj2[key];
    }
    return acc;
  }, {});
};

export const deepMergeObjectSub = (obj1: any, obj2: any) => {
  return Object.keys(obj1).reduce((acc: any, key: any) => {
    if (typeof obj2[key] === "object") {
      acc[key] = deepMergeObjectSub(obj1[key], obj2[key]);
    } else if (obj2.hasOwnProperty(key) && !isNaN(parseFloat(obj2[key]))) {
      acc[key] = obj1[key] - obj2[key];
    }
    return acc;
  }, {});
};

// overflow:hidden disables the scrolling on a desktop browser
// position: fixed is additionally needed for mobile devices
export const lockBodyScroll = () => {
  document.body.setAttribute("style", "width: 100%;");
};

// overflow:visible ables the scrolling on a desktop browser
// position: static is additionally needed for mobile devices
export const unlockBodyScroll = () => {
  document.body.setAttribute("style", "overflow: visible; position: static;");
};
