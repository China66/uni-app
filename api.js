const cdnhttp = `https://wywxapp.homekoo.com/quora_api/Root`;
export function fetch(url, params) {
  return new Promise((resolve, reject)=>{
    wx.request({
      url: url,
      data: params,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        // if (res.statusCode == 200) resolve(res.data)
		if (res.statusCode == 200) resolve(res.data)
        else typeof reject === 'function' && reject(res);
      },
      error: err => {
        typeof reject === 'function' && reject(err);
      }
    });
  })
}


//请求接口
export default {
  /* ===== 获取openid ====== */
  getmyAsk(params,tabid) {
	let httpath;
	switch(tabid){
		 case 1:
		 httpath = `${cdnhttp}/Api/Vip/myAsk.html`;
		 break;
		 case 2:
		 httpath = `${cdnhttp}/Api/Vip/myAnswer.html`;
		 break;
		 case 3:
		 httpath = `${cdnhttp}/Api/Vip/myFavorite.html`;
		 break;
		default: 
			console.log(6666666666)
		break; 
	}
    return fetch(httpath,params)
  },
  // 删除
  delask(params){
	 return fetch(`${cdnhttp}/Api/Vip/delAnswer.html`,params) 
  }
  
}