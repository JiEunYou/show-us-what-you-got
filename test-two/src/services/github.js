
class GitHubService {
    constructor(baseUrl, http, apiAuthenticationToken) {
        this.baseUrl = baseUrl;
        this.http = http;
        this.apiAuthenticationToken = apiAuthenticationToken;
        this.authenticationQueryString = "";
        if (this.apiAuthenticationToken !== "") {
            this.authenticationQueryString = "access_token=" + this.apiAuthenticationToken;
        }
    }


    getPages(creatUrl, selectData) {
        let items = [];
        let p = new Promise((resolve, reject) => {
            let getPage = (page) => {
                let url = creatUrl(page);
                this.http.get(url)
                    .then((result) => {
                        result.data.forEach((item) => {
                            items.push(selectData(item));
                        });

                        if (/rel="next"/.test(result.headers.link)) {
                            getPage(page + 1);
                        } else {
                            resolve(items);
                        }
                    }).catch((err) => {
                        reject(err)
                    });
            };

            getPage(1);
        });

        return p;
    }

    getUsersForOrganisation(organisationId) {
        // GET /orgs/:org/members
        return this.getPages(
            (page) => this.baseUrl + "orgs/" + organisationId + "/members" + "?per_page=50&page=" + page + "&" + this.authenticationQueryString,
            (item) => item.login
        );
    }

    getRepositoriesForUser(userId) {
        // GET /users/:username/repos

        return this.getPages(
            (page) => this.baseUrl + "users/" + userId + "/repos" + "?per_page=50&page=" + page + "&" + this.authenticationQueryString,
            (item) => item.name
        );
    }
}

module.exports = GitHubService;