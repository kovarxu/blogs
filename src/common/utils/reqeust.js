import axios from 'axios';
import qs from 'qs';

function transformResponse(data) {
  if (data.status >= 400) {
    return {
      ret: data.status,
      data: {},
      errmsg: data.statusText
    }
  }
  return data.data;
}

axios.interceptors.response.use(transformResponse);

function integrateGetParams(baseUrl, params) {
  const query = Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key] || '');
  }).join('&');
  return baseUrl + (baseUrl.indexOf('?') > 0 ? '&' : '?') + query;
}

export const get = (url, params = {}) => {
  return axios.get(integrateGetParams(url, params));
}

export const post = (url, data = {}) => {
  if (data instanceof window.FormData) {
    return axios({
      url,
      method: 'POST',
      data
    })
  }
  
  return axios({
    url,
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

