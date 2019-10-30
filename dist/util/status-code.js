"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCode = {
    ERROR_401(message) {
        return {
            status: {
                code: -1,
                message
            },
            data: {}
        };
    },
    ERROR_403(message) {
        return {
            status: {
                code: -1,
                message
            },
            data: {}
        };
    },
    ERROR_404(message) {
        return {
            status: {
                code: -1,
                message
            },
            data: {}
        };
    },
    ERROR_412(message) {
        return {
            status: {
                code: -1,
                message
            },
            data: {}
        };
    },
    SUCCESS_200(message, options) {
        return {
            status: {
                code: 0,
                message
            },
            data: Object.assign({}, options)
        };
    }
};
//# sourceMappingURL=status-code.js.map