// 木兰辞拼图主应用脚本（纯原生 JS + Headbreaker）

// 器物配置表
const ARTIFACTS_CATALOG = {
  loom: {
    id: 'loom',
    name: '织布机',
    image: 'artifacts/artifact_01_loom.png',
    description: '木兰在家门口操作的立式木制织布机，是开篇家庭生活的核心道具。'
  },
  saddleBridle: {
    id: 'saddleBridle',
    name: '鞍具与缰绳',
    image: 'artifacts/artifact_02_saddle_bridle.png',
    description: '包括鞍鞯与辔头的一整套马具，用来表现她在市集购置战马装备的情节。'
  },
  conscriptionScroll: {
    id: 'conscriptionScroll',
    name: '军帖',
    image: 'artifacts/artifact_03_conscription_scroll.png',
    description: '写有征兵命令与姓名名册的长卷文书，对应“昨夜见军帖，军书十二卷”等情节。'
  },
  armor: {
    id: 'armor',
    name: '铁甲铠',
    image: 'artifacts/artifact_04_armor.png',
    description: '映着寒光的铁制铠甲或胸甲，对应“朔气传金柝，寒光照铁衣”的冷冽战场氛围。'
  },
  makeupBox: {
    id: 'makeupBox',
    name: '妆奁',
    image: 'artifacts/artifact_05_makeup_box.png',
    description: '盛放粉盒、口脂的小木妆奁，用在“当窗理云鬓，对镜贴花黄”等返乡换装情节。'
  },
  mirror: {
    id: 'mirror',
    name: '铜镜',
    image: 'artifacts/artifact_06_mirror.png',
    description: '圆形抛光铜镜，与妆奁一起出现，表现木兰恢复女儿身时的细节。'
  },
  helmet: {
    id: 'helmet',
    name: '战盔',
    image: 'artifacts/artifact_07_helmet.png',
    description: '战场上佩戴的头盔/战盔，就是插画中头上那件护具，保护头部。'
  },
  familySword: {
    id: 'familySword',
    name: '家传佩剑',
    image: 'artifacts/artifact_08_family_sword.png',
    description: '家中珍藏的长剑，象征家族荣耀与“代父从军”的重大决定。'
  },
  medal: {
    id: 'medal',
    name: '勋牌',
    image: 'artifacts/artifact_09_medal.png',
    description: '象征军功与身份的勋牌或腰牌，用在“策勋十二转”等受赏场景。'
  },
  artifact9: {
    id: 'artifact9',
    name: '环首刀',
    image: 'artifacts_tools/3-16-环首刀.png',
    description: '环首刀又称汉刀、环头刀，是一种以手持为主的短兵器，特点是单面开锋，厚脊薄刃，直脊直刃，刀柄首呈圆环形。环首刀是当时世界上非常先进、杀伤力极强的近身冷兵器，在人类历史上具有非凡意义。环首刀由汉剑演化而来。剑利于突刺，不利于劈砍，不适合骑兵作战。于是汉朝人将剑改为单面开刃、厚脊等结构。刀柄处的圆环可以拴绳子，作战时把绳子绕在手上，可以避免刀在手中脱落。'
  },
  artifact10: {
    id: 'artifact10',
    name: '大型弩',
    image: 'artifacts_tools/3-18-大型弩.png',
    description: '中国古代一种威力较大的弩。将一张或几张弓安装在床架上，以绞动其后部的轮轴张弓装箭，待机发射。多弓床弩可用多人绞轴，用几张弓的合力发箭，其弹射力远远超过单人使用的擘张、蹶张或腰引弩。'
  },
  artifact15: {
    id: 'artifact15',
    name: '长弓',
    image: 'artifacts_tools/3-17-长弓.png',
    description: '长弓是源自威尔士的单体木制远程武器，一般长1.5米左右，个别的长达1.8-2米，以紫杉木（性能最优）为主要原料，辅以榆木、白蜡木（性能次之）等替代材料。制作需经过木料筛选、驯弓流程及拳高设定工艺，弓弦采用羊肠或筋鞣制，弓背经亚麻籽油防潮处理。使用该武器需具备45-55公斤拉力，14-15世纪成为英军主力装备。'
  },
  artifact17: {
    id: 'artifact17',
    name: '角弓',
    image: 'artifacts_tools/1-9-角弓.png',
    description: '古代角弓是一种以动物角、竹木、筋腱和动物胶等天然材料制成的复合弓，其名称源于制作中使用的动物角材料。这种弓在中国古代主要用于骑战，具有工艺复杂、威力强劲的特点。'
  },
  artifact18: {
    id: 'artifact18',
    name: '兵马',
    image: 'artifacts_tools/3-20-兵马.png',
    description: '甲骑具装由人铠（甲骑）与马铠（具装）构成，南北朝时期马铠标准化为面帘、鸡颈、当胸等六部分，配备明光铠与马槊。该兵种通过密集阵形冲击敌军阵线，曾参与淝水之战等战役。隋代组建过五千具装甲骑部队，但装备耗费巨大，唐代因与突厥战争转向轻骑兵，仅保留仪仗用途。金代铁浮图覆灭后退出战场，中亚地区15世纪发展出链板甲体系，17世纪因火器普及彻底消亡。其装备体系对东北亚及波斯军事文化产生深远影响。'
  },
  artifactXiaojueDao: {
    id: 'artifactXiaojueDao',
    name: '小蕨刀',
    image: 'artifacts_tools/2-11-小蕨刀.png',
    description: '魏晋南北朝蕨手小刀。全长 11.6 cm，最宽处 1.9 cm，刃厚 0.3 cm，钢铁锻造，南北方皆出，多出自古战场遗址与古战刀、箭镞伴出，据传为古代军旅随身携带修理箭杆用的小刀。蕨手指蕨芽，其端卷曲，紫色而肥，状如小儿之手，故名蕨手。宋代杨万里《宿南岭驿》诗曰：“蕨手犹拳已箸长，菊苗初甲可羹尝。”此器坑口颇佳，状态很好，形制完整，铁性一流，可支持专业研磨。'
  },
  artifactMaShuo: {
    id: 'artifactMaShuo',
    name: '马槊',
    image: 'artifacts_tools/2-11-马槊.png',
    description: '马槊，中国古代冷兵器，是重型的骑兵武器，是槊的主要形态。东汉·许慎《说文解字》——“槊，矛也”；东汉·服虔《通俗文》——“槊，矛长丈八谓之槊”，马槊即是马上所用的矛。其他槊，还有步槊和冒称槊的杂槊等分类。基本上，说槊，多指马槊。'
  }
};

const MULAN_SECTION_TITLES = [
  '当户织布',          // 第一节
  '女叹息',            // 第二节
  '问女所思',          // 第三节
  '隐瞒心事',          // 第四节
  '军帖降至',          // 第五节
  '军书十二卷',        // 第六节
  '家中无长子',        // 第七节
  '替父从军',          // 第八节
  '东市买马',          // 第九节
  '南北市备具',        // 第十节
  '辞家赴黄河',        // 第十一节
  '黄河流水',          // 第十二节
  '黑山行',            // 第十三节
  '燕山胡骑',          // 第十四节
  '万里赴戎机',        // 第十五节
  '朔气寒光',          // 第十六节
  '十年征战',          // 第十七节
  '明堂朝见',          // 第十八节
  '策勋受赏',          // 第十九节
  '辞官求归',          // 第二十节
  '驰归故乡',          // 第二十一节
  '出郭相迎',          // 第二十二节
  '姊理红妆',          // 第二十三节
  '弟磨刀宴客',        // 第二十四节
  '归坐东阁',          // 第二十五节
  '换回旧裳',          // 第二十六节
  '对镜贴花黄',        // 第二十七节
  '伙伴惊惶',          // 第二十八节
  '十二年同袍',        // 第二十九节
  '雄兔雌兔',          // 第三十节
  '双兔并走'           // 第三十一节
];

// 各节关联的器物（用下标索引，0 对应第一节）
const ARTIFACT_ASSIGNMENTS = {
  // 文件名规则：{视频章节}-{拼图图片编号}-{器具名}.{png/txt}
  // 第二段编号对应拼图图片序号（09 拷贝.jpg => index 8）
  8: ['artifact17'], // 1-9-角弓
  10: ['artifactXiaojueDao', 'artifactMaShuo'], // 2-11-小蕨刀 / 2-11-马槊
  15: ['artifact9'], // 3-16-环首刀
  16: ['artifact15'], // 3-17-长弓
  17: ['artifact10'], // 3-18-大型弩
  19: ['artifact18']  // 3-20-兵马
};

const PROGRESS_KEY = 'mulanPuzzleProgress_v2';
const VIDEO_BGM_KEY = 'mulanVideoBgmEnabled_v1';
const DEFAULT_HORIZONTAL_PIECES = 4;
const DEFAULT_VERTICAL_PIECES = 4;

// 四段视频章节（入口封面 -> 章节选择 -> 视频播放）
// 注意：index.html 位于 puzzle/ 目录，视频已放入 puzzle/image/
const VIDEO_CHAPTERS = [
  { id: 'v1', title: '唧唧当户织', video: 'image/1Q.mp4' },
  { id: 'v2', title: '昨夜见军帖', video: 'image/2Q.mp4' },
  { id: 'v3', title: '朔气照铁衣', video: 'image/3Q.mp4' },
  { id: 'v4', title: '对镜贴花黄', video: 'image/4Q.mp4' }
];

