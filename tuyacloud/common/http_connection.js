const https = require('https');
const HttpMethod = require("./http_method");

/**
 * https连接请求
 */
class HttpConnection {

    /**
     *
     * @param req
     * @param callback
     * @param opt
     */
    static doRequest(req, callback, opt={}) {
        Object.assign(req, opt);
        console.log(JSON.stringify(req))
        let resp = https.request(req, function(res) {
            let data = ''
            res.on('data', (chunk) => {
                data = data + chunk.toString();
            })
            res.on('end', () => {
                callback(null, data)
            })
         }).on('error', function(err){
            callback(err, null);
        });

        if (req.method === HttpMethod.POST.getName() || req.method === HttpMethod.PUT.getName()) {
            resp.write(JSON.stringify(req.form));
        }

        resp.end();
    }

    static doFileRequest(req, stream, callback, opt={}) {
        https.get(req, response => {
            response.pipe(stream)
            response.on('end', () => {
                stream.end()
            })
            stream.on('finish', () => {
                callback(null, stream)
            })
            stream.on('error', err => {
                callback(err, null)
            })
            response.on('error', err => {
              callback(err, null)
            })
        }).on('error', err => {
            callback(err, null)
        })
    }
}
module.exports = HttpConnection;

