const API_BASE = '';

const API = {
  photos: API_BASE + '/api/photos',
  likes: API_BASE + '/api/likes',
  messages: API_BASE + '/api/messages',
  featured: API_BASE + '/api/featured',
  password: API_BASE + '/api/password',
  comments: API_BASE + '/api/comments'
};

const defaultPhotos = [{"id":1,"title":"人物肖像 · 广州流花湖","category":"people","description":"背后是一面扶桑花海！很漂亮哦！","image":"photos/people/0fd7aceead944ff6f392472d61a4287a.jpg","date":"2025-08-10"},{"id":2,"title":"人物肖像 · 孩童嬉水","category":"people","description":"溪水很凉快，但那天阳光很好，不怕感冒。","image":"photos/people/1cdbd0b19df6d9357c4855166a6a1c2c.jpg","date":"2025-08-10"},{"id":3,"title":"人物肖像 · 童年","category":"people","description":"我小时候也是这样玩水的，现在我长大了，我很矜持地选择站在岸上拍照。嘿嘿","image":"photos/people/2ec46771fcf44f60c32cfcd94a1b9f57.jpg","date":"2025-08-10"},{"id":4,"title":"人物肖像 · 孩童嬉水","category":"people","description":"弟弟和一个不认识的小朋友。","image":"photos/people/4a68cd9198f9e9b52fa65dd22670d14f.jpg","date":"2025-08-10"},{"id":5,"title":"人物肖像 · 孩童嬉水","category":"people","description":"小孩子的友谊建立的很快，只需要共享玩具。","image":"photos/people/b59515f2d9a2c3f89c0f9ed146f0dcc5.jpg","date":"2025-08-10"},{"id":6,"title":"人物肖像 · 广州流花湖","category":"people","description":"不同的动作再来一张！","image":"photos/people/d584aa78e5a6740421f99f2f344f545a.jpg","date":"2025-08-10"},{"id":7,"title":"人物肖像 · 广州动物园","category":"people","description":"动物园里很著名的打卡点！","image":"photos/people/df799ff4075ce0c7e0b398c1aa049cf1.jpg","date":"2025-08-10"},{"id":8,"title":"人文纪实 · 哈尔滨冰雪大世界","category":"humanities","description":"这是我自己捏出来的小鸭子！太可爱了！","image":"photos/humanities/19573f744bd202344732c198d32dd724.jpg","date":"2025-08-10"},{"id":9,"title":"人文纪实 · 长白山","category":"humanities","description":"下飞机了，好冷！这是我第一次看雪，随随便便一拍都很美。","image":"photos/humanities/7efe2d7e900b09bb2df80d1b1d59ccf5.jpg","date":"2025-08-10"},{"id":10,"title":"人文纪实 · 岁月痕迹","category":"humanities","description":"老城区的纹理记录着城市变迁的每一个印记。","image":"photos/humanities/93cc037577755fa387618b4cfd0f2649.jpg","date":"2025-08-10"},{"id":11,"title":"人文纪实 · 过春节","category":"humanities","description":"拜神啦！","image":"photos/humanities/f3a65aaeb1104fabb849ef1aaaf16ddb.jpg","date":"2025-08-10"},{"id":12,"title":"城市光影 · 广州四海城","category":"city","description":"这个被藤曼缠住的变形金刚，会不会有意识呢......","image":"photos/city/02d42027103022acbccd60db95a7f4ae.jpg","date":"2025-08-10"},{"id":13,"title":"城市光影 · 哈尔滨冰雪大世界","category":"city","description":"超级震撼的雪雕！","image":"photos/city/0dd4d4b2bd658634b2338daf221c57b2.jpg","date":"2025-08-10"},{"id":14,"title":"城市光影 · 广州","category":"city","description":"钢筋水泥的森林中，跳动着城市的心脏。","image":"photos/city/12dc97747125f2bb8d012b980c7ebc64.jpg","date":"2025-08-10"},{"id":15,"title":"城市光影 · 广州四海城","category":"city","description":"这里有一只恐龙站在车上。","image":"photos/city/17231200530805f0e720b4a3882c4702.jpg","date":"2025-08-10"},{"id":16,"title":"城市光影 · 广州云台花园","category":"city","description":"这个是以什么为原型呢？","image":"photos/city/198227d6a70e0ca12e2dd2903f09a345.jpg","date":"2025-08-10"},{"id":17,"title":"城市光影 · 长春电影厂","category":"city","description":"这是全中国第一家电影厂！","image":"photos/city/2ee6839df9b89738093a871c3356602a.jpg","date":"2025-08-10"},{"id":18,"title":"城市光影 · 广州","category":"city","description":"拍摄于普通的一天，爸爸接我放学回家。","image":"photos/city/39d1047a99b4612bdc1c015ead0f955f.jpg","date":"2025-08-10"},{"id":19,"title":"城市光影 · 哈尔滨冰雪大世界","category":"city","description":"我在哈尔滨见到天坛啦！","image":"photos/city/4eb2289a7809efb858d3ba99b8069f71.jpg","date":"2025-08-10"},{"id":20,"title":"城市光影 · 哈尔滨圣索菲亚大教堂","category":"city","description":"好冷！好多精灵在拍照哎！","image":"photos/city/663ded1bfb29d591f447e40f05d106fb.jpg","date":"2025-08-10"},{"id":21,"title":"城市光影 · 广州四海城","category":"city","description":"一只鲸鱼。","image":"photos/city/78d8f881496978ecfe0ac3ff650f069d.jpg","date":"2025-08-10"},{"id":22,"title":"城市光影 · 结构之美","category":"city","description":"现代建筑的线条与结构美。","image":"photos/city/7f50f2a1cb55e9bd7d53051bdec60846.jpg","date":"2025-08-10"},{"id":23,"title":"城市光影 · 广州四海城","category":"city","description":"路牌指向的地方是哪里呢？","image":"photos/city/81c62cc5b32192843592fe4d73cfab33.jpg","date":"2025-08-10"},{"id":24,"title":"城市光影 · 哈尔滨冰雪大世界","category":"city","description":"结冰了.......好冷......","image":"photos/city/8db82a1e9c39bb39c075183900bc5d89.jpg","date":"2025-08-10"},{"id":25,"title":"城市光影 · 广州四海城","category":"city","description":"怪物医生......不小心闯入一个奇怪的实验室......","image":"photos/city/9d7f05745c8311857e15896c714e97a9.jpg","date":"2025-08-10"},{"id":26,"title":"城市光影 · 广州黄金海岸","category":"city","description":"有没有中式梦核那种感觉了~~","image":"photos/city/aaf236c1b8a2e01437645e361e4fc2e0.png","date":"2025-08-10"},{"id":27,"title":"城市光影 · 广州四海城","category":"city","description":"庞然大物！可怕！","image":"photos/city/b1a2a35912e0c8a02d87491f43573487.jpg","date":"2025-08-10"},{"id":28,"title":"城市光影 · 哈尔滨冰雪大世界","category":"city","description":"许愿时间到！","image":"photos/city/b26d22051a6d716804dab0b8f584c31b.jpg","date":"2025-08-10"},{"id":29,"title":"城市光影 · 哈尔滨","category":"city","description":"好大的雪人！","image":"photos/city/b7dd92f554e33dfa32652b43172e2cce.jpg","date":"2025-08-10"},{"id":30,"title":"城市光影 · 武汉","category":"city","description":"这个公园好舒服！太适合养老了。","image":"photos/city/cefda8b9386379a6e43b9d23c394f7cc.jpg","date":"2025-08-10"},{"id":31,"title":"城市光影 · 广州滨江东路","category":"city","description":"这个照片有没有90年代的感觉？","image":"photos/city/cf7536dde68c198ab3eafca8eeab8214.jpg","date":"2025-08-10"},{"id":32,"title":"城市光影 · 广州","category":"city","description":"好梦核......","image":"photos/city/d0eda2e53005c1411991b6668542967d.jpg","date":"2025-08-10"},{"id":33,"title":"城市光影 · 佛山狮山","category":"city","description":"这个湖面太干净了吧！","image":"photos/city/d4d199c90fd8c2353e419fee92c85529.jpg","date":"2025-08-10"},{"id":34,"title":"城市光影 · 长春","category":"city","description":"经典的列车！穿梭时间的列车！","image":"photos/city/dceb9eb2e665163213ad2b4a94c2818f.jpg","date":"2025-08-10"},{"id":35,"title":"城市光影 · 广州云台花园","category":"city","description":"上山坐缆车轻轻松松，但会错过很多路途中的风景哦！","image":"photos/city/e141b2ff91d936d63bd3045852d18512.jpg","date":"2025-08-10"},{"id":36,"title":"城市光影 · 哈尔滨冰雪大世界","category":"city","description":"这个门票太值当了！","image":"photos/city/e32bcea62e6a72eea854959726bc9cce.jpg","date":"2025-08-10"},{"id":37,"title":"城市光影 · 云南泸沽湖","category":"city","description":"云南！太美了TT","image":"photos/city/f12b412893cfcc01736a0667c4f12968.jpg","date":"2025-08-10"},{"id":38,"title":"野生动物 · 夜鹭","category":"animal","description":"白天经常呆呆地站在水边抓鱼吃......","image":"photos/animal/08319eebc3baeafc99b73f3f9a8ed129.jpg","date":"2025-08-10"},{"id":39,"title":"野生动物 · 东北虎","category":"animal","description":"丛林之王的威严时刻。但是看到肉肉就会过来哦！","image":"photos/animal/0d757fc7a08651e994132df832bc6b38.jpg","date":"2025-08-10"},{"id":40,"title":"野生动物 · 广州动物园","category":"animal","description":"这是一张鱼的照片。","image":"photos/animal/27fbe3b62c6f8e0ef25f717e9277c5d6.jpg","date":"2025-08-10"},{"id":41,"title":"野生动物 · 摩弗伦羊","category":"animal","description":"毛看起来乱糟糟的......好像是在换毛期。","image":"photos/animal/31d34b950cadcde81f9642f283a9f997.jpg","date":"2025-08-10"},{"id":42,"title":"野生动物 · 狮子夫妇","category":"animal","description":"嘘——在午睡哦！","image":"photos/animal/62f756a04b083d38eeb6a19d8082e9d9.jpg","date":"2025-08-10"},{"id":43,"title":"野生动物 · 顺德清晖园","category":"animal","description":"来拜拜！这可是锦鲤！","image":"photos/animal/731baec90907c8bf5142a383dcab7e2a.jpg","date":"2025-08-10"},{"id":44,"title":"野生动物 · 广州动物园","category":"animal","description":"这是鱼。","image":"photos/animal/799af3f3ab1cd7cfbee67b9e25f58b80.jpg","date":"2025-08-10"},{"id":45,"title":"野生动物 · 顺德清晖园","category":"animal","description":"第一次在这么大的池塘里面看到这种金鱼（之前都在小鱼缸见过）","image":"photos/animal/8cc69bcf79e51acc639c2e9090150908.jpg","date":"2025-08-10"},{"id":46,"title":"野生动物 · 东北虎","category":"animal","description":"很威武哦！大猫猫——","image":"photos/animal/c0270f824784aab3515521e08aff2902.jpg","date":"2025-08-10"},{"id":47,"title":"野生动物 · 魔弗伦羊","category":"animal","description":"这是雄性摩弗伦羊，特征非常典型：拥有粗大弯曲、表面带年轮纹理的弧形大角，面部棕黑相间的毛色，它也是现代家羊的野生祖先之一，雄性才会发育出这么壮硕的弯角，雌性大多无角或角很小。","image":"photos/animal/c3f81aba695287a9a84ceb31437cb082.jpg","date":"2025-08-10"},{"id":48,"title":"野生动物 · 大火烈鸟","category":"animal","description":"这两只羽毛偏白是羽毛尚未完全显色或是在换羽阶段的大火烈鸟。","image":"photos/animal/d4ff37c1dbf213eaa70b0f50f75425eb.jpg","date":"2025-08-10"},{"id":49,"title":"野生动物 · 栖息","category":"animal","description":"在自然中找到属于自己的角落。","image":"photos/animal/dfb007ad4ab83c4981c29e2ae14c1c5a.jpg","date":"2025-08-10"},{"id":50,"title":"野生动物 · 顺德清晖园","category":"animal","description":"好清澈的水！皆若空游无所依~","image":"photos/animal/ebfd6ae209093d8af4296617c9b74cd8.jpg","date":"2025-08-10"},{"id":51,"title":"野生动物 · 东北虎","category":"animal","description":"国家一级保护动物，现存体型最大的猫科动物。","image":"photos/animal/f899fac4d84f8c64811cd6948949f99b.jpg","date":"2025-08-10"},{"id":52,"title":"野生动物 · 斑头雁","category":"animal","description":"","image":"photos/animal/fe9c13649540ff3c0831ef539a55f683.jpg","date":"2025-08-10"},{"id":53,"title":"自然风光 · 郁金香","category":"nature","description":"好特别！很有气质的一株！","image":"photos/nature/0da1c613be733c067704c0adc1bea348.jpg","date":"2025-08-10"},{"id":54,"title":"自然风光 · 云南泸沽湖","category":"nature","description":"太美了。震撼。","image":"photos/nature/14d47af7ecefc9a8498f0d2c6a0d4b18.jpg","date":"2025-08-10"},{"id":55,"title":"自然风光 · 山茶花","category":"nature","description":"","image":"photos/nature/165227cb34bfbedf2f82982f0e1e884f.jpg","date":"2025-08-10"},{"id":56,"title":"自然风光 · 云南普达措国家公园","category":"nature","description":"彩云之南~","image":"photos/nature/2cf3b18b226ed2b6da240e9d35d06303.jpg","date":"2025-08-10"},{"id":57,"title":"自然风光 · 郁金香","category":"nature","description":"Tulip","image":"photos/nature/2faaeecff5ab170abf91b2386ed95754.jpg","date":"2025-08-10"},{"id":58,"title":"自然风光 · 长白山","category":"nature","description":"来看雾凇！","image":"photos/nature/376bb4a3ffc332b8e939776cb70eff58.jpg","date":"2025-08-10"},{"id":59,"title":"自然风光 · 兰花","category":"nature","description":"兰花大合照。","image":"photos/nature/4275c76b9ab147dd2e9d22d14a7e8a1f.jpg","date":"2025-08-10"},{"id":60,"title":"自然风光 · 广州华南植物园","category":"nature","description":"红色的秋天。","image":"photos/nature/4fab165e8de8ae8fc39462ee6a016230.jpg","date":"2025-08-10"},{"id":61,"title":"自然风光 · 长白山","category":"nature","description":"太美了！不枉我四点钟起床，五点钟排队，六点钟下水漂流！","image":"photos/nature/51781b7b44a23db0201f2047cdb224a6.jpg","date":"2025-08-10"},{"id":62,"title":"自然风光 · 雏菊","category":"nature","description":"特别小清新的花朵！","image":"photos/nature/52d202e5d2870c01025bd8a58feb1927.jpg","date":"2025-08-10"},{"id":63,"title":"自然风光 · 郁金香","category":"nature","description":"","image":"photos/nature/546ef6aa6f34ec22e7f6617c9f4ddabe.jpg","date":"2025-08-10"},{"id":64,"title":"自然风光 · 小雏菊","category":"nature","description":"","image":"photos/nature/5af4f7876a9a26667e8030e3ca39310e.jpg","date":"2025-08-10"},{"id":65,"title":"自然风光 · 广州云台花园","category":"nature","description":"这是鹿精灵吗！","image":"photos/nature/5fc64ea89f94850f0168e23080435e6a.jpg","date":"2025-08-10"},{"id":66,"title":"自然风光 · 小雏菊","category":"nature","description":"","image":"photos/nature/60c521a7ecb144159307aefecd8f372d.jpg","date":"2025-08-10"},{"id":67,"title":"自然风光 · 广州流花湖公园","category":"nature","description":"","image":"photos/nature/637548ead6760eed8aa3b3c1ce9d8319.jpg","date":"2025-08-10"},{"id":68,"title":"自然风光 · 阳江鸡笼顶","category":"nature","description":"山顶的雾气特别重，谁懂白茫茫的一片突然走出来一群牛。亲眼看到的时候真的觉得这些野生动物有神性。","image":"photos/nature/639aaaa8da1631b9dc0ba43919894fed.jpg","date":"2025-08-10"},{"id":69,"title":"自然风光 · 广州云台花园","category":"nature","description":"一颗彩色的树！","image":"photos/nature/64ccf6fa4b3ca54eb8f2e4fbbd0405fe.jpg","date":"2025-08-10"},{"id":70,"title":"自然风光 · 广州云台花园","category":"nature","description":"","image":"photos/nature/65fff32d371d2c0610b62fea1185b707.jpg","date":"2025-08-10"},{"id":71,"title":"自然风光 · 云南普达措国家公园","category":"nature","description":"太美咯！","image":"photos/nature/76865321fe3f631cfe59d3790d31d3c9.jpg","date":"2025-08-10"},{"id":72,"title":"自然风光 · 广州华南植物园","category":"nature","description":"没想到秋天就结霜了，还是在广州。","image":"photos/nature/786c1de76e69f6c1f6c76c3ca096d59d.jpg","date":"2025-08-10"},{"id":73,"title":"自然风光 · 郁金香","category":"nature","description":"最容易出片的花！","image":"photos/nature/7e6c432bd6ee4b7dec9ece5225d3d6c3.jpg","date":"2025-08-10"},{"id":74,"title":"自然风光 · 广东","category":"nature","description":"森林步道。","image":"photos/nature/7f5dbec9c9b7082e47b680b7d4084297.jpg","date":"2025-08-10"},{"id":76,"title":"自然风光 · 广州云台花园","category":"nature","description":"","image":"photos/nature/80010789f8c94a0499573509ed6e5094.jpg","date":"2025-08-10"},{"id":77,"title":"自然风光 · 长白山","category":"nature","description":"太冷了太冷了！赶紧去小卖部暖暖啊！","image":"photos/nature/80d8aeee94029b6e7f37042faab299c3.jpg","date":"2025-08-10"},{"id":79,"title":"自然风光 · 兰花","category":"nature","description":"雅！","image":"photos/nature/872c6200d0c3cc1eaba7a939ac222888.jpg","date":"2025-08-10"},{"id":80,"title":"自然风光 · 长白山","category":"nature","description":"你们知道吗？此刻我的鞋子已经湿透了，马上要结冰了！","image":"photos/nature/a7cab5a6259612cfe4a592c3acf27535.jpg","date":"2025-08-10"},{"id":81,"title":"自然风光 · 云南泸沽湖","category":"nature","description":"这个地方真的很舒服~","image":"photos/nature/a7fc084c09d241fe1e81412c2d905c9d.jpg","date":"2025-08-10"},{"id":82,"title":"自然风光 · 长白山","category":"nature","description":"这个水看着很甜的样子。","image":"photos/nature/a84c58e61c9b46ebc0d26b24684e2d4f.jpg","date":"2025-08-10"},{"id":83,"title":"自然风光 · 郁金香","category":"nature","description":"","image":"photos/nature/a8cb8f129cc18414c8bd1e99b6da258d.jpg","date":"2025-08-10"},{"id":84,"title":"自然风光 · 百合","category":"nature","description":"","image":"photos/nature/b6d3e46fcea8bb9b4ade47fd7a068ffb.jpg","date":"2025-08-10"},{"id":85,"title":"自然风光 · 毛地黄","category":"nature","description":"**全株有剧毒**，含有强心苷类物质，严禁采摘、误食，仅可远观欣赏，不能触碰食用。","image":"photos/nature/c22d76816638221a571bd11c14dcd26a.jpg","date":"2025-08-10"},{"id":86,"title":"自然风光 · 长白山","category":"nature","description":"好宏大的山脉。","image":"photos/nature/c565f41650741b2e08fb4be640a433ce.jpg","date":"2025-08-10"},{"id":87,"title":"自然风光 · 广州海珠湖公园","category":"nature","description":"","image":"photos/nature/cbc13b2cdb51f7f4c76565037b8e21a1.jpg","date":"2025-08-10"},{"id":88,"title":"自然风光 · 长白山","category":"nature","description":"太！震！撼！了！","image":"photos/nature/d588879dafc2333e3de28b2f945c0526.jpg","date":"2025-08-10"},{"id":89,"title":"自然风光 · 广州海珠湖公园","category":"nature","description":"","image":"photos/nature/de1efee9635cf32d48cbc56b75b356db.jpg","date":"2025-08-10"},{"id":90,"title":"自然风光 · 广州华南植物园","category":"nature","description":"","image":"photos/nature/de358c6e404c109da79b9fca7a722735.jpg","date":"2025-08-10"},{"id":91,"title":"自然风光 · 广州云台花园","category":"nature","description":"大家一起来保护视力~","image":"photos/nature/df6baf9492500ab6b947bc47dde2ee88.jpg","date":"2025-08-10"},{"id":92,"title":"自然风光 · 小雏菊","category":"nature","description":"","image":"photos/nature/e1b5329c0baac68a28dd80c0e2e4abac.jpg","date":"2025-08-10"},{"id":93,"title":"自然风光 · 扶桑花","category":"nature","description":"","image":"photos/nature/eef8585ea70033743d1376df43e2ceee.jpg","date":"2025-08-10"},{"id":94,"title":"自然风光 · 长白山","category":"nature","description":"","image":"photos/nature/f7c44af3c6b024d1223a1934c6a1ad90.jpg","date":"2025-08-10"},{"id":95,"title":"自然风光 · 顺德清晖园","category":"nature","description":"荷塘。","image":"photos/nature/f83bf333745d80a0b3d674591c27b71d.jpg","date":"2025-08-10"},{"id":96,"title":"自然风光 · 长白山","category":"nature","description":"雾凇漂流真的可以体验一下，很美。","image":"photos/nature/fe692b614c68d0f2afeb6ac92fb4e9bf.jpg","date":"2025-08-10"},{"id":97,"title":"自然风光 · 郁金香","category":"nature","description":"","image":"photos/nature/fb3e89e1df653369184049fb41f10a96.jpg","date":"2025-08-10"}];

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

const defaultFeatured = {"people":[1,3,5,7],"humanities":[8,9,10,11],"city":[12,21,18,16],"animal":[52,47,38,46],"nature":[53,84,57,92]};

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