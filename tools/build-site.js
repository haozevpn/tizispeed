const fs = require("fs");
const path = require("path");

const SITE_URL = "https://tizispeed.com";
const SITE_NAME = "TiziSpeed 机场观察";
const TODAY = "2026-09-23";
const INDEXNOW_KEY = "9f2c8a7d6e5b4c3a1d0f8e7a6b5c4d3e";
const SEO_KEYWORDS = "机场推荐,梯子推荐,稳定机场,机场榜单,机场测评,便宜机场,机场排行,科学上网机场,机场节点,机场订阅,好用机场,低价机场,高速机场,IPLC机场,IEPL机场,BGP中转,专线机场,机场价格,机场套餐,机场注册链接,机场官网入口,机场测速,机场试用,机场客户端,Clash机场,Shadowrocket机场,Mihomo教程,机场备用,AI机场,流媒体解锁";

const airportRows = [
  ["飞猫云", "feimaoyun", "https://flycat.flycatvipaff.cc/#/?code=1arEKHqh", "¥84.00/年（学生版）", "年付低价"],
  ["极连云", "jilianyun", "https://haozevpn.jlyvipaff.com/#/?code=KUKfOY13", "8元 60G/月", "入门首选"],
  ["微风网络", "weifengwangluo", "https://vip01.breezenetaff.com/#/?code=JxFsshSn", "¥137.00/年 100GB/月", "IPLC专线"],
  ["光年梯", "guangnianti", "https://gnt001.gntvipaff.cc/#/?code=j1ufpE44", "7.5元 50G/月", "低价备用"],
  ["可信云", "kexinyun", "https://varnexa.kexintttt.xyz/#/register?code=zcjBlIde", "8元 60G/月", "性价比"],
  ["速界", "sujie", "https://trevona.speed-world.cc/#/register?code=r7IOqoY7", "7.5元 50G/月", "新手友好"],
  ["快狸", "kuaili", "https://varnexa.kuailitttt.homes/#/register?code=G56QwHto", "10元 30GB/月", "轻量备用"],
  ["边缘节点", "bianyuanjiedian", "https://varnexa.bianyuanjiediantttt.sbs/#/register?code=Oy1wZvzJ", "9元 45GB/月", "节点体验"],
  ["光速云", "guangshuyun", "https://kjlq01.gsyvipaff.cc/#/?code=b1OTkTeL", "8.25元 59G/月", "低价日用"],
  ["影子", "yingzi", "https://www.yingzi01.com/register?code=X7XPN1cS", "18.80元 150GB/月", "中等流量"],
  ["边界云机场", "bianjieyun", "https://www.lvpn.cc/r/6UQDZT", "12.33元 50GB/月", "工具订阅"],
  ["星岛梦", "xingdaomeng", "https://wuyou202001.xdmvipaff.cc/#/?code=olWCiAhj", "16元 100G/月", "日常主力"],
  ["全球云", "quanqiuyun", "https://haozevpn.gcvipaff.cc/#/?code=WRQJc2v4", "20元 120G/月", "全球节点"],
  ["瞬云机场", "shunyun", "https://ccc.jichang.best/#/register?code=o4I4kToe", "8.25元 59G/月", "轻中度"],
  ["寰宇云机场", "huanyuyun", "https://vip3.huanyuyunbest.com/#/register?code=K6h5VWw2", "89元/年 60G/月", "长期备用"],
  ["Lumina", "lumina", "https://luminak.net/?token=lumina#/register?code=dCgHyjFi", "10.00元 200GB/月", "大流量低价"],
  ["拼好连", "pinhaolian", "https://sxzofrnamc.runwayhz.com/#/register?code=A63zaSvx", "9.90元 100GB/月", "百G入门"],
  ["99吧", "99bar", "https://99vpn.bar/#/register?code=Uni7IOJh", "7.5元 66GB/月", "学生党"],
  ["锦云机场", "jinyun", "https://w2.whengdl.com/#/register?code=BIGc8qrQ", "6元 50GB/月", "超低价"],
  ["极速云机场", "jisuyun", "https://tg.sintotgch.com/#/register?code=RENHYxqv", "8.25元 800G/月", "大流量"],
  ["山水云", "shanshuiyun", "https://ss2.byvvcsx.com/#/register?code=jkziWeb8", "14.99元 100GB/月", "百G日用"],
  ["秒秒云", "miaomiaoyun", "https://dl1.mmy8.com/#/register?code=g3bq7bpK", "14元 128GB/月", "中流量"],
  ["迅达VPN", "xundavpn", "https://sulianproxy.com/register?code=lfITU4zy", "15元 150GB/月", "稳定刚需"],
  ["Edge-X机场", "edge-x", "https://edge-invite.com/#/register?code=73ienU2h", "16.8元 100GB/月", "轻量主力"],
  ["可达加速器", "keda", "https://1.mkd997.com/#/register?code=JgTY5JiT", "10元 100GB/月", "低价百G"],
  ["奈云", "naiyun", "https://airportgo.org/go.php", "10.6元 168G/月", "新手友好"],
  ["隐云", "yinyun", "https://airportgo.org/go.php", "25元 150G/月", "日常流量"],
  ["山海机场", "shanhai", "https://shanhai.sbs/#/register?code=qVTbPfWP", "3元 128G/月", "极低价"],
  ["LiZione", "lizione", "https://lizione.vip?path=register&code=Wmf3jYMy", "10元 100G/月", "多线选择"],
  ["哆啦A梦", "doraemon", "https://store.yyds2-doraemon.site/login/register?invite_code=5VxQMw0k", "10元 100G/月", "百G入门"],
  ["大哥云", "dageyun", "https://airportgo.org/go.php", "19.9元 100G/月", "老牌观察"],
  ["龙猫云", "longmaoyun", "https://airportgo.org/go.php", "15元 150G/月", "平衡型"],
  ["飞鸟机场", "feiniao-airport", "https://airportgo.org/go.php", "15元 100G/月", "家用轻量"],
  ["青云梯", "qingyunti", "https://airportgo.org/go.php", "8元 60G/月", "高峰主力"],
  ["花云机场", "huayun-airport", "https://api-flowercloud.com/aff.php?aff=16018", "128元/年 20G/月", "年付备用"]
];

const airports = airportRows.map(([name, slug, url, price, tag]) => ({
  name,
  slug,
  url,
  price,
  tag,
  angle: `适合想对比 ${price} 这一档套餐，并希望从公开机场列表里快速筛选 ${tag} 选择的用户。`,
  focus: `${name} 当前整理到的最低公开订阅为 ${price}。选择它时不要只看价格，还要把节点地区、倍率规则、晚高峰表现和售后入口一起纳入判断。`,
  scenario: `更适合先用短周期验证常用场景的人，例如网页检索、社交软件、AI 工具、轻量视频、资料下载或备用网络访问。`,
  watch: `下单前重点确认 ${name} 的订阅入口、套餐周期、设备限制、退款说明和公告渠道，避免只凭单次测速决定长期续费。`,
  trial: `建议购买后连续三天测试香港、日本、新加坡、美国等常用节点，并记录晚间 20 点到 23 点的真实任务体验。`
}));

const airportPlanRows = {
  jilianyun: [
    ["Mini", "8元/月", "60GB/月", "IEPL 专线，全节点 1x；不限设备，适合轻量试用。"],
    ["Small", "12元/月", "120GB/月", "IEPL 专线，全节点 1x；适合日常网页、AI 和社交。"],
    ["Medium", "20元/月", "240GB/月", "IEPL 专线，全节点 1x；适合高频使用。"],
    ["Large", "30元/月", "400GB/月", "IEPL 专线，全节点 1x；适合多设备或视频需求。"]
  ],
  guangnianti: [
    ["50G/月", "7.5元/月", "50GB/月", "不限设备，低价入门，适合备用。"],
    ["100G/月", "12.5元/月", "100GB/月", "不限设备，适合日常轻中度使用。"],
    ["200G/月", "20元/月", "200GB/月", "不限设备，适合 AI、视频和资料检索。"],
    ["500G/月", "40元/月", "500GB/月", "不限设备，适合大流量场景。"]
  ],
  feimaoyun: [
    ["学生版", "84元/年", "100GB/月", "不限设备，年付低价，适合预算有限用户。"],
    ["个人版", "20元/月", "200GB/月", "不限设备，适合个人日常主力。"],
    ["家庭版", "30元/月", "300GB/月", "不限设备，适合多设备或家庭共享。"]
  ],
  weifengwangluo: [
    ["清风（Breeze）", "¥137.00/年", "100GB/月", "每月流量 100G，购买日算起自动重置；全 IPLC 专线，不限制设备同时接入，不限速。"],
    ["乘风（Riding）", "¥27.00/月", "200GB/月", "每月流量 200G；全 IPLC 专线，不限制设备同时接入，不限速。"],
    ["破风（Breaking）", "¥57.00/月", "500GB/月", "每月流量 500G；全 IPLC 专线，不限制设备同时接入，不限速。"],
    ["御风（Mastery）", "¥127.00/月", "1.2TB/月", "每月流量 1200G；全 IPLC 专线，不限制设备同时接入，不限速。"]
  ],
  kexinyun: [
    ["入门版", "8元/月", "60GB/月", "不限设备，适合新手试用和轻量访问。"],
    ["基础版", "12元/月", "120GB/月", "不限设备，适合日常使用。"],
    ["标准版", "20元/月", "240GB/月", "不限设备，适合高频使用。"],
    ["专业版", "30元/月", "400GB/月", "不限设备，适合多设备和大流量。"]
  ],
  sujie: [
    ["50G/月", "7.5元/月", "50GB/月", "不限设备，低价入门。"],
    ["100G/月", "12.5元/月", "100GB/月", "不限设备，适合日常轻度使用。"],
    ["200G/月", "20元/月", "200GB/月", "不限设备，适合常用 AI 与视频。"],
    ["500G/月", "40元/月", "500GB/月", "不限设备，适合大流量需求。"]
  ],
  kuaili: [
    ["30G/月", "10元/月", "30GB/月", "不限设备，适合低频备用。"],
    ["150G/月", "20元/月", "150GB/月", "不限设备，适合日常使用。"],
    ["300G/月", "40元/月", "300GB/月", "不限设备，适合高频任务。"]
  ],
  bianyuanjiedian: [
    ["45G/月", "9元/月", "45GB/月", "适合轻量节点体验。"],
    ["88G/月", "16元/月", "88GB/月", "适合日常网页和社交。"],
    ["150G/月", "28元/月", "150GB/月", "适合中度使用。"],
    ["300G/月", "54元/月", "300GB/月", "适合多设备或高频使用。"]
  ],
  guangshuyun: [
    ["轻量版", "8.25元/月", "59GB/月", "低价日用，适合轻量访问。"],
    ["标准版", "13.8元/月", "138GB/月", "适合日常主力使用。"],
    ["旗舰版", "24元/月", "288GB/月", "适合高频任务和视频。"]
  ],
  yingzi: [
    ["月付套餐", "18.80元/月", "150GB/月", "月付灵活，适合先短期测试。"],
    ["季付套餐", "54元/季", "150GB/月", "适合确认体验后的季度续费。"],
    ["半年套餐", "104元/半年", "150GB/月", "适合中期使用。"],
    ["全年套餐", "198元/年", "150GB/月", "适合长期使用前先确认稳定性。"]
  ],
  bianjieyun: [
    ["Basic", "16.9元/月", "64GB/月", "每月重置，适合轻量工具订阅。"],
    ["Standard", "25.9元/月", "128GB/月", "每月重置，适合日常使用。"],
    ["Pro", "35.9元/月", "256GB/月", "每月重置，适合更高频任务。"],
    ["Basic 一次性", "68.8元", "200GB/不限时", "一次性流量，用完即止。"],
    ["Pro 一次性", "138.8元", "500GB/不限时", "适合低频长期备用。"],
    ["Ultra 一次性", "268.8元", "1TB/不限时", "适合大流量备用。"]
  ],
  xingdaomeng: [
    ["入门套餐", "16元/月", "100GB/月", "适合日常主力入门。"],
    ["标准套餐", "25元/月", "200GB/月", "适合更高频访问。"],
    ["高阶套餐", "30元/月", "300GB/月", "适合多设备或视频任务。"]
  ],
  quanqiuyun: [
    ["120G/月", "20元/月", "120GB/月", "适合全球节点日常使用。"],
    ["240G/月", "40元/月", "240GB/月", "适合高频任务。"],
    ["500G/月", "60元/月", "500GB/月", "适合大流量使用。"],
    ["1000G/月", "100元/月", "1000GB/月", "适合多设备和重度使用。"]
  ],
  shunyun: [
    ["轻量版", "8.25元/月", "59GB/月", "低价入门，适合轻中度使用。"],
    ["标准版", "13.8元/月", "138GB/月", "适合日常主力。"],
    ["旗舰版", "24元/月", "288GB/月", "适合高频任务。"]
  ],
  huanyuyun: [
    ["年付小包", "89元/年", "60GB/月", "适合长期低频备用。"],
    ["月付入门", "15元/月", "100GB/月", "适合日常轻量使用。"],
    ["月付标准", "20元/月", "200GB/月", "适合常用 AI、视频和社交。"],
    ["月付高阶", "30元/月", "350GB/月", "适合多设备高频使用。"]
  ],
  lumina: [
    ["基础套餐", "10元/月", "200GB/月", "大流量低价，适合入门主力。"],
    ["进阶套餐", "18元/月", "500GB/月", "适合高频访问。"],
    ["高阶套餐", "30元/月", "1000GB/月", "适合大流量需求。"],
    ["不限流量", "60元/月", "不限流量", "适合重度使用，仍需实测晚高峰。"]
  ],
  pinhaolian: [
    ["100G/月", "9.9元/月", "100GB/月", "百 G 入门，适合日常备用。"],
    ["200G/月", "19.9元/月", "200GB/月", "适合日常主力。"],
    ["500G/月", "39.9元/月", "500GB/月", "适合高频视频和多设备。"]
  ],
  "99bar": [
    ["66G/月", "7.5元/月", "66GB/月", "低价学生党备用。"],
    ["123G/月", "12.5元/月", "123GB/月", "适合轻中度使用。"],
    ["233G/月", "20元/月", "233GB/月", "适合日常主力。"],
    ["520G/月", "40元/月", "520GB/月", "适合大流量需求。"]
  ],
  jinyun: [
    ["50G/月", "6元/月", "50GB/月", "超低价入门，适合备用。"],
    ["100G/月", "10元/月", "100GB/月", "适合日常轻量使用。"],
    ["300G/月", "18元/月", "300GB/月", "适合中高频使用。"]
  ],
  jisuyun: [
    ["轻量版", "8.25元/月", "800GB/月", "大流量低价，适合先实测稳定性。"],
    ["标准版", "13.8元/月", "2000GB/月", "适合高流量任务。"],
    ["旗舰版", "24元/月", "4000GB/月", "适合重度使用。"]
  ],
  shanshuiyun: [
    ["100G/月", "14.99元/月", "100GB/月", "适合百 G 日用。"],
    ["200G/月", "22.99元/月", "200GB/月", "适合更高频任务。"],
    ["300G/月", "32.99元/月", "300GB/月", "适合多设备使用。"]
  ],
  miaomiaoyun: [
    ["128G/月", "14元/月", "128GB/月", "适合中流量日常使用。"],
    ["256G/月", "24元/月", "256GB/月", "适合高频访问。"],
    ["512G/月", "39元/月", "512GB/月", "适合大流量任务。"]
  ],
  xundavpn: [
    ["月付", "18元/月", "150GB/月", "IEPL/IPLC，约 3 台设备，适合短期测试。"],
    ["季付", "15元/月", "150GB/月", "折合月价更低，适合确认体验后续费。"],
    ["半年付", "13.5元/月", "150GB/月", "中期使用，仍建议先短测。"],
    ["年付", "12元/月", "150GB/月", "长期折扣价，需确认稳定性。"]
  ],
  "edge-x": [
    ["轻量套餐", "16.8元/月", "100GB/月", "适合轻量主力。"],
    ["标准套餐", "23.8元/月", "200GB/月", "适合日常使用。"],
    ["高级套餐", "32.8元/月", "350GB/月", "适合高频任务。"]
  ],
  keda: [
    ["100G/月", "10元/月", "100GB/月", "低价百 G 入门。"],
    ["200G/月", "18元/月", "200GB/月", "适合日常主力。"],
    ["300G/月", "24元/月", "300GB/月", "适合中高频使用。"],
    ["500G/月", "35元/月", "500GB/月", "适合大流量需求。"]
  ],
  naiyun: [
    ["Basic", "10.6元/月", "168GB/月", "适合新手友好入门。"],
    ["Pro", "20元/月", "388GB/月", "适合日常主力。"],
    ["Max", "35元/月", "788GB/月", "适合大流量使用。"]
  ],
  yinyun: [
    ["150G/月", "25元/月", "150GB/月", "适合日常流量需求。"],
    ["300G/月", "35元/月", "300GB/月", "适合高频访问。"],
    ["500G/月", "50元/月", "500GB/月", "适合多设备和大流量。"]
  ],
  shanhai: [
    ["128G/月", "3元/月", "128GB/月", "极低价入门，需重点实测稳定性。"],
    ["300G/月", "6元/月", "300GB/月", "适合低价备用。"],
    ["600G/月", "12元/月", "600GB/月", "适合大流量备用。"]
  ],
  lizione: [
    ["100G/月", "10元/月", "100GB/月", "多线选择入门。"],
    ["250G/月", "20元/月", "250GB/月", "适合日常主力。"],
    ["500G/月", "35元/月", "500GB/月", "适合大流量需求。"]
  ],
  doraemon: [
    ["100G/月", "10元/月", "100GB/月", "百 G 入门。"],
    ["200G/月", "20元/月", "200GB/月", "适合日常使用。"],
    ["300G/月", "30元/月", "300GB/月", "适合更高频任务。"]
  ],
  dageyun: [
    ["100G/月", "19.9元/月", "100GB/月", "老牌观察，适合短测后判断。"],
    ["200G/月", "29.9元/月", "200GB/月", "适合日常使用。"],
    ["300G/月", "39.9元/月", "300GB/月", "适合多设备或高频任务。"]
  ],
  longmaoyun: [
    ["150G/月", "15元/月", "150GB/月", "平衡型入门。"],
    ["300G/月", "30元/月", "300GB/月", "适合日常主力。"],
    ["600G/月", "60元/月", "600GB/月", "适合大流量使用。"]
  ],
  "feiniao-airport": [
    ["100G/月", "15元/月", "100GB/月", "家用轻量入门。"],
    ["200G/月", "30元/月", "200GB/月", "适合日常使用。"],
    ["500G/月", "50元/月", "500GB/月", "适合高频和多设备。"]
  ],
  qingyunti: [
    ["60G/月", "8元/月", "60GB/月", "低价入门，适合轻量备用。"],
    ["150G/月", "15元/月", "150GB/月", "适合日常主力。"],
    ["300G/月", "25元/月", "300GB/月", "适合高峰期高频使用。"]
  ],
  "huayun-airport": [
    ["年付小包", "128元/年", "20GB/月", "年付备用，适合低频使用。"],
    ["月付入门", "15元/月", "100GB/月", "适合短期测试。"],
    ["月付高阶", "30元/月", "300GB/月", "适合日常主力和多设备。"]
  ]
};

