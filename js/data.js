const API_BASE = '';

const API = {
  photos: API_BASE + '/api/photos',
  likes: API_BASE + '/api/likes',
  messages: API_BASE + '/api/messages',
  featured: API_BASE + '/api/featured',
  password: API_BASE + '/api/password',
  comments: API_BASE + '/api/comments'
};

const defaultPhotos = [
  { id: 1, title: '人物肖像 · 光影定格', category: 'people', description: '镜头捕捉下的真实瞬间，自然光线与人物姿态的完美融合。', image: 'photos/people/0fd7aceead944ff6f392472d61a4287a.jpg', date: '2025-08-10' },
  { id: 2, title: '人物肖像 · 灵魂之窗', category: 'people', description: '眼神是心灵的窗户，定格下最动人的表情。', image: 'photos/people/1cdbd0b19df6d9357c4855166a6a1c2c.jpg', date: '2025-08-10' },
  { id: 3, title: '人物肖像 · 静谧时刻', category: 'people', description: '安静的瞬间，最能展现内心世界的画面。', image: 'photos/people/2ec46771fcf44f60c32cfcd94a1b9f57.jpg', date: '2025-08-10' },
  { id: 4, title: '人物肖像 · 温柔目光', category: 'people', description: '柔和的光线勾勒出温柔的轮廓。', image: 'photos/people/4a68cd9198f9e9b52fa65dd22670d14f.jpg', date: '2025-08-10' },
  { id: 5, title: '人物肖像 · 故事讲述', category: 'people', description: '每一帧都是独立的故事，邀请观者进入这个视觉世界。', image: 'photos/people/b59515f2d9a2c3f89c0f9ed146f0dcc5.jpg', date: '2025-08-10' },
  { id: 6, title: '人物肖像 · 光影交错', category: 'people', description: '光影交织中展现最真实的质感。', image: 'photos/people/d584aa78e5a6740421f99f2f344f545a.jpg', date: '2025-08-10' },
  { id: 7, title: '人物肖像 · 瞬间永恒', category: 'people', description: '用快门记录下那些转瞬即逝的美好。', image: 'photos/people/df799ff4075ce0c7e0b398c1aa049cf1.jpg', date: '2025-08-10' },

  { id: 8, title: '人文纪实 · 市井烟火', category: 'humanities', description: '市井百态间，藏着最真实的人间烟火。', image: 'photos/humanities/19573f744bd202344732c198d32dd724.jpg', date: '2025-08-10' },
  { id: 9, title: '人文纪实 · 时光剪影', category: 'humanities', description: '生活的每一帧都值得被铭记。', image: 'photos/humanities/7efe2d7e900b09bb2df80d1b1d59ccf5.jpg', date: '2025-08-10' },
  { id: 10, title: '人文纪实 · 岁月痕迹', category: 'humanities', description: '老城区的纹理记录着城市变迁的每一个印记。', image: 'photos/humanities/93cc037577755fa387618b4cfd0f2649.jpg', date: '2025-08-10' },
  { id: 11, title: '人文纪实 · 生活切片', category: 'humanities', description: '平凡日常中捕捉到的不凡瞬间。', image: 'photos/humanities/f3a65aaeb1104fabb849ef1aaaf16ddb.jpg', date: '2025-08-10' },

  { id: 12, title: '城市光影 · 夜色迷离', category: 'city', description: '霓虹灯下的城市，有着另一番风情。', image: 'photos/city/02d42027103022acbccd60db95a7f4ae.jpg', date: '2025-08-10' },
  { id: 13, title: '城市光影 · 街角光影', category: 'city', description: '阳光斜射进城市街道，投下长长的影子。', image: 'photos/city/0dd4d4b2bd658634b2338daf221c57b2.jpg', date: '2025-08-10' },
  { id: 14, title: '城市光影 · 都市脉搏', category: 'city', description: '钢筋水泥的森林中，跳动着城市的心脏。', image: 'photos/city/12dc97747125f2bb8d012b980c7ebc64.jpg', date: '2025-08-10' },
  { id: 15, title: '城市光影 · 雨后清新', category: 'city', description: '雨后的城市，一切都显得干净而明亮。', image: 'photos/city/17231200530805f0e720b4a3882c4702.jpg', date: '2025-08-10' },
  { id: 16, title: '城市光影 · 黄昏剪影', category: 'city', description: '落日余晖下的城市轮廓。', image: 'photos/city/198227d6a70e0ca12e2dd2903f09a345.jpg', date: '2025-08-10' },
  { id: 17, title: '城市光影 · 凝固瞬间', category: 'city', description: '车流与建筑构成流动的几何图案。', image: 'photos/city/2ee6839df9b89738093a871c3356602a.jpg', date: '2025-08-10' },
  { id: 18, title: '城市光影 · 高楼之间', category: 'city', description: '仰望摩天大楼，感受城市的宏大。', image: 'photos/city/39d1047a99b4612bdc1c015ead0f955f.jpg', date: '2025-08-10' },
  { id: 19, title: '城市光影 · 光与影', category: 'city', description: '建筑的几何美感与光线的完美结合。', image: 'photos/city/4eb2289a7809efb858d3ba99b8069f71.jpg', date: '2025-08-10' },
  { id: 20, title: '城市光影 · 都市脉动', category: 'city', description: '人潮涌动的十字路口，是城市最鲜活的注脚。', image: 'photos/city/663ded1bfb29d591f447e40f05d106fb.jpg', date: '2025-08-10' },
  { id: 21, title: '城市光影 · 夜色温柔', category: 'city', description: '万家灯火中，城市展现柔软的一面。', image: 'photos/city/78d8f881496978ecfe0ac3ff650f069d.jpg', date: '2025-08-10' },
  { id: 22, title: '城市光影 · 结构之美', category: 'city', description: '现代建筑的线条与结构美。', image: 'photos/city/7f50f2a1cb55e9bd7d53051bdec60846.jpg', date: '2025-08-10' },
  { id: 23, title: '城市光影 · 高架之上', category: 'city', description: '从高处俯瞰，城市如棋盘般铺开。', image: 'photos/city/81c62cc5b32192843592fe4d73cfab33.jpg', date: '2025-08-10' },
  { id: 24, title: '城市光影 · 晨雾弥漫', category: 'city', description: '清晨薄雾中的城市，恍如仙境。', image: 'photos/city/8db82a1e9c39bb39c075183900bc5d89.jpg', date: '2025-08-10' },
  { id: 25, title: '城市光影 · 光影流转', category: 'city', description: '时间在建筑立面流淌。', image: 'photos/city/9d7f05745c8311857e15896c714e97a9.jpg', date: '2025-08-10' },
  { id: 26, title: '城市光影 · 城市俯瞰', category: 'city', description: '天际线是都市最美的诗篇。', image: 'photos/city/aaf236c1b8a2e01437645e361e4fc2e0.png', date: '2025-08-10' },
  { id: 27, title: '城市光影 · 老街新貌', category: 'city', description: '历史与现代在街角相遇。', image: 'photos/city/b1a2a35912e0c8a02d87491f43573487.jpg', date: '2025-08-10' },
  { id: 28, title: '城市光影 · 阳光下的城市', category: 'city', description: '阳光洒在建筑表面，暖意融融。', image: 'photos/city/b26d22051a6d716804dab0b8f584c31b.jpg', date: '2025-08-10' },
  { id: 29, title: '城市光影 · 倒影', category: 'city', description: '水面映出的城市，虚与实之间。', image: 'photos/city/b7dd92f554e33dfa32652b43172e2cce.jpg', date: '2025-08-10' },
  { id: 30, title: '城市光影 · 霓虹闪烁', category: 'city', description: '夜生活才刚刚开始。', image: 'photos/city/cefda8b9386379a6e43b9d23c394f7cc.jpg', date: '2025-08-10' },
  { id: 31, title: '城市光影 · 街角一瞥', category: 'city', description: '不经意间捕捉到的画面，成为城市的注脚。', image: 'photos/city/cf7536dde68c198ab3eafca8eeab8214.jpg', date: '2025-08-10' },
  { id: 32, title: '城市光影 · 黄昏时分', category: 'city', description: '一天中最温柔的光线。', image: 'photos/city/d0eda2e53005c1411991b6668542967d.jpg', date: '2025-08-10' },
  { id: 33, title: '城市光影 · 玻璃幕墙', category: 'city', description: '建筑的皮肤，映着天空和云。', image: 'photos/city/d4d199c90fd8c2353e419fee92c85529.jpg', date: '2025-08-10' },
  { id: 34, title: '城市光影 · 交通脉络', category: 'city', description: '车流如血液般在城市血管中奔涌。', image: 'photos/city/dceb9eb2e665163213ad2b4a94c2818f.jpg', date: '2025-08-10' },
  { id: 35, title: '城市光影 · 城市花园', category: 'city', description: '钢筋水泥中的一抹绿意。', image: 'photos/city/e141b2ff91d936d63bd3045852d18512.jpg', date: '2025-08-10' },
  { id: 36, title: '城市光影 · 晨光熹微', category: 'city', description: '城市从沉睡中苏醒。', image: 'photos/city/e32bcea62e6a72eea854959726bc9cce.jpg', date: '2025-08-10' },
  { id: 37, title: '城市光影 · 夜幕降临', category: 'city', description: '华灯初上，城市换上了新装。', image: 'photos/city/f12b412893cfcc01736a0667c4f12968.jpg', date: '2025-08-10' },

  { id: 38, title: '野生动物 · 猎豹之眼', category: 'animal', description: '速度之王与猎物之间的对视。', image: 'photos/animal/08319eebc3baeafc99b73f3f9a8ed129.jpg', date: '2025-08-10' },
  { id: 39, title: '野生动物 · 王者风范', category: 'animal', description: '丛林之王的威严时刻。', image: 'photos/animal/0d757fc7a08651e994132df832bc6b38.jpg', date: '2025-08-10' },
  { id: 40, title: '野生动物 · 空中芭蕾', category: 'animal', description: '鸟儿展翅的瞬间，优雅而充满力量。', image: 'photos/animal/27fbe3b62c6f8e0ef25f717e9277c5d6.jpg', date: '2025-08-10' },
  { id: 41, title: '野生动物 · 温柔瞬间', category: 'animal', description: '动物世界中的温情时刻。', image: 'photos/animal/31d34b950cadcde81f9642f283a9f997.jpg', date: '2025-08-10' },
  { id: 42, title: '野生动物 · 凝视', category: 'animal', description: '与野生动物对视的那一刻。', image: 'photos/animal/62f756a04b083d38eeb6a19d8082e9d9.jpg', date: '2025-08-10' },
  { id: 43, title: '野生动物 · 水中精灵', category: 'animal', description: '水下世界的美丽生灵。', image: 'photos/animal/731baec90907c8bf5142a383dcab7e2a.jpg', date: '2025-08-10' },
  { id: 44, title: '野生动物 · 奔跑者', category: 'animal', description: '速度与力量的完美展现。', image: 'photos/animal/799af3f3ab1cd7cfbee67b9e25f58b80.jpg', date: '2025-08-10' },
  { id: 45, title: '野生动物 · 林间漫步', category: 'animal', description: '森林中的静谧身影。', image: 'photos/animal/8cc69bcf79e51acc639c2e9090150908.jpg', date: '2025-08-10' },
  { id: 46, title: '野生动物 · 雪中之王', category: 'animal', description: '白色的皮毛与皑皑白雪融为一体。', image: 'photos/animal/c0270f824784aab3515521e08aff2902.jpg', date: '2025-08-10' },
  { id: 47, title: '野生动物 · 野性之美', category: 'animal', description: '在荒野中展现最真实的自己。', image: 'photos/animal/c3f81aba695287a9a84ceb31437cb082.jpg', date: '2025-08-10' },
  { id: 48, title: '野生动物 · 猎手', category: 'animal', description: '专注的眼神，等待最佳时机。', image: 'photos/animal/d4ff37c1dbf213eaa70b0f50f75425eb.jpg', date: '2025-08-10' },
  { id: 49, title: '野生动物 · 栖息', category: 'animal', description: '在自然中找到属于自己的角落。', image: 'photos/animal/dfb007ad4ab83c4981c29e2ae14c1c5a.jpg', date: '2025-08-10' },
  { id: 50, title: '野生动物 · 灵动一瞬', category: 'animal', description: '高速快门凝固的灵动瞬间。', image: 'photos/animal/ebfd6ae209093d8af4296617c9b74cd8.jpg', date: '2025-08-10' },
  { id: 51, title: '野生动物 · 日落时分', category: 'animal', description: '金色阳光下的剪影。', image: 'photos/animal/f899fac4d84f8c64811cd6948949f99b.jpg', date: '2025-08-10' },
  { id: 52, title: '野生动物 · 警觉', category: 'animal', description: '大自然中的生存智慧。', image: 'photos/animal/fe9c13649540ff3c0831ef539a55f683.jpg', date: '2025-08-10' },

  { id: 53, title: '自然风光 · 山间晨雾', category: 'nature', description: '云雾缭绕的山间，恍如仙境。', image: 'photos/nature/0da1c613be733c067704c0adc1bea348.jpg', date: '2025-08-10' },
  { id: 54, title: '自然风光 · 森林深处', category: 'nature', description: '阳光穿透树叶，在地面投下斑驳光影。', image: 'photos/nature/14d47af7ecefc9a8498f0d2c6a0d4b18.jpg', date: '2025-08-10' },
  { id: 55, title: '自然风光 · 溪流潺潺', category: 'nature', description: '山间清澈的小溪，带来清凉。', image: 'photos/nature/165227cb34bfbedf2f82982f0e1e884f.jpg', date: '2025-08-10' },
  { id: 56, title: '自然风光 · 秋意浓', category: 'nature', description: '满山红叶，层林尽染。', image: 'photos/nature/2cf3b18b226ed2b6da240e9d35d06303.jpg', date: '2025-08-10' },
  { id: 57, title: '自然风光 · 高山之巅', category: 'nature', description: '站在山顶，一览众山小。', image: 'photos/nature/2faaeecff5ab170abf91b2386ed95754.jpg', date: '2025-08-10' },
  { id: 58, title: '自然风光 · 金色麦田', category: 'nature', description: '风吹麦浪，丰收的季节。', image: 'photos/nature/376bb4a3ffc332b8e939776cb70eff58.jpg', date: '2025-08-10' },
  { id: 59, title: '自然风光 · 星空下', category: 'nature', description: '银河璀璨，宇宙浩瀚。', image: 'photos/nature/4275c76b9ab147dd2e9d22d14a7e8a1f.jpg', date: '2025-08-10' },
  { id: 60, title: '自然风光 · 水波不兴', category: 'nature', description: '湖面如镜，倒映天空。', image: 'photos/nature/4fab165e8de8ae8fc39462ee6a016230.jpg', date: '2025-08-10' },
  { id: 61, title: '自然风光 · 向日葵田', category: 'nature', description: '金色的花朵追逐着太阳。', image: 'photos/nature/51781b7b44a23db0201f2047cdb224a6.jpg', date: '2025-08-10' },
  { id: 62, title: '自然风光 · 瀑布飞流', category: 'nature', description: '飞流直下三千尺的壮观。', image: 'photos/nature/52d202e5d2870c01025bd8a58feb1927.jpg', date: '2025-08-10' },
  { id: 63, title: '自然风光 · 高原花海', category: 'nature', description: '高原上盛开的野花，顽强而美丽。', image: 'photos/nature/546ef6aa6f34ec22e7f6617c9f4ddabe.jpg', date: '2025-08-10' },
  { id: 64, title: '自然风光 · 林海雪原', category: 'nature', description: '白茫茫一片，纯净而安宁。', image: 'photos/nature/5af4f7876a9a26667e8030e3ca39310e.jpg', date: '2025-08-10' },
  { id: 65, title: '自然风光 · 悬崖之上', category: 'nature', description: '险峻峭壁，展现大自然的力量。', image: 'photos/nature/5fc64ea89f94850f0168e23080435e6a.jpg', date: '2025-08-10' },
  { id: 66, title: '自然风光 · 海岸线', category: 'nature', description: '海浪与岩石的千万年对话。', image: 'photos/nature/60c521a7ecb144159307aefecd8f372d.jpg', date: '2025-08-10' },
  { id: 67, title: '自然风光 · 晨雾笼罩', category: 'nature', description: '清晨的薄雾为山峦披上轻纱。', image: 'photos/nature/637548ead6760eed8aa3b3c1ce9d8319.jpg', date: '2025-08-10' },
  { id: 68, title: '自然风光 · 云卷云舒', category: 'nature', description: '天空的画布上，云朵随意游走。', image: 'photos/nature/639aaaa8da1631b9dc0ba43919894fed.jpg', date: '2025-08-10' },
  { id: 69, title: '自然风光 · 秋日暖阳', category: 'nature', description: '秋天的阳光，温柔而不炽热。', image: 'photos/nature/64ccf6fa4b3ca54eb8f2e4fbbd0405fe.jpg', date: '2025-08-10' },
  { id: 70, title: '自然风光 · 荷塘月色', category: 'nature', description: '月光下的荷塘，诗意盎然。', image: 'photos/nature/65fff32d371d2c0610b62fea1185b707.jpg', date: '2025-08-10' },
  { id: 71, title: '自然风光 · 远山如黛', category: 'nature', description: '层叠的山峦，水墨画卷般展开。', image: 'photos/nature/76865321fe3f631cfe59d3790d31d3c9.jpg', date: '2025-08-10' },
  { id: 72, title: '自然风光 · 草原之上', category: 'nature', description: '辽阔的草原，一望无际。', image: 'photos/nature/786c1de76e69f6c1f6c76c3ca096d59d.jpg', date: '2025-08-10' },
  { id: 73, title: '自然风光 · 落英缤纷', category: 'nature', description: '春日的花瓣，飘落成最浪漫的风景。', image: 'photos/nature/7e6c432bd6ee4b7dec9ece5225d3d6c3.jpg', date: '2025-08-10' },
  { id: 74, title: '自然风光 · 潮汐时刻', category: 'nature', description: '潮水涨落，自然的节律。', image: 'photos/nature/7f5dbec9c9b7082e47b680b7d4084297.jpg', date: '2025-08-10' },
  { id: 76, title: '自然风光 · 日出东方', category: 'nature', description: '一天中最有希望的时刻。', image: 'photos/nature/80010789f8c94a0499573509ed6e5094.jpg', date: '2025-08-10' },
  { id: 77, title: '自然风光 · 沙漠孤旅', category: 'nature', description: '金色的沙丘，无尽的寂静。', image: 'photos/nature/80d8aeee94029b6e7f37042faab299c3.jpg', date: '2025-08-10' },
  { id: 78, title: '自然风光 · 云海翻腾', category: 'nature', description: '站在云端之上，俯瞰人间。', image: 'photos/nature/8162b247710d3007366b73cb63795cbd.jpg', date: '2025-08-10' },
  { id: 79, title: '自然风光 · 银河当空', category: 'nature', description: '在远离光污染的地方，仰望银河。', image: 'photos/nature/872c6200d0c3cc1eaba7a939ac222888.jpg', date: '2025-08-10' },
  { id: 80, title: '自然风光 · 翠竹摇曳', category: 'nature', description: '竹影婆娑，风声沙沙。', image: 'photos/nature/a7cab5a6259612cfe4a592c3acf27535.jpg', date: '2025-08-10' },
  { id: 81, title: '自然风光 · 花海漫游', category: 'nature', description: '徜徉在花的海洋中。', image: 'photos/nature/a7fc084c09d241fe1e81412c2d905c9d.jpg', date: '2025-08-10' },
  { id: 82, title: '自然风光 · 古树参天', category: 'nature', description: '历经百年的大树，见证岁月变迁。', image: 'photos/nature/a84c58e61c9b46ebc0d26b24684e2d4f.jpg', date: '2025-08-10' },
  { id: 83, title: '自然风光 · 山间小路', category: 'nature', description: '蜿蜒的小路，通向未知的远方。', image: 'photos/nature/a8cb8f129cc18414c8bd1e99b6da258d.jpg', date: '2025-08-10' },
  { id: 84, title: '自然风光 · 落叶飘零', category: 'nature', description: '秋天的信使，飘落一地金黄。', image: 'photos/nature/b6d3e46fcea8bb9b4ade47fd7a068ffb.jpg', date: '2025-08-10' },
  { id: 85, title: '自然风光 · 冰清玉洁', category: 'nature', description: '冰雪世界，纯净透明。', image: 'photos/nature/c22d76816638221a571bd11c14dcd26a.jpg', date: '2025-08-10' },
  { id: 86, title: '自然风光 · 林间小径', category: 'nature', description: '漫步林间，听鸟儿歌唱。', image: 'photos/nature/c565f41650741b2e08fb4be640a433ce.jpg', date: '2025-08-10' },
  { id: 87, title: '自然风光 · 秋高气爽', category: 'nature', description: '秋天特有的高远与通透。', image: 'photos/nature/cbc13b2cdb51f7f4c76565037b8e21a1.jpg', date: '2025-08-10' },
  { id: 88, title: '自然风光 · 湖光山色', category: 'nature', description: '湖映山色，山抱湖水。', image: 'photos/nature/d588879dafc2333e3de28b2f945c0526.jpg', date: '2025-08-10' },
  { id: 89, title: '自然风光 · 雨后彩虹', category: 'nature', description: '风雨过后，彩虹架起桥梁。', image: 'photos/nature/de1efee9635cf32d48cbc56b75b356db.jpg', date: '2025-08-10' },
  { id: 90, title: '自然风光 · 岩石风骨', category: 'nature', description: '亿万年的风化，造就独特纹理。', image: 'photos/nature/de358c6e404c109da79b9fca7a722735.jpg', date: '2025-08-10' },
  { id: 91, title: '自然风光 · 旷野苍茫', category: 'nature', description: '天地之间，唯见苍茫。', image: 'photos/nature/df6baf9492500ab6b947bc47dde2ee88.jpg', date: '2025-08-10' },
  { id: 92, title: '自然风光 · 樱花盛开', category: 'nature', description: '春日限定的浪漫。', image: 'photos/nature/e1b5329c0baac68a28dd80c0e2e4abac.jpg', date: '2025-08-10' },
  { id: 93, title: '自然风光 · 云海之下', category: 'nature', description: '云的海洋，山成了岛屿。', image: 'photos/nature/eef8585ea70033743d1376df43e2ceee.jpg', date: '2025-08-10' },
  { id: 94, title: '自然风光 · 秋色正好', category: 'nature', description: '橙黄橘绿，一年中色彩最丰富的季节。', image: 'photos/nature/f7c44af3c6b024d1223a1934c6a1ad90.jpg', date: '2025-08-10' },
  { id: 95, title: '自然风光 · 山峦叠嶂', category: 'nature', description: '山外有山，层峦叠翠。', image: 'photos/nature/f83bf333745d80a0b3d674591c27b71d.jpg', date: '2025-08-10' },
  { id: 96, title: '自然风光 · 暮光森林', category: 'nature', description: '森林深处的金色光线。', image: 'photos/nature/fe692b614c68d0f2afeb6ac92fb4e9bf.jpg', date: '2025-08-10' },
  { id: 97, title: '自然风光 · 晨露', category: 'nature', description: '清晨花瓣上的晶莹露珠。', image: 'photos/nature/fb3e89e1df653369184049fb41f10a96.jpg', date: '2025-08-10' }
];

