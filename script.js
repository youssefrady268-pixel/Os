// Dynamic System Clock
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const liveClock = document.getElementById('live-clock');
    const widgetTime = document.getElementById('widget-time');

    if (liveClock) liveClock.innerText = timeStr;
    if (widgetTime) widgetTime.innerText = timeStr;
}
setInterval(updateClock, 1000);

// Hardware Battery Service
function initBatteryService() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            updateBatteryUI(battery);
            battery.addEventListener('levelchange', () => updateBatteryUI(battery));
            battery.addEventListener('chargingchange', () => updateBatteryUI(battery));
        });
    } else {
        logSystemEvent("Battery API not supported, defaulting display to 100%.");
    }
}

function updateBatteryUI(battery) {
    const level = Math.round(battery.level * 100);
    const isCharging = battery.charging ? "⚡" : "🔋";
    const batteryElement = document.getElementById('battery-display');
    
    if (batteryElement) {
        batteryElement.innerText = `${level}% ${isCharging}`;
    }
}

// System Window Management Engine
function openApp(appName, packageFile) {
    logSystemEvent(`Launching ${appName} (${packageFile})...`);
    
    const modal = document.getElementById('app-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    title.innerText = `${appName} (${packageFile})`;
    body.innerHTML = renderAppInterface(appName);
    modal.style.display = 'flex';
}

function closeApp() {
    document.getElementById('app-modal').style.display = 'none';
}

// App Interface Renderer
function renderAppInterface(appName) {
    if (appName === 'QAW Store') {
        return `
            <div style="font-size: 12px;">
                <p style="color: #8b949e; margin-bottom: 12px;">Browse & install verified .qaw packages</p>
                <div class="list-container">
                    <div class="list-item">
                        <div>
                            <strong>Pixel Runner</strong><br>
                            <small style="color: #8b949e;">pixel_runner.qaw</small>
                        </div>
                        <button class="small-btn" onclick="installFromStore('pixel_runner.qaw')">Install</button>
                    </div>
                    <div class="list-item">
                        <div>
                            <strong>Code Editor</strong><br>
                            <small style="color: #8b949e;">code_editor.qaw</small>
                        </div>
                        <button class="small-btn" onclick="installFromStore('code_editor.qaw')">Install</button>
                    </div>
                    <div class="list-item">
                        <div>
                            <strong>Music Player</strong><br>
                            <small style="color: #8b949e;">music.qaw</small>
                        </div>
                        <button class="small-btn" onclick="installFromStore('music.qaw')">Install</button>
                    </div>
                </div>
            </div>
        `;
    }

    if (appName === 'Developer Portal') {
        return `
            <div>
                <p style="font-size: 12px; color: #8b949e; margin-bottom: 12px;">Publish your .qaw package to the store</p>
                <div class="form-group">
                    <label>App Name</label>
                    <input type="text" id="dev-app-name" placeholder="e.g. Space Shooter">
                </div>
                <div class="form-group">
                    <label>Package File (.qaw)</label>
                    <input type="text" id="dev-pkg-name" placeholder="e.g. shooter.qaw">
                </div>
                <button class="action-btn" onclick="publishDevApp()">Publish Package</button>
                <div id="dev-status" style="margin-top: 10px; font-size: 11px; text-align: center;"></div>
            </div>
        `;
    }

    if (appName === 'File Explorer') {
        return `
            <div class="list-container">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 11px; color: #8b949e;">/system/packages</span>
                    <button class="small-btn" onclick="triggerFilePicker()">+ Load .QAW</button>
                </div>
                <div class="list-container" id="file-list">
                    <div class="list-item"><span>📦 store.qaw</span><small style="color: #8b949e;">42 KB</small></div>
                    <div class="list-item"><span>📦 developer.qaw</span><small style="color: #8b949e;">18 KB</small></div>
                    <div class="list-item"><span>📦 calc.qaw</span><small style="color: #8b949e;">12 KB</small></div>
                </div>
            </div>
        `;
    }

    if (appName === 'Settings') {
        return `
            <div class="list-container" style="font-size: 12px;">
                <div class="list-item">
                    <span>OS Version</span>
                    <strong>QAW OS v1.0</strong>
                </div>
                <div class="list-item">
                    <span>Kernel Status</span>
                    <strong style="color: #7ee787;">Active</strong>
                </div>
                <div class="list-item">
                    <span>Package Format</span>
                    <strong>.QAW Native</strong>
                </div>
                <button class="action-btn" style="background: #21262d; border: 1px solid #30363d; margin-top: 10px;" onclick="logSystemEvent('Checked for system updates')">Check for Updates</button>
            </div>
        `;
    }

    if (appName === 'Terminal') {
        return `
            <div style="font-family: monospace; font-size: 11px; color: #7ee787; background: #0d1117; padding: 10px; border-radius: 8px; height: 180px; overflow-y: auto;">
                > QAW OS Kernel v1.0 Shell<br>
                > Type commands or run scripts<br>
                > qaw --version<br>
                QAW Engine 1.0.0 Ready<br>
                ><br>
            </div>
        `;
    }

    if (appName === 'Calculator') {
        return `
            <div class="calc-wrapper">
                <input type="text" id="calc-screen" class="calc-screen" readonly value="0">
                <div class="calc-grid">
                    <button class="calc-btn" onclick="calcInput('7')">7</button>
                    <button class="calc-btn" onclick="calcInput('8')">8</button>
                    <button class="calc-btn" onclick="calcInput('9')">9</button>
                    <button class="calc-btn op" onclick="calcInput('/')">/</button>
                    <button class="calc-btn" onclick="calcInput('4')">4</button>
                    <button class="calc-btn" onclick="calcInput('5')">5</button>
                    <button class="calc-btn" onclick="calcInput('6')">6</button>
                    <button class="calc-btn op" onclick="calcInput('*')">*</button>
                    <button class="calc-btn" onclick="calcInput('1')">1</button>
                    <button class="calc-btn" onclick="calcInput('2')">2</button>
                    <button class="calc-btn" onclick="calcInput('3')">3</button>
                    <button class="calc-btn op" onclick="calcInput('-')">-</button>
                    <button class="calc-btn danger" onclick="calcClear()">C</button>
                    <button class="calc-btn" onclick="calcInput('0')">0</button>
                    <button class="calc-btn success" onclick="calcEquals()">=</button>
                    <button class="calc-btn op" onclick="calcInput('+')">+</button>
                </div>
            </div>
        `;
    }

    return `<div>App content running.</div>`;
}

// Developer Portal & Store Logic
function publishDevApp() {
    const appName = document.getElementById('dev-app-name').value;
    const pkgName = document.getElementById('dev-pkg-name').value;
    const statusBox = document.getElementById('dev-status');

    if (!appName || !pkgName || !pkgName.endsWith('.qaw')) {
        statusBox.style.color = '#ff7b72';
        statusBox.innerText = 'Error: Enter a valid App Name and .qaw package!';
        return;
    }

    statusBox.style.color = '#7ee787';
    statusBox.innerText = `Published "${appName}" (${pkgName}) to QAW Store!`;
    logSystemEvent(`[DEV PORTAL] Published ${pkgName}`);
}

function installFromStore(pkgName) {
    logSystemEvent(`[STORE] Downloaded & Installed ${pkgName}`);
    alert(`Successfully installed ${pkgName} to QAW OS!`);
}

// Calculator Engine Logic
function calcInput(val) {
    const screen = document.getElementById('calc-screen');
    if (screen.value === '0') screen.value = val;
    else screen.value += val;
}

function calcClear() {
    document.getElementById('calc-screen').value = '0';
}

function calcEquals() {
    const screen = document.getElementById('calc-screen');
    try {
        screen.value = eval(screen.value);
    } catch {
        screen.value = 'Error';
    }
}

// File Picker
function triggerFilePicker() {
    document.getElementById('qaw-file-input').click();
}

function scanLocalQawFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.name.endsWith('.qaw')) {
        const sizeKB = (file.size / 1024).toFixed(1);
        logSystemEvent(`[LOADED] ${file.name} (${sizeKB} KB)`);
        
        const fileList = document.getElementById('file-list');
        if (fileList) {
            fileList.innerHTML += `
                <div class="list-item" style="border-color: #2ea043; background: rgba(46, 160, 67, 0.1);">
                    <span>📦 ${file.name}</span>
                    <small style="color: #7ee787;">${sizeKB} KB</small>
                </div>
            `;
        }
    } else {
        logSystemEvent(`[ERROR] Invalid format: ${file.name}`);
        alert("Error: QAW OS supports .qaw packages only!");
    }
}

// Logger Utility
function logSystemEvent(msg) {
    const logBox = document.getElementById('log-box');
    if (logBox) {
        logBox.innerHTML += `[SYS] ${msg}<br>`;
        logBox.scrollTop = logBox.scrollHeight;
    }
}

// Boot Listener
window.addEventListener('DOMContentLoaded', () => {
    updateClock();
    initBatteryService();
});
