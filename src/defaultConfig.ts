
let  SHARECONFIG = (param) => {
    if (param == undefined) {
        param = {};
    }
    return {
        title: param.title || '',
        desc: param.desc || '',
        imageUrl: param.img || "",
        path: param.path || '/pages/index/index',
        success(res) {
            if (param.success) param.success(res);
        },
        fail(res) {
            if (param.fail) param.fail(res);
        },
        complete(res) {
            if (param.complete) param.complete(res);
        }
    }
}

// 默认配置
let defaultConfigInfo = {
    "gift_type_31_12": {
        "name": "收纳整理",
        "cfgid": "gift_type_31_12",
        "items": [
            
        ]
    },
    "ticket_type": {
        "name": "抽奖券类型",
        "cfgid": "ticket_type",
        "items": [
            {
                "itemid": "0",
                "name": "免费"
            },
            {
                "itemid": "1",
                "name": "贝壳"
            },
            {
                "itemid": "2",
                "name": "珍珠"
            }
        ]
    },
    "gift_type_31_13": {
        "name": "卫生清洁",
        "cfgid": "gift_type_31_13",
        "items": [
            
        ]
    },
    "gift_type_31_14": {
        "name": "五金工具",
        "cfgid": "gift_type_31_14",
        "items": [
            
        ]
    },
    "gift_type_31_11": {
        "name": "厨具餐饮",
        "cfgid": "gift_type_31_11",
        "items": [
            
        ]
    },
    "gift_type_22": {
        "name": "女装",
        "cfgid": "gift_type_22",
        "items": [
            {
                "itemid": "35",
                "name": "中老年女装"
            },
            {
                "itemid": "34",
                "name": "民族服饰"
            },
            {
                "itemid": "33",
                "name": "职业套装"
            },
            {
                "itemid": "32",
                "name": "大衣"
            },
            {
                "itemid": "31",
                "name": "棉衣"
            },
            {
                "itemid": "30",
                "name": "风衣"
            },
            {
                "itemid": "29",
                "name": "羽绒服"
            },
            {
                "itemid": "28",
                "name": "皮草"
            },
            {
                "itemid": "27",
                "name": "小西装"
            },
            {
                "itemid": "26",
                "name": "舞台戏服"
            },
            {
                "itemid": "24",
                "name": "婚纱"
            },
            {
                "itemid": "23",
                "name": "套头衫"
            },
            {
                "itemid": "22",
                "name": "正装裤"
            },
            {
                "itemid": "21",
                "name": "休闲裤"
            },
            {
                "itemid": "20",
                "name": "连衣裤"
            },
            {
                "itemid": "19",
                "name": "背带裤"
            },
            {
                "itemid": "18",
                "name": "牛仔裤"
            },
            {
                "itemid": "17",
                "name": "毛衣"
            },
            {
                "itemid": "16",
                "name": "针织衫"
            },
            {
                "itemid": "15",
                "name": "衬衫"
            },
            {
                "itemid": "14",
                "name": "T恤"
            },
            {
                "itemid": "13",
                "name": "旗袍"
            },
            {
                "itemid": "12",
                "name": "短裙"
            },
            {
                "itemid": "11",
                "name": "连衣裙"
            }
        ]
    },
    "gift_type_23": {
        "name": "男装",
        "cfgid": "gift_type_23",
        "items": [
            {
                "itemid": "27",
                "name": "棉衣"
            },
            {
                "itemid": "26",
                "name": "大衣"
            },
            {
                "itemid": "25",
                "name": "马甲"
            },
            {
                "itemid": "24",
                "name": "针织衫"
            },
            {
                "itemid": "23",
                "name": "毛衣"
            },
            {
                "itemid": "22",
                "name": "羽绒服"
            },
            {
                "itemid": "21",
                "name": "休闲裤"
            },
            {
                "itemid": "20",
                "name": "卫衣"
            },
            {
                "itemid": "19",
                "name": "风衣"
            },
            {
                "itemid": "18",
                "name": "Polo衫"
            },
            {
                "itemid": "17",
                "name": "背心"
            },
            {
                "itemid": "16",
                "name": "领带"
            },
            {
                "itemid": "15",
                "name": "西装"
            },
            {
                "itemid": "14",
                "name": "夹克"
            },
            {
                "itemid": "13",
                "name": "T恤"
            },
            {
                "itemid": "12",
                "name": "衬衫"
            },
            {
                "itemid": "11",
                "name": "牛仔裤"
            }
        ]
    },
    "gift_delivery": {
        "name": "奖品领取方式",
        "cfgid": "gift_delivery",
        "items": [
            {
                "itemid": "1",
                "name": "物流快递"
            },
            {
                "itemid": "0",
                "name": "即时发放"
            }
        ]
    },
    "gift_type_20": {
        "name": "运动",
        "cfgid": "gift_type_20",
        "items": [
            {
                "itemid": "26",
                "name": "麻将棋牌"
            },
            {
                "itemid": "25",
                "name": "护具"
            },
            {
                "itemid": "24",
                "name": "跳舞毯"
            },
            {
                "itemid": "23",
                "name": "高尔夫"
            },
            {
                "itemid": "22",
                "name": "乒乓球拍"
            },
            {
                "itemid": "21",
                "name": "网球拍"
            },
            {
                "itemid": "20",
                "name": "羽毛球拍"
            },
            {
                "itemid": "19",
                "name": "足球"
            },
            {
                "itemid": "18",
                "name": "篮球"
            },
            {
                "itemid": "17",
                "name": "轮滑鞋"
            },
            {
                "itemid": "16",
                "name": "游泳镜"
            },
            {
                "itemid": "15",
                "name": "自行车"
            },
            {
                "itemid": "14",
                "name": "跑步机"
            },
            {
                "itemid": "13",
                "name": "休闲板鞋"
            },
            {
                "itemid": "12",
                "name": "篮球鞋"
            },
            {
                "itemid": "11",
                "name": "跑步鞋"
            }
        ]
    },
    "gift_type_21": {
        "name": "家电",
        "cfgid": "gift_type_21",
        "items": [
            {
                "itemid": "46",
                "name": "电吹风"
            },
            {
                "itemid": "45",
                "name": "体重秤"
            },
            {
                "itemid": "44",
                "name": "足浴器"
            },
            {
                "itemid": "43",
                "name": "毛球修剪器"
            },
            {
                "itemid": "42",
                "name": "按摩椅"
            },
            {
                "itemid": "41",
                "name": "干衣机"
            },
            {
                "itemid": "40",
                "name": "电话机"
            },
            {
                "itemid": "39",
                "name": "对讲机"
            },
            {
                "itemid": "38",
                "name": "取暖器"
            },
            {
                "itemid": "36",
                "name": "加湿器"
            },
            {
                "itemid": "35",
                "name": "抽湿器"
            },
            {
                "itemid": "34",
                "name": "挂烫机"
            },
            {
                "itemid": "33",
                "name": "电风扇"
            },
            {
                "itemid": "32",
                "name": "吸尘器"
            },
            {
                "itemid": "31",
                "name": "扫地机器人"
            },
            {
                "itemid": "30",
                "name": "空气净化器"
            },
            {
                "itemid": "29",
                "name": "炖锅"
            },
            {
                "itemid": "28",
                "name": "压力锅"
            },
            {
                "itemid": "27",
                "name": "面包机"
            },
            {
                "itemid": "26",
                "name": "微波炉"
            },
            {
                "itemid": "25",
                "name": "电磁炉"
            },
            {
                "itemid": "24",
                "name": "电烤箱"
            },
            {
                "itemid": "23",
                "name": "电热水壶"
            },
            {
                "itemid": "22",
                "name": "豆浆机"
            },
            {
                "itemid": "21",
                "name": "榨汁机"
            },
            {
                "itemid": "20",
                "name": "电饭煲"
            },
            {
                "itemid": "19",
                "name": "净水器"
            },
            {
                "itemid": "18",
                "name": "热水器"
            },
            {
                "itemid": "17",
                "name": "消毒柜"
            },
            {
                "itemid": "16",
                "name": "洗碗机"
            },
            {
                "itemid": "15",
                "name": "油烟机"
            },
            {
                "itemid": "14",
                "name": "空调"
            },
            {
                "itemid": "13",
                "name": "洗衣机"
            },
            {
                "itemid": "12",
                "name": "冰箱"
            },
            {
                "itemid": "11",
                "name": "电视机"
            }
        ]
    },
    "gift_type_26": {
        "name": "母婴",
        "cfgid": "gift_type_26",
        "items": [
            {
                "itemid": "27",
                "name": "童鞋"
            },
            {
                "itemid": "26",
                "name": "童装"
            },
            {
                "itemid": "25",
                "name": "儿童玩具"
            },
            {
                "itemid": "24",
                "name": "防辐射裙"
            },
            {
                "itemid": "23",
                "name": "汽车安全座椅"
            },
            {
                "itemid": "22",
                "name": "婴童抱被"
            },
            {
                "itemid": "21",
                "name": "背带/腰凳"
            },
            {
                "itemid": "20",
                "name": "婴儿床"
            },
            {
                "itemid": "19",
                "name": "婴儿推车"
            },
            {
                "itemid": "18",
                "name": "儿童餐椅"
            },
            {
                "itemid": "17",
                "name": "儿童餐具"
            },
            {
                "itemid": "16",
                "name": "奶瓶"
            },
            {
                "itemid": "15",
                "name": "待产包"
            },
            {
                "itemid": "14",
                "name": "哺乳衣"
            },
            {
                "itemid": "13",
                "name": "孕妈装"
            },
            {
                "itemid": "12",
                "name": "辅食"
            },
            {
                "itemid": "11",
                "name": "奶粉"
            }
        ]
    },
    "checksum": "49d0c19364acbf502736cba43f8d41b6",
    "gift_type_27": {
        "name": "配饰",
        "cfgid": "gift_type_27",
        "items": [
            {
                "itemid": "23",
                "name": "首饰盒/袋"
            },
            {
                "itemid": "22",
                "name": "怀表"
            },
            {
                "itemid": "21",
                "name": "打火机"
            },
            {
                "itemid": "20",
                "name": "眼镜"
            },
            {
                "itemid": "19",
                "name": "脚饰"
            },
            {
                "itemid": "18",
                "name": "胸针"
            },
            {
                "itemid": "17",
                "name": "发饰"
            },
            {
                "itemid": "16",
                "name": "项链"
            },
            {
                "itemid": "15",
                "name": "耳环"
            },
            {
                "itemid": "14",
                "name": "戒指"
            },
            {
                "itemid": "13",
                "name": "手镯"
            },
            {
                "itemid": "12",
                "name": "手链"
            },
            {
                "itemid": "11",
                "name": "手表"
            }
        ]
    },
    "gift_type_24": {
        "name": "女鞋",
        "cfgid": "gift_type_24",
        "items": [
            {
                "itemid": "16",
                "name": "拖鞋"
            },
            {
                "itemid": "15",
                "name": "靴子"
            },
            {
                "itemid": "14",
                "name": "休闲鞋"
            },
            {
                "itemid": "13",
                "name": "运动鞋"
            },
            {
                "itemid": "12",
                "name": "高跟鞋"
            },
            {
                "itemid": "11",
                "name": "凉鞋"
            }
        ]
    },
    "gift_type_25": {
        "name": "男鞋",
        "cfgid": "gift_type_25",
        "items": [
            {
                "itemid": "17",
                "name": "靴子"
            },
            {
                "itemid": "16",
                "name": "布鞋"
            },
            {
                "itemid": "15",
                "name": "运动鞋"
            },
            {
                "itemid": "14",
                "name": "商务休闲鞋"
            },
            {
                "itemid": "13",
                "name": "皮鞋"
            },
            {
                "itemid": "12",
                "name": "拖鞋"
            },
            {
                "itemid": "11",
                "name": "凉鞋"
            }
        ]
    },
    "gift_type_28": {
        "name": "家纺",
        "cfgid": "gift_type_28",
        "items": [
            {
                "itemid": "29",
                "name": "装饰摆件"
            },
            {
                "itemid": "28",
                "name": "墙贴/墙纸"
            },
            {
                "itemid": "27",
                "name": "装饰画"
            },
            {
                "itemid": "26",
                "name": "相框"
            },
            {
                "itemid": "25",
                "name": "十字绣"
            },
            {
                "itemid": "24",
                "name": "桌布/桌垫"
            },
            {
                "itemid": "23",
                "name": "沙发垫/沙发套"
            },
            {
                "itemid": "22",
                "name": "坐垫/椅垫"
            },
            {
                "itemid": "21",
                "name": "靠枕/靠垫"
            },
            {
                "itemid": "20",
                "name": "窗帘"
            },
            {
                "itemid": "19",
                "name": "地毯"
            },
            {
                "itemid": "18",
                "name": "浴巾"
            },
            {
                "itemid": "17",
                "name": "蚊帐"
            },
            {
                "itemid": "16",
                "name": "床笠/床罩"
            },
            {
                "itemid": "15",
                "name": "毛毯"
            },
            {
                "itemid": "14",
                "name": "床垫"
            },
            {
                "itemid": "13",
                "name": "枕头/枕套"
            },
            {
                "itemid": "12",
                "name": "被套/被芯"
            },
            {
                "itemid": "11",
                "name": "床品套件"
            }
        ]
    },
    "gift_type_29": {
        "name": "户外",
        "cfgid": "gift_type_29",
        "items": [
            {
                "itemid": "13",
                "name": "户外装备"
            },
            {
                "itemid": "12",
                "name": "户外鞋袜"
            },
            {
                "itemid": "11",
                "name": "户外服装"
            }
        ]
    },
    "gift_type": {
        "name": "奖品分类",
        "cfgid": "gift_type",
        "items": [
            {
                "itemid": "31",
                "name": "家居百货"
            },
            {
                "itemid": "30",
                "name": "内衣"
            },
            {
                "itemid": "29",
                "name": "户外"
            },
            {
                "itemid": "28",
                "name": "家纺"
            },
            {
                "itemid": "27",
                "name": "配饰"
            },
            {
                "itemid": "26",
                "name": "母婴"
            },
            {
                "itemid": "25",
                "name": "男鞋"
            },
            {
                "itemid": "24",
                "name": "女鞋"
            },
            {
                "itemid": "23",
                "name": "男装"
            },
            {
                "itemid": "22",
                "name": "女装"
            },
            {
                "itemid": "21",
                "name": "家电"
            },
            {
                "itemid": "20",
                "name": "运动"
            },
            {
                "itemid": "19",
                "name": "卡券"
            },
            {
                "itemid": "18",
                "name": "乐器"
            },
            {
                "itemid": "17",
                "name": "图书"
            },
            {
                "itemid": "16",
                "name": "箱包"
            },
            {
                "itemid": "15",
                "name": "食品"
            },
            {
                "itemid": "14",
                "name": "洗护"
            },
            {
                "itemid": "13",
                "name": "美妆"
            },
            {
                "itemid": "12",
                "name": "数码"
            },
            {
                "itemid": "11",
                "name": "手机"
            }
        ]
    },
    "gift_type_30": {
        "name": "内衣",
        "cfgid": "gift_type_30",
        "items": [
            {
                "itemid": "17",
                "name": "保暖内衣"
            },
            {
                "itemid": "16",
                "name": "家居服"
            },
            {
                "itemid": "15",
                "name": "睡衣"
            },
            {
                "itemid": "14",
                "name": "袜子"
            },
            {
                "itemid": "13",
                "name": "塑身"
            },
            {
                "itemid": "12",
                "name": "内裤"
            },
            {
                "itemid": "11",
                "name": "文胸"
            }
        ]
    },
    "gift_new_level": {
        "name": "奖品成色",
        "cfgid": "gift_new_level",
        "items": [
            {
                "itemid": "100",
                "name": "全新"
            },
            {
                "itemid": "99",
                "name": "99新"
            },
            {
                "itemid": "90",
                "name": "9成新"
            },
            {
                "itemid": "80",
                "name": "8成新"
            },
            {
                "itemid": "70",
                "name": "7成新"
            }
        ]
    },
    "gift_type_11": {
        "name": "手机",
        "cfgid": "gift_type_11",
        "items": [
            {
                "itemid": "11",
                "name": "iPhone"
            },
            {
                "itemid": "12",
                "name": "小米"
            },
            {
                "itemid": "13",
                "name": "荣耀"
            },
            {
                "itemid": "14",
                "name": "华为"
            },
            {
                "itemid": "15",
                "name": "OPPO"
            },
            {
                "itemid": "16",
                "name": "vivo"
            },
            {
                "itemid": "17",
                "name": "三星"
            },
            {
                "itemid": "18",
                "name": "魅族"
            },
            {
                "itemid": "19",
                "name": "诺基亚"
            },
            {
                "itemid": "20",
                "name": "中兴"
            },
            {
                "itemid": "21",
                "name": "联想"
            },
            {
                "itemid": "22",
                "name": "努比亚"
            },
            {
                "itemid": "23",
                "name": "索尼"
            }
        ]
    },
    "banner_type": {
        "name": "轮播图类型",
        "cfgid": "banner_type",
        "items": [
            {
                "itemid": "0",
                "name": "链接"
            },
            {
                "itemid": "1",
                "name": "抽奖活动"
            },
            {
                "itemid": "2",
                "name": "奖品"
            },
            {
                "itemid": "3",
                "name": "活动"
            }
        ]
    },
    "gift_type_12": {
        "name": "数码",
        "cfgid": "gift_type_12",
        "items": [
            {
                "itemid": "26",
                "name": "台式机"
            },
            {
                "itemid": "25",
                "name": "电纸书"
            },
            {
                "itemid": "24",
                "name": "XBOX"
            },
            {
                "itemid": "23",
                "name": "投影仪"
            },
            {
                "itemid": "22",
                "name": "打印机"
            },
            {
                "itemid": "21",
                "name": "U盘"
            },
            {
                "itemid": "20",
                "name": "移动电源"
            },
            {
                "itemid": "19",
                "name": "音箱"
            },
            {
                "itemid": "18",
                "name": "耳机"
            },
            {
                "itemid": "17",
                "name": "单反相机"
            },
            {
                "itemid": "16",
                "name": "数码相机"
            },
            {
                "itemid": "15",
                "name": "路由器"
            },
            {
                "itemid": "14",
                "name": "液晶显示器"
            },
            {
                "itemid": "13",
                "name": "鼠标键盘"
            },
            {
                "itemid": "12",
                "name": "平板电脑"
            },
            {
                "itemid": "11",
                "name": "笔记本"
            }
        ]
    },
    "gift_type_31": {
        "name": "家居百货",
        "cfgid": "gift_type_31",
        "items": [
            {
                "itemid": "14",
                "name": "五金工具"
            },
            {
                "itemid": "13",
                "name": "卫生清洁"
            },
            {
                "itemid": "12",
                "name": "收纳整理"
            },
            {
                "itemid": "11",
                "name": "厨具餐饮"
            }
        ]
    },
    "gift_type_15": {
        "name": "食品",
        "cfgid": "gift_type_15",
        "items": [
            {
                "itemid": "34",
                "name": "肉制品"
            },
            {
                "itemid": "33",
                "name": "奶制品"
            },
            {
                "itemid": "32",
                "name": "饮料"
            },
            {
                "itemid": "31",
                "name": "火腿肠"
            },
            {
                "itemid": "30",
                "name": "面粉"
            },
            {
                "itemid": "29",
                "name": "方便面"
            },
            {
                "itemid": "28",
                "name": "大米"
            },
            {
                "itemid": "27",
                "name": "山茶油"
            },
            {
                "itemid": "26",
                "name": "葵花籽油"
            },
            {
                "itemid": "25",
                "name": "菜籽油"
            },
            {
                "itemid": "24",
                "name": "玉米油"
            },
            {
                "itemid": "23",
                "name": "大豆油"
            },
            {
                "itemid": "22",
                "name": "花生油"
            },
            {
                "itemid": "21",
                "name": "橄榄油"
            },
            {
                "itemid": "20",
                "name": "香槟"
            },
            {
                "itemid": "19",
                "name": "葡萄酒"
            },
            {
                "itemid": "18",
                "name": "啤酒"
            },
            {
                "itemid": "17",
                "name": "白酒"
            },
            {
                "itemid": "16",
                "name": "茶叶"
            },
            {
                "itemid": "15",
                "name": "饼干"
            },
            {
                "itemid": "14",
                "name": "糖果"
            },
            {
                "itemid": "13",
                "name": "咖啡"
            },
            {
                "itemid": "12",
                "name": "巧克力"
            },
            {
                "itemid": "11",
                "name": "坚果"
            }
        ]
    },
    "gift_type_16": {
        "name": "箱包",
        "cfgid": "gift_type_16",
        "items": [
            {
                "itemid": "19",
                "name": "手机包"
            },
            {
                "itemid": "18",
                "name": "拉杆箱"
            },
            {
                "itemid": "17",
                "name": "背包"
            },
            {
                "itemid": "16",
                "name": "旅行包"
            },
            {
                "itemid": "15",
                "name": "双肩包"
            },
            {
                "itemid": "14",
                "name": "斜挎包"
            },
            {
                "itemid": "13",
                "name": "手提包"
            },
            {
                "itemid": "12",
                "name": "单肩包"
            },
            {
                "itemid": "11",
                "name": "钱包"
            }
        ]
    },
    "gift_type_13": {
        "name": "美妆",
        "cfgid": "gift_type_13",
        "items": [
            {
                "itemid": "28",
                "name": "彩妆"
            },
            {
                "itemid": "27",
                "name": "隔离霜"
            },
            {
                "itemid": "26",
                "name": "粉底"
            },
            {
                "itemid": "25",
                "name": "爽肤水"
            },
            {
                "itemid": "24",
                "name": "精油"
            },
            {
                "itemid": "23",
                "name": "美胸"
            },
            {
                "itemid": "22",
                "name": "卸妆"
            },
            {
                "itemid": "21",
                "name": "防晒"
            },
            {
                "itemid": "20",
                "name": "洁面"
            },
            {
                "itemid": "19",
                "name": "眼霜"
            },
            {
                "itemid": "18",
                "name": "面霜"
            },
            {
                "itemid": "17",
                "name": "睫毛膏"
            },
            {
                "itemid": "16",
                "name": "香水"
            },
            {
                "itemid": "15",
                "name": "唇彩"
            },
            {
                "itemid": "14",
                "name": "眉笔"
            },
            {
                "itemid": "13",
                "name": "指甲油"
            },
            {
                "itemid": "12",
                "name": "口红"
            },
            {
                "itemid": "11",
                "name": "面膜"
            }
        ]
    },
    "gift_type_14": {
        "name": "洗护",
        "cfgid": "gift_type_14",
        "items": [
            {
                "itemid": "28",
                "name": "电子美容仪"
            },
            {
                "itemid": "27",
                "name": "卷/直发器"
            },
            {
                "itemid": "26",
                "name": "理发器"
            },
            {
                "itemid": "25",
                "name": "剃须刀"
            },
            {
                "itemid": "24",
                "name": "洗洁精"
            },
            {
                "itemid": "23",
                "name": "洗衣液/粉/皂"
            },
            {
                "itemid": "22",
                "name": "湿纸巾"
            },
            {
                "itemid": "21",
                "name": "手帕纸"
            },
            {
                "itemid": "20",
                "name": "抽纸卷纸"
            },
            {
                "itemid": "19",
                "name": "卫生巾"
            },
            {
                "itemid": "18",
                "name": "身体乳液"
            },
            {
                "itemid": "17",
                "name": "洗手液"
            },
            {
                "itemid": "16",
                "name": "香皂"
            },
            {
                "itemid": "15",
                "name": "沐浴露"
            },
            {
                "itemid": "14",
                "name": "牙刷"
            },
            {
                "itemid": "13",
                "name": "牙膏"
            },
            {
                "itemid": "12",
                "name": "护发素"
            },
            {
                "itemid": "11",
                "name": "洗发水"
            }
        ]
    },
    "gift_type_19": {
        "name": "卡券",
        "cfgid": "gift_type_19",
        "items": [
            {
                "itemid": "11",
                "name": "代金券"
            },
            {
                "itemid": "12",
                "name": "电影票"
            },
            {
                "itemid": "13",
                "name": "购物卡"
            },
            {
                "itemid": "14",
                "name": "会员卡"
            },
            {
                "itemid": "15",
                "name": "门票"
            }
        ]
    },
    "gift_type_17": {
        "name": "图书",
        "cfgid": "gift_type_17",
        "items": [
            {
                "itemid": "11",
                "name": "文艺社科"
            },
            {
                "itemid": "12",
                "name": "儿童读物"
            },
            {
                "itemid": "13",
                "name": "教育考试"
            },
            {
                "itemid": "14",
                "name": "教材教辅"
            },
            {
                "itemid": "15",
                "name": "健康生活"
            },
            {
                "itemid": "16",
                "name": "杂志期刊"
            }
        ]
    },
    "gift_type_18": {
        "name": "乐器",
        "cfgid": "gift_type_18",
        "items": [
            {
                "itemid": "29",
                "name": "三弦"
            },
            {
                "itemid": "28",
                "name": "葫芦丝"
            },
            {
                "itemid": "27",
                "name": "鼓"
            },
            {
                "itemid": "26",
                "name": "琵琶"
            },
            {
                "itemid": "25",
                "name": "笛子"
            },
            {
                "itemid": "24",
                "name": "二胡"
            },
            {
                "itemid": "23",
                "name": "古筝"
            },
            {
                "itemid": "22",
                "name": "快板"
            },
            {
                "itemid": "21",
                "name": "电子鼓"
            },
            {
                "itemid": "20",
                "name": "架子鼓"
            },
            {
                "itemid": "19",
                "name": "小号"
            },
            {
                "itemid": "18",
                "name": "萧"
            },
            {
                "itemid": "17",
                "name": "萨克斯"
            },
            {
                "itemid": "16",
                "name": "口琴"
            },
            {
                "itemid": "15",
                "name": "电贝斯"
            },
            {
                "itemid": "14",
                "name": "小提琴"
            },
            {
                "itemid": "13",
                "name": "吉他"
            },
            {
                "itemid": "12",
                "name": "电子琴"
            },
            {
                "itemid": "11",
                "name": "钢琴"
            }
        ]
    }
}

