const app = getApp(); 
Page({
    data: {
      cardCur: 0,
      swiperList: [{
        id: 0,
        type: 'image',
        url: 'http://m.qpic.cn/psc?/V53hu6fq2h5K1y3Lmdmv0m0XR93szpDC/45NBuzDIW489QBoVep5mcY3U4*Gv6pEiMJSUyXuqY5MnRXcqUkAWA.du6V8uGQ7Rg5OK.UWFyNbn3YfLb55ts*QnGRjWEQvaObe8TWvtzRs!/b&bo=VAY4BAAAAAABF14!&rf=viewer_4'
      }, {
        id: 1,
          type: 'image',
          url: 'http://m.qpic.cn/psc?/V53hu6fq2h5K1y3Lmdmv0m0XR93szpDC/45NBuzDIW489QBoVep5mcY3U4*Gv6pEiMJSUyXuqY5MA*b*ZD3GQEZWC0IimRHBLhwxc8kfag1bHTstjaXK10jja7jJXfJrfqGvQ*PVmQs8!/b&bo=OAToAgAAAAABF.Y!&rf=viewer_4',
      }, {
        id: 2,
        type: 'image',
        url: 'http://m.qpic.cn/psc?/V53hu6fq2h5K1y3Lmdmv0m0XR93szpDC/45NBuzDIW489QBoVep5mcY3U4*Gv6pEiMJSUyXuqY5PSRrJahx41nhPpO71E1oP9EoaS9inzdnH9YZAeDRgXrpx4KhFADXl0qIkDPwhFdds!/b&bo=gAc4BAAAAAABJ7s!&rf=viewer_4'
      }, {
        id: 3,
        type: 'image',
        url: 'http://m.qpic.cn/psc?/V53hu6fq2h5K1y3Lmdmv0m0XR93szpDC/45NBuzDIW489QBoVep5mcY3U4*Gv6pEiMJSUyXuqY5M*kvcNQ5TOgrQYbBFrPZnaV7fTrLIvbvEhyjRqK5u9WQlcSruEvF8hQeqEt*UpmUg!/b&bo=oAU4BAAAAAABJ5k!&rf=viewer_4'
      }, {
        id: 4,
        type: 'image',
        url: 'http://m.qpic.cn/psc?/V53hu6fq2h5K1y3Lmdmv0m0XR93szpDC/45NBuzDIW489QBoVep5mcQqY.FREplW9VUsBqzv9WibAKwERr4LzEcVybL2Gv3VRO*lBMRsqvdHDCeny4zppnfSUM5Bko1*YqCEAurh97lE!/b&bo=gAc4BAAAAAABF4s!&rf=viewer_4'
      }, {
        id: 5,
        type: 'image',
        url: 'http://m.qpic.cn/psc?/V53hu6fq2h5K1y3Lmdmv0m0XR93szpDC/45NBuzDIW489QBoVep5mcQqY.FREplW9VUsBqzv9Wib4i0p8JVwCLnLWaOXR1tAewQH.NRA10GcpgSZ0kpzkVaBcHEvX285YauhZiXxmAi8!/b&bo=VAY4BAAAAAABN34!&rf=viewer_4'
      }, {
        id: 6,
        type: 'image',
        url: 'http://m.qpic.cn/psc?/V53hu6fq2h5K1y3Lmdmv0m0XR93szpDC/45NBuzDIW489QBoVep5mcQqY.FREplW9VUsBqzv9WiaC4vXSG8C4.aMDXSBVP5r1Zhq.zKa5jUmBycI7SvYAQmSAaRfrXnI3V5eiD9cMSmI!/b&bo=gAc4BAAAAAABN6s!&rf=viewer_4'
      }]
    },
    onLoad() {
      this.towerSwiper('swiperList');
      this.setData({
        canIUseGetUserProfile: wx.getUserProfile ? true : false
      })

      // this.setData({
      //   userInfo:user
      // })
      let that = this;
      app.logincallback = () => {
        let localData = app.getLocalUserData();
        that.setData({ ...localData });
      };
      // 初始化towerSwiper 传已有的数组名即可
    },
    //     // 手动获取用户数据
    // // 如果用户已经授权过，则不会再弹出授权窗口，直接获取到信息
    // bindGetUserInfo(e) {
    //   let that = this;
    //   auth.updateUserInfo(e, () => {
    //     let localData = app.getLocalUserData();
    //     that.setData({ ...localData });
    //   });
    // },

    // // 获取用户手机号码
    // bindGetPhoneNumber(e) {
    //   let that = this;
    //   auth.updatePhoneNumber(e, () => {
    //     let localData = app.getLocalUserData();
    //     that.setData({ ...localData });
    //   });
    // },
    // kindToggle(e) {
    //   var id = e.currentTarget.id,
    //     list = this.data.list;
    //   for (var i = 0, len = list.length; i < len; ++i) {
    //     if (list[i].id == id) {
    //       list[i].open = !list[i].open;
    //     } else {
    //       list[i].open = false;
    //     }
    //   }
    //   this.setData({
    //     list: list,
    //   });
    // },

    // onDeleteUser() {
    //   let that = this;
    //   auth.deleteUserInfo(() => {
    //     let localData = app.getLocalUserData();
    //     that.setData({ ...localData });
    //   });
    // },

    DotStyle(e) {
      this.setData({
        DotStyle: e.detail.value
      })
    },
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    // towerSwiper
    // 初始化towerSwiper
    towerSwiper(name) {
      let list = this.data[name];
      for (let i = 0; i < list.length; i++) {
        list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
        list[i].mLeft = i - parseInt(list.length / 2)
      }
      this.setData({
        swiperList: list
      })
    },
    // towerSwiper触摸开始
    towerStart(e) {
      this.setData({
        towerStart: e.touches[0].pageX
      })
    },
    // towerSwiper计算方向
    towerMove(e) {
      this.setData({
        direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
      })
    },
    // towerSwiper计算滚动
    towerEnd(e) {
      let direction = this.data.direction;
      let list = this.data.swiperList;
      if (direction == 'right') {
        let mLeft = list[0].mLeft;
        let zIndex = list[0].zIndex;
        for (let i = 1; i < list.length; i++) {
          list[i - 1].mLeft = list[i].mLeft
          list[i - 1].zIndex = list[i].zIndex
        }
        list[list.length - 1].mLeft = mLeft;
        list[list.length - 1].zIndex = zIndex;
        this.setData({
          swiperList: list
        })
      } else {
        let mLeft = list[list.length - 1].mLeft;
        let zIndex = list[list.length - 1].zIndex;
        for (let i = list.length - 1; i > 0; i--) {
          list[i].mLeft = list[i - 1].mLeft
          list[i].zIndex = list[i - 1].zIndex
        }
        list[0].mLeft = mLeft;
        list[0].zIndex = zIndex;
        this.setData({
          swiperList: list
        })
      }
    },
    userlogin(){
      wx.getUserProfile({
        desc: '用于用户信息展示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
              this.setData({
                userId: res.result.openid
              })
              // 用户登录
              var openid = this.data.userId
              var nickName = this.data.userInfo.nickName
              var gender = this.data.userInfo.gender
              var language = this.data.userInfo.language
              var avatar = this.data.userInfo.avatarUrl
              wx.cloud.database().collection('users').where({
                _openid: openid
              }).get({
                success: res => {
                  wx.setStorageSync('user', 1)
                  wx.setStorageSync('userId', openid)
                  if (res.data.length == 0){
                    wx.cloud.database().collection('users').add({
                      data: {
                          nickName: nickName,
                          gender: gender,
                          language: language,
                          avatar: avatar
                      }
                  })
                  }
                  app.globalData.userInfo=this.data.userInfo
                }
              })
            }
          })
        }
      })

      wx.setStorageSync('isLogin', true)
      wx.switchTab({
        url: '../mine/mine',
        fail:function(){
          console.log("跳转失败")
        }
      })
    },
    adminlogin(){
      wx.setStorageSync('user', 0)
      wx.setStorageSync('userId', null)
      wx.setStorageSync('isLogin', false)
      wx.switchTab({
        url: '../mine/mine',
        fail:function(){
          console.log("跳转失败")
        }
      })
    },
  })