// 视频中“定时暂停展示器具”配置（占位：等待你提供每段停留秒数）
// 结构：{ [videoId]: [{ at: 秒数(Number), items: [artifactId...] }, ...] }
// - at 为空/非数字时会被跳过，不会触发暂停
// - items 支持多件器具，同一停点可“下一页”翻页
const VIDEO_ARTIFACT_STOPS = {
  v1: [{ at: 31, items: ['artifact17'] }], // 1-9-角弓-31.png
  v2: [
    { at: 6, items: ['artifactMaShuo'] }, // 2-11-马槊-6.png
    { at: 9, items: ['artifactXiaojueDao'] } // 2-11-小蕨刀-09.png
  ],
  v3: [
    { at: 2, items: ['artifact9'] }, // 3-16-环首刀-02.png
    { at: 3, items: ['artifact15'] }, // 3-17-长弓-03
    { at: 4, items: ['artifact10'] }, // 3-18-大型弩-04.png
    { at: 11, items: ['artifact18'] } // 3-20-兵马-11.png
  ],
  v4: []
};

let MULAN_LEVELS = [];
let currentLevelIndex = 0;
let progress = { unlocked: 1, current: 0 };
let puzzleCanvas = null;
let puzzleSolvedFlag = false;
let hintTimerId = null;
let initialPuzzleCanvasWidth = null;
let initialPuzzleCanvasHeight = null;
let puzzleResizeHandlerAttached = false;
let bgmAudio = null;
let bgmEnabled = false;
let videoChaptersRendered = false;
let videoBgmEnabled = true;
let activeVideoStopIndex = 0;
let activeVideoStopItems = null;
let activeVideoStopItemIndex = 0;
let activeVideoTimeHandler = null;
let activeVideoSeekHandler = null;
let activeVideoPollerId = null;
let activeVideoId = null;
let videoOverlayVisible = false;
let videoPromptVisible = false;
let pendingVideoStop = null; // { at:number, items:[artifactId...] }
let pendingPromptTimeoutId = null;
let videoPuzzleVisible = false;
let pendingVideoPuzzle = null; // { at:number, imageSrc:string }
let videoMiniPuzzleCanvas = null;
let videoMiniPuzzleSolved = false;
let videoMiniPuzzleImageSrc = null;
let videoArtifactPageIndex = 0; // 0=器具介绍，1=拼图预览
let videoArtifactPrimaryId = null; // 当前展示器具 id（用于拼图预览）


const PUZZLE_NO_BY_ARTIFACT = {
  artifact17: 9, // 1-9-角弓
  artifactXiaojueDao: 11, // 2-11-小蕨刀
  artifactMaShuo: 11, // 2-11-马槊
  artifact9: 16, // 3-16-环首刀
  artifact15: 17, // 3-17-长弓
  artifact10: 18, // 3-18-大型弩
  artifact18: 20 // 3-20-兵马
};

function getPuzzleImageSrcForArtifact(artifactId) {
  const no = PUZZLE_NO_BY_ARTIFACT[artifactId];
  if (typeof no !== 'number' || !Number.isFinite(no)) return null;
  return `image/${String(no).padStart(2, '0')} 拷贝.jpg`;
}

function getPreviewImageSrcForArtifact(artifactId) {
  const no = PUZZLE_NO_BY_ARTIFACT[artifactId];
  if (typeof no !== 'number' || !Number.isFinite(no)) return null;
  return `image/ext_preview/ext_${String(no).padStart(2, '0')}.jpg`;
}

function getCoverImageSrcForArtifact(artifactId) {
  // Prefer the wide preview (better as background), fallback to the puzzle original.
  return getPreviewImageSrcForArtifact(artifactId) || getPuzzleImageSrcForArtifact(artifactId) || null;
}

