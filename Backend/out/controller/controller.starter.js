"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ControllerStarter {
    constructor(postContreoller) {
        this.postContreoller = postContreoller;
    }
    static response(res, apiResponse, status = 200) {
        res.status(status).json({
            error: apiResponse.error || false,
            message: apiResponse.message || '',
            body: apiResponse.body || {}
        });
    }
    static resArr(res, res_arr) {
        res.status(res_arr[0] || 200).json({
            error: res_arr[3] || false,
            message: res_arr[1] || '',
            body: res_arr[2] || {}
        });
    }
    run(methodName) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.postContreoller[methodName](req, res, next);
            }
            catch (e) {
                if (Array.isArray(Object(e)) && !isNaN(Number(Object(e)[0])) && String(Object(e)[0]).length === 3) {
                    let error = (String(Object(e)[0])[0] === '2') ? false : true;
                    error = (typeof Object(e)[3] === 'boolean') ? Object(e)[3] : error;
                    ControllerStarter.response(res, {
                        error: error,
                        message: Object(e)[1] || '',
                        body: Object(e)[2] || {},
                    }, Object(e)[0]);
                }
                else {
                    ControllerStarter.response(res, {
                        error: true,
                        body: Object(e),
                    }, 500);
                }
            }
        });
    }
    ;
}
exports.default = ControllerStarter;