const localKnowledgeDeduped = [
  "ai-service-guide",
  "airport-risk-signals",
  "airport-vs-vpn",
  "backup-airport",
  "cheap-airport-cost",
  "client-subscription-guide",
  "desktop-airport-guide",
  "first-buy-checklist",
  "iepl-iplc-bgp",
  "mobile-airport-guide",
  "node-region-guide",
  "peak-hour-test",
  "streaming-unlock",
  "subscription-security",
  "traffic-rate-device"
];

const knowledgeTopics = [
  ["机场推荐怎么选才靠谱", "airport-recommendation-guide", "机场推荐", "机场推荐不能只看排名和广告词，更要看套餐透明度、节点覆盖、线路类型、晚高峰表现和售后入口。", "先用需求和预算筛候选，再用三天真实任务验证稳定性。"],
  ["梯子推荐和机场推荐有什么区别", "ladder-vs-airport-recommendation", "梯子推荐", "很多用户会同时搜索梯子推荐、机场推荐和科学上网工具，但这些词背后的需求并不完全一样。", "先分清工具形态、订阅方式和使用场景，再判断是否适合自己。"],
  ["稳定机场应该看哪些指标", "stable-airport-checklist", "稳定机场", "稳定机场不是单次测速最快，而是在常用地区、常用时段和常用任务里持续可用。", "连续测试、公告透明、订阅更新顺畅，比首页宣传更重要。"],
  ["便宜机场怎么筛选不容易踩坑", "cheap-airport-filter", "便宜机场", "便宜机场适合试用和备用，但如果只看最低价，很容易忽略倍率、限速、节点质量和售后风险。", "低价可以作为入口，真正下单前仍要看长期使用成本。"],
  ["AI 工具访问怎么选择机场", "ai-service-guide", "AI机场", "ChatGPT、Claude、Gemini、GitHub 等 AI 和开发者服务，对节点地区、IP 质量和账号风控更敏感。", "重要账号尽量固定干净节点，并避免频繁跨地区登录。"],
  ["主力机场和备用机场怎么搭配", "backup-airport", "机场备用", "只准备一个机场，遇到维护、入口变更或订阅异常时容易完全断开。主力和备用应该分散入口、线路和支付记录。", "备用机场不一定要贵，关键是和主力不要高度重合。"],
  ["IEPL、IPLC、BGP 线路怎么选", "iepl-iplc-bgp", "专线机场", "IEPL、IPLC、BGP 中转、直连等线路标签经常出现在机场页面，但普通用户更需要知道它们对延迟、价格和拥塞的影响。", "线路词只能作为参考，最终仍要用真实任务验证。"],
  ["手机端机场怎么配置更稳", "mobile-airport-guide", "手机配置", "手机端机场使用会受到系统代理、应用后台、网络切换和地区识别影响，体验和电脑端不完全一样。", "少切节点、固定策略、及时更新订阅，能减少很多移动端问题。"],
  ["电脑端机场客户端怎么选", "desktop-airport-guide", "电脑客户端", "电脑端常见客户端包括 Clash、Mihomo、sing-box 等，选择时要看规则支持、订阅更新和排查便利性。", "新手优先选择教程完整、日志清楚、更新稳定的客户端。"],
  ["流媒体解锁机场应该怎么测试", "streaming-unlock", "流媒体解锁", "流媒体解锁不只取决于节点地区，还会受到 DNS、账号地区、支付资料和平台风控影响。", "用固定测试清单验证 Netflix、Disney+、YouTube 等任务，不要只看节点名。"],
  ["机场测速数字为什么会骗人", "airport-speed-test-myths", "测速误区", "很多用户会用测速截图判断机场好坏，但测速数字只能反映某一刻、某个节点、某条链路的瞬时表现。", "把测速当作线索，而不是结论。"],
  ["订阅转换工具有哪些隐私风险", "subscription-converter-risk", "订阅安全", "订阅转换能解决客户端格式不兼容问题，但如果把订阅链接交给不可信服务，也等于交出了节点凭证。", "能本地转换就不要上传订阅，必须在线转换时先确认服务可信度。"],
  ["机场付款方式怎么选更稳妥", "airport-payment-privacy", "支付风控", "机场常见支付方式包括支付宝、微信、虚拟币和第三方发卡平台，不同方式的便利性和隐私边界不同。", "不要为了极低折扣忽略退款规则、订单记录和支付通道稳定性。"],
  ["如何判断机场公告和通知是否可靠", "telegram-notice-check", "通知渠道", "机场服务经常涉及域名迁移、节点维护和订阅更新，公告渠道是否清楚会直接影响后续使用。", "购买前先看公告频率、历史维护记录和客服回复方式。"],
  ["机场备用域名应该怎么保存", "airport-domain-backup", "入口管理", "机场入口可能因为维护、风控或域名变化而调整，用户需要有自己的入口备份方式。", "保存官网、面板、公告频道和工单入口，不要只收藏一个跳转链接。"],
  ["SS、VMess、Trojan、Hysteria 协议怎么理解", "ss-vmess-trojan-hysteria", "协议科普", "不同代理协议在兼容性、速度、伪装能力和客户端支持上各有差异，但普通用户不必被术语困住。", "优先选择服务商教程支持最完整、客户端最稳定的方案。"],
  ["DNS 泄露会影响机场使用吗", "dns-leak-check", "DNS 问题", "DNS 配置会影响域名解析、地区判断和部分服务的访问结果，配置混乱时容易出现能连但打不开的情况。", "遇到地区错乱或解析异常时，DNS 是需要检查的一层。"],
  ["分应用代理和全局代理怎么选", "split-tunnel-guide", "代理策略", "有些用户只想让浏览器或某个软件走代理，有些用户希望全局接管，两种方式适合不同场景。", "日常使用优先减少代理范围，排查问题时再临时全局。"],
  ["家庭共享机场订阅要注意什么", "family-sharing-airport", "多人使用", "一家人共用机场看起来省钱，但设备数、同时在线、流量消耗和订阅泄露风险都会增加。", "共享前先定规则，尤其是订阅链接保管和高流量应用限制。"],
  ["学生党怎么控制机场预算", "student-airport-budget", "预算规划", "学生用户通常预算有限，但又可能需要查资料、使用 AI、看网课或访问海外服务。", "先用低价月付和备用组合，不要被长期大促绑定。"],
  ["出差和漫游时机场为什么体验会变", "travel-roaming-airport", "移动场景", "同一个机场在家庭宽带、公司网络、酒店 Wi-Fi 和手机漫游下表现可能完全不同。", "移动场景要多准备几个地区节点，并提前保存备用入口。"],
  ["游戏加速能不能只靠机场解决", "gaming-latency-airport", "游戏延迟", "机场可以改善部分网络路径，但游戏延迟还受到服务器地区、UDP 支持、丢包和本地运营商影响。", "先确认游戏协议和节点路径，再判断是否适合用机场。"],
  ["TikTok 和短视频地区为什么容易乱", "tiktok-region-airport", "地区识别", "短视频平台会综合 SIM 卡、系统地区、账号历史、IP 和设备环境判断地区。", "只换节点不一定够，地区一致性比频繁切换更重要。"],
  ["频繁换节点会不会影响账号安全", "account-risk-ip-change", "账号风控", "很多海外服务会关注登录地区和 IP 变化，节点切换过于频繁可能触发验证。", "重要账号尽量固定少数干净节点，不要一天跨多个国家登录。"],
  ["路由器上配置机场适合哪些人", "router-airport-setup", "路由器", "把机场配置到路由器可以覆盖全屋设备，但排查成本和规则复杂度也会提高。", "只有当你明确需要全屋代理时，再考虑路由器方案。"],
  ["IPv6 会不会影响机场节点连接", "ipv6-airport-issue", "IPv6", "部分网络同时存在 IPv4 和 IPv6，客户端或规则处理不当时会出现直连泄露、解析异常或连接失败。", "遇到奇怪问题时，可以把 IPv6 当作排查项之一。"],
  ["机场试用期应该测试哪些任务", "trial-plan-design", "试用计划", "试用期很短时，更需要提前设计测试任务，避免只打开几个网页就草率续费。", "用自己的真实任务做测试清单，别只看节点数量。"],
  ["机场节点命名怎么看懂", "node-name-reading", "节点命名", "节点名称里常出现地区、倍率、线路、解锁和入口信息，读懂命名能减少盲目切换。", "先看地区和倍率，再看线路标签，最后用真实任务验证。"],
  ["机场工单怎么写更容易得到回复", "support-ticket-guide", "售后沟通", "工单不是吐槽区，描述越清楚，服务商越容易判断是节点问题还是本地配置问题。", "提供时间、节点、客户端、网络环境和截图，比一句不能用更有效。"],
  ["机场长期收藏清单怎么维护", "airport-watchlist", "清单维护", "机场推荐列表会变化，价格、入口、套餐和可用性都可能更新，收藏清单也需要定期整理。", "把候选、主力、备用和淘汰分开记录，减少重复购买。"]
].map(([title, slug, tag, intro, takeaway]) => ({ title, slug, tag, intro, takeaway }));

