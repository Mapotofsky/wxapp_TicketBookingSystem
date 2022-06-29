// pages/alterConta/alterConta.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        contactId: null,
        moa: 0,
        contactInfo: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            contactId: options.contactId,
            moa: options.ModOrAdd
        })
        // 修改，则查找联系人信息
        if (options.ModOrAdd == 0) {
            wx.cloud.database().collection('contacts').where({
                    _id: options.contactId
                }).get()
                .then(res => {
                    this.setData({
                        contactInfo: res.data[0]
                    })
                })
                .catch(res => {
                    console.log('查询失败', res)
                })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    altContact: function (e) {
        var contactId = this.data.contactId;
        var phone = e.detail.value.phone;
        var email = e.detail.value.email;
        var ident = e.detail.value.ident;
        var name = e.detail.value.name;
        var rela = e.detail.value.rela;
        if (this.data.moa == 0) {
            // 修改联系人信息
            wx.cloud.callFunction({
                    name: 'contactUpdate',
                    data: {
                        id: contactId,
                        phone: phone,
                        email: email,
                        ident: ident,
                        name: name,
                        rela: rela
                    }
                }).then(res => {
                    wx.showModal({
                        title: '更改成功！',
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                                wx.navigateBack({
                                  delta: 1,
                                })
                            }
                        }
                    })
                })
                .catch(res => {
                    console.log('更新信息失败', res)
                    wx.showToast({
                        title: '更改失败！',
                    })
                });
        } else {
            // 新增联系人
            wx.cloud.database().collection('contacts').add({
                    data: {
                        email: email,
                        ident: ident,
                        name: name,
                        phone: phone,
                        rela: rela
                    }
                }).then(res => {
                    wx.showModal({
                        title: '新增联系人成功！',
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                                wx.navigateBack({
                                  delta: 1,
                                })
                            }
                        }
                    })
                })
                .catch(res => {
                    console.log('新增联系人失败', res)
                    wx.showToast({
                        title: '新增联系人失败！',
                    })
                });
        }
    }
})