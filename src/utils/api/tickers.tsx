import axios, {AxiosResponse} from 'axios'
const API_KEY = '&apiKey=WOkhqpUAOE3pRxoUDxx5EWnjzSbk4TJm'
const BASE_URL = 'https://api.polygon.io/'
const instance = axios.create ({baseURL: BASE_URL})
const workingDay = () =>{
    if(new Date().getDay()===0) return new Date(Date.now()-86400000*2).toISOString().split('T')[0];
    else if(new Date().getDay()===1) return new Date(Date.now()-86400000*3).toISOString().split('T')[0];
    else return new Date(Date.now()-86400000).toISOString().split('T')[0] ;
}
const DATE = `/${workingDay()}?`

export const searchTickers = async(params: string): Promise<AxiosResponse> => {
    const result =  await instance.get('v2/reference/tickers?&search=' + params + API_KEY);
    return result;
}

export const gettingAmount = async(params: string): Promise<AxiosResponse> => {
    const result = await instance.get('v1/open-close/' + params + DATE + API_KEY);
    return result.data;
}

export const gettingTickerParams = async(params: string): Promise<AxiosResponse> => {
    const result =  await instance.get('v1/meta/symbols/' + params + '/company?' + API_KEY);
    return result.data;
}
