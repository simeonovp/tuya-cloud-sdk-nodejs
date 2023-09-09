const TuyaCloudSDKException = require("../exception/tuya_cloud_sdk_exception");

class ApiFileRequest {

    constructor() {

    }

    getRequestUrl() {
        throw new TuyaCloudSDKException("", 'please overwrite getRequestUrl method');
    }

    getOutStream() {
        throw new TuyaCloudSDKException("", 'please overwrite getRequestMethod method');
    }
}

module.exports = ApiFileRequest