export default class EndpointResponse {
  status: 'ok' | 'nok';
  params: any[];
  data: any;
  msg: string;
  beautyMsg: string | undefined;

  constructor(status: 'ok' | 'nok', params: any[], data: any, msg: string, beautyMsg?: string | undefined) {
    this.status = status;
    this.params = params;
    this.data = data;
    this.msg = msg;
    this.beautyMsg = beautyMsg;
  }
}

export class OkEndpointResponse extends EndpointResponse {
  constructor(params: any[], data: any, msg: string = '', beautyMsg?: string) {
    super('ok', params, data, msg, beautyMsg);
  }
}

export class NotOkEndpointResponse extends EndpointResponse {
  constructor(params: any[], data: any, msg: string = '', beautyMsg?: string) {
    super('nok', params, data, msg, beautyMsg);
  }
}