const seoKnowledgeArticles = {
  "airport-recommendation-guide": {
    description: "机场推荐选购指南，围绕稳定机场、便宜机场、专线机场、套餐价格、节点地区、注册链接和试用方法，帮助新手建立筛选标准。",
    keywords: "机场推荐,稳定机场,便宜机场,机场榜单,机场测评,机场排行,机场注册链接,机场套餐,机场节点,梯子推荐",
    summary: "这篇文章面向第一次筛选机场推荐的用户，把预算、流量、线路、节点、客户端、公告和售后拆成可检查的步骤，避免只按广告排名下单。",
    sections: [
      ["先确定自己的使用场景", [
        "机场推荐最容易出错的地方，是还没有想清楚自己要解决什么问题，就开始比较价格和流量。如果只是偶尔查资料、打开海外网页或备用登录，低价月付和小流量套餐就够用；如果每天使用 AI 工具、视频会议、YouTube、GitHub、Telegram 或流媒体，就要把稳定性放在低价前面。",
        "建议先把需求写成三类：核心任务、可接受降级的任务、偶尔才用的任务。核心任务比如 AI 登录、资料检索和工作沟通，必须在晚高峰也稳定；偶尔任务比如下载大文件，可以接受换节点或错峰。这样看机场榜单时，才不会被大流量和低价牵着走。"
      ]],
      ["看套餐时不要只看最低价", [
        "很多机场推荐页面会突出最低公开套餐，但最低价不等于最低使用成本。需要一起看流量是否按月重置、热门节点是否有倍率、是否限制设备数、是否限制端口或协议、是否支持常见客户端，以及续费价格是否和首购价格一致。",
        "如果一个套餐写着 100GB/月，但常用节点按 2 倍扣流量，那么真实可用量会下降很多。相反，有些年付套餐看起来便宜，却不适合没有测试过的新用户。比较稳妥的做法，是先买短周期套餐，连续三天记录真实任务表现，再决定是否升档或长期续费。"
      ]],
      ["线路和节点要服务于真实任务", [
        "IEPL、IPLC、BGP 中转、直连、原生 IP、流媒体解锁这些词都值得看，但不能当成唯一结论。对普通用户来说，香港、日本、新加坡、台湾、美国这些常用地区是否稳定，比节点列表写了多少国家更重要。",
        "测试时不要只跑测速网站。更贴近真实体验的项目包括：浏览器打开速度、AI 服务是否频繁验证、YouTube 是否自动降清晰度、Telegram 收发是否延迟、GitHub 是否能稳定拉取、订阅是否能正常更新。把这些任务跑一遍，比看单次测速截图更有参考价值。"
      ]],
      ["公告、教程和售后决定长期体验", [
        "稳定机场不只是线路稳定，也包括服务商能不能把变更说清楚。购买前建议检查官网公告、备用域名、Telegram 频道、工单入口、退款说明和客户端教程。如果入口混乱、公告长期不更新、教程缺失，即使价格很低，也应该降低预算。",
        "最终的筛选顺序可以很简单：先按预算排除明显不适合的套餐，再按使用场景挑 2 到 3 个候选，接着短周期测试核心任务，最后保留一个主力和一个备用。这样既能覆盖机场推荐、梯子推荐这类泛搜索需求，也能真正落到自己的网络环境里。"
      ]]
    ],
    faq: [
      ["机场推荐榜单第一名一定最适合我吗？", "不一定。榜单只能帮助缩小候选范围，最终还要看你的运营商、地区、常用节点、使用时段和任务类型。"],
      ["第一次买机场应该月付还是年付？", "建议先月付或短周期测试，至少连续三天覆盖晚高峰和常用任务，再考虑季度或年付。"],
      ["低价机场能不能当主力？", "可以测试，但要重点看倍率、晚高峰、公告和售后。如果核心任务不稳定，更适合作为备用。"]
    ]
  },
  "ladder-vs-airport-recommendation": {
    description: "解释梯子推荐、机场推荐、VPN 和代理订阅的区别，帮助用户按设备、预算、客户端和访问场景选择更合适的科学上网工具。",
    keywords: "梯子推荐,机场推荐,科学上网机场,VPN区别,代理订阅,Clash机场,Shadowrocket机场,机场客户端,稳定机场,好用机场",
    summary: "这篇文章把用户常说的梯子、机场、VPN、代理订阅放在一起比较，重点说明它们在使用门槛、节点选择、价格结构和风险控制上的差异。",
    sections: [
      ["这些词为什么会混在一起", [
        "很多人搜索梯子推荐，其实想找的是能稳定访问海外服务的工具；搜索机场推荐，则更偏向订阅制节点、客户端导入和套餐对比。两者在日常语境里经常混用，但具体到购买和配置时，差异会影响体验。",
        "机场通常提供订阅链接，用户把链接导入 Clash、Mihomo、Shadowrocket、Stash 或 sing-box 等客户端，再按规则选择节点。VPN 则更像完整应用，安装后直接登录使用。前者可控性更强，后者上手更简单，适合的人群并不完全一样。"
      ]],
      ["机场的优势和门槛", [
        "机场订阅的优势是节点选择更细，套餐价格区间更丰富，也更容易准备主力和备用组合。你可以按香港、日本、新加坡、美国等地区切换，也能根据 AI、视频、社交、开发者平台等任务选择不同节点。",
        "门槛在于客户端、订阅更新、规则模式和节点命名需要学习。新手如果不了解全局代理、规则代理、直连、DNS、倍率和流量重置，就容易把本地配置问题误判成机场不好用。因此科普知识和教程完整度也是选择依据。"
      ]],
      ["VPN 和一键工具适合谁", [
        "如果你只希望在手机或电脑上打开一个应用，不想研究客户端规则，那么一键 VPN 或简单工具会更省心。但这类产品往往价格更固定，节点可调空间更小，遇到某个服务不稳定时，排查维度也更有限。",
        "如果你需要同时照顾 AI 工具、视频、远程办公、GitHub、Telegram、流媒体和家庭多设备，机场订阅的灵活性通常更强。不过灵活也意味着责任更多：你需要学会保存备用入口、更新订阅、固定重要账号节点，并记录常用任务表现。"
      ]],
      ["怎样按搜索意图选择", [
        "搜索梯子推荐时，可以先问自己是否接受配置客户端。如果不接受，优先找教程简单的一键工具；如果接受，就进入机场推荐的筛选逻辑，看套餐、节点、线路、公告和售后。",
        "搜索机场推荐时，不要只看具体服务商名字。更好的路径是先阅读泛知识：稳定机场怎么看、便宜机场怎么筛、IEPL/IPLC 有什么区别、手机和电脑怎么配置。理解这些之后，再进入具体机场测评页，选择会稳很多。"
      ]]
    ],
    faq: [
      ["梯子推荐和机场推荐是同一个意思吗？", "日常搜索里经常接近，但机场推荐更强调订阅节点、客户端导入、套餐和线路对比。"],
      ["新手适合机场还是 VPN？", "如果愿意跟教程配置客户端，机场更灵活；如果只想一键使用，VPN 或简单工具更省心。"],
      ["机场是不是一定比 VPN 便宜？", "不一定。机场价格区间更大，低价选择更多，但也需要自己承担配置和筛选成本。"]
    ]
  },
  "stable-airport-checklist": {
    description: "稳定机场判断清单，从晚高峰、节点地区、线路类型、订阅更新、公告售后、账号风控和备用方案评估机场是否适合长期使用。",
    keywords: "稳定机场,好用机场,机场推荐,机场测速,机场节点,机场订阅,专线机场,机场公告,机场售后,梯子推荐",
    summary: "这篇文章把稳定机场拆成可验证指标，帮助用户避免只看测速图和宣传词，建立长期使用前的检查清单。",
    sections: [
      ["稳定不是单次速度最快", [
        "很多机场测速截图能在某一刻跑出很高数字，但稳定机场更看重连续表现。晚高峰、周末、不同运营商、不同设备和不同任务下是否仍然可用，才是长期体验的关键。",
        "建议把测试分成三个时间段：白天、晚高峰和周末。每个时间段固定测试网页、AI、视频、社交、下载和订阅更新。只要核心任务能连续三天通过，就比一次漂亮测速更值得参考。"
      ]],
      ["节点地区要覆盖主场景", [
        "稳定机场不一定要节点很多，但常用地区要可靠。大多数用户优先关注香港、日本、新加坡、台湾、美国；如果有流媒体或跨境办公需求，再看英国、德国、加拿大、澳大利亚等地区。",
        "节点命名也要看清楚。倍率、线路、解锁、入口和维护状态常常写在节点名里。如果节点很多但命名混乱、倍率不清楚、维护不公告，实际使用时反而会增加排查成本。"
      ]],
      ["订阅和客户端稳定同样重要", [
        "有些问题并不是线路坏了，而是订阅没有更新、规则文件冲突、客户端版本太旧、DNS 设置异常或系统代理残留。稳定机场应该提供清楚的一键导入教程、订阅更新说明和常见客户端排查方式。",
        "电脑端建议保留一个主客户端和一个备用客户端；手机端则要注意后台权限、系统代理和网络切换。只要能快速判断是节点问题还是本地配置问题，日常使用就会省很多时间。"
      ]],
      ["售后透明度是稳定的一部分", [
        "真正长期可用的机场，通常会把维护、入口迁移、套餐调整和节点故障说清楚。公告频道是否持续更新、工单是否能回复、备用域名是否好找，都会影响使用信心。",
        "如果服务商只强调高速、不限速、大流量，却没有公告、教程、退款规则和联系方式，就要谨慎。稳定机场的判断不是单点，而是一组证据：技术表现、信息透明、排查便利和风险可控。"
      ]]
    ],
    faq: [
      ["稳定机场最重要的指标是什么？", "核心任务在晚高峰连续可用，比单次测速峰值更重要。"],
      ["节点越多是不是越稳定？", "不是。常用地区稳定、倍率清楚、维护透明，比节点数量更重要。"],
      ["怎样快速判断机场不适合长期用？", "公告不清楚、订阅常失效、晚高峰核心任务失败、工单无回应，都应降低长期续费意愿。"]
    ]
  },
  "cheap-airport-filter": {
    description: "便宜机场筛选方法，说明低价机场、年付套餐、大流量套餐和备用机场的真实成本，帮助用户避开只看价格的常见误区。",
    keywords: "便宜机场,低价机场,机场推荐,机场价格,机场套餐,机场试用,机场备用,稳定机场,机场排行,梯子推荐",
    summary: "这篇文章针对低预算用户，说明怎样比较便宜机场的真实成本，什么时候适合低价套餐，什么时候应该为稳定性多留预算。",
    sections: [
      ["便宜机场适合什么场景", [
        "便宜机场最适合三个场景：新手试用、轻量访问和备用网络。如果只是偶尔查资料、收发消息、更新订阅或临时登录海外服务，低价月付套餐可以降低试错成本。",
        "但如果每天依赖 AI 工具、视频会议、远程办公或流媒体，最低价未必划算。因为一旦晚高峰不稳定、节点频繁维护或订阅失效，节省下来的费用很快会被排查时间抵消。"
      ]],
      ["看清低价背后的限制", [
        "低价套餐常见限制包括流量少、倍率高、设备数少、节点地区少、晚高峰拥塞、协议选择少或售后较弱。购买前要把这些限制写下来，而不是只看每月几元。",
        "年付低价尤其要谨慎。年付折算月费可能很好看，但如果没有短测就直接购买，后续遇到线路不适合、客户端不兼容或账号频繁验证，退款和迁移成本都会更高。"
      ]],
      ["怎样比较真实成本", [
        "比较真实成本时，可以把套餐拆成四项：可用流量、常用节点倍率、核心任务成功率、售后排查成本。一个 10 元 100GB 的套餐，如果常用节点 2 倍倍率且晚高峰经常卡顿，未必比 20 元 200GB 稳定套餐划算。",
        "也可以按任务估算预算。比如每周需要视频、AI、下载和社交各多少流量，是否多人共享，是否需要流媒体解锁。用任务反推套餐，会比直接追低价更准确。"
      ]],
      ["低价组合的更稳用法", [
        "更稳的方式是主力机场加低价备用。主力负责核心任务，备用负责入口维护、临时切换和低频场景。备用不必追求大流量，重点是入口、线路和通知渠道不要和主力完全重合。",
        "便宜机场不是不能买，而是要带着边界使用：先短测、再月付、少长付、留备用、定期复查。只要把风险控制住，低价套餐可以成为机场推荐列表里很实用的一部分。"
      ]]
    ],
    faq: [
      ["便宜机场可以长期用吗？", "可以，但前提是核心任务连续测试稳定，并且公告、订阅和售后都能接受。"],
      ["年付低价机场值得买吗？", "没有短测前不建议直接年付，先用月付或试用验证晚高峰和常用任务。"],
      ["低价机场最适合当什么？", "更适合当备用、轻量访问或新手试错入口。"]
    ]
  },
  "ai-service-guide": {
    description: "AI 工具访问机场选择指南，覆盖 ChatGPT、Claude、Gemini、GitHub、账号风控、节点地区、IP 质量和稳定机场测试方法。",
    keywords: "AI机场,ChatGPT机场,Claude机场,机场推荐,稳定机场,机场节点,账号风控,机场订阅,梯子推荐,GitHub访问",
    summary: "这篇文章面向经常使用 AI 和开发者服务的用户，重点说明节点固定、地区一致、晚高峰稳定和账号安全如何影响体验。",
    sections: [
      ["AI 工具为什么更挑节点", [
        "AI 工具和开发者平台通常比普通网页更敏感。它们会关注登录地区、IP 信誉、账号历史、请求频率和浏览器环境。如果频繁在多个国家节点之间切换，就可能触发验证、限制或异常登录提醒。",
        "因此 AI 机场不是只要速度快就够了。更重要的是节点干净、地区稳定、延迟可接受、晚高峰不频繁断连，并且服务商在常用地区有足够可替换节点。"
      ]],
      ["固定地区比频繁切换更安全", [
        "使用 ChatGPT、Claude、Gemini、GitHub、Google Workspace 等服务时，建议为重要账号固定少数节点。例如日常固定日本或美国节点，不要上午香港、下午美国、晚上欧洲来回切。",
        "如果某个节点突然不可用，优先换同地区、同线路或同服务商的邻近节点，而不是直接跨洲切换。这样可以减少账号风控波动，也更容易判断是节点问题还是平台策略变化。"
      ]],
      ["测试 AI 场景要看完整链路", [
        "测试时不要只看 AI 页面能不能打开，还要看登录、对话、上传文件、生成较长回答、调用插件或访问开发者文档是否顺畅。很多节点打开首页没问题，但在持续会话或高峰时会断。",
        "开发者还要测试 GitHub clone、npm、Docker、API 文档、云平台控制台和邮件验证。把这些任务放进三天测试表，才能知道这个机场是否适合长期工作使用。"
      ]],
      ["账号安全和备用方案", [
        "AI 场景下，机场订阅链接和账号密码都要分开保护。不要把订阅链接发到公开群、在线转换站或云笔记公开页；重要账号不要复用密码，也不要在陌生客户端里输入敏感信息。",
        "建议至少准备一个备用机场或备用节点组。当主力节点维护时，备用方案可以保证工作不中断。备用不需要最高价格，但要能完成登录、搜索、文档访问和基础 AI 对话。"
      ]]
    ],
    faq: [
      ["AI 工具访问应该选哪个地区节点？", "没有固定答案，通常优先测试美国、日本、新加坡等常见地区，并保持重要账号地区稳定。"],
      ["频繁换节点会影响 AI 账号吗？", "可能会。重要账号尽量固定少数节点，避免一天内跨多个国家登录。"],
      ["AI 机场需要大流量吗？", "纯文本对话流量不大，但视频、文件、开发者平台和多人共享会增加消耗。"]
    ]
  },
  "backup-airport": {
    description: "主力机场和备用机场搭配指南，说明为什么要准备备用机场、如何分散入口线路、怎样控制预算和维护机场收藏清单。",
    keywords: "机场备用,备用机场,机场推荐,稳定机场,便宜机场,机场收藏,机场入口,机场订阅,梯子推荐,机场维护",
    summary: "这篇文章说明备用机场的价值不是追求更强，而是在主力维护、入口变化或订阅异常时保持最低可用连接。",
    sections: [
      ["为什么不能只依赖一个机场", [
        "机场服务会遇到节点维护、入口迁移、面板调整、支付通道变化、订阅更新异常等情况。即使主力机场平时很稳，也可能在某个时间段无法满足所有任务。",
        "备用机场的价值，就是在主力出问题时保留一条可用通道。它不一定要流量很大，也不一定要线路最豪华，但入口、公告渠道和节点地区最好不要与主力完全重合。"
      ]],
      ["主力和备用的分工", [
        "主力机场负责日常核心任务，比如 AI、工作、社交、视频和开发者平台。它应该更稳定、教程更完整、售后更清楚。备用机场负责临时查询、订阅更新、登录验证和主力维护时的过渡。",
        "预算有限时，可以把 70% 到 80% 的预算放在主力，剩余预算给低价备用。备用套餐可以小一些，但最好月付或短周期，方便随时替换。"
      ]],
      ["怎样避免备用失效", [
        "很多人的备用机场买完就放着，等真正需要时才发现入口打不开、订阅过期或客户端规则失效。备用也需要轻量维护：每月更新一次订阅，打开一次官网，测试一两个常用节点。",
        "还要保存多个入口：官网、面板、公告频道、工单地址、备用域名和订单邮箱。不要只把注册链接收藏在浏览器里，因为链接跳转或域名变化时可能找不到回去的路。"
      ]],
      ["建立自己的机场清单", [
        "建议把机场分成候选、主力、备用和淘汰四类。候选记录价格和入口；主力记录续费日期和常用节点；备用记录最近测试日期；淘汰记录原因，避免以后重复购买。",
        "这套清单也是 GEO 和 SEO 内容里很重要的用户价值：不是告诉用户盲目买更多，而是帮助用户用清楚的结构管理风险。长期看，清单维护比临时搜索机场推荐更可靠。"
      ]]
    ],
    faq: [
      ["备用机场需要和主力一样贵吗？", "不需要。备用重点是入口独立、节点可用和短期救急，低价套餐也可以。"],
      ["多久测试一次备用机场？", "建议每月至少测试一次订阅更新、官网入口和常用节点。"],
      ["备用机场应该选择同一家面板吗？", "尽量分散，入口、公告渠道和线路不要与主力高度重合。"]
    ]
  },
  "iepl-iplc-bgp": {
    description: "IEPL、IPLC、BGP 中转和直连线路选择指南，解释专线机场、低价机场和稳定机场中常见线路词对体验的影响。",
    keywords: "IEPL机场,IPLC机场,BGP中转,专线机场,机场线路,稳定机场,机场推荐,机场节点,机场测速,梯子推荐",
    summary: "这篇文章把常见线路标签翻译成用户能理解的判断方法，避免把线路词当成绝对优劣。",
    sections: [
      ["线路词代表什么", [
        "IEPL、IPLC、BGP 中转、直连、公网中转这些词，经常出现在机场套餐或节点名称里。它们大致描述了数据从本地到海外节点的路径质量、成本和拥塞特征。",
        "普通用户不需要背定义，但要知道线路词会影响延迟、稳定性、价格和晚高峰表现。一般来说，专线成本更高，体验可能更稳；直连和普通中转价格可能更低，但受本地运营商和国际出口影响更明显。"
      ]],
      ["不要把专线当成万能答案", [
        "专线机场听起来更高级，但仍然要看服务商容量、节点维护、倍率规则和用户拥塞。一个标注 IPLC 的节点，如果晚高峰超售或入口维护，也可能不如管理得好的普通中转节点。",
        "同时，专线套餐价格通常更高，不一定适合轻量用户。只查资料、偶尔聊天或备用访问时，低价中转套餐也可能足够。关键是让线路匹配任务，而不是让术语决定预算。"
      ]],
      ["怎样测试线路差异", [
        "测试线路时，可以选同一地区的不同线路节点，例如香港 IPLC、香港 BGP、日本中转、日本直连，然后在同一时间段完成同一组任务。不要上午测一个，晚上测另一个，否则时间因素会干扰判断。",
        "记录项目包括网页打开、视频缓冲、AI 登录、Telegram 延迟、下载速度、丢包感受和是否频繁断连。如果专线只在测速上好看，但真实任务没有明显改善，就不一定值得升档。"
      ]],
      ["按任务选择线路", [
        "AI、会议、远程办公和开发者平台更重视稳定和延迟，适合优先测试专线或质量较好的中转。流媒体和下载更看带宽、解锁和流量成本。备用访问则更看入口可靠和价格。",
        "最终可以形成自己的节点分工：工作任务固定低延迟节点，视频任务使用解锁节点，下载任务错峰使用大流量节点，备用任务保留低价节点。这样比盲目追某个线路词更实用。"
      ]]
    ],
    faq: [
      ["IPLC 一定比 BGP 快吗？", "不一定。线路类型只是参考，还要看容量、地区、晚高峰和服务商维护。"],
      ["专线机场适合所有人吗？", "不一定。高频工作和低延迟任务更值得考虑，轻量备用用户可以先看低价套餐。"],
      ["线路应该怎么测试？", "同一时间、同一地区、同一任务对比不同线路，连续几天记录表现。"]
    ]
  },
  "mobile-airport-guide": {
    description: "手机端机场配置指南，覆盖 iPhone、Android、Shadowrocket、Stash、sing-box、订阅更新、节点固定和移动网络切换问题。",
    keywords: "手机机场,Shadowrocket机场,Stash教程,sing-box机场,机场客户端,机场订阅,机场推荐,梯子推荐,移动网络,稳定机场",
    summary: "这篇文章聚焦手机端使用机场时最常见的网络切换、后台、地区识别和订阅更新问题。",
    sections: [
      ["手机端和电脑端不一样", [
        "手机端机场使用会受到更多环境变化影响。Wi-Fi、蜂窝网络、公司网络、酒店网络之间切换时，延迟、DNS、地区识别和连接保持都可能变化。电脑上稳定的节点，手机上未必同样稳定。",
        "此外，手机系统会管理后台应用和网络权限。如果客户端被系统限制后台运行，或者切换网络后没有重新连接，就会出现看似节点失效、实际是本地状态异常的问题。"
      ]],
      ["客户端选择和订阅导入", [
        "iPhone 用户常见选择包括 Shadowrocket、Stash、Quantumult X 等；Android 用户常见选择包括 Clash Meta 系客户端、sing-box、v2rayNG 等。新手优先选择机场教程覆盖最完整的客户端。",
        "导入订阅后，要确认自动更新、策略组、规则模式和节点选择是否正确。不要长期使用过期订阅，也不要把订阅链接上传到不可信转换站。手机端排查第一步，通常就是更新订阅并重新选择节点。"
      ]],
      ["移动端更需要固定节点", [
        "手机经常登录社交、邮箱、支付、AI 和短视频账号，频繁切换国家节点更容易触发地区异常。重要账号建议固定少数常用节点，尤其不要短时间内跨多个国家登录。",
        "如果要测试新节点，可以先用浏览器或非重要账号验证，再切换到主力账号。对于 TikTok、流媒体和 AI 服务，系统地区、SIM 卡、账号历史和节点地区也要尽量一致。"
      ]],
      ["常见问题排查顺序", [
        "手机端遇到不能用，可以按顺序排查：切换同地区节点、更新订阅、重启客户端、切换规则/全局模式、重连网络、检查系统 VPN 权限，最后再联系工单。",
        "如果只有某个应用打不开，可能是规则或地区识别问题；如果所有应用都不能用，才更像节点或订阅问题。把这个区别说清楚，工单回复会更有效。"
      ]]
    ],
    faq: [
      ["手机端机场应该用规则还是全局？", "日常建议规则模式，排查问题时可以临时全局对比。"],
      ["为什么 Wi-Fi 能用，蜂窝网络不能用？", "可能和运营商网络、DNS、IPv6、客户端后台或节点入口有关，需要分层排查。"],
      ["手机端要不要频繁换节点？", "不建议。重要账号尽量固定少数稳定节点，减少地区波动。"]
    ]
  },
  "desktop-airport-guide": {
    description: "电脑端机场客户端选择指南，比较 Clash、Mihomo、sing-box 等工具的使用重点，帮助用户稳定导入订阅、配置规则和排查问题。",
    keywords: "电脑机场,Clash机场,Mihomo教程,sing-box机场,机场客户端,机场订阅,机场推荐,稳定机场,梯子推荐,代理规则",
    summary: "这篇文章帮助电脑用户理解客户端、订阅、规则模式、系统代理和日志排查之间的关系。",
    sections: [
      ["电脑端最重要的是可排查", [
        "电脑端机场客户端很多，新手容易只看界面是否好看。真正长期使用时，更重要的是订阅导入是否稳定、规则是否清楚、系统代理是否可控、日志是否能帮助判断问题。",
        "Clash 系、Mihomo、sing-box 等工具各有生态。选择时不必追求最复杂，而要看机场是否提供对应教程，自己是否能看懂节点选择、规则模式、全局模式和日志信息。"
      ]],
      ["订阅、规则和系统代理", [
        "导入订阅后，客户端会生成节点和策略组。规则模式会按域名或规则决定哪些流量走代理，哪些直连；全局模式则更适合临时排查。很多打不开的问题，来自规则没有命中或系统代理状态不一致。",
        "建议新手保留一份基础规则，不要频繁导入不明配置。更新订阅前可以先备份当前配置；遇到问题时，先确认系统代理开关、浏览器代理插件和客户端规则没有互相冲突。"
      ]],
      ["用日志定位问题", [
        "电脑端相比手机端最大的优势，是更容易看日志。连接失败、DNS 解析失败、证书问题、规则命中错误、节点超时，都可能在日志里留下线索。",
        "联系工单时，把时间、节点名、客户端版本、系统版本、网络环境和日志片段整理好，会比简单说不能用更有效。服务商也更容易判断是节点故障、订阅问题还是本地配置。"
      ]],
      ["工作场景的稳定配置", [
        "如果电脑主要用于工作，建议固定一组常用节点，给浏览器、开发工具、AI 工具和系统更新分别测试。不要为了测速频繁切换节点，否则账号风控和规则缓存都会变复杂。",
        "也可以准备一个备用客户端或备用配置。当主客户端升级异常、配置损坏或规则冲突时，备用方案能快速恢复访问。对重度用户来说，这比追求单一客户端功能更重要。"
      ]]
    ],
    faq: [
      ["电脑端新手用哪个客户端？", "优先用机场教程覆盖最完整、更新稳定、日志清楚的客户端。"],
      ["规则模式和全局模式怎么选？", "日常用规则模式，排查时临时全局，对比是否规则导致问题。"],
      ["为什么浏览器能用但软件不能用？", "可能是系统代理、应用代理设置或规则命中不同，需要分别检查。"]
    ]
  },
  "streaming-unlock": {
    description: "流媒体解锁机场测试指南，说明 Netflix、Disney+、YouTube、TikTok 等服务如何受节点地区、DNS、账号和设备环境影响。",
    keywords: "流媒体解锁,Netflix机场,Disney+机场,YouTube机场,TikTok地区,机场推荐,机场节点,DNS泄露,稳定机场,梯子推荐",
    summary: "这篇文章说明流媒体解锁不是看到节点名写着解锁就结束，而要用固定清单测试播放、清晰度、账号地区和 DNS。",
    sections: [
      ["流媒体解锁为什么不稳定", [
        "流媒体平台会综合 IP 地区、DNS、账号注册地区、支付资料、设备环境和历史记录判断可播放内容。机场节点名写着 Netflix 或 Disney+ 解锁，只说明它可能被服务商测试过，不代表长期一定稳定。",
        "平台策略会变化，节点 IP 也可能被识别。因此流媒体解锁要接受动态复查：今天能播，不等于下个月还同样可用；某个地区能播，也不代表所有片库都完整。"
      ]],
      ["测试不能只打开首页", [
        "很多用户只打开 Netflix 首页或 YouTube 首页，就认为节点可用。更可靠的测试是搜索指定内容、进入播放页、播放几分钟、切换清晰度、观察是否出现代理提示或地区限制。",
        "YouTube 还要看 1080p、4K、直播和长视频缓冲；TikTok 要看地区推荐是否稳定；Disney+、HBO、Prime Video 等平台则要看登录、片库和播放是否同时正常。"
      ]],
      ["DNS 和账号地区的影响", [
        "如果 DNS 泄露或解析地区混乱，可能出现节点是美国、页面却判断到其他地区的情况。客户端规则、系统 DNS、浏览器缓存和路由器设置都可能影响结果。",
        "账号地区也很重要。长期使用某个地区账号，却频繁用其他国家节点登录，可能导致推荐、片库或验证异常。流媒体用户比普通网页用户更需要地区一致性。"
      ]],
      ["怎样选择流媒体机场", [
        "选择流媒体机场时，不要只看宣传页写全解锁。更实际的是看常用地区是否有多个可替换节点、公告是否说明解锁维护、套餐流量是否够视频使用、晚高峰带宽是否稳定。",
        "建议建立固定测试清单：Netflix 指定片名、YouTube 4K、Disney+ 登录播放、TikTok 推荐地区、DNS 检查和晚高峰缓冲。每次换机场或续费前跑一遍，就能避免只靠节点名判断。"
      ]]
    ],
    faq: [
      ["节点名写 Netflix 解锁就一定能看吗？", "不一定。还要测试登录、片库、播放、清晰度和是否出现代理提示。"],
      ["流媒体更看速度还是 IP？", "两者都重要。IP 决定是否解锁，速度和稳定性决定能否流畅播放。"],
      ["为什么同一节点今天能看明天不能看？", "平台识别策略、节点 IP、DNS 和服务商维护都会变化，需要动态复查。"]
    ]
  }
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, "utf8");
}

