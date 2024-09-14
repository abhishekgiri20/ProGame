import { parseCookies } from "nookies";
import superagent from "superagent";
const APIROOT = "https://master.project.henceforthsolutions.com:3000/"

let token: any = null;

const tokenPlugin = (req: any) => {
  let cookies = parseCookies()
  if(cookies.accessToken){
    req.set('Authorization', `Bearer ${cookies.accessToken}`);

  }
}

const responseBody = (res: any) => res.body;

const requests = {
    get : (url:string) => superagent.get(`${APIROOT}${url}`).use(tokenPlugin).then(responseBody),
    post: (url:string, body :any) => superagent.post(`${APIROOT}${url}`, body).use(tokenPlugin).then(responseBody),
}

const Auth = {
   login: (info: any) => requests.post("signin",info),
   signUp: (info: any) => requests.post("signup",info),
  }

  const user = {
    getUserList: () => requests.get("chat/users?sort_by=Newest&pagination=0&limit=5")
  }



const henceforthApi = {
    Auth,
    token,
    requests,
    user
}


export default henceforthApi;