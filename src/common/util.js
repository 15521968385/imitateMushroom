// 防抖，把频繁执行的函数放到debounce
export  function debounce(func,delay){
  let timer = null;
  return (...args)=>{
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args)
    })
  }
}