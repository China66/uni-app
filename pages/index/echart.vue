<template>
<view>
			<view class="navlist">
				<block v-for="(item,index) in navArr" >
					<view class="nav-item" 
						  :class="navdefault==item['id'] ? 'stringcolor':''"
						  v-on:click="navtabfn(item['id'])"
						  >{{item['name']}}
					</view>
				</block>
			</view>
			<view style="width:100%; height: 100rpx;"></view>
			
			
			<block class="section">
					<!-- 页面1 -->
					<view class="page-1" v-if="navdefault==1">
						<block v-if="content[0]"
							   v-for="(item,index) in content">
							<view class="content_text">
								<view class="itemtit">{{item['title']}}</view>
								<view class="itemcont">{{item['description']}}</view>
								<view class="itemstaut">{{item['check_status']}}</view>
							</view>
						</block>
						<block class="no_content" v-if="!content[0]">
							<view class="v-span">
								<image mode="widthFix"
								       lazy-load='true' 
								       src='../../static/none.png' />
								<text>暂无提问</text>
							</view>
							<view class="v-button">
								<image mode="widthFix"
								       lazy-load='true' 
								       src='../../static/write.png' />
								<text>去提问</text>
							</view>
						</block>
				    </view>
					<!-- page-2 -->
					<view class="page-2" v-if="navdefault==2">
						<block v-if="content[0]"
							   v-for="(item,index) in content">
							<view class="content_text">
								<view class="itemtit">{{item['title']}}</view>
								<view class="nickname">
									<image v-if="item.headimgurl"
										   class="headlogos" 
										   lazy-load='true' 
										   :src="item.headimgurl" />
									<view class="headlogo" v-else></view>
									<view class="name">{{item['nickname']}}</view>
								</view>
								<view class="itemcont">{{item['content']}}</view>
								<view class="itemnum">{{item['zan_count']}}赞同·{{item['reply_count']}}评论</view>
								<view class="itemdel" 
									  v-on:click="delfn(item['id'],index)"
									  >删除回答</view>
							</view>
						</block>
						<block class="no_content" v-if="!content[0]">
							<view class="v-span">
								<image mode="widthFix"
								       lazy-load='true' 
								       src='../../static/none.png' />
								<text>暂无回答，去问答广场回答</text>
							</view>
						</block>
					</view>
					<!-- page-3 -->
					<view class="page-3" v-if="navdefault==3">
						<block v-if="content[0]"
							   v-for="(item,index) in content">
							<view class="content_text">
								<view class="itemtit">{{item['title']}}</view>
								<view class="itemcont">{{item['description']}}</view>
								<view class="itemnum">共{{item['sum_number']}}条回答</view>
								<button class="sharefriend" 
								        v-on:click="share()" 
								        open-type="share" >
								                   分享好友
								</button>
							</view>
						</block>
						<block class="no_content" v-if="!content[0]">
							<view class="v-span">
								<image mode="widthFix"
								       lazy-load='true' 
								       src='../../static/none.png' />
								<text>暂无收藏，去问答广场收藏问题</text>
							</view>
						</block>
					</view>
					<!-- page-4 -->
					<view class="page-4" v-if="navdefault==4">
						<block v-if="content[0]"
							   v-for="(item,index) in content" >
							   {{item}}
						</block>
						<block class="no_content" wx:if="!content[0]">
							<view class="v-span">
								<image mode="widthFix" 
								       lazy-load='true' 
								       src='../../static/none.png' />
								<text>暂无消息</text>
							</view>
							<view class="v-button" 
								  v-on:click="navpage()">
								<image mode="widthFix"
								       lazy-load='true' 
								       src='../../static/write.png' />
								<text>去提问</text>
							</view>
							
						</block>
					</view>
					
					
					<!--  -->
					<block v-if="navdefault==1&&content[0]">
						<view class="nav-page"  
							  v-on:click="navpage">
							<image mode="widthFix"
							       lazy-load='true' 
							       src='../../static/write.png' />
							<text>去提问</text>		
						</view>
					</block>
					
					<block v-if="content.length>7">
						<view :class="addmores=='已经到低咯'? 'nomore': 'addmore'" 
							  v-on:click="addmore(navdefault)">{{addmores}}</view>
					</block>
			</block>
			
			
			
			
</view>
</template>



