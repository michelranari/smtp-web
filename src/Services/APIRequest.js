import axios from 'axios';
import React, { Component } from 'react';

class APIRequest {

  constructor() {
    let axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    });
    axiosInstance.interceptors.response.use(this.handleResponseSuccess, this.handleResponseError);
    axiosInstance.interceptors.request.use(request => this.requestHandler(request));
    this.axiosInstance = axiosInstance;
    this.requestHandler = this.requestHandler.bind(this);
  }

  // check if handler request is enabled
  isHandlerEnabled = (config={}) => {
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? false : true
  }

  // request handler
  // add Token if handler token is enabled
  async requestHandler(request){
    if (this.isHandlerEnabled(request)) {
      const token  = await localStorage.getItem('token');
      request.headers['Authorization'] = "Bearer " + token
    }
    return request
  }

  //  response success handler
  handleResponseSuccess(response) {
    console.log("response status : " + response.status);
    return response;
  }

  // response error handler
  handleResponseError = (error) => {
    console.log(error)
    return error
  }

  // set config to true to enable requestHandler
  async get(path, callback, config) {
    return await this.axiosInstance.get(path,{ handlerEnabled: config }).then(
      (response) => callback(response.status, response.data)
    );
  }

  // set config to true to enable handler
  // url example : /camionneurs
  async post(path, payload, callback, config) {
    return await this.axiosInstance.request({
      method: 'POST',
      url: path,
      data: payload,
      handlerEnabled: config
    }).then((response) => callback(response.status,response.data));
  }

  // set config to true to enable handler
  async patch(path, payload, callback, config) {
    return await this.axiosInstance.request({
      method: 'PATCH',
      url: path,
      data: payload,
      handlerEnabled: config
    }).then((response) => callback(response.status, response.data))
  }

}

export default new APIRequest;