function cleanGeneratedHtml(dir, keepNames) {
  if (!fs.existsSync(dir)) return;
  const keep = new Set(keepNames);
  for (const fileName of fs.readdirSync(dir)) {
    if (fileName.endsWith(".html") && !keep.has(fileName)) {
      fs.unlinkSync(path.join(dir, fileName));
    }
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function prefixFor(pathName) {
  if (pathName === "/") return "";
  const clean = pathName.replace(/^\/+|\/+$/g, "");
  const depth = clean.includes(".") ? clean.split("/").length - 1 : clean.split("/").length;
  return "../".repeat(depth);
}

function localHref(prefix, target) {
  if (target === "") return `${prefix}index.html`;
  if (target.endsWith("/")) return `${prefix}${target}index.html`;
  return `${prefix}${target}`;
}

function relink(html, prefix) {
  return html
    .replace(/href="\/([^"#?]*)"/g, (_, target) => `href="${localHref(prefix, target)}"`)
    .replace(/src="\/([^"#?]*)"/g, (_, target) => `src="${localHref(prefix, target)}"`);
}

function breadcrumbTrail(pathName, title) {
  if (pathName === "/") return [{ name: "首页", item: SITE_URL + "/" }];
  const trail = [{ name: "首页", item: SITE_URL + "/" }];
  if (pathName.startsWith("/posts/")) {
    trail.push({ name: "机场测评", item: `${SITE_URL}/reviews/` });
  } else if (pathName.startsWith("/knowledge/") && pathName !== "/knowledge/") {
    trail.push({ name: "科普知识", item: `${SITE_URL}/knowledge/` });
  } else if (pathName === "/airport/") {
    trail.push({ name: "机场榜单", item: `${SITE_URL}/airport/` });
    return trail;
  } else if (pathName === "/reviews/") {
    trail.push({ name: "机场测评", item: `${SITE_URL}/reviews/` });
    return trail;
  } else if (pathName === "/knowledge/") {
    trail.push({ name: "科普知识", item: `${SITE_URL}/knowledge/` });
    return trail;
  } else if (pathName === "/rank/") {
    trail.push({ name: "机场排行", item: `${SITE_URL}/rank/` });
    return trail;
  } else if (pathName === "/about/") {
    trail.push({ name: "关于", item: `${SITE_URL}/about/` });
    return trail;
  }
  trail.push({ name: title, item: `${SITE_URL}${pathName}` });
  return trail;
}

function commonSchema(title, description, pathName) {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/assets/favicon.svg`
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: "机场推荐、机场测评、机场价格和订阅使用知识整理。",
      keywords: SEO_KEYWORDS,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "zh-CN"
    },
    {
      "@type": pathName === "/" || pathName.endsWith("/") ? "CollectionPage" : "WebPage",
      "@id": `${SITE_URL}${pathName}#webpage`,
      url: `${SITE_URL}${pathName}`,
      name: title,
      description,
      keywords: SEO_KEYWORDS,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      inLanguage: "zh-CN"
    }
  ];

  const breadcrumbs = breadcrumbTrail(pathName, title);
  if (breadcrumbs.length > 1) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}${pathName}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item
      }))
    });
  }

  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>`;
}

function articleSchema(title, description, pathName) {
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    keywords: SEO_KEYWORDS,
    url: `${SITE_URL}${pathName}`,
    image: `${SITE_URL}/assets/favicon.svg`,
    datePublished: TODAY,
    dateModified: TODAY,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/favicon.svg` }
    },
    inLanguage: "zh-CN",
    mainEntityOfPage: `${SITE_URL}${pathName}`
  })}</script>`;
}

function faqSchema(faq) {
  if (!faq || !faq.length) return "";
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  })}</script>`;
}