function formatTimeMmSs(seconds) {
  const s = Math.max(0, Math.floor(Number(seconds) || 0));
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

let videoNavStops = [];
let videoNavIndex = 0;
let videoNavVideoId = null;

function setVideoNavLabel(text) {
  const el = $('video-nav-label');
  if (el) el.textContent = text;
}

function updateVideoNavLabel() {
  if (!videoNavStops.length) {
    setVideoNavLabel('暂无点位');
    return;
  }
  const stop = videoNavStops[videoNavIndex] || videoNavStops[0];
  const firstId = Array.isArray(stop.items) ? stop.items[0] : null;
  const first = firstId ? ARTIFACTS_CATALOG[firstId] : null;
  const title = first ? first.name : '点位';
  setVideoNavLabel(`${formatTimeMmSs(stop.at)} · ${title}`);
}

function closeVideoNav() {
  const panel = $('video-nav-panel');
  if (panel) panel.style.display = 'none';
}

function isVideoNavOpen() {
  const panel = $('video-nav-panel');
  if (!panel) return false;
  return panel.style.display === 'block';
}

function openVideoNav() {
  const panel = $('video-nav-panel');
  if (panel) panel.style.display = 'block';
}

function toggleVideoNav() {
  if (isVideoNavOpen()) closeVideoNav();
  else openVideoNav();
}

function initVideoNav(videoId) {
  videoNavVideoId = videoId;
  videoNavStops = getVideoStops(videoId).filter((s) => s.at != null);
  videoNavIndex = 0;
  updateVideoNavLabel();
}

function jumpToVideoNavIndex(index) {
  if (!videoNavStops.length) return;
  videoNavIndex = (index + videoNavStops.length) % videoNavStops.length;
  updateVideoNavLabel();
  const stop = videoNavStops[videoNavIndex];

  // 防止 seeking handler 立刻触发其他点位
  const nextIdx = videoNavStops.findIndex((s) => s.at > stop.at);
  activeVideoStopIndex = nextIdx === -1 ? videoNavStops.length : nextIdx;

  const resolved = (stop.items || []).filter((id) => !!ARTIFACTS_CATALOG[id]);
  if (resolved.length) {
    openVideoArtifactAtStop({ at: stop.at, items: resolved });
  }
}

function openVideoArtifactAtStop(stop) {
  const videoEl = $('chapter-video');
  if (!videoEl) return;

  // 进入器具弹窗必须暂停
  try {
    forceVideoInline(videoEl);
    suppressSeekUntilSettled(videoEl, () => {
      videoEl.pause();
      if (typeof stop.at === 'number' && Number.isFinite(stop.at)) {
        const target = Math.min(stop.at, videoEl.duration || stop.at);
        // Avoid triggering an extra async `seeking` when we're already basically at the stop point.
        if (Math.abs((videoEl.currentTime || 0) - target) > 0.15) {
          videoEl.currentTime = target;
        }
      }
    });
  } catch (_) {
    suppressSeekHandler = false;
  }

  activeVideoStopItems = Array.isArray(stop.items) ? stop.items.slice() : [];
  activeVideoStopItemIndex = 0;
  if (activeVideoStopItems.length === 0) return;
  const art = ARTIFACTS_CATALOG[activeVideoStopItems[0]];
  if (!art) return;
  showVideoArtifactOverlay(art, activeVideoStopItems.length > 1);
}
let videoPrevPlaybackRate = 1;
let videoPlaybackRateAdjusted = false;
let suppressSeekHandler = false;

function loadProgress() {
  try {
    const raw = sessionStorage.getItem(PROGRESS_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (typeof parsed.unlocked === 'number' && typeof parsed.current === 'number') {
      progress = parsed;
    }
  } catch (e) {
    console.warn('无法读取进度，使用默认值', e);
  }
}

function triggerPuzzleHint() {
  const level = MULAN_LEVELS[currentLevelIndex];
  if (!level) return;
  const modal = $('hint-modal');
  const imgEl = $('hint-image');
  if (!modal || !imgEl) return;

  imgEl.src = level.image;
  imgEl.alt = level.title || '完整插画';
  modal.style.display = 'flex';

  if (hintTimerId) {
    clearTimeout(hintTimerId);
  }
  hintTimerId = setTimeout(() => {
    modal.style.display = 'none';
  }, 3000);
}

function tryPlayBgm() {
  if (!bgmAudio) return;
  if (!bgmEnabled) {
    bgmAudio.pause();
    return;
  }
  const p = bgmAudio.play();
  if (p && typeof p.catch === 'function') {
    p.catch(() => {});
  }
}

function setBgmEnabled(enabled) {
  bgmEnabled = !!enabled;
  if (!bgmAudio) return;
  if (bgmEnabled) {
    tryPlayBgm();
  } else {
    bgmAudio.pause();
  }
}

function loadVideoBgmSetting() {
  try {
    const raw = sessionStorage.getItem(VIDEO_BGM_KEY);
    if (raw == null) return;
    videoBgmEnabled = raw === '1';
  } catch (_) {}
}

function syncVideoBgmButton() {
  const btn = $('btn-video-bgm');
  if (!btn) return;
  if (videoBgmEnabled) {
    btn.classList.remove('off');
    btn.setAttribute('aria-label', '背景音乐：开启，点击关闭');
  } else {
    btn.classList.add('off');
    btn.setAttribute('aria-label', '背景音乐：关闭，点击开启');
  }
}

function applyVideoBgmPlayback() {
  if (!bgmAudio) return;
  if (!videoBgmEnabled) {
    bgmAudio.pause();
    return;
  }
  const p = bgmAudio.play();
  if (p && typeof p.catch === 'function') p.catch(() => {});
}

function setVideoBgmEnabled(enabled) {
  videoBgmEnabled = !!enabled;
  try {
    sessionStorage.setItem(VIDEO_BGM_KEY, videoBgmEnabled ? '1' : '0');
  } catch (_) {}
  syncVideoBgmButton();
  applyVideoBgmPlayback();
}

function saveProgress() {
  try {
    sessionStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('无法保存进度', e);
  }
}

function buildLevelsFromJson(json) {
  const entries = Object.entries(json); // 保持原有顺序
  MULAN_LEVELS = entries.map(([sectionKey, value], index) => {
    const imgPath = `image/${String(index + 1).padStart(2, '0')} 拷贝.jpg`;
    const artifacts = ARTIFACT_ASSIGNMENTS[index] || [];
    return {
      id: `section-${index + 1}`,
      sectionKey,
      index,
      title: MULAN_SECTION_TITLES[index] || sectionKey,
      poemLine: value['原文'],
      narration: value['旁白'],
      image: imgPath,
      artifacts
    };
  });
}

function $(id) { return document.getElementById(id); }

function forceVideoInline(videoEl) {
  if (!videoEl) return;
  // iOS Safari/WKWebView: ensure the video leaves native fullscreen so DOM overlays can show.
  try {
    if (videoEl.webkitSupportsPresentationMode && typeof videoEl.webkitSetPresentationMode === 'function') {
      const mode = videoEl.webkitPresentationMode;
      if (mode && mode !== 'inline') {
        videoEl.webkitSetPresentationMode('inline');
      }
    }
  } catch (_) {}
  // Standard fullscreen API (some Android browsers).
  try {
    if (document.fullscreenElement && typeof document.exitFullscreen === 'function') {
      const p = document.exitFullscreen();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }
  } catch (_) {}
}

function showVideoTapOverlay() {
  const overlay = $('video-tap-overlay');
  if (!overlay) return;
  overlay.style.display = 'grid';
  overlay.setAttribute('aria-hidden', 'false');
}

function hideVideoTapOverlay() {
  const overlay = $('video-tap-overlay');
  if (!overlay) return;
  overlay.style.display = 'none';
  overlay.setAttribute('aria-hidden', 'true');
}

function suppressSeekUntilSettled(videoEl, action) {
  if (!videoEl) return;
  let cleared = false;
  const clear = () => {
    if (cleared) return;
    cleared = true;
    suppressSeekHandler = false;
    try {
      videoEl.removeEventListener('seeked', clear);
    } catch (_) {}
  };

  suppressSeekHandler = true;
  try {
    // Some mobile browsers fire `seeking/seeked` async; keep suppression until `seeked`,
    // plus a timeout fallback to avoid getting stuck.
    videoEl.addEventListener('seeked', clear, { once: true });
  } catch (_) {}

  try {
    action();
  } finally {
    setTimeout(clear, 600);
  }
}

function disableVideoFullscreen(videoEl) {
  if (!videoEl) return;
  if (videoEl.__fullscreenDisabled) return;
  videoEl.__fullscreenDisabled = true;

  // Keep it inline as much as possible.
  try {
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('webkit-playsinline', '');
    videoEl.setAttribute('x5-playsinline', '');
    videoEl.setAttribute('x5-video-player-type', 'h5');
    videoEl.setAttribute('x5-video-player-fullscreen', 'false');
    videoEl.setAttribute('controlslist', 'nofullscreen noremoteplayback noplaybackrate');
  } catch (_) {}

  const exitAnyFullscreen = () => {
    forceVideoInline(videoEl);
    try {
      if (typeof videoEl.webkitExitFullscreen === 'function') {
        videoEl.webkitExitFullscreen();
      }
    } catch (_) {}
  };

  try {
    videoEl.addEventListener('webkitbeginfullscreen', exitAnyFullscreen);
    videoEl.addEventListener('webkitendfullscreen', exitAnyFullscreen);
  } catch (_) {}
  try {
    document.addEventListener('fullscreenchange', exitAnyFullscreen);
    document.addEventListener('webkitfullscreenchange', exitAnyFullscreen);
  } catch (_) {}
}

function setNativeVideoControlsSuppressed(videoEl, suppressed) {
  if (!videoEl) return;
  const next = !!suppressed;
  if (!!videoEl.__nativeControlsSuppressed === next) return;

  if (next) {
    try {
      videoEl.__savedControls = !!videoEl.controls;
      videoEl.__savedPointerEvents = videoEl.style.pointerEvents || '';
      videoEl.__savedVisibility = videoEl.style.visibility || '';
    } catch (_) {}

    try {
      // Remove native overlays like +/-10s while the artifact/prompt UI is on top.
      videoEl.controls = false;
      videoEl.removeAttribute('controls');
    } catch (_) {}
    try {
      videoEl.style.pointerEvents = 'none';
    } catch (_) {}
    try {
      // Some Android browsers render video in a separate layer above DOM; hiding it avoids overlay "flash then disappear".
      videoEl.style.visibility = 'hidden';
    } catch (_) {}
  } else {
    try {
      const prevControls = videoEl.__savedControls;
      if (typeof prevControls === 'boolean') {
        videoEl.controls = prevControls;
        if (prevControls) videoEl.setAttribute('controls', '');
        else videoEl.removeAttribute('controls');
      }
    } catch (_) {}
    try {
      const prevPe = videoEl.__savedPointerEvents;
      videoEl.style.pointerEvents = typeof prevPe === 'string' ? prevPe : '';
    } catch (_) {}
    try {
      const prevVis = videoEl.__savedVisibility;
      videoEl.style.visibility = typeof prevVis === 'string' ? prevVis : '';
    } catch (_) {}
  }

  videoEl.__nativeControlsSuppressed = next;
}

function showVideoCover(src) {
  const cover = $('video-cover');
  if (!cover) return;
  const img = $('video-cover-img');
  if (img) {
    if (src) {
      img.src = src;
      img.style.display = '';
    } else {
      img.removeAttribute('src');
      img.style.display = 'none';
    }
  }
  cover.style.display = 'block';
  cover.setAttribute('aria-hidden', 'false');
}

function hideVideoCover() {
  const cover = $('video-cover');
  if (!cover) return;
  cover.style.display = 'none';
  cover.setAttribute('aria-hidden', 'true');
  const img = $('video-cover-img');
  if (img) {
    img.removeAttribute('src');
    img.style.display = 'none';
  }
}

function showView(id) {
  const views = document.querySelectorAll('[data-view]');
  views.forEach((v) => {
    if (v.getAttribute('data-view') === id) {
      v.style.display = 'block';
    } else {
      v.style.display = 'none';
    }
  });

  // 这些页面期望“全屏且不滚动”，并且需要去掉 #app padding 以免出现多余滚动条
  const fullscreenViews = new Set(['home', 'segments', 'video']);
  document.body.classList.toggle('fullscreen', fullscreenViews.has(id));
}

function getVideoStops(videoId) {
  const raw = VIDEO_ARTIFACT_STOPS[videoId] || [];
  return raw
    .map((s) => ({
      at: typeof s.at === 'number' && Number.isFinite(s.at) ? s.at : null,
      items: Array.isArray(s.items) ? s.items.slice() : []
    }))
    .filter((s) => s.items.length > 0)
    .sort((a, b) => {
      const atA = a.at == null ? Number.POSITIVE_INFINITY : a.at;
      const atB = b.at == null ? Number.POSITIVE_INFINITY : b.at;
      return atA - atB;
    });
}

function setVideoPlaybackRateTemporarily(videoEl, rate) {
  if (!videoEl) return;
  if (!videoPlaybackRateAdjusted) {
    videoPrevPlaybackRate = typeof videoEl.playbackRate === 'number' ? videoEl.playbackRate : 1;
  }
  videoPlaybackRateAdjusted = true;
  try {
    videoEl.playbackRate = rate;
  } catch (_) {}
}

function restoreVideoPlaybackRate(videoEl) {
  if (!videoEl || !videoPlaybackRateAdjusted) return;
  try {
    videoEl.playbackRate = videoPrevPlaybackRate;
  } catch (_) {}
  videoPlaybackRateAdjusted = false;
}

function hideVideoArtifactOverlay() {
  const overlay = $('video-artifact-overlay');
  if (overlay && overlay.style.display !== 'none') {
    console.log('hideVideoArtifactOverlay');
    overlay.style.display = 'none';
  } else if (overlay) {
    overlay.style.display = 'none';
  }
  videoOverlayVisible = false;
  document.body.classList.remove('video-artifact-open');
  setNativeVideoControlsSuppressed($('chapter-video'), false);
  hideVideoCover();
  restoreVideoPlaybackRate($('chapter-video'));
}

function hideVideoStopPrompt() {
  const overlay = $('video-stop-prompt');
  if (overlay) overlay.style.display = 'none';
  videoPromptVisible = false;
  pendingVideoStop = null;
  pendingVideoPuzzle = null;
  setNativeVideoControlsSuppressed($('chapter-video'), false);
  hideVideoTapOverlay();
  hideVideoCover();
  restoreVideoPlaybackRate($('chapter-video'));
  setVideoStopHintArtifact(null);
}

function ignoreVideoStopPrompt() {
  hideVideoStopPrompt();
  const videoEl = $('chapter-video');
  if (videoEl) {
    const p = videoEl.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }
}

function showVideoStopPrompt(stop) {
  const overlay = $('video-stop-prompt');
  if (!overlay) return;
  pendingVideoStop = stop;
  overlay.style.display = 'grid';
  videoPromptVisible = true;
  hideVideoTapOverlay();

  // 停点出现时就暂停视频（不自动消失，必须用户手动选择）
  const videoEl = $('chapter-video');
  if (videoEl) {
    try {
      forceVideoInline(videoEl);
      setNativeVideoControlsSuppressed(videoEl, true);
      // Android 部分内核下视频层会压过 DOM：这里通过隐藏 video（setNativeVideoControlsSuppressed）
      // 来保证提示/器具卡片能稳定显示；封面使用“对应拼图原画/预览图”伪装视频仍在。
      const firstId = Array.isArray(stop.items) ? stop.items[0] : null;
      const coverSrc = firstId ? getCoverImageSrcForArtifact(firstId) : null;
      showVideoCover(coverSrc);
      suppressSeekUntilSettled(videoEl, () => {
        videoEl.pause();
        if (typeof stop.at === 'number' && Number.isFinite(stop.at)) {
          const target = Math.min(stop.at, videoEl.duration || stop.at);
          if (Math.abs((videoEl.currentTime || 0) - target) > 0.15) {
            videoEl.currentTime = target;
          }
        }
      });
    } catch (_) {
      suppressSeekHandler = false;
    }
  }

  const firstId = Array.isArray(stop.items) ? stop.items[0] : null;
  const firstArtifact = firstId ? ARTIFACTS_CATALOG[firstId] : null;
  setVideoStopHintArtifact(firstArtifact);

  // 拼图入口：根据器具对应的拼图编号，直接用拼图原图来拼
  const puzzleBtn = $('btn-video-stop-puzzle');
  if (puzzleBtn) {
    const puzzleArtifactId = (Array.isArray(stop.items) ? stop.items : []).find((id) =>
      !!getPuzzleImageSrcForArtifact(id)
    );
    const imageSrc = puzzleArtifactId ? getPuzzleImageSrcForArtifact(puzzleArtifactId) : null;
    if (imageSrc) {
      pendingVideoPuzzle = { at: stop.at, imageSrc };
      puzzleBtn.style.display = '';
    } else {
      puzzleBtn.style.display = 'none';
    }
  }
}

function setVideoStopHintArtifact(artifact) {
  const imgEl = $('video-stop-hint-artifact');
  if (!imgEl) return;
  if (artifact && artifact.image) {
    imgEl.style.display = 'block';
    imgEl.src = artifact.image;
    imgEl.alt = artifact.name || '器具预览';
  } else {
    imgEl.style.display = 'none';
    imgEl.removeAttribute('src');
    imgEl.alt = '器具预览';
  }
}

function showVideoArtifactOverlay(artifact, hasNext) {
  const overlay = $('video-artifact-overlay');
  const imgEl = $('video-artifact-img');
  const titleEl = $('video-artifact-title');
  const descEl = $('video-artifact-desc');
  const playBtn = $('btn-video-artifact-play-puzzle');
  const previewImg = $('video-artifact-preview');
  if (!overlay || !imgEl || !titleEl || !descEl) return;

  setNativeVideoControlsSuppressed($('chapter-video'), true);
  showVideoCover(artifact && artifact.id ? getCoverImageSrcForArtifact(artifact.id) : null);
  imgEl.src = artifact.image;
  imgEl.alt = artifact.name;
  titleEl.textContent = artifact.name;
  descEl.textContent = artifact.description || '';
  videoArtifactPrimaryId = artifact.id || null;
  setVideoArtifactModalPage(0);
  syncVideoToolScrollIndicator();

  const previewSrc = (videoArtifactPrimaryId && getPreviewImageSrcForArtifact(videoArtifactPrimaryId)) || artifact.image;
  if (previewImg) previewImg.src = previewSrc;
  if (playBtn) {
    playBtn.disabled = !getPuzzleImageSrcForArtifact(videoArtifactPrimaryId);
    playBtn.style.opacity = playBtn.disabled ? '0.55' : '';
  }
  if (previewImg) {
    previewImg.onclick = () => {
      openMiniPuzzleFromArtifactModal();
    };
  }

  overlay.style.display = 'grid';
  videoOverlayVisible = true;
  document.body.classList.add('video-artifact-open');
  console.log('showVideoArtifactOverlay display', {
    artifactId: artifact.id,
    hasNext,
    items: activeVideoStopItems
  });
}

function setVideoArtifactModalPage(pageIndex) {
  videoArtifactPageIndex = pageIndex === 1 ? 1 : 0;
  const track = $('video-artifact-pages-track');
  if (track) {
    track.style.transform = videoArtifactPageIndex === 1 ? 'translateX(-50%)' : 'translateX(0%)';
  }
  const returnBtn = $('btn-video-artifact-return');
  if (returnBtn) {
    if (videoArtifactPageIndex === 1) {
      returnBtn.textContent = '← 介绍';
      returnBtn.setAttribute('aria-label', '返回介绍');
    } else {
      returnBtn.textContent = '← 返回';
      returnBtn.setAttribute('aria-label', '返回视频');
    }
  }

  const toolScrollBtn = $('btn-video-tool-scroll');
  if (toolScrollBtn) toolScrollBtn.style.display = 'none';
  if (videoArtifactPageIndex === 0) {
    syncVideoToolScrollIndicator();
  }
}

function openVideoArtifactPage2() {
  setVideoArtifactModalPage(1);
}

function openVideoArtifactPage1() {
  setVideoArtifactModalPage(0);
}

function syncVideoToolScrollIndicator() {
  const scroller = $('video-tool-text');
  const btn = $('btn-video-tool-scroll');
  if (!scroller || !btn) return;

  // 只有文字区域确实产生滚动才显示倒三角，并且滚到底后隐藏
  const overflow = scroller.scrollHeight - scroller.clientHeight > 6;
  if (!overflow) {
    btn.style.display = 'none';
    return;
  }
  const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 8;
  btn.style.display = atBottom ? 'none' : '';
}

function openMiniPuzzleFromArtifactModal() {
  const id = videoArtifactPrimaryId;
  const imageSrc = (id && getPuzzleImageSrcForArtifact(id)) || null;
  if (!imageSrc) return;

  // 关闭器具弹窗但不恢复视频（保持暂停），进入拼图覆盖层
  hideVideoArtifactOverlay();
  showVideoPuzzleOverlay();
  startVideoMiniPuzzle(imageSrc);
}

function teardownVideoStopLogic(videoEl) {
  if (!videoEl) return;
  if (activeVideoTimeHandler) {
    videoEl.removeEventListener('timeupdate', activeVideoTimeHandler);
    videoEl.removeEventListener('durationchange', activeVideoTimeHandler);
    videoEl.removeEventListener('loadeddata', activeVideoTimeHandler);
    videoEl.removeEventListener('canplay', activeVideoTimeHandler);
    videoEl.removeEventListener('playing', activeVideoTimeHandler);
    videoEl.removeEventListener('pause', activeVideoTimeHandler);
  }
  if (activeVideoSeekHandler) {
    videoEl.removeEventListener('seeking', activeVideoSeekHandler);
    videoEl.removeEventListener('seeked', activeVideoSeekHandler);
  }
  if (activeVideoPollerId) clearInterval(activeVideoPollerId);
  activeVideoTimeHandler = null;
  activeVideoSeekHandler = null;
  activeVideoPollerId = null;
  activeVideoId = null;
  activeVideoStopIndex = 0;
  activeVideoStopItems = null;
  activeVideoStopItemIndex = 0;
  hideVideoArtifactOverlay();
  hideVideoStopPrompt();
  hideVideoPuzzleOverlay({ resume: false });
  restoreVideoPlaybackRate(videoEl);
}

function setupVideoStopLogic(videoEl, videoId) {
  if (!videoEl) return;
  teardownVideoStopLogic(videoEl);

  activeVideoId = videoId;
  const stops = getVideoStops(videoId);
  activeVideoStopIndex = 0;

  const maybeTrigger = () => {
    if (!activeVideoId || videoOverlayVisible || videoPromptVisible || videoPuzzleVisible) return;
    if (!stops.length) return;

    // 某些浏览器（尤其部分 Android 内核）在用户交互/开始播放前拿不到 duration（NaN）。
    // 这里不强依赖 duration：能用 currentTime 命中停点就触发。
    const duration =
      typeof videoEl.duration === 'number' && Number.isFinite(videoEl.duration) && videoEl.duration > 0
        ? videoEl.duration
        : null;

    // 跳过未配置秒数的停点
    while (activeVideoStopIndex < stops.length && stops[activeVideoStopIndex].at == null) {
      activeVideoStopIndex += 1;
    }
    if (activeVideoStopIndex >= stops.length) return;

    const stop = stops[activeVideoStopIndex];
    if (stop.at == null) return;
    // 超出视频时长的停点直接跳过，避免“永远触发不到”
    if (duration != null && stop.at > duration) {
      activeVideoStopIndex += 1;
      return;
    }
    if (videoEl.currentTime + 0.05 < stop.at) return;

    // 触发：先给提示，引导用户点击后再打开介绍（避免突兀打断）
    const resolvedItems = stop.items.filter((id) => !!ARTIFACTS_CATALOG[id]);
    if (resolvedItems.length === 0) {
      activeVideoStopIndex += 1;
      return;
    }
    // 触发即消费该停点，避免重复触发
    activeVideoStopIndex += 1;
    openVideoArtifactAtStop({ at: stop.at, items: resolvedItems });
  };

  activeVideoTimeHandler = () => maybeTrigger();
  activeVideoSeekHandler = () => {
    if (suppressSeekHandler) return;
    // 用户拖动进度条时：如果正在展示，先隐藏（避免卡住），然后继续按当前时间判断
    if (videoOverlayVisible) {
      hideVideoArtifactOverlay();
    }
    maybeTrigger();
  };

  videoEl.addEventListener('timeupdate', activeVideoTimeHandler);
  videoEl.addEventListener('seeking', activeVideoSeekHandler);
  // 部分内核 timeupdate / loadedmetadata 不稳定，额外监听一些“更容易触发”的事件
  try {
    videoEl.addEventListener('seeked', activeVideoSeekHandler);
    videoEl.addEventListener('durationchange', activeVideoTimeHandler);
    videoEl.addEventListener('loadeddata', activeVideoTimeHandler);
    videoEl.addEventListener('canplay', activeVideoTimeHandler);
    videoEl.addEventListener('playing', activeVideoTimeHandler);
    videoEl.addEventListener('pause', activeVideoTimeHandler);
  } catch (_) {}

  // 兜底：部分环境 timeupdate 触发不稳定，用轮询保证能触发停点
  activeVideoPollerId = setInterval(() => {
    if (videoEl.ended) return;
    maybeTrigger();
  }, 120);

  // 元数据加载后立即检查一次（避免刚好在停点附近错过）
  const onMeta = () => {
    maybeTrigger();
    videoEl.removeEventListener('loadedmetadata', onMeta);
  };
  videoEl.addEventListener('loadedmetadata', onMeta);
}

function nextVideoArtifactPage() {
  if (!activeVideoStopItems) return;
  const videoEl = $('chapter-video');
  if (!videoEl) return;

  const nextIndex = activeVideoStopItemIndex + 1;
  if (nextIndex >= activeVideoStopItems.length) return;

  activeVideoStopItemIndex = nextIndex;
  const art = ARTIFACTS_CATALOG[activeVideoStopItems[activeVideoStopItemIndex]];
  if (art) {
    showVideoArtifactOverlay(art, activeVideoStopItemIndex + 1 < activeVideoStopItems.length);
  }
}

function closeVideoArtifactOverlayAndResume() {
  const videoEl = $('chapter-video');
  if (!videoEl) return;

  console.log('closeVideoArtifactOverlayAndResume invoked', {
    hadItems: !!activeVideoStopItems,
    overlayVisible: videoOverlayVisible
  });
  hideVideoArtifactOverlay();
  activeVideoStopItems = null;
  activeVideoStopItemIndex = 0;

  restoreVideoPlaybackRate(videoEl);
  const p = videoEl.play();
  if (p && typeof p.catch === 'function') p.catch(() => {});
}

function openVideoStopPrompt() {
  const videoEl = $('chapter-video');
  if (!videoEl || !pendingVideoStop) {
    console.warn('openVideoStopPrompt early return', {
      hasVideo: !!videoEl,
      hasPendingStop: !!pendingVideoStop,
      pendingVideoStop
    });
    return;
  }
  const stop = pendingVideoStop;
  hideVideoStopPrompt();

  // showVideoStopPrompt 已经负责 pause + 定位秒数，这里只负责打开介绍
  activeVideoStopItems = Array.isArray(stop.items) ? stop.items.slice() : [];
  activeVideoStopItemIndex = 0;
  const logPayload = {
    stop,
    activeVideoStopItems,
    pendingVideoStop: stop
  };
  console.log('openVideoStopPrompt -> start', logPayload);
  if (activeVideoStopItems.length === 0) {
    console.warn('openVideoStopPrompt aborted: no artifact items', { stop });
    return;
  }
  const artId = activeVideoStopItems[0];
  const art = ARTIFACTS_CATALOG[artId];
  if (!art) {
    console.warn('video artifact not found in catalog', {
      firstId: artId,
      stop,
      hasCatalog: !!ARTIFACTS_CATALOG,
      catalogKeys: Object.keys(ARTIFACTS_CATALOG || {}).slice(0, 30)
    });
    return;
  }
  console.log('openVideoStopPrompt -> showVideoArtifactOverlay', {
    artifactId: artId,
    hasNext: activeVideoStopItems.length > 1
  });
  showVideoArtifactOverlay(art, activeVideoStopItems.length > 1);
}

function hideVideoPuzzleOverlay({ resume = true } = {}) {
  const overlay = $('video-puzzle-overlay');
  if (overlay) overlay.style.display = 'none';
  videoPuzzleVisible = false;
  pendingVideoPuzzle = null;

  setNativeVideoControlsSuppressed($('chapter-video'), false);
  hideVideoCover();
  const canvasHost = $('video-puzzle-canvas');
  if (canvasHost) canvasHost.innerHTML = '';
  videoMiniPuzzleCanvas = null;
  videoMiniPuzzleSolved = false;
  videoMiniPuzzleImageSrc = null;
  setVideoPuzzleSolvedState(false);

  const successEl = $('video-puzzle-success');
  if (successEl) successEl.style.display = 'none';

  restoreVideoPlaybackRate($('chapter-video'));
  if (resume) {
    const videoEl = $('chapter-video');
    if (videoEl) {
      const p = videoEl.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }
  }
}

function showVideoPuzzleOverlay() {
  const overlay = $('video-puzzle-overlay');
  if (!overlay) return;
  overlay.style.display = 'grid';
  videoPuzzleVisible = true;
  setNativeVideoControlsSuppressed($('chapter-video'), true);
  showVideoCover(videoMiniPuzzleImageSrc || null);
}

function setVideoPuzzleSolvedState(isSolved) {
  const panel = document.querySelector('.video-puzzle-panel');
  if (panel) panel.classList.toggle('is-solved', !!isSolved);
  const hintBtn = $('btn-video-puzzle-hint');
  if (hintBtn) hintBtn.style.display = isSolved ? 'none' : '';
}

function startVideoMiniPuzzle(imageSrc) {
  const canvasHost = $('video-puzzle-canvas');
  if (!canvasHost) return;
  canvasHost.innerHTML = '';
  videoMiniPuzzleCanvas = null;
  videoMiniPuzzleSolved = false;
  videoMiniPuzzleImageSrc = imageSrc;
  setVideoPuzzleSolvedState(false);

  const successEl = $('video-puzzle-success');
  if (successEl) successEl.style.display = 'none';

  const img = new Image();
  img.src = imageSrc;
  img.onload = function () {
    const viewportW = window.innerWidth || 900;
    const viewportH = window.innerHeight || 700;
    const hostW = canvasHost.clientWidth || Math.min(980, viewportW * 0.92);
    const hostH = canvasHost.clientHeight || Math.min(viewportH * 0.82, 820);

    // 画布保持不变（CSS 控制 1:1 居中），这里只把“拼图实际区域”缩小一点，避免碎片过大
    const miniScale = 0.78;
    const canvasWidth = Math.max(260, Math.min(980, hostW * miniScale));
    const canvasHeight = Math.max(260, Math.min(hostH * miniScale, viewportH * 0.86 * miniScale));

    // 视频内小游戏：降低难度，3x3 或 4x3 更适合短暂停留
    const horizontalPiecesCount = 3;
    const verticalPiecesCount = 3;

    const pieceSize = Math.floor(
      Math.min(canvasWidth / horizontalPiecesCount, canvasHeight / verticalPiecesCount)
    );

    videoMiniPuzzleCanvas = new headbreaker.Canvas('video-puzzle-canvas', {
      width: canvasWidth,
      height: canvasHeight,
      pieceSize,
      proximity: 20,
      borderFill: 10,
      strokeWidth: 2,
      lineSoftness: 0.22,
      image: img,
      strokeColor: '#ffffff',
      outline: new headbreaker.outline.Rounded()
    });
    videoMiniPuzzleCanvas.adjustImagesToPuzzleHeight();
    videoMiniPuzzleCanvas.autogenerate({ horizontalPiecesCount, verticalPiecesCount });
    videoMiniPuzzleCanvas.attachSolvedValidator();
    videoMiniPuzzleCanvas.onValid(function () {
      if (videoMiniPuzzleSolved) return;
      videoMiniPuzzleSolved = true;
      setVideoPuzzleSolvedState(true);
      const successEl = $('video-puzzle-success');
      if (successEl) successEl.style.display = 'grid';
      const imgEl = $('video-puzzle-success-img');
      if (imgEl) imgEl.src = imageSrc;
    });
    if (typeof videoMiniPuzzleCanvas.shuffle === 'function') {
      videoMiniPuzzleCanvas.shuffle(0.85);
    } else if (typeof videoMiniPuzzleCanvas.shuffleGrid === 'function') {
      videoMiniPuzzleCanvas.shuffleGrid();
    }
    videoMiniPuzzleCanvas.draw();
  };
  img.onerror = function () {
    alert(`拼图图片加载失败：${imageSrc}`);
  };
}

function showVideoPuzzleHint() {
  if (videoMiniPuzzleSolved) return;
  if (!videoMiniPuzzleImageSrc) return;
  const modal = $('hint-modal');
  const imgEl = $('hint-image');
  if (!modal || !imgEl) return;
  imgEl.src = videoMiniPuzzleImageSrc;
  imgEl.alt = '拼图原图提示';
  modal.style.display = 'flex';
  if (hintTimerId) clearTimeout(hintTimerId);
  hintTimerId = setTimeout(() => {
    modal.style.display = 'none';
  }, 1800);
}

function openVideoStopPuzzle() {
  const videoEl = $('chapter-video');
  if (!videoEl || !pendingVideoPuzzle) return;
  const puzzle = pendingVideoPuzzle;
  hideVideoStopPrompt();

  try {
    forceVideoInline(videoEl);
    suppressSeekUntilSettled(videoEl, () => {
      videoEl.pause();
      if (typeof puzzle.at === 'number' && Number.isFinite(puzzle.at)) {
        const target = Math.min(puzzle.at, videoEl.duration || puzzle.at);
        if (Math.abs((videoEl.currentTime || 0) - target) > 0.15) {
          videoEl.currentTime = target;
        }
      }
    });
  } catch (_) {
    suppressSeekHandler = false;
  }

  showVideoPuzzleOverlay();
  startVideoMiniPuzzle(puzzle.imageSrc);
}

function renderVideoChapters() {
  const listEl = $('segments-list');
  if (!listEl) return;
  if (videoChaptersRendered) return;
  videoChaptersRendered = true;

  listEl.innerHTML = '';
  VIDEO_CHAPTERS.forEach((chapter, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'segment-circle-btn';
    btn.classList.add(idx % 2 === 0 ? 'odd' : 'even');
    btn.setAttribute('data-video-id', chapter.id);
    btn.setAttribute('aria-label', `播放：${chapter.title}`);

    const text = document.createElement('span');
    text.className = 'segment-title-text';
    text.textContent = chapter.title;
    btn.appendChild(text);
    // 覆盖上方异常的 aria-label
    btn.setAttribute('aria-label', `播放：${chapter.title}`);

    btn.addEventListener('click', () => openVideoChapter(idx));
    listEl.appendChild(btn);
  });
}

function stopVideoPlayback() {
  const videoEl = $('chapter-video');
  if (!videoEl) return;
  teardownVideoStopLogic(videoEl);
  closeVideoNav();
  // 离开视频时停止视频背景音乐
  if (bgmAudio) bgmAudio.pause();
  try {
    videoEl.pause();
    videoEl.removeAttribute('src');
    videoEl.load();
  } catch (_) {}
}

function openVideoChapter(index) {
  const chapter = VIDEO_CHAPTERS[index];
  if (!chapter) return;

  const titleEl = $('video-title');
  if (titleEl) titleEl.textContent = chapter.title;

  const videoEl = $('chapter-video');
  if (videoEl) {
    try {
      disableVideoFullscreen(videoEl);
      // Keep native controls during normal playback, but we'll suppress them while overlays are open.
      videoEl.controls = true;
      videoEl.setAttribute('controls', '');
      // The story videos are meant to be silent; keep muted to improve autoplay/inline behavior on mobile.
      videoEl.muted = true;
      videoEl.defaultMuted = true;
      videoEl.setAttribute('muted', '');
      videoEl.pause();
      videoEl.src = chapter.video;
      videoEl.load();
    } catch (_) {}
  }

  // 视频页使用独立喇叭开关播放背景音乐（视频本身是无声的）
  syncVideoBgmButton();
  applyVideoBgmPlayback();
  initVideoNav(chapter.id);
  closeVideoNav();

  showView('video');

  if (videoEl) {
    setupVideoStopLogic(videoEl, chapter.id);
    const onPlay = () => hideVideoTapOverlay();
    videoEl.removeEventListener('play', onPlay);
    videoEl.addEventListener('play', onPlay);

    const p = videoEl.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        // Some browsers (e.g. MIUI/WeChat) require a user gesture. Show a simple tap-to-play overlay.
        showVideoTapOverlay();
      });
    }
    videoEl.onended = () => {
      stopVideoPlayback();
      showView('segments');
    };
  }
}