// 默认配置
let defaultConfigDict = {
    "ticket_type": {
        "0": "免费",
        "1": "贝壳",
        "2": "珍珠"
    },
    "gift_type_22": {
        "11": "连衣裙",
        "12": "短裙",
        "13": "旗袍",
        "14": "T恤",
        "15": "衬衫",
        "16": "针织衫",
        "17": "毛衣",
        "18": "牛仔裤",
        "19": "背带裤",
        "20": "连衣裤",
        "21": "休闲裤",
        "22": "正装裤",
        "23": "套头衫",
        "24": "婚纱",
        "26": "舞台戏服",
        "27": "小西装",
        "28": "皮草",
        "29": "羽绒服",
        "30": "风衣",
        "31": "棉衣",
        "32": "大衣",
        "33": "职业套装",
        "34": "民族服饰",
        "35": "中老年女装"
    },
    "gift_type_23": {
        "11": "牛仔裤",
        "12": "衬衫",
        "13": "T恤",
        "14": "夹克",
        "15": "西装",
        "16": "领带",
        "17": "背心",
        "18": "Polo衫",
        "19": "风衣",
        "20": "卫衣",
        "21": "休闲裤",
        "22": "羽绒服",
        "23": "毛衣",
        "24": "针织衫",
        "25": "马甲",
        "26": "大衣",
        "27": "棉衣"
    },
    "gift_delivery": {
        "0": "即时发放",
        "1": "物流快递"
    },
    "gift_type_20": {
        "11": "跑步鞋",
        "12": "篮球鞋",
        "13": "休闲板鞋",
        "14": "跑步机",
        "15": "自行车",
        "16": "游泳镜",
        "17": "轮滑鞋",
        "18": "篮球",
        "19": "足球",
        "20": "羽毛球拍",
        "21": "网球拍",
        "22": "乒乓球拍",
        "23": "高尔夫",
        "24": "跳舞毯",
        "25": "护具",
        "26": "麻将棋牌"
    },
    "gift_type_21": {
        "11": "电视机",
        "12": "冰箱",
        "13": "洗衣机",
        "14": "空调",
        "15": "油烟机",
        "16": "洗碗机",
        "17": "消毒柜",
        "18": "热水器",
        "19": "净水器",
        "20": "电饭煲",
        "21": "榨汁机",
        "22": "豆浆机",
        "23": "电热水壶",
        "24": "电烤箱",
        "25": "电磁炉",
        "26": "微波炉",
        "27": "面包机",
        "28": "压力锅",
        "29": "炖锅",
        "30": "空气净化器",
        "31": "扫地机器人",
        "32": "吸尘器",
        "33": "电风扇",
        "34": "挂烫机",
        "35": "抽湿器",
        "36": "加湿器",
        "38": "取暖器",
        "39": "对讲机",
        "40": "电话机",
        "41": "干衣机",
        "42": "按摩椅",
        "43": "毛球修剪器",
        "44": "足浴器",
        "45": "体重秤",
        "46": "电吹风"
    },
    "gift_type_26": {
        "11": "奶粉",
        "12": "辅食",
        "13": "孕妈装",
        "14": "哺乳衣",
        "15": "待产包",
        "16": "奶瓶",
        "17": "儿童餐具",
        "18": "儿童餐椅",
        "19": "婴儿推车",
        "20": "婴儿床",
        "21": "背带/腰凳",
        "22": "婴童抱被",
        "23": "汽车安全座椅",
        "24": "防辐射裙",
        "25": "儿童玩具",
        "26": "童装",
        "27": "童鞋"
    },
    "checksum": "743c62efa8f595b9b6592f05ab071f05",
    "gift_type_27": {
        "11": "手表",
        "12": "手链",
        "13": "手镯",
        "14": "戒指",
        "15": "耳环",
        "16": "项链",
        "17": "发饰",
        "18": "胸针",
        "19": "脚饰",
        "20": "眼镜",
        "21": "打火机",
        "22": "怀表",
        "23": "首饰盒/袋"
    },
    "gift_type_24": {
        "11": "凉鞋",
        "12": "高跟鞋",
        "13": "运动鞋",
        "14": "休闲鞋",
        "15": "靴子",
        "16": "拖鞋"
    },
    "gift_type_25": {
        "11": "凉鞋",
        "12": "拖鞋",
        "13": "皮鞋",
        "14": "商务休闲鞋",
        "15": "运动鞋",
        "16": "布鞋",
        "17": "靴子"
    },
    "gift_type_28": {
        "11": "床品套件",
        "12": "被套/被芯",
        "13": "枕头/枕套",
        "14": "床垫",
        "15": "毛毯",
        "16": "床笠/床罩",
        "17": "蚊帐",
        "18": "浴巾",
        "19": "地毯",
        "20": "窗帘",
        "21": "靠枕/靠垫",
        "22": "坐垫/椅垫",
        "23": "沙发垫/沙发套",
        "24": "桌布/桌垫",
        "25": "十字绣",
        "26": "相框",
        "27": "装饰画",
        "28": "墙贴/墙纸",
        "29": "装饰摆件"
    },
    "gift_type_29": {
        "11": "户外服装",
        "12": "户外鞋袜",
        "13": "户外装备"
    },
    "gift_type": {
        "11": "手机",
        "12": "数码",
        "13": "美妆",
        "14": "洗护",
        "15": "食品",
        "16": "箱包",
        "17": "图书",
        "18": "乐器",
        "19": "卡券",
        "20": "运动",
        "21": "家电",
        "22": "女装",
        "23": "男装",
        "24": "女鞋",
        "25": "男鞋",
        "26": "母婴",
        "27": "配饰",
        "28": "家纺",
        "29": "户外",
        "30": "内衣",
        "31": "家居百货"
    },
    "gift_type_30": {
        "11": "文胸",
        "12": "内裤",
        "13": "塑身",
        "14": "袜子",
        "15": "睡衣",
        "16": "家居服",
        "17": "保暖内衣"
    },
    "gift_new_level": {
        "70": "7成新",
        "80": "8成新",
        "90": "9成新",
        "99": "99新",
        "100": "全新"
    },
    "gift_type_11": {
        "11": "iPhone",
        "12": "小米",
        "13": "荣耀",
        "14": "华为",
        "15": "OPPO",
        "16": "vivo",
        "17": "三星",
        "18": "魅族",
        "19": "诺基亚",
        "20": "中兴",
        "21": "联想",
        "22": "努比亚",
        "23": "索尼"
    },
    "banner_type": {
        "0": "链接",
        "1": "抽奖活动",
        "2": "奖品",
        "3": "活动"
    },
    "gift_type_12": {
        "11": "笔记本",
        "12": "平板电脑",
        "13": "鼠标键盘",
        "14": "液晶显示器",
        "15": "路由器",
        "16": "数码相机",
        "17": "单反相机",
        "18": "耳机",
        "19": "音箱",
        "20": "移动电源",
        "21": "U盘",
        "22": "打印机",
        "23": "投影仪",
        "24": "XBOX",
        "25": "电纸书",
        "26": "台式机"
    },
    "gift_type_31": {
        "11": "厨具餐饮",
        "12": "收纳整理",
        "13": "卫生清洁",
        "14": "五金工具"
    },
    "gift_type_15": {
        "11": "坚果",
        "12": "巧克力",
        "13": "咖啡",
        "14": "糖果",
        "15": "饼干",
        "16": "茶叶",
        "17": "白酒",
        "18": "啤酒",
        "19": "葡萄酒",
        "20": "香槟",
        "21": "橄榄油",
        "22": "花生油",
        "23": "大豆油",
        "24": "玉米油",
        "25": "菜籽油",
        "26": "葵花籽油",
        "27": "山茶油",
        "28": "大米",
        "29": "方便面",
        "30": "面粉",
        "31": "火腿肠",
        "32": "饮料",
        "33": "奶制品",
        "34": "肉制品"
    },
    "gift_type_16": {
        "11": "钱包",
        "12": "单肩包",
        "13": "手提包",
        "14": "斜挎包",
        "15": "双肩包",
        "16": "旅行包",
        "17": "背包",
        "18": "拉杆箱",
        "19": "手机包"
    },
    "gift_type_13": {
        "11": "面膜",
        "12": "口红",
        "13": "指甲油",
        "14": "眉笔",
        "15": "唇彩",
        "16": "香水",
        "17": "睫毛膏",
        "18": "面霜",
        "19": "眼霜",
        "20": "洁面",
        "21": "防晒",
        "22": "卸妆",
        "23": "美胸",
        "24": "精油",
        "25": "爽肤水",
        "26": "粉底",
        "27": "隔离霜",
        "28": "彩妆"
    },
    "gift_type_14": {
        "11": "洗发水",
        "12": "护发素",
        "13": "牙膏",
        "14": "牙刷",
        "15": "沐浴露",
        "16": "香皂",
        "17": "洗手液",
        "18": "身体乳液",
        "19": "卫生巾",
        "20": "抽纸卷纸",
        "21": "手帕纸",
        "22": "湿纸巾",
        "23": "洗衣液/粉/皂",
        "24": "洗洁精",
        "25": "剃须刀",
        "26": "理发器",
        "27": "卷/直发器",
        "28": "电子美容仪"
    },
    "gift_type_19": {
        "11": "代金券",
        "12": "电影票",
        "13": "购物卡",
        "14": "会员卡",
        "15": "门票"
    },
    "gift_type_17": {
        "11": "文艺社科",
        "12": "儿童读物",
        "13": "教育考试",
        "14": "教材教辅",
        "15": "健康生活",
        "16": "杂志期刊"
    },
    "gift_type_18": {
        "11": "钢琴",
        "12": "电子琴",
        "13": "吉他",
        "14": "小提琴",
        "15": "电贝斯",
        "16": "口琴",
        "17": "萨克斯",
        "18": "萧",
        "19": "小号",
        "20": "架子鼓",
        "21": "电子鼓",
        "22": "快板",
        "23": "古筝",
        "24": "二胡",
        "25": "笛子",
        "26": "琵琶",
        "27": "鼓",
        "28": "葫芦丝",
        "29": "三弦"
    }
}

export default{
    SHARECONFIG,
    defaultConfigInfo,
    defaultConfigDict,
  
}