export const host =  "http://localhost:8080";

// *************Bot ******************
export const registerAIRoute = `${host}/api/auth/registerAIUser`                            
export const loginAIRoute = `${host}/api/auth/loginAIUser`  
export const getAllAIMessagesRoute = `${host}/api/messages/getAllAIMessages`                            
export const sendUserMessageRoute= `${host}/api/messages/addUserMsg`
export const getBotMessageRoute= `${host}/api/messages/getAiMsg`     


//*********** */ Real chat app *******************
export const registerRoute = `${host}/api/auth/register`                            
export const loginRoute = `${host}/api/auth/login`       
export const setAvatarRoute = `${host}/api/auth/setAvatar`                            
export const allUsersRoute = `${host}/api/auth/allUsers`                                
export const getAllMessagesRoute = `${host}/api/messages/getAllMessages`                            
export const sendMessageRoute= `${host}/api/messages/addmsg`                        