function initChapterList() {
  const container = $('chapter-map');
  if (!container) return;

  const svgEl = container.querySelector('.chapter-path-svg');
  const pathEl = $('chapter-path');

  // 清理已有节点（避免重复追加）
  const existingNodes = container.querySelectorAll('.chapter-node');
  existingNodes.forEach((node) => node.remove());

  const total = MULAN_LEVELS.length;
  if (!total) return;

  // 一屏大约展示 7 个节点：根据窗口高度计算间距（稍微拉大间隔）
  const VISIBLE_PER_SCREEN = 7;
  const viewportH = window.innerHeight || 640;
  const spacingY = (viewportH / VISIBLE_PER_SCREEN) * 0.78;
  const topOffset = 80;
  const extraBottomSpace = 120;
  const containerHeight = spacingY * (total - 1) + topOffset + extraBottomSpace;
  container.style.height = `${containerHeight}px`;

  const containerWidth = container.clientWidth || 320;
  const centerX = containerWidth / 2;
  const amplitude = containerWidth * 0.2; // 左右摆动幅度稍微缩小，让曲线更收敛
  const cycleSize = VISIBLE_PER_SCREEN; // 每一屏内形成一段 S 形

  if (svgEl) {
    svgEl.setAttribute('viewBox', `0 0 ${containerWidth} ${containerHeight}`);
  }

  const points = [];
  const waveCount = 8; // 整条路径的左右摆动圈数，可根据背景微调

  for (let idx = 0; idx < total; idx++) {
    const unlocked = idx < progress.unlocked;
    // 在每一屏内（7 个节点）形成一个 S 的大致节奏，用于后续微调
    const localIndex = cycleSize > 0 ? idx % cycleSize : 0;
    const t = total > 1 ? idx / (total - 1) : 0; // 0~1 归一化到整条路径高度
    // 使用正弦曲线让整条路径左右摆动，保证 1~31 为一条连续的曲线
    let x = centerX + amplitude * Math.sin(2 * Math.PI * waveCount * t);
    let y = topOffset + idx * spacingY;

    points.push({ x, y });

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = String(idx + 1);
    btn.className = 'chapter-node ' + (unlocked ? 'unlocked' : 'locked');
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
    btn.disabled = !unlocked;
    if (unlocked) {
      btn.addEventListener('click', () => {
        currentLevelIndex = idx;
        progress.current = idx;
        saveProgress();
        startPuzzleForCurrentLevel();
      });
    }
    container.appendChild(btn);
  }

  // 曲线底部添加“返回顶部”节点，实现触底一键返回
  const backX = centerX;
  const backY = topOffset + total * spacingY;
  const backBtn = document.createElement('button');
  backBtn.type = 'button';
  backBtn.textContent = '返';
  backBtn.className = 'chapter-node chapter-back-node unlocked';
  backBtn.style.left = `${backX}px`;
  backBtn.style.top = `${backY}px`;
  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  container.appendChild(backBtn);

  // 把返按钮的坐标也加入路径点中，确保 30、31 与“返”之间同样有虚线连接
  points.push({ x: backX, y: backY });

  // 根据节点位置绘制路径，使虚线与数字同步摆动（包括 30、31 和返）
  if (pathEl && points.length > 0) {
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2;
      // 使用二次贝塞尔平滑连接
      d += ` Q ${prev.x} ${prev.y} ${midX} ${midY}`;
    }
    pathEl.setAttribute('d', d);

    // 依据整体高度生成随机的虚线段长，让每一小段略有不同
    const baseDash = 40; // 基础段长
    const baseGap = 22;  // 基础间隔
    const segments = Math.max(6, Math.floor(containerHeight / 120));
    const dashParts = [];
    for (let i = 0; i < segments; i++) {
      const dash = baseDash * (0.7 + Math.random() * 0.6); // 0.7x ~ 1.3x
      const gap = baseGap * (0.7 + Math.random() * 0.6);
      dashParts.push(dash.toFixed(1), gap.toFixed(1));
    }
    pathEl.style.strokeDasharray = dashParts.join(' ');

    // 线条粗细也做轻微随机，模拟手绘笔触
    const baseWidth = Math.max(8, Math.min(16, containerWidth * 0.04));
    const randomWidth = baseWidth * (0.9 + Math.random() * 0.3);
    pathEl.style.strokeWidth = randomWidth.toFixed(1);
  }

  // 自动滚动到最新解锁的章节附近，方便继续游玩
  const latestUnlockedIndex = Math.min(Math.max(progress.unlocked - 1, 0), total - 1);
  if (latestUnlockedIndex > 0) {
    const targetY = topOffset + latestUnlockedIndex * spacingY;
    const offsetTop = container.offsetTop || 0;
    const viewportOffset = viewportH * 0.45;
    const targetScrollTop = Math.max(offsetTop + targetY - viewportOffset, 0);
    window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
  }
}