function itemListSchema(name, description, pathName, items) {
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url: `${SITE_URL}${pathName}`,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${SITE_URL}/posts/${item.slug}.html`
    }))
  })}</script>`;
}

function knowledgeListSchema() {
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "机场推荐与梯子推荐科普文章",
    description: "围绕机场推荐、梯子推荐、稳定机场、便宜机场、线路、客户端、AI 和流媒体解锁整理的原创科普文章。",
    url: `${SITE_URL}/knowledge/`,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: knowledgeTopics.length,
    itemListElement: knowledgeTopics.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: `${SITE_URL}/knowledge/${item.slug}.html`
    }))
  })}</script>`;
}

function layout({ title, description, pathName, content, extraHead = "", keywords = SEO_KEYWORDS }) {
  const prefix = prefixFor(pathName);
  const canonical = `${SITE_URL}${pathName}`;
  const sourceFooter = pathName === "/about/" ? "" : `    <p>本站内容为原创整理，围绕机场套餐、使用场景、风险提醒和新手科普提供购买前参考，不代表任何服务商承诺。</p>
`;
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} | ${SITE_NAME}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="keywords" content="${escapeHtml(keywords)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="author" content="${SITE_NAME}">
  <meta name="theme-color" content="#ff5148">
  <link rel="canonical" href="${canonical}">
  <link rel="stylesheet" href="/assets/style.css">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="alternate" type="application/rss+xml" title="${SITE_NAME} RSS" href="/feed.xml">
  <meta property="og:type" content="${pathName.endsWith("/") ? "website" : "article"}">
  <meta property="og:locale" content="zh_CN">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE_URL}/assets/favicon.svg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${SITE_URL}/assets/favicon.svg">
  ${commonSchema(title, description, pathName)}
  ${extraHead}
</head>
<body>
  <header class="site-header">
    <a class="brand" href="/" aria-label="${SITE_NAME}">
      <span class="brand-mark">GO</span>
      <span class="brand-name">TiziSpeed</span>
      <span class="brand-slogan">稳定、好用<br>专业的机场推荐平台</span>
    </a>
    <nav class="top-nav" aria-label="主导航">
      <a href="/">首页</a>
      <a href="/airport/">机场榜单</a>
      <a href="/reviews/">机场测评</a>
      <a href="/knowledge/">科普知识</a>
      <a href="/about/">关于</a>
    </nav>
  </header>
  <main>
${content}
  </main>
  <footer class="site-footer">
    <p>${SITE_NAME} 只整理公开信息和选购思路，不运营节点服务。价格、套餐、可用入口以服务商实时页面为准。</p>
${sourceFooter}
    <p><a href="/sitemap.xml">Sitemap</a> · <a href="/feed.xml">RSS</a> · <a href="/robots.txt">Robots</a></p>
  </footer>
</body>
</html>
`;
  return relink(html, prefix);
}

function card(item) {
  return `<a class="post-card" href="/posts/${item.slug}.html">
    <span class="tag">${item.tag}</span>
    <h3>${item.name}</h3>
    <p>${item.price}</p>
    <p>${item.angle}</p>
  </a>`;
}

function knowledgeCard(item) {
  return `<a class="post-card" href="/knowledge/${item.slug}.html">
    <span class="tag">${item.tag}</span>
    <h3>${item.title}</h3>
    <p>${item.intro}</p>
  </a>`;
}

function airportThumbTitle(name) {
  const clean = name.trim().replace(/\s+/g, " ");
  if (clean.endsWith("机场")) return clean;
  return `${clean.replace(/(?:加速器|VPN)$/i, "")}机场`;
}

function knowledgeThumbTitle(item) {
  const labels = {
    "airport-recommendation-guide": "机场推荐",
    "ladder-vs-airport-recommendation": "梯子推荐",
    "stable-airport-checklist": "稳定机场",
    "cheap-airport-filter": "便宜机场",
    "ai-service-guide": "AI机场",
    "backup-airport": "备用机场",
    "iepl-iplc-bgp": "专线线路",
    "mobile-airport-guide": "手机配置",
    "desktop-airport-guide": "电脑客户端",
    "streaming-unlock": "流媒体",
    "airport-speed-test-myths": "测速误区",
    "subscription-converter-risk": "订阅转换",
    "airport-payment-privacy": "支付风控",
    "telegram-notice-check": "公告通知",
    "airport-domain-backup": "备用域名",
    "ss-vmess-trojan-hysteria": "协议科普",
    "dns-leak-check": "DNS泄露",
    "split-tunnel-guide": "代理模式",
    "family-sharing-airport": "家庭共享",
    "student-airport-budget": "学生预算",
    "travel-roaming-airport": "出差漫游",
    "gaming-latency-airport": "游戏加速",
    "tiktok-region-airport": "地区识别",
    "account-risk-ip-change": "账号风控",
    "router-airport-setup": "路由配置",
    "ipv6-airport-issue": "IPv6问题",
    "trial-plan-design": "试用计划",
    "node-name-reading": "节点命名",
    "support-ticket-guide": "工单沟通",
    "airport-watchlist": "收藏清单"
  };
  return labels[item.slug] || item.tag || item.title;
}

function thumb(title, index, tone = "red") {
  const short = title.endsWith("机场") || title.includes("榜单") || title.includes("机场推荐")
    ? title.slice(0, 10)
    : title.replace(/机场|加速器|VPN|怎么样|推荐|知识|教程/g, "").slice(0, 8) || "机场推荐";
  return `<div class="thumb thumb-${tone}" aria-hidden="true">
    <span>${escapeHtml(short)}</span>
  </div>`;
}

function feedRow({ title, href, excerpt, tag, meta, thumbTitle }, index, pinned = false, tone = "red") {
  return `<article class="feed-row">
    <a class="feed-thumb" href="${href}">${thumb(thumbTitle || title, index, tone)}</a>
    <div class="feed-copy">
      <h2>${pinned ? '<span class="pin">置顶</span>' : ""}<a href="${href}">${title}</a></h2>
      <p>${excerpt}</p>
      <div class="feed-meta"><span>${tag}</span><span>${meta}</span></div>
    </div>
  </article>`;
}

function airportFeedRow(item, index, pinned = false) {
  return feedRow({
    title: `${item.name} 机场评测：${item.price} 套餐与注册链接`,
    href: `/posts/${item.slug}.html`,
    excerpt: `${item.focus} ${item.scenario}`,
    tag: item.tag,
    meta: item.price,
    thumbTitle: airportThumbTitle(item.name),
  }, index, pinned, index % 5 === 3 ? "green" : "red");
}

function airportListRow(item, index) {
  return `<article class="feed-row airport-list-row">
    <a class="feed-thumb" href="/posts/${item.slug}.html">${thumb(airportThumbTitle(item.name), index, index % 5 === 3 ? "green" : "red")}</a>
    <div class="feed-copy">
      <h2><span class="rank-num">${index + 1}</span><a href="/posts/${item.slug}.html">${item.name} 机场详情简介</a></h2>
      <p>${item.focus} ${item.watch}</p>
      <div class="feed-meta">
        <span>${item.tag}</span>
        <span>${item.price}</span>
        <a href="/posts/${item.slug}.html">查看详情</a>
        <a href="${escapeHtml(item.url)}" target="_blank" rel="nofollow sponsored noopener">注册链接</a>
      </div>
    </div>
  </article>`;
}

function monthlyPrice(item) {
  const price = item.price;
  const year = price.match(/(\d+(?:\.\d+)?)\s*元\s*\/\s*年/);
  if (year) return Number(year[1]) / 12;
  const direct = price.match(/(\d+(?:\.\d+)?)\s*元/);
  if (direct) return Number(direct[1]);
  const yen = price.match(/¥\s*(\d+(?:\.\d+)?)/);
  if (yen) {
    const value = Number(yen[1]);
    return price.includes("年") ? value / 12 : value;
  }
  return 999;
}

function airportTableRows(items) {
  return items.map((item) => `<tr>
    <td><a href="/posts/${item.slug}.html">${item.name}</a></td>
    <td>${monthlyPrice(item) <= 12 ? "否" : "需自行确认"}</td>
    <td>${item.price}</td>
    <td><a href="/posts/${item.slug}.html">[查看评测]</a></td>
  </tr>`).join("");
}

