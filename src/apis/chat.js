import { apiHelper } from '../utils/helpers'


export default {
  getChatData() {
    return apiHelper.get('/users/chatting')
  },
}