function updateProgressText() {
  const textEl = $('progress-text');
  if (!textEl) return;
  const total = MULAN_LEVELS.length;
  const unlocked = Math.min(progress.unlocked, total);
  textEl.textContent = `已解锁章节：${unlocked} / ${total}`;
}

function startPuzzleForCurrentLevel() {
  const level = MULAN_LEVELS[currentLevelIndex];
  if (!level) {
    alert('关卡数据不存在');
    return;
  }
  showView('puzzle');
  updateProgressText();
  const titleEl = $('puzzle-title');
  const subtitleEl = $('puzzle-subtitle');
  const poemCardEl = $('puzzle-poem-text');
  if (titleEl) {
    const displayNo = (level.index != null ? level.index : currentLevelIndex) + 1;
    titleEl.textContent = `第${displayNo}关`;
  }
  if (subtitleEl) subtitleEl.textContent = '';
  if (poemCardEl) {
    let poemText = '';
    if (currentLevelIndex > 0) {
      const prevLevel = MULAN_LEVELS[currentLevelIndex - 1];
      poemText = (prevLevel && prevLevel.poemLine) || '';
    } else {
      poemText = level.poemLine || '';
    }
    poemCardEl.textContent = poemText;
  }

  const container = $('puzzle-canvas');
  if (!container) return;
  container.innerHTML = '';
  puzzleCanvas = null;
  puzzleSolvedFlag = false;

  const img = new Image();
  img.src = level.image;
  img.onload = function () {
    const viewportW = window.innerWidth || 800;
    const viewportH = window.innerHeight || 800;
    const containerWidth = container.clientWidth || viewportW;
    // 画布宽度尽量占满容器，高度不超过 70vh 和宽度
    const canvasWidth = Math.min(800, containerWidth);
    const canvasHeight = Math.min(canvasWidth, viewportH * 0.7);

    const horizontalPiecesCount = DEFAULT_HORIZONTAL_PIECES;
    const verticalPiecesCount = DEFAULT_VERTICAL_PIECES;

    const pieceSize = Math.floor(
      Math.min(canvasWidth / horizontalPiecesCount, canvasHeight / verticalPiecesCount)
    );

    puzzleCanvas = new headbreaker.Canvas('puzzle-canvas', {
      width: canvasWidth,
      height: canvasHeight,
      pieceSize,
      proximity: 20,
      borderFill: 10,
      strokeWidth: 2,
      lineSoftness: 0.22,
      image: img,
      strokeColor: '#4a1c1c',
      outline: new headbreaker.outline.Rounded()
    });
    puzzleCanvas.adjustImagesToPuzzleHeight();
    puzzleCanvas.autogenerate({
      horizontalPiecesCount,
      verticalPiecesCount
    });
    puzzleCanvas.attachSolvedValidator();
    puzzleCanvas.onValid(function () {
      if (puzzleSolvedFlag) return;
      puzzleSolvedFlag = true;
      onPuzzleSolved();
    });
    if (typeof puzzleCanvas.shuffle === 'function') {
      puzzleCanvas.shuffle(0.85);
    } else if (typeof puzzleCanvas.shuffleGrid === 'function') {
      puzzleCanvas.shuffleGrid();
    }
    puzzleCanvas.draw();
    setupPuzzleResponsive(canvasWidth, canvasHeight);
  };
  img.onerror = function () {
    alert(`图片加载失败：${level.image}`);
  };
}

