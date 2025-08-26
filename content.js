'use strict';

// Shadow DOMへのグローバル参照
let shadowRoot = null;

// Shadowホストとなるコンテナを作成・挿入する関数
function createControlsContainer() {
  const container = document.createElement('div');
  container.id = 'bg-image-extension-container';

  // コンテナの初期スタイル設定（位置の固定など最低限）
  container.style.position = 'fixed';
  container.style.top = '20px';
  container.style.right = '20px';
  container.style.zIndex = '9999';

  document.body.appendChild(container);
  return container;
}

// Shadow DOM内のコントロールパネルを作成する関数
function createControls() {
  // Shadowホストとなるコンテナを作成
  const container = createControlsContainer();

  // Shadow DOMを作成し、attachShadow()でコンテナに接続
  const shadow = container.attachShadow({ mode: 'open' });

  // Shadow DOM内のスタイルを定義
  const style = document.createElement('style');
  style.textContent = `
    /* コントロールパネル全体のスタイル */
    .bg-image-controls {
      width: 300px;
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      font-family: Arial, sans-serif;
      color: #333;
      font-size: 14px;
    }
    
    .bg-image-controls.hidden {
      display: none;
    }
    
    /* コントロールグループ */
    .control-group {
      margin-bottom: 15px;
      background-color: white;
      padding: 10px;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    /* ボタングループ */
    .button-group {
      display: flex;
      gap: 5px;
      margin-top: 5px;
    }
    
    /* 数値入力フィールド */
    .control-group input[type="number"] {
      width: 70px;
      padding: 4px;
      border: 1px solid #ccc;
      border-radius: 3px;
      font-size: 14px;
    }
    
    /* ラベル */
    .control-group label {
      display: inline-block;
      width: 100px;
      font-size: 14px;
      margin-bottom: 5px;
    }
    
    /* ボタン */
    .control-group button {
      padding: 5px 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: #fff;
      cursor: pointer;
      font-size: 14px;
    }
    
    .control-group button:hover {
      background-color: #f0f0f0;
    }
    
    /* ドラッグハンドル */
    #bg-image-drag-handle {
      padding: 5px;
      background-color: #e0e0e0;
      border-radius: 4px 4px 0 0;
      cursor: move;
      margin: -15px -15px 10px -15px;
      text-align: center;
      font-size: 12px;
      user-select: none;
    }
    
    /* ファイル入力 */
    .control-group input[type="file"] {
      width: 100%;
      margin-top: 5px;
      font-size: 12px;
    }
  `;

  // コントロールパネルのコンテンツを作成
  const controls = document.createElement('div');
  controls.className = 'bg-image-controls';

  controls.innerHTML = `
    <div id="bg-image-drag-handle">Drag to move ・ Double click to toggle</div>
    <div class="control-group">
      <label>Background:</label>
      <input type="file" id="bg-image-input" accept="image/*">
    </div>
    <div class="control-group">
      <label>Position X:</label>
      <input type="number" id="bg-pos-x" step="1" value="0">px
      <div class="button-group">
        <button id="bg-move-left">←</button>
        <button id="bg-move-right">→</button>
      </div>
    </div>
    <div class="control-group">
      <label>Position Y:</label>
      <input type="number" id="bg-pos-y" step="1" value="0">px
      <div class="button-group">
        <button id="bg-move-up">↑</button>
        <button id="bg-move-down">↓</button>
      </div>
    </div>
    <div class="control-group">
      <label>Size:</label>
      <input type="number" id="bg-size" step="0.1" value="100">%
    </div>
    <div class="control-group">
      <label>Opacity:</label>
      <input type="number" id="bg-opacity" step="0.01" min="0" max="1" value="0.5">
    </div>
    <div class="control-group">
      <label>Step Size:</label>
      <input type="number" id="bg-step-size" step="1" value="1">px
    </div>
    <div class="control-group">
      <button id="bg-save">Save Settings</button>
      <button id="bg-delete">Delete Settings</button>
    </div>
  `;

  // StyleとコントロールパネルをShadow DOMに追加
  shadow.appendChild(style);
  shadow.appendChild(controls);

  // ドラッグ機能を実装
  implementDragAndDrop(container, controls.querySelector('#bg-image-drag-handle'));

  return { container, shadow, controls };
}

