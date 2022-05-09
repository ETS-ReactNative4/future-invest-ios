import axios from 'axios';
import { SERVER_URL, WS_SERVER_URL } from './index';

/** 현재 기기에 로그인 되어있는지 확인 **/
export function checkValidDevice(req){
    // @Query("memberUUID") memberUUID: String,
    // @Query("macAddress") macAddress: String,
    // @Header("Authorization") authorization: String
	return axios({ method: 'GET', url: SERVER_URL + `member/checkValidDevice${req.query}`, data: req.data, headers: req.header })
}

    /** 인증 여부 조회 **/
export function getIsConfirm(req){
    
    // @Query("memberUUID") memberUUID: String,
    // @Header("Authorization") authorization: String
	return axios({ method: 'GET', url: SERVER_URL + `member/isConfirm${req.query}`, data: req.data, headers: req.header })
}

export function checkOverlapId(req){
    
    // @Query("id") id: String,
    // @Header("Authorization") authorization: String = AppConfig.BASIC_TOKEN
	return axios({ method: 'GET', url: SERVER_URL + `member/signup/checkOverlapId${req.query}`, data: req.data, headers: req.header })
}

export function checkOverlapNickname(req){
    
    // @Query("nickname") id: String,
    // @Header("Authorization") authorization: String = AppConfig.BASIC_TOKEN
	return axios({ method: 'GET', url: SERVER_URL + `member/signup/checkOverlapNickname${req.query}`, data: req.data, headers: req.header })
}


export function checkOverlapPhone(req){
    
    // @Query("phone") id: String,
    // @Header("Authorization") authorization: String = AppConfig.BASIC_TOKEN
	return axios({ method: 'GET', url: SERVER_URL + `member/signup/checkOverlapPhone${req.query}`, data: req.data, headers: req.header })
}

/** 내 채팅방 리스트 조회 **/
export function getChattingRooms(req){
    
    // @Query("memberUUID") memberUUID: String,
    // @Header("Authorization") authorization: String
	return axios({ method: 'GET', url: SERVER_URL + `chatting/chattingRoom${req.query}`, data: req.data, headers: req.header })
}

/** 채팅방 초기 데이터 조회 **/
export function getChattingRoomInitData(req){
    
    // @Query("chattingRoomId") chattingRoomId: Long,
    // @Query("memberUUID") memberUUID: String,
    // @Header("Authorization") authorization: String
	return axios({ method: 'GET', url: SERVER_URL + `chatting/chattingRoom/initData${req.query}`, data: req.data, headers: req.header })
}


/** 메세지 패이징 **/
export function getChattingMessages(req){
    
    // @Query("chattingRoomId") chattingRoomId: Long,
    // @Query("lastMessageCreatedDate") lastMessageCreatedDate: Long,
    // @Query("memberUUID") memberUUID: String,
    // @Header("Authorization") accessToken: String
	return axios({ method: 'GET', url: SERVER_URL + `chatting/chattingRoom/messages${req.query}`, data: null, headers: req.header })
}


/** 메세지 검색어로 검색 **/
export function getChattingMessagesByKeyword(req){
    
    // @Query("chattingRoomId") chattingRoomId: Long,
    // @Query("keyword") searchKeyword: String,
    // @Query("lastMessageCreatedDate") lastMessageCreatedDate: Long,
    // @Query("memberUUID") memberUUID: String,
    // @Header("Authorization") accessToken: String
	return axios({ method: 'GET', url: SERVER_URL + `chatting/chattingRoom/message/search${req.query}`, data: null, headers: req.header })
}

/** 로그인 **/
export function login(req){
    
    // @Body dto: MemberLoginRequestDTO,
        // var id: String,
        // var pwd: String,
        // var macAddress: String,
        // var loginMemberType: MemberType = MemberType.GENERAL
    // @Header("Authorization") authorization: String = AppConfig.BASIC_TOKEN
    
	return axios({ method: 'POST', url: SERVER_URL + `login`, data: req.data, headers: req.header })
}

/** 로그아웃 **/
export function logout(req){
    // @Query("memberUUID") memberUUID: String,
    // @Header("Authorization") authorization: String
	return axios({ method: 'POST', url: SERVER_URL + `member/logout${req.query}`, data: null, headers: req.header })
}

/** 회원가입 **/
export function signup(req){
    
    // @Body dto: MemberSignupRequestDTO,
            // var id: String,
            // var pwd: String,
            // var type: MemberType?,
            // var name: String,
            // var nickname: String,
            // var phone: String,
            // var macAddress: String
    // @Header("Authorization") authorization: String = AppConfig.BASIC_TOKEN
	return axios({ method: 'POST', url: SERVER_URL + `member/signup`, data: req.data, headers: req.header })
}

/** 탈퇴 **/
export function withdrawal(req){
    
    // @Query("memberUUID") memberUUID: String,
    // @Header("Authorization") authorization: String
	return axios({ method: 'POST', url: SERVER_URL + `member/withdrawal${req.query}`, data: req.data, headers: req.header })
}

