import { OkEndpointResponse, NotOkEndpointResponse } from '../models/endpointResponseModel';
import { Response } from 'express';

export default class EndpointResponseService {
  sendOk(res: Response<any>, inputParams: any[], data: any, msg: string = '', beautyMsg?: string): void {
    try {
      const method: string = 'sendOk';
      const response: OkEndpointResponse = new OkEndpointResponse(inputParams, data, msg, beautyMsg);
      res.status(200).json(response);
    } catch (e) {
      console.error(e);
    }
  }

  sendCreated(res: Response<any>, inputParams: any[], data: any, msg: string = '', beautyMsg?: string): void {
    try {
      const method: string = 'sendCreated';

      const response: OkEndpointResponse = new OkEndpointResponse(inputParams, data, msg, beautyMsg);
      res.status(201).json(response);
    } catch (e) {
      console.error(e);
    }
  }

  sendBadRequest(res: Response<any>, inputParams: any[], data: any, msg: string = '', beautyMsg?: string): void {
    try {
      const method: string = 'sendBadRequest';

      const response: NotOkEndpointResponse = new NotOkEndpointResponse(inputParams, data, msg, beautyMsg);
      res.status(400).json(response);
    } catch (e) {
      console.error(e);
    }
  }

  sendNOk(res: Response<any>, inputParams: any[], data: any, msg: string = '', beautyMsg?: string): void {
    try {
      const method: string = 'sendNOk';

      const response: NotOkEndpointResponse = new NotOkEndpointResponse(inputParams, data, msg, beautyMsg);
      res.status(404).json(response);
    } catch (e) {
      console.error(e);
    }
  }
}