const CategoryMap = {
  all: '全部',
  people: '人物',
  humanities: '人文',
  city: '城市',
  animal: '动物',
  nature: '自然'
};

const CategoryOrder = ['all', 'nature', 'animal', 'city', 'people', 'humanities'];

const CategoryEnNames = {
  people: 'PEOPLE',
  humanities: 'HUMANITIES',
  city: 'CITY',
  animal: 'ANIMAL',
  nature: 'NATURE'
};

const defaultFeatured = {
  people: [1, 3, 5, 7],
  humanities: [8, 9, 10, 11],
  city: [12, 20, 26, 37],
  animal: [38, 44, 48, 52],
  nature: [53, 79, 84, 96]
};

const DEFAULT_PASSWORD = 'Linliqi050523@';
window.DEFAULT_PASSWORD = DEFAULT_PASSWORD;

async function apiGet(key, fallback) {
  try {
    const res = await fetch(API[key]);
    if (res.ok) {
      const data = await res.json();
      return data ?? fallback;
    }
  } catch (e) {}
  return fallback;
}

async function apiPost(key, value) {
  try {
    await fetch(API[key], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    });
  } catch (e) {
    console.warn('保存失败:', e);
  }
}

async function loadPhotos() {
  return apiGet('photos', [...defaultPhotos]);
}