function priceTable(item) {
  const rows = airportPlanRows[item.slug] || [["基础套餐", item.price, "以官网为准", "当前只整理到最低公开套餐，购买前请进入官网确认实时套餐。"]];
  return `      <section class="price-section">
        <h2>${item.name} 套餐价格表</h2>
        <p>下面套餐表由本站按公开套餐名称、价格、流量和适用场景重新整理，方便购买前快速比较。机场套餐经常调整，实际价格、流量、倍率、设备数和优惠活动请以服务商官网实时页面为准。</p>
        <div class="table-wrap price-wrap">
          <table class="price-table">
            <thead><tr><th>套餐</th><th>价格</th><th>流量/周期</th><th>说明</th></tr></thead>
            <tbody>${rows.map(([plan, price, traffic, note]) => `<tr>
              <td>${escapeHtml(plan)}</td>
              <td>${escapeHtml(price)}</td>
              <td>${escapeHtml(traffic)}</td>
              <td>${escapeHtml(note)}</td>
            </tr>`).join("")}</tbody>
          </table>
        </div>
      </section>
`;
}

function airportPriceSection(title, items) {
  if (!items.length) return "";
  return `<section class="rank-section">
    <h2>${title}</h2>
    <div class="table-wrap">
      <table class="rank-table">
        <thead><tr><th>机场</th><th>是否支持试用</th><th>月付起步</th><th>深度评测</th></tr></thead>
        <tbody>${airportTableRows(items)}</tbody>
      </table>
    </div>
  </section>`;
}

function knowledgeFeedRow(item, index, pinned = false) {
  return feedRow({
    title: item.title,
    href: `/knowledge/${item.slug}.html`,
    excerpt: `${item.intro} ${item.takeaway}`,
    tag: item.tag,
    meta: "科普知识",
    thumbTitle: knowledgeThumbTitle(item),
  }, index, pinned, index % 4 === 2 ? "dark" : "red");
}

function seoKnowledgeLinks(currentSlug = "") {
  const links = knowledgeTopics
    .filter((item) => seoKnowledgeArticles[item.slug] && item.slug !== currentSlug)
    .slice(0, 8)
    .map((item) => `<a href="/knowledge/${item.slug}.html">${item.tag}</a>`)
    .join(" · ");
  return `<div class="feed-intro keyword-links">
    <p><strong>泛关键词导航：</strong><a href="/airport/">机场推荐</a> · <a href="/reviews/">梯子推荐</a> · <a href="/rank/">机场排行</a> · ${links}</p>
  </div>`;
}

function renderSeoKnowledgeArticle(item, index, next, detail) {
  const related = knowledgeTopics
    .filter((topic) => topic.slug !== item.slug && seoKnowledgeArticles[topic.slug])
    .slice(0, 4);
  const content = `    <article class="article">
      <div class="article-hero">
        <p class="eyebrow">科普知识 · ${item.tag}</p>
        <h1>${item.title}</h1>
        <p class="lead">${item.intro} ${detail.summary}</p>
      </div>

      <section class="notice">
        <strong>核心答案：</strong>${item.takeaway} 选择前建议先看预算、流量、线路、节点地区、客户端教程、公告渠道和短周期测试结果，不要只凭单个机场名称或广告排序下单。
      </section>

      ${seoKnowledgeLinks(item.slug)}

${detail.sections.map(([heading, paragraphs]) => `      <section>
        <h2>${heading}</h2>
${paragraphs.map((paragraph) => `        <p>${paragraph}</p>`).join("\n")}
      </section>`).join("\n\n")}

      <section>
        <h2>购买前检查清单</h2>
        <p>无论你是从机场推荐、梯子推荐、稳定机场还是便宜机场这类搜索进入，都建议把候选服务放进同一张表：记录套餐价格、月流量、倍率、设备数、常用地区、客户端教程、公告入口和退款规则。这样可以减少被单个宣传词影响的概率。</p>
        <p>真正测试时，至少覆盖三天，并包含晚间 20 点到 23 点。测试项目包括网页、AI、Telegram、GitHub、YouTube、流媒体、订阅更新和手机电脑双端连接。通过这些任务的机场，才值得进入主力或备用清单。</p>
      </section>

      <section>
        <h2>常见问题</h2>
        <div class="faq-list">
${detail.faq.map(([question, answer]) => `          <h3>${question}</h3>
          <p>${answer}</p>`).join("\n")}
        </div>
      </section>

      <section>
        <h2>延伸阅读</h2>
        <div class="post-grid compact">${related.map(knowledgeCard).join("")}</div>
      </section>

      <aside class="notice">下一篇：<a href="/knowledge/${next.slug}.html">${next.title}</a></aside>
    </article>`;
  return layout({
    title: item.title,
    description: detail.description,
    keywords: detail.keywords || SEO_KEYWORDS,
    pathName: `/knowledge/${item.slug}.html`,
    content,
    extraHead: articleSchema(item.title, detail.description, `/knowledge/${item.slug}.html`) + faqSchema(detail.faq)
  });
}

function sidebar() {
  const featuredAirport = airports.find((item) => item.slug === "jilianyun");
  const featuredUrl = featuredAirport ? featuredAirport.url : "/posts/jilianyun.html";
  return `<aside class="sidebar">
    <a class="promo-card" href="${escapeHtml(featuredUrl)}" target="_blank" rel="nofollow sponsored noopener">
      <span>入门首选低价机场</span>
      <strong>极连云机场</strong>
      <p>8元 60G/月起，适合新手试用和日常备用。点击即可跳转注册入口，套餐与活动以官网实时页面为准。</p>
    </a>
    <a class="side-banner banner-latest" href="/reviews/"><span>最新机场推荐</span></a>
    <a class="side-banner banner-cheap" href="/airport/"><span>便宜机场推荐</span></a>
    <a class="side-banner banner-free" href="/knowledge/"><span>科普知识 每日更新</span></a>
  </aside>`;
}

function shell(title, action, body) {
  return `    <div class="page-shell">
      <section class="feed-card">
        <div class="feed-head">
          <h1>${title}</h1>
          ${action ? `<a href="${action.href}">${action.label}</a>` : ""}
        </div>
${body}
      </section>
      ${sidebar()}
    </div>`;
}

function homePage() {
  const mixed = [
    feedRow({
      title: "2026年最新机场推荐榜单（持续更新）",
      href: "/airport/",
      excerpt: "机场推荐看起来很多，但真正值得长期使用的并不多。本站按公开机场列表整理低价、主流和年付套餐，方便先按预算筛选，再进入机场详情与测评文章。",
      tag: "机场榜单",
      meta: `${airports.length} 个机场`,
      thumbTitle: "最新机场推荐"
    }, 0, true, "red"),
    ...airports.slice(0, 8).map((item, index) => airportFeedRow(item, index, index < 2)),
    ...knowledgeTopics.slice(0, 4).map((item, index) => knowledgeFeedRow(item, index + 8)),
  ].join("");
  const intro = `<div class="feed-intro">
    <p>本站不只整理具体机场名称，也按机场推荐、梯子推荐、稳定机场、便宜机场、专线机场、AI 机场和流媒体解锁等泛关键词建立科普入口，帮助先理解筛选标准，再比较具体套餐和注册链接。</p>
  </div>
${seoKnowledgeLinks()}`;
  const content = shell("最新发布", { href: "/airport/", label: "机场榜单" }, intro + mixed);
  return layout({
    title: "机场推荐与梯子推荐：稳定机场榜单、机场测评和注册链接",
    description: "TiziSpeed 整理机场推荐、梯子推荐、稳定机场、便宜机场和专线机场榜单，覆盖机场测评、套餐价格、注册链接、客户端配置、AI 工具访问和流媒体解锁科普。",
    pathName: "/",
    content,
    extraHead: itemListSchema("2026年最新机场推荐榜单", "稳定机场、便宜机场和梯子推荐列表，包含套餐价格、机场测评和注册链接。", "/", airports)
  });
}

function airportPage(pathName = "/airport/") {
  const cheap = airports.filter((item) => monthlyPrice(item) < 15);
  const mid = airports.filter((item) => monthlyPrice(item) >= 15 && monthlyPrice(item) <= 20);
  const high = airports.filter((item) => monthlyPrice(item) > 20);
  const intro = `<div class="feed-intro">
    <p>下面按月付价格区间整理目前站内已收录的机场，方便优先按预算快速筛选，再进入后面的机场推荐榜单详解。</p>
  </div>`;
  const body = intro
    + airportPriceSection("¥15/月 以下（经济机场）", cheap)
    + airportPriceSection("¥15-20/月（主流入门）", mid)
    + airportPriceSection("¥20/月 以上或年付套餐", high);
  const content = shell("本期推荐机场名单", null, body);
  return layout({
    title: "机场推荐榜单：稳定机场、便宜机场与梯子推荐",
    description: `${airports.length} 个机场推荐条目，按低价机场、主流机场和年付套餐整理，包含稳定机场筛选、机场测评、最低套餐和注册链接。`,
    pathName,
    content,
    extraHead: itemListSchema("机场推荐榜单", "稳定机场、便宜机场和梯子推荐清单，按套餐价格区间整理。", pathName, airports)
  });
}

function reviewsPage() {
  const content = shell("机场测评", { href: "/airport/", label: "机场榜单" }, airports.map((item, index) => airportFeedRow(item, index, index === 0)).join(""));
  return layout({
    title: "机场测评：稳定机场与梯子推荐实测整理",
    description: `${airports.length} 篇机场测评文章，覆盖稳定机场选择、梯子推荐、最低套餐、注册链接、适合人群、节点体验和购买建议。`,
    pathName: "/reviews/",
    content,
    extraHead: itemListSchema("机场测评文章列表", "稳定机场与梯子推荐测评文章，覆盖套餐、入口、节点和购买建议。", "/reviews/", airports)
  });
}

function rankPage() {
  const rows = airports.map((item, index) => `<tr>
    <td>${index + 1}</td>
    <td><a href="/posts/${item.slug}.html">${item.name}</a></td>
    <td>${item.price}</td>
    <td>${item.tag}</td>
    <td>${item.angle}</td>
    <td><a href="${escapeHtml(item.url)}" target="_blank" rel="nofollow sponsored noopener">注册链接</a></td>
  </tr>`).join("");
  const content = `    <section class="list-hero">
      <p class="eyebrow">Ranking</p>
      <h1>机场排行与套餐对比</h1>
      <p>这张表把本次去重后的机场放在一起，方便快速比较最低公开套餐、流量区间和适合人群。真正购买前仍建议先短周期测试。</p>
    </section>
    <section class="section">
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>机场</th><th>最低公开套餐</th><th>定位</th><th>适合人群</th><th>入口</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>`;
  return layout({
    title: "机场排行与套餐对比：稳定机场价格表",
    description: "去重机场排行表，面向机场推荐、梯子推荐和稳定机场筛选，包含价格、流量、定位、适合人群和注册链接。",
    pathName: "/rank/",
    content,
    extraHead: itemListSchema("机场排行与套餐对比", "稳定机场价格、流量、定位和注册链接对比表。", "/rank/", airports)
  });
}

function articlePage(item, index) {
  const related = [airports[(index + 1) % airports.length], airports[(index + 5) % airports.length], airports[(index + 9) % airports.length]];
  const title = `${item.name}机场怎么样？${item.price} 套餐、注册链接与购买建议`;
  const description = `${item.name}机场测评与梯子推荐参考，整理最低公开套餐、注册链接、适合人群、稳定机场判断方法、节点观察和下单前注意事项。`;
  const content = `    <article class="article">
      <div class="article-hero">
        <p class="eyebrow">机场测评 · ${TODAY}</p>
        <h1>${title}</h1>
        <p class="lead">${item.angle} 本文基于公开信息整理，不把单次测速当作结论，而是从套餐、节点、适用场景和风险控制四个角度给出判断框架。</p>
        <div class="hero-actions">
          <a class="button primary" href="${escapeHtml(item.url)}" target="_blank" rel="nofollow sponsored noopener">访问 ${item.name} 注册入口</a>
          <a class="button secondary" href="/airport/">返回机场列表</a>
        </div>
      </div>

      <section class="quick-card">
        <div><span>机场名称</span><strong>${item.name}</strong></div>
        <div><span>最低公开套餐</span><strong>${item.price}</strong></div>
        <div><span>定位</span><strong>${item.tag}</strong></div>
      </section>

${priceTable(item)}
      <section>
        <h2>${item.name} 适合谁？</h2>
        <p>${item.focus} 机场订阅的价值并不只在于能不能打开网页，而在于它能否稳定覆盖你的真实任务：例如 AI 工具登录、资料检索、海外文档、社交通讯、视频播放、开发者平台访问，以及手机和电脑之间的切换。${item.name} 的公开套餐信息给了一个初步判断入口，但最终仍要用自己的网络环境验证。</p>
        <p>${item.scenario} 如果你的需求只是偶尔查资料，低流量或短周期套餐通常更稳妥；如果你每天都使用 YouTube、Telegram、ChatGPT、Claude、Google、GitHub 或流媒体服务，就要把晚高峰稳定性、节点地区和倍率规则放到价格前面。第一次购买不建议直接多年付，先月付或短周期测试更容易止损。</p>
      </section>

      <section>
        <h2>套餐和性价比怎么看</h2>
        <p>${item.name} 当前整理到的最低公开套餐是 <strong>${item.price}</strong>。看性价比时，不要只把月费除以流量，还要看热门节点是否有倍率、流量是否按自然月重置、是否限制设备数、是否支持常见客户端，以及服务商是否提供清楚的公告和教程。便宜套餐适合试水和备用，大流量套餐适合高频使用，但两者都需要实际体验支撑。</p>
        <p>很多新手会被“最低价”吸引，却忽略真实使用成本。比如 100GB 看起来够用，但如果常用节点按 2 倍或 3 倍扣流量，实际可用时间会明显缩短；反过来，1TB 套餐如果晚高峰经常卡顿，也未必比小而稳定的套餐更划算。更实用的做法是把自己的任务列出来，估算每周视频、AI、下载和社交各占多少，再决定是否需要更高档套餐。</p>
      </section>

      <section>
        <h2>节点、线路和客户端体验</h2>
        <p>机场页面常见的线路词包括公网中转、BGP 中转、IEPL、IPLC、直连、原生 IP 和流媒体解锁。普通用户不需要背术语，但要知道它们会影响延迟、拥塞、价格和可用地区。选择 ${item.name} 时，建议优先测试香港、日本、新加坡、台湾、美国这些常用地区，再看欧洲或其他小众节点是否只是锦上添花。</p>
        <p>客户端方面，Clash、Mihomo、Shadowrocket、Stash、sing-box 等工具都依赖订阅链接。订阅导入后要打开自动更新，并确认策略组、规则模式、全局模式和直连规则是否符合习惯。${item.trial} 如果网页能打开但 AI 频繁验证、视频总是降清晰度，或 Telegram 连接忽快忽慢，就说明还需要换节点、换规则或联系工单确认。</p>
      </section>

      <section>
        <h2>购买前风险控制</h2>
        <p>${item.watch} 机场行业变化很快，域名迁移、面板调整、节点维护、支付渠道变化都很常见。购买前建议先检查官网公告、Telegram 通知、工单入口、退款规则、教程完整度和最近维护记录。只要这些基础信息含糊不清，就算套餐看起来很便宜，也应该降低预算，先用短周期验证。</p>
        <p>安全方面，机场并不等于完全匿名工具。不要把订阅链接发到论坛、群聊或云笔记公开页，不要在陌生下载站安装来路不明的客户端，也不要把重要账号都绑定在同一个不稳定网络环境里。更稳妥的组合是主力机场加备用机场，两者的域名、通知渠道和支付记录尽量分散，这样遇到维护或入口变化时不会完全断开。</p>
      </section>

      <section>
        <h2>${item.name} 下单清单</h2>
        <p>下单前可以按五步走：第一，确认最低套餐是否仍是 ${item.price}；第二，确认常用客户端是否有一键导入教程；第三，查看香港、日本、新加坡、美国节点是否齐全；第四，问清楚倍率、设备数、退款和流量重置规则；第五，只买一个短周期并记录三天以上体验。这个流程不复杂，但能过滤掉大部分只靠宣传词堆出来的选择。</p>
        <p>如果 ${item.name} 的测试结果符合你的主场景，再考虑把它放进主力列表；如果只是偶尔可用但不够稳，可以把它当备用。总结起来，机场选择最怕一步到位的冲动，最稳的顺序是先明确需求，再短测节点，最后看价格。对普通用户来说，稳定、清楚、可联系，往往比单纯便宜更重要。</p>
      </section>

      <aside class="notice"><strong>注册链接：</strong><a href="${escapeHtml(item.url)}" target="_blank" rel="nofollow sponsored noopener">${item.name} 官网入口</a>。如入口跳转或套餐变动，请以服务商实时页面为准。</aside>
      <section>
        <h2>相关机场</h2>
        <div class="post-grid compact">${related.map(card).join("")}</div>
      </section>
    </article>`;
  return layout({
    title,
    description,
    pathName: `/posts/${item.slug}.html`,
    content,
    extraHead: articleSchema(title, description, `/posts/${item.slug}.html`)
  });
}