<script>
import api from '../../api';
export default {
		data() {
			return {
				navArr:[
				 		   {id:1,name:`提问`},
				 		   {id:2,name:`回答`},
				 		   {id:3,name:`收藏`},
				 		   {id:4,name:`消息`}
				],
				navdefault:1,
				page:1,
				addmores:'加载更多',
				content:[]
			}
		},
		onLoad() {
			this.requestFun(this.navdefault,this.page);
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '自定义分享标题',
		      path: '/pages/test/test?id=123'
		    }
		},
		methods: {
			// 导航栏
			navtabfn(id){
				let _that  = this;
				console.log(id)
				this.navdefault = id;
				if(id < 4){
					api.getmyAsk({
						token:'jcm',
						page:1
					},id).then(res=>{
						console.log('res',res)
						if(res.code==1){
							_that.content = res.data
						}
					}) 
				}else{ 
					_that.content = '';
				}
				_that.addmores = '加载更多';
				
		    },
			// 首次请求数据获||切换请求数据
			requestFun(tabid,page){
				uni.showLoading({title: '数据加载中',mask:true})
				api.getmyAsk({
					token:'jcm',
					page:page
				},tabid).then(res=>{
					console.log('res',res)
					if(res.code==1){
						uni.hideLoading();
						this.content = res.data;
					}
				})  
			},
			
			// 加载更多
			addmore(tabid){
				   let _that = this;
				   this.page++;
				   if(_that.addmores=='已经到低咯') return false;
				   uni.showLoading({title: '数据加载中',mask:true})
				   api.getmyAsk({
				   	token:'jcm',
				   	page:_that.page
				   },tabid).then(res=>{
				   	if(res.code==1){
						uni.hideLoading();
						if(res.data[0]){
							if(_that.page>1){
								_that.content.push.apply(_that.content,res.data);
							}else{
								_that.content = res.data;
							}
						}else{
							_that.addmores='已经到低咯'
						}
				   	}
				   })
			},
			
			// 删除
			delfn(id,index){
				   let _that = this;
				   // _that.content.splice(index,1);
				   api.delask({
					   token:'jcm',	
					   id:id
				   }).then(res=>{
					   if(res.code==1) {
						   _that.content.splice(index,1);
					   }
				   })
				   
			},
			
			//[====分享]
			share(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: "http://uniapp.dcloud.io/",
				    title: "uni-app分享",
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			}
	

			
		}
}
</script>

<style>
	/**index.wxss**/
	.userinfo {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}
	.userinfo-avatar {width: 128rpx;height: 128rpx;margin: 20rpx;border-radius: 50%;}
	.userinfo-nickname {color: #aaa;}
	.usermotto {margin-top: 200px;}
	
	
	/* selectNav */
	.navlist{background: #f4f4f4; position:fixed; top:0; width: 100%; z-index: 999;}
	.nav-item{ 
		display: inline-block; text-align: center; 
	    padding:20rpx 0; width:25%;}
	.stringcolor{ color:green;}
	
	
	/* page-1 */
	.content_text{ 
		width:90%; height: 200rpx; margin:0 auto; border-bottom: #e3e3e3 solid 1rpx;
		padding-top:38rpx; position: relative; 
	}
	.content_text .itemtit{ font-size: 33rpx; font-weight: bold; color:#262626;}
	.content_text .itemcont{ font-size: 26rpx; color:#737373;}
	.content_text .itemstaut{  
		font-size: 24rpx; color:#ffffff; background: #0280ff; display: inline-block; 
		width:95rpx; height: 43rpx; border-radius: 5rpx; text-align: center; 
		line-height: 43rpx; position: absolute; bottom: 20rpx;
	}
	.nav-page{display: flex; display: -ms-flexbox; justify-content: center; align-items: center;}
	
	
	/* page-2 */
	.page-2 .content_text{ height:310rpx;}
	.nickname{ 
		display: flex; display: -ms-flexbox; display: -webkit-flex; padding:26rpx 0;}
	.nickname .headlogo{ width: 60rpx; height: 60rpx; border-radius: 50%; background:green;}
	.nickname .headlogos{width: 60rpx; height: 60rpx; border-radius: 50%; }
	.nickname .name{ padding:10rpx 0 0 10rpx;}
	.itemdel{ 
		font-size: 24rpx; color:#ffffff; background: #0280ff; display: inline-block;
		width:107rpx; height: 37rpx; border-radius: 5rpx; text-align: center; 
		line-height: 37rpx; position: absolute; bottom: 40rpx; right: 0;
	}
	.itemnum{ 
		display: inline-block;font-size: 24rpx; position: absolute; bottom: 40rpx; color:#737373;
	}
	
	
	/* page-3 */
	.content_text .sharefriend{ 
		font-size: 24rpx; color:#ffffff; background: #0280ff; display: inline-block;
		width:107rpx; height: 37rpx; border-radius: 5rpx; text-align: center; 
		line-height: 37rpx; position: absolute; bottom: 40rpx; right: 0;
	}
	.page-3 .content_text .itemnum{ 
		display: inline-block;font-size: 24rpx; position: absolute; bottom: 40rpx; color:#737373;
	}
	
	
	/* page-4  */
	
	
	/* base style */
	.v-span,.v-button,.nav-page{ 
		display: flex; display: -ms-flex; display: -webkit-flex; 
		justify-content: center; align-items: center; margin-top:60rpx;}
	.v-span image{ width: 10%;}
	.v-span text{ padding:0 10rpx; font-size: 44rpx; color:#676767;}
	.v-button{ 
		width: 217rpx; padding:10rpx 0; background-color: #0282ff; border-radius:32rpx;
		margin:80rpx auto auto;
	}
	.v-button image{ width: 20%;}
	.v-button text{ padding:0 10rpx; font-size: 28rpx; color:#fff;}
	.nav-page image{ width: 6%;}
	.nav-page text{ padding:0 10rpx; font-size: 28rpx; color:#676767;}
	
	/* 加载addmore */
	.addmore,.nomore{
		text-align: center; width:90%; margin: 20rpx auto auto; background: #0280ff;
		font-size: 24rpx; color:#ffffff; padding:20rpx 0;
	}
	.nomore{background:#e3e3e3; color:#ffffff;}
</style>