async function savePhotos(photos) {
  return apiPost('photos', photos);
}

async function loadLikes() {
  const raw = await apiGet('likes', {});
  const migrated = {};
  Object.keys(raw).forEach(function (k) {
    if (k.startsWith('c_') || k.startsWith('u_')) {
      migrated[k] = raw[k];
    } else if (typeof raw[k] === 'boolean') {
      migrated['u_' + k] = raw[k] ? 1 : 0;
      migrated['c_' + k] = raw[k] ? 1 : 0;
    }
  });
  return migrated;
}

async function saveLikes(likes) {
  return apiPost('likes', likes);
}

async function loadMessages() {
  return apiGet('messages', []);
}

async function saveMessages(messages) {
  return apiPost('messages', messages);
}

async function loadFeatured() {
  const data = await apiGet('featured', null);
  if (data && typeof data === 'object') return data;
  return JSON.parse(JSON.stringify(defaultFeatured));
}

async function saveFeatured(featured) {
  return apiPost('featured', featured);
}

async function loadComments() {
  return apiGet('comments', {});
}

async function saveComments(comments) {
  return apiPost('comments', comments);
}

async function loadPassword() {
  const data = await apiGet('password', null);
  if (data && typeof data === 'object' && data.value) return data.value;
  return DEFAULT_PASSWORD;
}

async function savePassword(password) {
  return apiPost('password', { value: password });
}
