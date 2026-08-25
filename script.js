// Clock and Time Updater
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const liveClock = document.getElementById('live-clock');
    const widgetTime = document.getElementById('widget-time');

    if (liveClock) liveClock.innerText = timeStr;
    if (widgetTime) widgetTime.innerText = timeStr;
}
setInterval(updateClock, 1000);

// Hardware Battery Integration
function initBatteryService() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            updateBatteryUI(battery);
            battery.addEventListener('levelchange', () => updateBatteryUI(battery));
            battery.addEventListener('chargingchange', () => updateBatteryUI(battery));
        });
    } else {
        logSystemEvent("Battery API unavailable, setting default display to 100%.");
    }
}

function updateBatteryUI(battery) {
    const level = Math.round(battery.level * 100);
    const isCharging = battery.charging ? "⚡" : "🔋";
    const batteryElement = document.getElementById('battery-display');
    
    if (batteryElement) {
        batteryElement.innerText = `${level}% ${isCharging}`;
    }
    logSystemEvent(`Battery state updated: ${level}% (Charging: ${battery.charging})`);
}

// Storage API Monitor
async function checkStorageUsage() {
    if (navigator.storage && navigator.storage.estimate) {
        const estimate = await navigator.storage.estimate();
        const usedMB = (estimate.usage / (1024 * 1024)).toFixed(2);
        const totalMB = (estimate.quota / (1024 * 1024)).toFixed(2);
        
        logSystemEvent(`Storage Info: ${usedMB} MB used of ${totalMB} MB total`);
    }
}

// Local File Picker and .qaw Inspection
function triggerFilePicker() {
    logSystemEvent("Opening local file manager...");
    document.getElementById('qaw-file-input').click();
}

function scanLocalQawFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.name.endsWith('.qaw')) {
        const sizeKB = (file.size / 1024).toFixed(1);
        logSystemEvent(`[PACKAGE LOADED] ${file.name} (${sizeKB} KB)`);
        alert(`Package Loaded Successfully:\nName: ${file.name}\nSize: ${sizeKB} KB\nStatus: Verified QAW Format`);
    } else {
        logSystemEvent(`[ERROR] Unsupported format: ${file.name}`);
        alert("Execution Error: QAW OS supports .qaw package files only!");
    }
}

// System Logging Utility
function logSystemEvent(msg) {
    const logBox = document.getElementById('log-box');
    if (logBox) {
        logBox.innerHTML += `[SYS] ${msg}<br>`;
        logBox.scrollTop = logBox.scrollHeight;
    }
}

function openApp(appName, packageFile) {
    logSystemEvent(`Executing ${appName} (${packageFile})...`);
    alert(`Launching ${appName} package!`);
}

// System Boot Sequence
window.addEventListener('DOMContentLoaded', () => {
    updateClock();
    initBatteryService();
    checkStorageUsage();
});

