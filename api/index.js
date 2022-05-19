

// const notification_chatting_room_notify_id: (toInt: Int?) -> Int = {
//     100000 + (it ?: -1)
// }
export const SERVER_URL = "http://3.38.20.168:8080/" // aws ec2 instance
export const WS_SERVER_URL = "ws://172.31.98.151/websocket/invest"
// export const WS_SERVER_URL = "ws://3.38.20.168:8080/websocket/invest"
//    const val SERVER_URL = "http://172.31.98.147:8080/" // my local
//    const val WS_SERVER_URL = "ws://172.31.98.147:8080/websocket/invest"
// api 실패 시 재시도 텀
export const API_RECONNECT_TIME = `300L`
export const BASIC_TOKEN = "Basic ZnV0dXJlaW52ZXN0OmZ1dHVyZXBhc3N3b3Jk"
export const DEFAULT_PAGE_SIZE = 10
export const MESSAGE_DEFAULT_PAGE_SIZE = 20