/** 메세지 신고 **/
export function postReportMessage(req){
    
    // @Body dto: ReportMessageRequestDTO,

    // class ReportMessageRequestDTO(
    //     val memberUUID: String,
    //     val messageId: String,
    //     val reportType: ReportType
    // )

    // @Header("Authorization") authorization: String
	return axios({ method: 'POST', url: SERVER_URL + `chatting/chattingRoom/reportMessage`, data: req.data, headers: req.header })
}


/** 파일 메세지 전송 **/
export function sendNewFileMessage(req){
    
    // @Query("chattingRoomId") chattingRoomId: Long,
    // @Query("chattingRoomType") chattingRoomType: ChattingRoomType,
    // @Query("memberUUID") memberUUID: String,
    // @Query("sendMemberType") sendMemberType: MemberType,
    // @Query("replyMessageId") replyMessageId: String?,
    // @Query("targetMemberUUID") targetMemberUUID: String?,
    // @Query("imageWidth") width: Int?,
    // @Query("imageHeight") height: Int?,
    // @Part file: MultipartBody.Part,
    // @Header("Authorization") authorization: String
	return axios({ method: 'POST', url: SERVER_URL + `chatting/chattingRoom/fileMessage${req.query}`, data: req.data, headers: req.header })
}



/** 알림 상태 변경 **/
export function putChangeAlarmStatus(req){
    
    // @Body body: BodyWithMemberUUIDRequestDTO<ChangeAlarmStatusRequestDTO>,

    // class BodyWithMemberUUIDRequestDTO<T>(
    //     @SerializedName("body") val body: T,
    //     @SerializedName("memberUUID") val memberUUID: String
    // ) 

    // @Header("Authorization") authorization: String
	return axios({ method: 'PUT', url: SERVER_URL + `member/changeAlarmStatus`, data: req.data, headers: req.header })
}

/** mac address 변경 **/
export function updateLoginDevice(req){
    
    // @Body body: BodyWithMemberUUIDRequestDTO<ChangeAlarmStatusRequestDTO>,

    // class BodyWithMemberUUIDRequestDTO<T>(
    //     @SerializedName("body") val body: T,
    //     @SerializedName("memberUUID") val memberUUID: String
    // ) 

    // @Header("Authorization") authorization: String
	return axios({ method: 'PUT', url: SERVER_URL + `member/updateLoginDevice`, data: req.data, headers: req.header })
}

/** fcm 토큰 변경 **/
export function updateFcmToken(req){
    
    // @Body body: BodyWithMemberUUIDRequestDTO<String>,
    // class BodyWithMemberUUIDRequestDTO<T>(
    //     @SerializedName("body") val body: T,
    //     @SerializedName("memberUUID") val memberUUID: String
    // ) 
    
    // @Header("Authorization") authorization: String
	return axios({ method: 'PUT', url: SERVER_URL + `token/fcmToken`, data: req.data, headers: req.header })
}

/** 채팅방 알림 상태 변경 **/
export function updateChattingRoomNotification(req){
    
    // @Body body: ChattingRoomNotificationResponseDTO,

        // val chattingRoomId: Long,
        // val memberUUID:String,
        // val isReceive: Boolean
    // @Header("Authorization") authorization: String
	return axios({ method: 'PUT', url: SERVER_URL + `chatting/chattingRoom/notification`, data: req.data, headers: req.header })
}

/** 닉네임 변경 **/
export function updateChangeNickname(req){
    
    // @Body body: BodyWithMemberUUIDRequestDTO<String>,

    // class BodyWithMemberUUIDRequestDTO<T>(
    //     @SerializedName("body") val body: T,
    //     @SerializedName("memberUUID") val memberUUID: String
    // ) 

    // @Header("Authorization") authorization: String
	return axios({ method: 'PUT', url: SERVER_URL + `member/changeNickname`, data: req.data, headers: req.header })
}

/** 프로필 사진 변경 **/
export function updateChangeImage(req){
    
    // @Part file: MultipartBody.Part,
    // @Query("memberUUID") memberUUID: String,
    // @Header("Authorization") authorization: String
	return axios({ method: 'POST', url: SERVER_URL + `member/changeImage${req.query}`, data: req.data, headers: req.header })
}


/** fcm 토큰 변경 **/
export function putChangeInfo(req){
    
    // @Body body: BodyWithMemberUUIDRequestDTO<MemberInfoChangeRequestDTO>,

    // class BodyWithMemberUUIDRequestDTO<T>(
    //     @SerializedName("body") val body: T,
    //     @SerializedName("memberUUID") val memberUUID: String
    // ) 

    // class MemberInfoChangeRequestDTO(
    // var name: String?,
    // var phone: String?,
    // var pwd: String?
    // ) 
    // @Header("Authorization") authorization: String
	return axios({ method: 'PUT', url: SERVER_URL + `member/changeInfo`, data: req.data, headers: req.header })
}