function setupPuzzleResponsive(initialWidth, initialHeight) {
  initialPuzzleCanvasWidth = initialWidth;
  initialPuzzleCanvasHeight = initialHeight;
  if (puzzleResizeHandlerAttached) return;
  const handler = () => {
    if (!puzzleCanvas || !initialPuzzleCanvasWidth || !initialPuzzleCanvasHeight) return;
    const container = $('puzzle-canvas');
    if (!container) return;
    const newWidth = container.offsetWidth;
    if (!newWidth) return;
    const scaleFactor = newWidth / initialPuzzleCanvasWidth;
    const newHeight = initialPuzzleCanvasHeight * scaleFactor;
    puzzleCanvas.resize(newWidth, newHeight);
    puzzleCanvas.scale(scaleFactor);
    puzzleCanvas.redraw();
  };
  window.addEventListener('resize', handler);
  window.addEventListener('orientationchange', handler);
  puzzleResizeHandlerAttached = true;
}

function onPuzzleSolved() {
  const total = MULAN_LEVELS.length;
  const nextIndex = currentLevelIndex + 1;
  if (nextIndex < total && progress.unlocked < nextIndex + 1) {
    progress.unlocked = nextIndex + 1;
  }
  saveProgress();
  fillSuccessView();
  showView('success');
}

