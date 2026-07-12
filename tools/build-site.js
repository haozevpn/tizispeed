const fs = require("fs");
const path = require("path");

const SITE_URL = "https://tizispeed.com";
const SITE_NAME = "TiziSpeed 机场观察";
const TODAY = "2026-07-10";
const SEO_KEYWORDS = "机场推荐,梯子推荐,稳定机场,机场榜单,机场测评,便宜机场,机场排行,科学上网机场,机场节点,机场订阅";

const airportRows = [
  ["极连云", "jilianyun", "https://haozevpn.jlyvipaff.com/#/?code=KUKfOY13", "8元 60G/月", "入门首选"],
  ["光年梯", "guangnianti", "https://gnt001.gntvipaff.cc/#/?code=j1ufpE44", "7.5元 50G/月", "低价备用"],
  ["飞猫云", "feimaoyun", "https://flycat.flycatvipaff.cc/#/?code=1arEKHqh", "¥84.00/年（学生版）", "年付低价"],
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
  const content = shell("最新发布", { href: "/airport/", label: "机场榜单" }, mixed);
  return layout({
    title: "机场推荐与梯子推荐：稳定机场榜单、机场测评和注册链接",
    description: "TiziSpeed 整理稳定机场、便宜机场和梯子推荐榜单，覆盖机场推荐、机场测评、套餐价格、注册链接与科普知识。",
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
  const content = shell("科普知识", { href: "/airport/", label: "机场推荐" }, knowledgeTopics.map((item, index) => knowledgeFeedRow(item, index, index < 2)).join(""));
  return layout({
    title: "机场科普知识：梯子推荐、稳定机场和订阅使用指南",
    description: `${knowledgeTopics.length} 篇原创机场科普知识文章，覆盖梯子推荐、稳定机场判断、测速、支付、协议、DNS、安全和使用风险。`,
    pathName: "/knowledge/",
    content
  });
}

function knowledgeArticle(item, index) {
  const next = knowledgeTopics[(index + 1) % knowledgeTopics.length];
  const title = item.title;
  const description = `${item.title}，约 2000 字机场科普文章，帮助新手理解机场订阅、线路、套餐和使用风险。`;
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

本站围绕机场推荐、梯子推荐、稳定机场、便宜机场、机场榜单、机场测评、机场排行、机场订阅和科学上网机场知识展开。页面内容以公开机场列表、套餐价格、注册链接、购买前判断方法和新手科普为主。

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
  write(path.join(root, "feed.xml"), rssFeed());
  write(path.join(root, "llms.txt"), llmsTxt());
}

build();
