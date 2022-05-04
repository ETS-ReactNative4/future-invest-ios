import axios from 'axios';
import { SERVER_URL, WS_SERVER_URL } from './index';

// create, (detail, list), update, delete, 
export function postRefreshToken(req){
    // @Body dto: MemberUUIDRequestDTO,
        // val uuid: String
    // @Header("Authorization") authorization: String //
	return axios({ method: 'POST', url: SERVER_URL + `token/refresh`, data: req.data, headers: req.header })
}

export function getCurrentServerTime(req){

    // @Header("Authorization") authorization: String
	return axios({ method: 'GET', url: SERVER_URL + `currentTime`, data: null, headers: req.header })
}
