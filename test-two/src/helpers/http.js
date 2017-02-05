import request from "request";

class Http {
    constructor(overrideRequest) {
        this.request = overrideRequest || request;
    }

    get(url) {
        let requestOptions = {
            url,
            headers: {
                "User-Agent": "request"
            }
        };     

        return new Promise((resolve, reject) => {
            this.request.get(requestOptions, (error, response, body) => {
                
                let result = {
                    headers: response.headers,
                    data: JSON.parse(body),                   
                };

                if (!error && response.statusCode == 200) {
                    resolve(result);
                } else {
                    reject(JSON.stringify(response));
                }
            });
        });
    }
}

module.exports = Http;