function knowledgePage() {
  const intro = `<div class="feed-intro">
    <p>这里按泛搜索意图整理机场推荐、梯子推荐、稳定机场、便宜机场、专线线路、客户端配置、AI 工具访问和流媒体解锁等科普主题。每篇都尽量给出可执行检查清单，方便先建立判断框架，再进入具体机场测评。</p>
  </div>
${seoKnowledgeLinks()}`;
  const content = shell("机场推荐与梯子推荐科普", { href: "/airport/", label: "机场榜单" }, intro + knowledgeTopics.map((item, index) => knowledgeFeedRow(item, index, index < 2)).join(""));
  return layout({
    title: "机场科普知识：机场推荐、梯子推荐、稳定机场和订阅使用指南",
    description: `${knowledgeTopics.length} 篇原创机场科普知识文章，覆盖机场推荐、梯子推荐、稳定机场、便宜机场、专线线路、客户端配置、AI 工具访问、流媒体解锁、DNS、安全和使用风险。`,
    pathName: "/knowledge/",
    content,
    extraHead: knowledgeListSchema()
  });
}

function knowledgeArticle(item, index) {
  const next = knowledgeTopics[(index + 1) % knowledgeTopics.length];
  const title = item.title;
  const seoDetail = seoKnowledgeArticles[item.slug];
  if (seoDetail) return renderSeoKnowledgeArticle(item, index, next, seoDetail);
  const description = `${item.intro} ${item.takeaway} 本文围绕机场推荐、梯子推荐、稳定机场、套餐线路和订阅风险给出可执行检查方法。`;
  const content = `    <article class="article">
      <div class="article-hero">
        <p class="eyebrow">科普知识 · ${item.tag}</p>
        <h1>${title}</h1>
        <p class="lead">${item.intro} 这篇文章不追求把术语讲得很玄，而是从普通用户的购买、配置和日常使用角度，把能落地的判断方法说清楚。</p>
      </div>

      <section>
        <h2>为什么需要理解这个问题</h2>
        <p>${item.intro} 对机场用户来说，最容易踩坑的地方不是不会付款，而是没有建立判断框架。很多页面会同时出现专线、倍率、解锁、原生 IP、不限速、不限设备、全球节点等词，如果只看宣传词，很难判断它们和自己的需求有什么关系。</p>
        <p>更稳的方式，是先确认自己的场景：你是偶尔查资料，还是每天看视频；是主要使用 AI 工具，还是需要流媒体解锁；是一个人用，还是手机、电脑、平板和家人一起用。场景不同，适合的套餐、节点地区、客户端配置和风险控制方式都会不同。${item.takeaway}</p>
      </section>

      <section>
        <h2>核心判断方法</h2>
        <p>第一，看可验证的信息。价格、流量、周期、节点地区、设备数量、倍率规则、退款说明、公告渠道和教程完整度，都是购买前可以确认的内容。相比“高速稳定”这类笼统描述，具体信息更能帮助你判断服务是否适合自己。</p>
        <p>第二，看连续体验。机场速度不是一次测速就能说明问题，尤其要观察晚高峰、周末和跨运营商环境。你可以连续测试网页打开、YouTube 播放、Telegram 收发、GitHub 访问、AI 登录和常用流媒体。如果这些任务都稳定，再考虑长期续费。</p>
        <p>第三，看故障处理。任何机场都可能遇到节点维护、域名迁移、订阅更新异常和支付渠道变化。真正影响长期体验的，是服务商有没有清楚公告、工单是否回复、教程是否完整、订阅是否容易更新。售后和维护能力往往比首页宣传更重要。</p>
      </section>

      <section>
        <h2>新手常见误区</h2>
        <p>常见误区之一，是把最低价当成唯一标准。低价套餐适合试用和备用，但未必适合每天看高清视频、直播、会议或多人共享。另一个误区，是看到大流量就认为一定划算。大流量还要看倍率和线路质量，如果常用节点扣量高或晚高峰不稳，体验仍然会打折。</p>
        <p>还有人会把机场等同于完全匿名工具。机场能帮你访问更多网络服务，但并不意味着可以忽略账号安全。不要复用密码，不要公开订阅链接，不要在陌生页面输入敏感信息，也不要把所有重要账号都绑定在同一个不稳定网络环境里。</p>
      </section>

      <section>
        <h2>实用操作建议</h2>
        <p>购买前优先选择月付或短周期套餐。拿到订阅后，先导入常用客户端，开启自动更新，再分别测试香港、日本、新加坡、美国等常见节点。测试时不要只看测速数字，更要看真实任务是否顺畅，例如视频是否持续缓冲、AI 是否频繁验证、网页是否出现地区限制。</p>
        <p>如果你已经有主力机场，建议再准备一个低价备用机场。备用机场不需要流量特别大，关键是入口、面板和通知渠道不要和主力完全重合。这样当主力线路维护或订阅异常时，你不会完全断开。日常也要定期检查客户端版本、规则文件和订阅更新时间，避免把本地配置问题误判为机场跑路。</p>
        <p>遇到问题时，排查顺序可以固定下来：先换节点，再更新订阅，再切换规则模式，最后检查客户端和系统代理。如果多个节点、多个客户端、多个网络环境都异常，再联系工单会更有效。把问题描述清楚，包括时间、地区、客户端、节点名和报错截图，通常比一句“不能用”更容易得到回复。</p>
      </section>

      <section>
        <h2>可执行检查清单</h2>
        <p>真正落地时，可以把检查项写成一个简单表格：第一列写任务，比如网页、视频、AI、社交、下载、远程办公；第二列写常用节点；第三列记录晚高峰表现；第四列记录是否触发验证、限速或断连。连续记录三天以后，你会比单看宣传页更清楚这个机场是否适合自己。</p>
        <p>复查节奏也很重要。短期试用看连接是否顺畅，月度续费看套餐和节点有没有变化，季度复查则要看服务商公告、入口域名、工单响应和备用方案是否还有效。机场不是买完就永远固定的工具，保持轻量复查，能让你在价格、稳定性和风险之间维持更好的平衡。</p>
        <p>最后要给自己设一个清晰的通过线：如果一个机场能在你的常用时段稳定完成核心任务，订阅更新顺畅，遇到问题能找到公告或工单，同时价格没有超出预算，它就已经是合格选择。反过来，只要核心任务经常失败，即便页面写着高端线路、大流量或全解锁，也不值得承担长期续费风险。</p>
      </section>

      <section>
        <h2>总结</h2>
        <p>${title} 的关键，不是背术语，而是把术语转化成自己的使用判断。先明确需求，再看套餐；先短期测试，再考虑长付；先验证稳定性，再比较最低价。只要按这个顺序，新手也能避开大部分机场选择误区。</p>
      </section>

      <aside class="notice">下一篇：<a href="/knowledge/${next.slug}.html">${next.title}</a></aside>
    </article>`;
  return layout({
    title,
    description,
    pathName: `/knowledge/${item.slug}.html`,
    content,
    extraHead: articleSchema(title, description, `/knowledge/${item.slug}.html`)
  });
}

function aboutPage() {
  const aboutContent = `    <article class="article about-article">
      <div class="article-hero">
        <p class="eyebrow">About</p>
        <h1>关于 ${SITE_NAME}</h1>
        <p class="lead">TiziSpeed 是一个面向普通用户的机场推荐与机场科普站。我们把公开机场列表、套餐入口、评测思路和新手知识重新整理成更容易阅读的页面，帮助你在购买前先看懂价格、线路、节点、风险和适用场景。</p>
      </div>

      <section>
        <h2>我们整理什么</h2>
        <p>本站主要分为机场榜单、机场测评和科普知识三类内容。机场榜单用于快速对比公开机场、最低套餐和注册入口；机场测评会把每个机场单独写成购买前参考，重点看套餐定位、节点覆盖、使用场景和下单前注意事项；科普知识则面向新手，把测速、倍率、客户端、订阅安全、支付风险、公告识别等问题拆开讲清楚。</p>
        <ul class="article-list">
          <li><strong>机场榜单：</strong>适合先做横向筛选，快速找到预算范围内的候选机场。</li>
          <li><strong>机场测评：</strong>适合下单前逐篇查看，确认该机场是否匹配自己的真实使用场景。</li>
          <li><strong>科普知识：</strong>适合新手补齐基础判断框架，避免只看宣传词和最低价格。</li>
        </ul>
      </section>

      <section>
        <h2>原创整理原则</h2>
        <p>科普知识栏目会围绕新手真正会遇到的问题展开，避免把已有主题换个标题重复发布。新的科普内容会更侧重机场购买、订阅配置、线路理解和日常排查，尽量让每篇文章都解决一个独立问题。</p>
        <p>测评文章也会避免机械堆词。我们不会只写“高速、稳定、便宜”这类空泛判断，而是把机场选择拆成更实用的检查项：最低套餐是否适合试用、常用地区节点是否覆盖、公告和工单是否清楚、倍率和流量规则是否容易理解，以及是否值得长期续费。</p>
      </section>

      <section>
        <h2>建议你怎样使用本站</h2>
        <p>如果你是第一次购买机场，建议先从机场榜单筛选 2 到 3 个候选项，再阅读对应测评文章，最后只选择月付或短周期套餐做真实测试。测试时不要只看测速数字，更要观察晚高峰网页打开、AI 登录、Telegram 收发、GitHub 访问、视频播放和订阅更新是否稳定。</p>
        <p>如果你已经有主力机场，可以把本站当作备用方案参考。备用机场不一定要价格最高或流量最大，关键是入口、通知渠道、线路和支付方式尽量不要和主力完全重合，这样在维护、迁移或订阅异常时更容易保持连接。</p>
      </section>

      <section>
        <h2>免责声明</h2>
        <p>本站不运营任何机场服务，不提供节点，不参与服务商售后，也不保证第三方服务长期可用。所有注册链接、套餐价格、退款规则、节点说明和优惠信息都应以服务商实时页面为准。购买前请自行判断风险，优先使用短周期套餐测试，不建议在没有体验的情况下直接长期付费。</p>
      </section>
    </article>`;
  return layout({
    title: "关于本站",
    description: "TiziSpeed 机场观察的内容定位、原创整理原则、阅读建议和免责声明。",
    pathName: "/about/",
    content: aboutContent
  });
}