// ドラッグ機能の実装
function implementDragAndDrop(container, dragHandle) {
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  dragHandle.addEventListener('mousedown', dragStart);
  dragHandle.addEventListener('dblclick', () => {
    // Shadow DOM内のコントロールパネルを取得して表示/非表示を切り替える
    const controls = container.shadowRoot.querySelector('.bg-image-controls');
    controls.classList.toggle('hidden');
  });

  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);

  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === dragHandle) {
      isDragging = true;
    }
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();

      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, container);
    }
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    isDragging = false;
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate(${xPos}px, ${yPos}px)`;
  }
}

// Shadow DOM内の要素を選択するヘルパー関数
function $(selector) {
  if (!shadowRoot) return null;
  return shadowRoot.querySelector(selector);
}

// 背景画像のオーバーレイを作成・取得する関数
function getOrCreateOverlay() {
  let bgOverlay = document.getElementById('bg-image-overlay');

  if (!bgOverlay) {
    // 背景画像用のオーバーレイ要素を作成
    bgOverlay = document.createElement('div');
    bgOverlay.id = 'bg-image-overlay';

    // スタイル設定
    bgOverlay.style.position = 'fixed';
    bgOverlay.style.top = '0';
    bgOverlay.style.left = '0';
    bgOverlay.style.width = '100%';
    bgOverlay.style.height = '100%';
    bgOverlay.style.zIndex = '9000'; // コントロールパネルより下
    bgOverlay.style.pointerEvents = 'none'; // マウスイベントを下層に通過させる

    // bodyの最初の子要素として挿入
    document.body.insertBefore(bgOverlay, document.body.firstChild);
  }

  return bgOverlay;
}

// 初期化関数
function initializeControls() {
  // オーバーレイ要素を初期化
  getOrCreateOverlay();

  // Shadow DOMを持つコントロールパネルを作成
  const { container, shadow, controls } = createControls();

  // 初期状態では非表示に設定
  controls.classList.add('hidden');

  // Shadow DOMへの参照をグローバル変数に保存
  shadowRoot = shadow;

  // 画像選択の処理
  const imageInput = $('#bg-image-input');
  imageInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageUrl = e.target.result;
        setBackgroundImage(imageUrl, undefined, file.name);

        // 保存済み設定をロード
        chrome.storage.local.get([file.name], function (result) {
          if (result[file.name]) {
            const settings = result[file.name];
            updateControlValues(settings);
            applySettings(settings);
          }
        });
      };
      reader.readAsDataURL(file);
    }
  });

  // 位置コントロールのイベント
  ['bg-move-left', 'bg-move-right', 'bg-move-up', 'bg-move-down'].forEach(id => {
    const button = $('#' + id);
    let interval;

    button.addEventListener('mousedown', function () {
      const stepSize = parseFloat($('#bg-step-size').value);
      const updatePosition = () => {
        const direction = {
          'bg-move-left': { x: -stepSize, y: 0 },
          'bg-move-right': { x: stepSize, y: 0 },
          'bg-move-up': { x: 0, y: -stepSize },
          'bg-move-down': { x: 0, y: stepSize }
        }[id];

        const posX = parseFloat($('#bg-pos-x').value) + direction.x;
        const posY = parseFloat($('#bg-pos-y').value) + direction.y;
        updateBackgroundPosition(posX, posY);
      };

      updatePosition();
      interval = setInterval(updatePosition, 100);
    });

    button.addEventListener('mouseup', () => clearInterval(interval));
    button.addEventListener('mouseleave', () => clearInterval(interval));
  });

  // 手動位置入力の処理
  $('#bg-pos-x').addEventListener('change', function () {
    const posX = parseFloat(this.value);
    const posY = parseFloat($('#bg-pos-y').value);
    updateBackgroundPosition(posX, posY);
  });

  $('#bg-pos-y').addEventListener('change', function () {
    const posX = parseFloat($('#bg-pos-x').value);
    const posY = parseFloat(this.value);
    updateBackgroundPosition(posX, posY);
  });

  // サイズコントロール
  $('#bg-size').addEventListener('change', function () {
    const size = parseFloat(this.value);
    updateBackgroundSize(size);
  });

  // 不透明度コントロール
  $('#bg-opacity').addEventListener('change', function () {
    const opacity = parseFloat(this.value);
    updateOpacity(opacity);
  });

  // 設定保存
  $('#bg-save').addEventListener('click', saveSettings);

  // 設定削除
  $('#bg-delete').addEventListener('click', deleteSettings);

  // 現在の設定をロード
  const settings = getCurrentBackgroundSettings();
  if (settings) {
    updateControlValues(settings);
  }

  return shadowRoot;
}

// 背景画像関連の関数
function setBackgroundImage(imageUrl, opacity = 0.5, fileName = null) {
  const bgOverlay = getOrCreateOverlay();

  // 背景画像と不透明度を設定
  bgOverlay.style.backgroundImage = `url(${imageUrl})`;
  bgOverlay.style.backgroundSize = '100%';
  bgOverlay.style.backgroundRepeat = 'no-repeat';
  bgOverlay.style.backgroundPosition = 'center';
  bgOverlay.style.opacity = opacity;

  // ファイル名を保存
  if (fileName) {
    bgOverlay.dataset.fileName = fileName;
  }
}

function getCurrentBackgroundSettings() {
  const bgOverlay = document.getElementById('bg-image-overlay');

  if (!bgOverlay || !bgOverlay.style.backgroundImage || bgOverlay.style.backgroundImage === 'none') {
    return null;
  }

  return {
    // backgroundImage: bgOverlay.style.backgroundImage,
    fileName: bgOverlay.dataset.fileName || null,
    posX: parseInt(bgOverlay.style.backgroundPositionX) || 0,
    posY: parseInt(bgOverlay.style.backgroundPositionY) || 0,
    size: parseFloat(bgOverlay.style.backgroundSize) || 100,
    opacity: parseFloat(bgOverlay.style.opacity) || 0.5
  };
}

function updateBackgroundPosition(x, y) {
  const bgOverlay = document.getElementById('bg-image-overlay');
  if (bgOverlay) {
    bgOverlay.style.backgroundPositionX = x + 'px';
    bgOverlay.style.backgroundPositionY = y + 'px';
  }

  $('#bg-pos-x').value = x;
  $('#bg-pos-y').value = y;
}

function updateBackgroundSize(size) {
  const bgOverlay = document.getElementById('bg-image-overlay');
  if (bgOverlay) {
    bgOverlay.style.backgroundSize = size + '%';
  }
  $('#bg-size').value = size;
}

function updateOpacity(opacity) {
  const bgOverlay = document.getElementById('bg-image-overlay');
  if (bgOverlay) {
    bgOverlay.style.opacity = opacity;
  }

  $('#bg-opacity').value = opacity;
}

function updateControlValues(settings) {
  if (settings.posX !== undefined) $('#bg-pos-x').value = settings.posX;
  if (settings.posY !== undefined) $('#bg-pos-y').value = settings.posY;
  if (settings.size !== undefined) $('#bg-size').value = settings.size;
  if (settings.opacity !== undefined) $('#bg-opacity').value = settings.opacity;
}

function applySettings(settings) {
  const bgOverlay = document.getElementById('bg-image-overlay');
  if (!bgOverlay) return;

  if (settings.posX !== undefined && settings.posY !== undefined) {
    updateBackgroundPosition(settings.posX, settings.posY);
  }
  if (settings.size !== undefined) {
    updateBackgroundSize(settings.size);
  }
  if (settings.opacity !== undefined) {
    updateOpacity(settings.opacity);
  }
}

function saveSettings() {
  const settings = getCurrentBackgroundSettings();
  if (settings && settings.fileName) {
    const key = settings.fileName;
    chrome.storage.local.set({ [key]: settings });
  }
}

function deleteSettings() {
  const settings = getCurrentBackgroundSettings();


  if (settings && settings.fileName) {
    const key = settings.fileName;

    // DEBUG: 削除対象のキーをログ出力（後で削除可能）
    console.log('[DEBUG] deleteSettings: Attempting to delete key =', key);

    chrome.storage.local.remove(key, function () {
      // エラーハンドリング
      if (chrome.runtime.lastError) {
        // DEBUG: エラー発生時のログ（後で削除可能）
        console.error('[DEBUG] deleteSettings: Delete failed with error:', chrome.runtime.lastError);
      }
    });
  }
}

// 拡張機能のコントロールパネル表示・非表示を切り替える
function toggleControlsVisibility() {
  if (shadowRoot) {
    const controls = shadowRoot.querySelector('.bg-image-controls');
    controls.classList.toggle('hidden');
    return true;
  }
  return false;
}

// メッセージリスナー
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.action) {
    case 'toggleControls':
      const success = toggleControlsVisibility();
      sendResponse({ success: success });
      break;

    default:
      sendResponse({ success: false, error: 'Unknown action' });
  }
  return true;  // 非同期レスポンスを処理するために必要
});

// 初期化
initializeControls();