function fillSuccessView() {
  const level = MULAN_LEVELS[currentLevelIndex];
  if (!level) return;
  const poemEl = $('success-poem');
  const narrationEl = $('success-narration');
  const chapterTitleEl = $('success-title');
  const artListEl = $('artifact-list');
  const artifactTitleEl = $('artifact-section-title');
  const imgEl = $('success-image');
  if (chapterTitleEl) chapterTitleEl.textContent = level.title;
  if (poemEl) poemEl.textContent = level.poemLine;
  if (narrationEl) narrationEl.textContent = level.narration;
  if (imgEl) imgEl.src = level.image;

  if (!artListEl) return;
  artListEl.innerHTML = '';
  if (!level.artifacts || level.artifacts.length === 0) {
    if (artifactTitleEl) artifactTitleEl.style.display = 'none';
    return;
  }
  if (artifactTitleEl) artifactTitleEl.style.display = '';
  level.artifacts.forEach((key) => {
    const art = ARTIFACTS_CATALOG[key];
    if (!art) return;
    const li = document.createElement('li');
    li.className = 'artifact-list-item';
    const btn = document.createElement('button');
    btn.className = 'artifact-highlight-btn';

    const img = document.createElement('img');
    img.className = 'artifact-highlight-img';
    img.src = art.image;
    img.alt = art.name;

    const label = document.createElement('span');
    label.className = 'artifact-highlight-label';
    label.textContent = art.name;

    btn.appendChild(img);
    btn.appendChild(label);
    btn.addEventListener('click', () => openArtifactModal(art));
    li.appendChild(btn);
    artListEl.appendChild(li);
  });
}

function openArtifactModal(artifact) {
  const modal = $('artifact-modal');
  if (!modal) return;
  const nameEl = $('artifact-modal-name');
  const imgEl = $('artifact-modal-image');
  const descEl = $('artifact-modal-desc');
  if (nameEl) nameEl.textContent = artifact.name;
  if (imgEl) imgEl.src = artifact.image;
  if (imgEl) imgEl.alt = artifact.name;
  if (descEl) descEl.textContent = artifact.description;
  modal.style.display = 'flex';
}

function closeArtifactModal() {
  const modal = $('artifact-modal');
  if (modal) modal.style.display = 'none';
}

function gotoNextLevel() {
  const total = MULAN_LEVELS.length;
  if (currentLevelIndex + 1 >= total) {
    showView('chapters');
    initChapterList();
    updateProgressText();
    return;
  }
  const nextIndex = currentLevelIndex + 1;
  if (nextIndex < progress.unlocked) {
    currentLevelIndex = nextIndex;
    progress.current = nextIndex;
    saveProgress();
    startPuzzleForCurrentLevel();
  } else {
    showView('chapters');
    initChapterList();
    updateProgressText();
  }
}