function sitemap() {
  const urls = [
    ["/", "1.0"],
    ["/airport/", "0.9"],
    ["/rank/", "0.9"],
    ["/reviews/", "0.9"],
    ["/knowledge/", "0.9"],
    ["/about/", "0.6"],
    ...airports.map((item) => [`/posts/${item.slug}.html`, "0.8"]),
    ...knowledgeTopics.map((item) => [`/knowledge/${item.slug}.html`, "0.8"])
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([loc, priority]) => `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
}

function robots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function rssFeed() {
  const pubDate = new Date(`${TODAY}T00:00:00+08:00`).toUTCString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}/</link>
    <description>去重机场推荐、机场评测和机场科普知识。</description>
    <language>zh-CN</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
${airports.map((item) => `    <item>
      <title>${escapeHtml(`${item.name}机场怎么样？${item.price} 套餐、注册链接与购买建议`)}</title>
      <link>${SITE_URL}/posts/${item.slug}.html</link>
      <guid>${SITE_URL}/posts/${item.slug}.html</guid>
      <description>${escapeHtml(item.angle)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`).join("\n")}
${knowledgeTopics.map((item) => `    <item>
      <title>${escapeHtml(item.title)}</title>
      <link>${SITE_URL}/knowledge/${item.slug}.html</link>
      <guid>${SITE_URL}/knowledge/${item.slug}.html</guid>
      <description>${escapeHtml(item.intro)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`).join("\n")}
  </channel>
</rss>
`;
}

function llmsTxt() {
  return `# ${SITE_NAME}

${SITE_NAME} 是一个中文机场推荐和机场测评静态博客，围绕机场榜单、机场测评和新手科普做原创整理。

## 核心主题

本站围绕机场推荐、梯子推荐、稳定机场、机场榜单、机场测评、便宜机场、机场排行、科学上网机场、机场节点、机场订阅、好用机场、低价机场、高速机场、IPLC机场、IEPL机场、BGP中转、专线机场、机场价格、机场套餐、机场注册链接、机场官网入口、机场测速、机场试用、机场客户端、Clash机场、Shadowrocket机场、Mihomo教程、机场备用、AI机场、流媒体解锁等 30 个核心搜索主题展开。页面内容以公开机场列表、套餐价格、注册链接、购买前判断方法和新手科普为主。

## 主要页面

- 首页: ${SITE_URL}/
- 机场推荐: ${SITE_URL}/airport/
- 机场评测: ${SITE_URL}/reviews/
- 科普知识: ${SITE_URL}/knowledge/
- 关于: ${SITE_URL}/about/
- RSS: ${SITE_URL}/feed.xml
- Sitemap: ${SITE_URL}/sitemap.xml

## 机场评测

${airports.map((item) => `- ${item.name}: ${SITE_URL}/posts/${item.slug}.html`).join("\n")}

## 科普知识

${knowledgeTopics.map((item) => `- ${item.title}: ${SITE_URL}/knowledge/${item.slug}.html`).join("\n")}

## 内容说明

本站内容由 TiziSpeed 按机场套餐、适用场景、购买前检查项和新手使用问题原创整理，整理日期 ${TODAY}。本站不运营节点服务，所有套餐和入口以服务商实时页面为准。
`;
}

function style() {
  return `:root {
  color-scheme: light;
  --bg: #f3f3f3;
  --panel: #ffffff;
  --text: #17212b;
  --muted: #6d7782;
  --line: #ececec;
  --red: #ff4c43;
  --red-dark: #a80f1d;
  --black: #101010;
  --green: #2edc8a;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  line-height: 1.75;
}
a { color: inherit; text-decoration: none; }
code { padding: 2px 5px; border-radius: 4px; background: #f5f5f5; color: #c93530; }
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: min(1180px, calc(100% - 32px));
  min-height: 84px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 0 0 100vmax #fff;
  clip-path: inset(0 -100vmax);
}
.brand { display: inline-flex; align-items: center; gap: 10px; white-space: nowrap; }
.brand-mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--red);
  color: #fff;
  font-size: 13px;
  font-style: italic;
  font-weight: 900;
  letter-spacing: 0;
}
.brand-name { font-size: 18px; font-style: italic; font-weight: 900; letter-spacing: 0; }
.brand-slogan {
  display: inline-block;
  margin-left: 18px;
  padding-left: 14px;
  border-left: 1px solid #ddd;
  color: #a0a5aa;
  font-size: 13px;
  line-height: 1.25;
}
.top-nav { display: flex; align-items: center; gap: 30px; color: #08131f; font-size: 16px; }
.top-nav a:hover { color: var(--red); }
main { min-height: 72vh; padding: 20px 0 56px; }
.page-shell {
  display: grid;
  grid-template-columns: minmax(0, 820px) 360px;
  gap: 20px;
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  align-items: start;
}
.feed-card, .article, .list-hero, .section {
  background: var(--panel);
  border-radius: 6px;
  overflow: hidden;
}
.feed-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 58px;
  padding: 0 20px;
}
.feed-head h1 {
  position: relative;
  margin: 0;
  padding-left: 16px;
  font-size: 18px;
  line-height: 1.25;
}
.feed-head h1::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 4px;
  height: 18px;
  transform: translateY(-50%);
  border-radius: 2px;
  background: var(--red);
}
.feed-head a { color: #7d858d; font-size: 14px; }
.feed-intro {
  padding: 8px 20px 20px;
  border-top: 1px solid var(--line);
}
.feed-intro h2 {
  margin: 4px 0 8px;
  font-size: 20px;
  line-height: 1.35;
}
.feed-intro p {
  margin: 0;
  color: #4b5965;
  font-size: 14px;
  line-height: 1.85;
}
.rank-section {
  padding: 0 20px 22px;
}
.rank-section h2 {
  margin: 0 0 16px;
  font-size: 20px;
  line-height: 1.35;
}
.rank-table {
  min-width: 0;
  font-size: 14px;
}
.rank-table thead th {
  border-bottom: 3px solid #333;
  background: #fff;
  color: #111;
}
.rank-table td:first-child,
.rank-table td:last-child {
  color: #ff2d2d;
}
.rank-table a {
  color: #ff2d2d;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.feed-row {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 20px;
  padding: 20px;
  border-top: 1px solid var(--line);
}
.feed-thumb { display: block; width: 180px; }
.thumb {
  position: relative;
  display: grid;
  place-items: center;
  width: 180px;
  height: 124px;
  overflow: hidden;
  border-radius: 6px;
  background:
    radial-gradient(circle at 25% 20%, rgba(255,255,255,.18), transparent 18%),
    linear-gradient(145deg, #25060a, #d7192f 50%, #070707);
}
.thumb::before {
  content: "";
  position: absolute;
  inset: -20%;
  background:
    repeating-linear-gradient(28deg, rgba(255,255,255,.08) 0 2px, transparent 2px 18px),
    radial-gradient(circle at 50% 50%, transparent 0 34%, rgba(0,0,0,.55) 35% 36%, transparent 37%);
  transform: rotate(-8deg);
}
.thumb span {
  position: relative;
  z-index: 1;
  max-width: 150px;
  color: #fff;
  font-size: 26px;
  font-weight: 900;
  line-height: 1.1;
  text-align: center;
  overflow-wrap: anywhere;
  text-shadow: 0 3px 10px rgba(0,0,0,.55);
}
.thumb-green { background: linear-gradient(145deg, #061511, #13483d 48%, #050908); }
.thumb-green span { color: var(--green); text-shadow: 0 0 14px rgba(46,220,138,.65); }
.thumb-dark { background: linear-gradient(145deg, #111, #30343a 52%, #060606); }
.feed-copy { min-width: 0; padding-top: 2px; }
.feed-copy h2 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 8px;
  font-size: 20px;
  line-height: 1.35;
}
.feed-copy h2 a { overflow-wrap: anywhere; }
.feed-copy p {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  color: #4b5965;
  font-size: 14px;
  line-height: 1.8;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.pin {
  flex: 0 0 auto;
  padding: 2px 7px;
  border-radius: 4px;
  background: var(--red);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}
.rank-num {
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: var(--red);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
}
.feed-meta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; color: #929aa2; font-size: 13px; }
.feed-meta a { color: #d33831; font-weight: 700; }
.sidebar { display: grid; gap: 20px; }
.promo-card {
  display: block;
  min-height: 140px;
  padding: 0 20px 18px;
  border-radius: 6px;
  background: #fff;
}
.promo-card span {
  display: inline-block;
  margin-bottom: 14px;
  padding: 8px 16px;
  background: var(--red);
  color: #fff;
  font-size: 13px;
}
.promo-card strong { display: block; color: var(--red); font-size: 18px; font-weight: 500; }
.promo-card p { margin: 12px 0 0; color: #7c858f; font-size: 14px; line-height: 1.8; }
.side-banner {
  display: grid;
  place-items: center;
  min-height: 180px;
  overflow: hidden;
  border-radius: 6px;
  background:
    radial-gradient(circle at 28% 22%, rgba(255,255,255,.18), transparent 16%),
    linear-gradient(145deg, #080808, #b80f22 48%, #050505);
  color: #fff;
}
.side-banner span {
  max-width: 280px;
  font-size: 36px;
  font-weight: 900;
  line-height: 1.12;
  text-align: center;
  text-shadow: 0 4px 16px rgba(0,0,0,.55);
}
.banner-cheap { min-height: 200px; background: linear-gradient(145deg, #0c0607, #d32032 55%, #090909); }
.banner-free { min-height: 168px; background: #050505; }
.banner-free span { color: #fff; }
.banner-free span::after {
  content: "24小时 不间断";
  display: block;
  margin-top: 18px;
  color: #fff;
  font-size: 18px;
}
.article {
  width: min(900px, calc(100% - 64px));
  margin: 10px auto 0;
  padding: 34px 34px 44px;
}
.list-hero, .section {
  width: min(900px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 34px;
}
.article-hero {
  padding-bottom: 8px;
}
.article-hero h1, .list-hero h1 {
  margin: 8px 0 16px;
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.18;
  overflow-wrap: anywhere;
}
.lead, .list-hero p {
  max-width: 790px;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.9;
}
.article-hero .lead {
  margin-bottom: 0;
  text-indent: 0;
}
.eyebrow { margin: 0; color: var(--red); font-weight: 800; letter-spacing: 0; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 9px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-weight: 700;
}
.button.primary { border-color: var(--red); background: var(--red); color: #fff; }
.button.secondary { background: #fff; }
.article section { margin-top: 34px; }
.article h2 {
  margin: 0 0 14px;
  color: #061728;
  font-size: 26px;
  line-height: 1.35;
}
.article p {
  margin: 0 0 18px;
  color: #203044;
  font-size: 16px;
  line-height: 2;
  text-align: left;
}
.article section > p {
  text-indent: 2em;
}
.article p:last-child { margin-bottom: 0; }
.article .post-card p,
.article .notice p {
  text-indent: 0;
}
.article-list {
  display: grid;
  gap: 10px;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}
.article-list li {
  position: relative;
  padding-left: 18px;
  color: #203044;
  line-height: 1.9;
}
.article-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: .78em;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--red);
}
.quick-card, .metric-panel, .post-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 28px 0 8px;
}
.quick-card div, .metric-panel div, .post-card {
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: #fff;
}
.quick-card span, .metric-panel span { display: block; color: var(--muted); font-size: 13px; }
.quick-card strong, .metric-panel strong { display: block; margin-top: 6px; overflow-wrap: anywhere; }
.notice {
  margin: 34px 0 8px;
  padding: 18px 20px;
  border-left: 4px solid var(--red);
  border-radius: 4px;
  background: #fff7f6;
  overflow-wrap: anywhere;
  line-height: 1.9;
}
.table-wrap { overflow-x: auto; border: 1px solid var(--line); border-radius: 6px; background: #fff; }
table { width: 100%; min-width: 860px; border-collapse: collapse; }
th, td { padding: 12px 14px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
th { background: #fafafa; font-size: 14px; }
.price-section .table-wrap { margin-top: 14px; }
.price-table { min-width: 760px; }
.price-table th { color: #111; font-weight: 800; }
.price-table td { color: #263442; font-size: 14px; line-height: 1.7; }
.price-table td:nth-child(2) {
  color: var(--red);
  font-weight: 800;
  white-space: nowrap;
}
.price-table td:nth-child(3) { white-space: nowrap; }
.site-footer {
  padding: 28px 16px 36px;
  border-top: 1px solid #e6e6e6;
  background: #fff;
  color: #838b94;
  text-align: center;
}
.site-footer p { max-width: 980px; margin: 6px auto; font-size: 14px; }
.site-footer a, .article a, td a { color: #d33831; font-weight: 700; }
@media (max-width: 980px) {
  .site-header { position: static; flex-direction: column; align-items: flex-start; padding: 16px 0; }
  .top-nav { gap: 16px; font-size: 15px; }
  .page-shell { grid-template-columns: 1fr; }
  .sidebar { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  main { padding-top: 12px; }
  .brand-slogan { display: none; }
  .feed-row { grid-template-columns: 1fr; }
  .feed-thumb, .thumb { width: 100%; }
  .thumb { height: 160px; }
  .quick-card, .metric-panel, .post-grid { grid-template-columns: 1fr; }
  .article { width: calc(100% - 24px); padding: 24px 18px 32px; }
  .section, .list-hero { width: calc(100% - 24px); padding: 22px 18px; }
  .article-hero h1, .list-hero h1 { font-size: 30px; }
  .article h2 { font-size: 23px; }
}
`;
}

function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#ff5148"/><text x="32" y="38" text-anchor="middle" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="18" font-style="italic" font-weight="900" letter-spacing="-1">GO</text></svg>`;
}

function build() {
  const root = process.cwd();
  cleanGeneratedHtml(path.join(root, "posts"), airports.map((item) => `${item.slug}.html`));
  cleanGeneratedHtml(path.join(root, "knowledge"), ["index.html", ...knowledgeTopics.map((item) => `${item.slug}.html`)]);
  write(path.join(root, "assets", "style.css"), style());
  write(path.join(root, "assets", "favicon.svg"), favicon());
  write(path.join(root, "index.html"), homePage());
  write(path.join(root, "airport", "index.html"), airportPage());
  write(path.join(root, "rank", "index.html"), rankPage());
  write(path.join(root, "reviews", "index.html"), reviewsPage());
  write(path.join(root, "knowledge", "index.html"), knowledgePage());
  write(path.join(root, "about", "index.html"), aboutPage());
  airports.forEach((item, index) => write(path.join(root, "posts", `${item.slug}.html`), articlePage(item, index)));
  knowledgeTopics.forEach((item, index) => write(path.join(root, "knowledge", `${item.slug}.html`), knowledgeArticle(item, index)));
  write(path.join(root, "sitemap.xml"), sitemap());
  write(path.join(root, "robots.txt"), robots());
  write(path.join(root, `${INDEXNOW_KEY}.txt`), INDEXNOW_KEY);
  write(path.join(root, "feed.xml"), rssFeed());
  write(path.join(root, "llms.txt"), llmsTxt());
}

build();
