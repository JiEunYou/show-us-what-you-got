import GitHubService from "./github";
import Http from "./../helpers/http";
import sinon from "sinon";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinonAsPromised from "sinon-as-promised";

let should = chai.should();

chai.use(chaiAsPromised);

describe("github service", () => {
    const baseGitHubUrl = "https://api.github.com/";

    let gitHubService;
    let http;
    let httpGetStub;

    const organisationId = "facebook";

    const getUsersResponse = {
        headers: { link: '' },
        data: [
            {
                login: "one"
            },
            {
                login: "two"
            },
            {
                login: "three"
            }
        ]
    };

    const getRepositoriesResponse = {
        headers: { link: '' },
        data: [
            {
                name: "one"
            },
            {
                name: "two"
            },
            {
                name: "three"
            }
        ]
    };

    const userNames = ['one','two','three'];
    const repositories = ['one','two','three'];

    beforeEach(() => {
        http = new Http();
        httpGetStub = sinon.stub(http, 'get');
    });

    afterEach(() => {
        httpGetStub.restore();
    });

    it("should return users for organisation", (done) => {
        //Arrange
        httpGetStub.resolves(getUsersResponse);

        gitHubService = new GitHubService(baseGitHubUrl, http, "");

        //Act
        let promise = gitHubService.getUsersForOrganisation(organisationId);

        //Assert
        promise.should.eventually.deep.equal(userNames).notify(done);
    });

    it("should append authentication parameter to url", () => {
        //Arrange
        const secret = "secret";

        httpGetStub.resolves(getUsersResponse);

        gitHubService = new GitHubService(baseGitHubUrl, http, secret);

        //Act
        gitHubService.getUsersForOrganisation(organisationId);

        //Assert
        httpGetStub.getCall(0).args[0].endsWith("&access_token=" + secret).should.equal(true);
    });

    it("should prepend base url to url", () => {
        //Arrange
        const secret = "secret";

        httpGetStub.resolves(getUsersResponse);

        gitHubService = new GitHubService(baseGitHubUrl, http, secret);

        //Act
        gitHubService.getUsersForOrganisation(organisationId);

        //Assert
        httpGetStub.getCall(0).args[0].startsWith(baseGitHubUrl).should.equal(true);
    });

    it("should return repositories for user", (done) => {
        //Arrange
        httpGetStub.resolves(getRepositoriesResponse);

        gitHubService = new GitHubService(baseGitHubUrl, http, "");

        //Act
        let promise = gitHubService.getRepositoriesForUser("JiEunYou");

        //Assert
        promise.should.eventually.deep.equal(repositories).notify(done);
    });
    it("should append authentication parameter to getRepositoriesForUser url", () => {
        //Arrange
        const secret = "secret";

        httpGetStub.resolves(getUsersResponse);

        gitHubService = new GitHubService(baseGitHubUrl, http, secret);

        //Act
        gitHubService.getRepositoriesForUser("JiEunYou");

        //Assert
        httpGetStub.getCall(0).args[0].endsWith("&access_token=" + secret).should.equal(true);
    });

    it("should prepend base url to getRepositoriesForUser url", () => {
        //Arrange
        const secret = "secret";

        httpGetStub.resolves(getUsersResponse);

        gitHubService = new GitHubService(baseGitHubUrl, http, secret);

        //Act
        gitHubService.getRepositoriesForUser("JiEunYou");

        //Assert
        httpGetStub.getCall(0).args[0].startsWith(baseGitHubUrl).should.equal(true);
    });
});