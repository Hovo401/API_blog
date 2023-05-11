import { Request, Response } from "express"

type apiResponse = {
    status?: number;
    message?: string;
    error?: boolean;
    body?: Object;
}
type resArrType = [status: number, message?: string, body?: object, error?: boolean];


export default class ControllerStarter {
    public postContreoller: any;
    constructor(postContreoller: any) {
        this.postContreoller = postContreoller;
    }

    static response(res: Response, apiResponse: apiResponse, status: number = 200) {
        res.status(status).json({
            error: apiResponse.error || false,
            message: apiResponse.message || '',
            body: apiResponse.body || {}
        });
    }
    static resArr(res: Response, res_arr: resArrType) {
        res.status(res_arr[0] || 200).json({
            error: res_arr[3] || false,
            message: res_arr[1] || '',
            body: res_arr[2] || {}
        });
    }

    run<T>(methodName: keyof T) {
        return async (req: Request, res: Response, next: any) => {
            try {
                await this.postContreoller[methodName](req, res, next);
            } catch (e: resArrType | unknown) {
                if (Array.isArray(Object(e)) && !isNaN(Number(Object(e)[0])) && String(Object(e)[0]).length === 3) {
                    let error = (String(Object(e)[0])[0] === '2')? false : true;
                    error = (typeof Object(e)[3] === 'boolean')? Object(e)[3] : error;

                    ControllerStarter.response(res, {
                        error: error,
                        message: Object(e)[1] || '', 
                        body: Object(e)[2] || {},
                    }, Object(e)[0]);
                } else {
                    ControllerStarter.response(res, {
                        error: true,
                        body: Object(e),
                    }, 500);
                }
            }
        }
    };
}




