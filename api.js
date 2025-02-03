import axios from "axios";
import fs from "fs";
import FormData from "form-data"

let data = new FormData();
data.append('name', 'MIZUKI');
data.append('symbol', 'MIZUKI');
data.append('description', 'Mizuki Ninja Mom with a neiro and a cat');
data.append('twitter', 'https://x.com/MizukiOnETH');
data.append('telegram', 'https://t.me/MizukiOnETH');
data.append('website', 'https://mizukimom.com');
data.append('showName', 'true');
data.append('file', fs.createReadStream('./logo.jpg'));

console.log('log->header', data.getHeaders())

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://pump.fun/api/ipfs',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});