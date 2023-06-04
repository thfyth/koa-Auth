import { LocalEnum } from "~/enums"

export default defineNuxtRouteMiddleware(async(to, from) => {
  console.log("要去那个页面:"+to.path)
  console.log("来自那个页面:"+from.path)
  const cookie = useCookie(LocalEnum.TOKEN)
  // const token = process.client && useStorage().getItem(LocalEnum.TOKEN)
  console.log('cookie',cookie.value);
  
  if(!cookie.value && to.path != '/login') {
    console.log('重定向');
    return navigateTo('/login')
  }
})