function initGlobalEvents() {
  const startBtn = $('btn-start');
  const homeStartBtn = $('btn-home-start');
  const homeSettingsBtn = $('btn-home-settings');
  const settingsModal = $('settings-modal');
  const settingsCloseBtn = $('settings-close');
  const bgmToggle = $('bgm-toggle');

  const setHomeToggleActive = (activeKey) => {
    if (!homeStartBtn || !homeSettingsBtn) return;
    if (activeKey === 'start') {
      homeStartBtn.classList.add('home-toggle-btn-active');
      homeSettingsBtn.classList.remove('home-toggle-btn-active');
    } else if (activeKey === 'settings') {
      homeSettingsBtn.classList.add('home-toggle-btn-active');
      homeStartBtn.classList.remove('home-toggle-btn-active');
    }
  };

  const goToSegments = () => {
    setHomeToggleActive('start');
    tryPlayBgm();
    showView('segments');
    renderVideoChapters();
  };

  if (startBtn) {
    startBtn.addEventListener('click', goToSegments);
  }
  if (homeStartBtn) {
    homeStartBtn.addEventListener('click', goToSegments);
  }
  if (homeSettingsBtn) {
    homeSettingsBtn.addEventListener('click', () => {
      setHomeToggleActive('settings');
      if (settingsModal) {
        settingsModal.style.display = 'flex';
      }
      if (bgmToggle) {
        bgmToggle.checked = bgmEnabled;
      }
      tryPlayBgm();
    });
  }
  if (bgmToggle) {
    bgmToggle.addEventListener('change', () => {
      setBgmEnabled(bgmToggle.checked);
    });
  }
  if (settingsCloseBtn) {
    settingsCloseBtn.addEventListener('click', () => {
      if (settingsModal) settingsModal.style.display = 'none';
      setHomeToggleActive('start');
    });
  }
  if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) {
        settingsModal.style.display = 'none';
        setHomeToggleActive('start');
      }
    });
  }
  const backHomeFromChapters = $('btn-chapters-home');
  if (backHomeFromChapters) {
    backHomeFromChapters.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      showView('segments');
      renderVideoChapters();
    });
  }

  const backHomeFromSegments = $('btn-segments-home');
  if (backHomeFromSegments) {
    backHomeFromSegments.addEventListener('click', () => {
      stopVideoPlayback();
      window.scrollTo({ top: 0, behavior: 'auto' });
      showView('home');
    });
  }

  const segmentsToPuzzleBtn = $('btn-segments-puzzle');
  if (segmentsToPuzzleBtn) {
    segmentsToPuzzleBtn.addEventListener('click', () => {
      stopVideoPlayback();
      showView('chapters');
      initChapterList();
      updateProgressText();
    });
  }

  const videoBackBtn = $('btn-video-back');
  if (videoBackBtn) {
    videoBackBtn.addEventListener('click', () => {
      stopVideoPlayback();
      showView('segments');
    });
  }

  const videoBgmBtn = $('btn-video-bgm');
  if (videoBgmBtn) {
    videoBgmBtn.addEventListener('click', () => {
      setVideoBgmEnabled(!videoBgmEnabled);
    });
  }

  const videoNavBtn = $('btn-video-nav');
  if (videoNavBtn) {
    videoNavBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleVideoNav();
    });
  }
  const videoNavPrevBtn = $('btn-video-nav-prev');
  if (videoNavPrevBtn) {
    videoNavPrevBtn.addEventListener('click', () => {
      jumpToVideoNavIndex(videoNavIndex - 1);
    });
  }
  const videoNavNextBtn = $('btn-video-nav-next');
  if (videoNavNextBtn) {
    videoNavNextBtn.addEventListener('click', () => {
      jumpToVideoNavIndex(videoNavIndex + 1);
    });
  }
  const videoNavPanel = $('video-nav-panel');
  if (videoNavPanel) {
    videoNavPanel.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
  // 点击空白关闭
  document.addEventListener('click', () => {
    closeVideoNav();
  });

  const videoArtifactCloseBtn = $('btn-video-artifact-close');
  if (videoArtifactCloseBtn) {
    videoArtifactCloseBtn.addEventListener('click', () => {
      closeVideoArtifactOverlayAndResume();
    });
  }
  const videoArtifactReturnBtn = $('btn-video-artifact-return');
  if (videoArtifactReturnBtn) {
    videoArtifactReturnBtn.addEventListener('click', () => {
      if (videoArtifactPageIndex === 1) {
        openVideoArtifactPage1();
      } else {
        closeVideoArtifactOverlayAndResume();
      }
    });
  }
  const videoArtifactCtaBtn = $('btn-video-artifact-cta');
  if (videoArtifactCtaBtn) {
    videoArtifactCtaBtn.addEventListener('click', () => {
      openVideoArtifactPage2();
    });
  }
  const videoArtifactPlayPuzzleBtn = $('btn-video-artifact-play-puzzle');
  if (videoArtifactPlayPuzzleBtn) {
    videoArtifactPlayPuzzleBtn.addEventListener('click', () => {
      openMiniPuzzleFromArtifactModal();
    });
  }
  const toolScrollBtn = $('btn-video-tool-scroll');
  if (toolScrollBtn) {
    toolScrollBtn.addEventListener('click', () => {
      const scroller = $('video-tool-text');
      if (!scroller) return;
      scroller.scrollBy({ top: Math.max(140, Math.floor(scroller.clientHeight * 0.72)), behavior: 'smooth' });
      // 滚动是异步的，稍后再校准一次按钮显示
      setTimeout(syncVideoToolScrollIndicator, 260);
    });
  }
  const toolText = $('video-tool-text');
  if (toolText) {
    toolText.addEventListener('scroll', () => {
      syncVideoToolScrollIndicator();
    });
  }
  const videoOverlay = $('video-artifact-overlay');
  if (videoOverlay) {
    videoOverlay.addEventListener('click', (e) => {
      if (e.target === videoOverlay) {
        closeVideoArtifactOverlayAndResume();
      }
    });
  }

  const stopPrompt = $('video-stop-prompt');
  if (stopPrompt) {
    stopPrompt.addEventListener('click', (e) => {
      if (e.target === stopPrompt) {
        openVideoStopPrompt();
      }
    });
  }
  const stopOpenBtn = $('btn-video-stop-open');
  if (stopOpenBtn) {
    stopOpenBtn.addEventListener('click', () => {
      openVideoStopPrompt();
    });
  }
  const stopIgnoreBtn = $('btn-video-stop-ignore');
  if (stopIgnoreBtn) {
    stopIgnoreBtn.addEventListener('click', () => {
      ignoreVideoStopPrompt();
    });
  }
  const stopPuzzleBtn = $('btn-video-stop-puzzle');
  if (stopPuzzleBtn) {
    stopPuzzleBtn.addEventListener('click', () => {
      openVideoStopPuzzle();
    });
  }

  const tapPlayBtn = $('btn-video-tap-play');
  if (tapPlayBtn) {
    tapPlayBtn.addEventListener('click', () => {
      const videoEl = $('chapter-video');
      hideVideoTapOverlay();
      if (!videoEl) return;
      try {
        forceVideoInline(videoEl);
        const p = videoEl.play();
        if (p && typeof p.catch === 'function') {
          p.catch(() => {
            showVideoTapOverlay();
          });
        }
      } catch (_) {
        showVideoTapOverlay();
      }
    });
  }

  const videoPuzzleOverlay = $('video-puzzle-overlay');
  if (videoPuzzleOverlay) {
    videoPuzzleOverlay.addEventListener('click', (e) => {
      if (e.target === videoPuzzleOverlay) {
        // 只允许通过按钮退出，避免误触
        return;
      }
    });
  }
  const videoPuzzleHomeBtn = $('btn-video-puzzle-home');
  if (videoPuzzleHomeBtn) {
    videoPuzzleHomeBtn.addEventListener('click', () => {
      hideVideoPuzzleOverlay({ resume: false });
      stopVideoPlayback();
      window.scrollTo({ top: 0, behavior: 'auto' });
      showView('home');
    });
  }
  const videoPuzzleCloseBtn = $('btn-video-puzzle-close');
  if (videoPuzzleCloseBtn) {
    videoPuzzleCloseBtn.addEventListener('click', () => {
      hideVideoPuzzleOverlay({ resume: true });
    });
  }
  const videoPuzzleHintBtn = $('btn-video-puzzle-hint');
  if (videoPuzzleHintBtn) {
    videoPuzzleHintBtn.addEventListener('click', () => {
      showVideoPuzzleHint();
    });
  }
  const backToChaptersFromPuzzle = $('btn-back-chapters');
  if (backToChaptersFromPuzzle) {
    backToChaptersFromPuzzle.addEventListener('click', () => {
      showView('chapters');
      initChapterList();
      updateProgressText();
    });
  }
  const shuffleBtn = $('btn-shuffle');
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      if (!puzzleCanvas) return;
      puzzleSolvedFlag = false;
      if (typeof puzzleCanvas.shuffle === 'function') {
        puzzleCanvas.shuffle(0.85);
      } else if (typeof puzzleCanvas.shuffleGrid === 'function') {
        puzzleCanvas.shuffleGrid();
      }
      puzzleCanvas.draw();
    });
  }
  const hintBtn = $('btn-hint');
  if (hintBtn) {
    hintBtn.addEventListener('click', () => {
      triggerPuzzleHint();
    });
  }
  const hintModal = $('hint-modal');
  if (hintModal) {
    hintModal.addEventListener('click', (e) => {
      if (e.target === hintModal) {
        hintModal.style.display = 'none';
      }
    });
  }
  const successNextBtn = $('btn-success-next');
  if (successNextBtn) {
    successNextBtn.addEventListener('click', gotoNextLevel);
  }
  const successBackBtn = $('btn-success-back');
  if (successBackBtn) {
    successBackBtn.addEventListener('click', () => {
      showView('chapters');
      initChapterList();
      updateProgressText();
    });
  }
  const artifactCloseBtn = $('artifact-modal-close');
  if (artifactCloseBtn) {
    artifactCloseBtn.addEventListener('click', closeArtifactModal);
  }
  const artifactModal = $('artifact-modal');
  if (artifactModal) {
    artifactModal.addEventListener('click', (e) => {
      if (e.target === artifactModal) closeArtifactModal();
    });
  }
}

function initApp() {
  loadProgress();
  loadVideoBgmSetting();
  initGlobalEvents();
  bgmAudio = $('bgm-audio');
  if (bgmAudio && bgmEnabled) {
    tryPlayBgm();
  }
  showView('home');
}

// 入口：从全局 MULAN_EXPANDED 构建关卡（避免 file:// 环境下 fetch 受限）
window.addEventListener('DOMContentLoaded', () => {
  if (!window.MULAN_EXPANDED) {
    console.error('MULAN_EXPANDED 未定义，请确认 mulan_data.js 已正确加载。');
    alert('加载木兰辞文本失败，请检查 mulan_data.js 是否存在。');
    return;
  }
  buildLevelsFromJson(window.MULAN_EXPANDED);
  initApp();
});
