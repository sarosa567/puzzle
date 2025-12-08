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
    image: 'image/9.jpg',
    description: '环首刀又称汉刀、环头刀，是一种以手持为主的短兵器，特点是单面开锋，厚脊薄刃，直脊直刃，刀柄首呈圆环形。 环首刀是当时世界上非常先进、杀伤力极强的近身冷兵器，在人类历史上具有非凡意义。环首刀由汉剑演化而来。剑利于突刺，不利于劈砍，不适合骑兵作战。于是汉朝人将剑改为单面开刃、厚脊等结构。刀柄处的圆环可以拴绳子作战时把绳子绕在手上，可以避免刀在手中脱落。'
  },
  artifact10: {
    id: 'artifact10',
    name: '床弩',
    image: 'image/10.jpg',
    description: '中国古代一种威力较大的弩。将一张或几张弓安装在床架上，以绞动其后部的轮轴张弓装箭，待机发射。多弓床弩可用多人绞轴，用几张弓的合力发箭，其弹射力远远超过单人使用的擘张、蹶张或腰引弩。'
  },
  artifact15: {
    id: 'artifact15',
    name: '长弓',
    image: 'image/15.jpg',
    description: '长弓是源自威尔士的单体木制远程武器，一般长1.5米左右，个别的长达1.8—2米，以紫杉木（性能最优）为主要原料，辅以榆木、白蜡木（性能次之）等替代材料。制作需经过木料筛选、驯弓流程及拳高设定工艺，弓弦采用羊肠或筋鞣制，弓背经亚麻籽油防潮处理。使用该武器需具备45-55公斤拉力，14-15世纪成为英军主力装备。'
  },
  artifact17: {
    id: 'artifact17',
    name: '角弓',
    image: 'image/17.jpg',
    description: '古代角弓是一种以动物角、竹木、筋腱和动物胶等天然材料制成的复合弓，其名称源于制作中使用的动物角材料。这种弓在中国古代主要用于骑战，具有工艺复杂、威力强劲的特点。'
  },
  artifact18: {
    id: 'artifact18',
    name: '甲骑具装',
    image: 'image/18.jpg',
    description: '甲骑具装由人铠（甲骑）与马铠（具装）构成，南北朝时期马铠标准化为面帘、鸡颈、当胸等六部分，配备明光铠与马槊。该兵种通过密集阵形冲击敌军阵线，曾参与淝水之战等战役。隋代组建过五千具装甲骑部队，但装备耗费巨大，唐代因与突厥战争转向轻骑兵，仅保留仪仗用途。金代铁浮图覆灭后退出战场，中亚地区15世纪发展出链板甲体系，17世纪因火器普及彻底消亡。其装备体系对东北亚及波斯军事文化产生深远影响。'
  }
};

// 章节标题（与 mulan_expanded.json 中的节次顺序对应）
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
  9: ['artifact9'],
  10: ['artifact10'],
  15: ['artifact15'],
  17: ['artifact17'],
  18: ['artifact18']
};

const PROGRESS_KEY = 'mulanPuzzleProgress_v2';
const DEFAULT_HORIZONTAL_PIECES = 4;
const DEFAULT_VERTICAL_PIECES = 4;

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

function showView(id) {
  const views = document.querySelectorAll('[data-view]');
  views.forEach((v) => {
    if (v.getAttribute('data-view') === id) {
      v.style.display = 'block';
    } else {
      v.style.display = 'none';
    }
  });
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

  const goToChapters = () => {
    setHomeToggleActive('start');
    tryPlayBgm();
    showView('chapters');
    initChapterList();
    updateProgressText();
  };

  if (startBtn) {
    startBtn.addEventListener('click', goToChapters);
  }
  if (homeStartBtn) {
    homeStartBtn.addEventListener('click', goToChapters);
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
      showView('home');
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
