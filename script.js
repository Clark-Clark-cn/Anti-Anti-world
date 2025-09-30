
// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 显示悖论选择模态框
    document.getElementById('paradoxModal').style.display = 'flex';
    
    // 绑定事件
    document.getElementById('submitParadox').addEventListener('click', submitParadox);
    document.getElementById('pufferfish').addEventListener('click', togglePufferfishDialogue);
    document.getElementById('closeAchievement').addEventListener('click', closeAchievement);
    
    // 30秒后触发逻辑风暴
    setTimeout(triggerLogicStorm, 30000);
    
    // 跟踪页面刷新次数
    trackRefreshCount();
});

// 提交悖论选择
function submitParadox() {
    const selectedOption = document.querySelector('input[name="paradox"]:checked');
    
    if (!selectedOption) {
        alert("请选择一个选项才能进入岛屿！");
        return;
    }
    
    // 隐藏模态框
    document.getElementById('paradoxModal').style.display = 'none';
    
    if (selectedOption.value === 'option3') {
        // 正确答案
        showAchievement('悖论大师', '你掌握了反反逻辑的奥秘！欢迎来到反反爱尔兰岛！');
        
        // 触发彩虹效果
        document.body.classList.add('rainbow-effect');
        
        // 播放音频（模拟）
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            playRickrollMelody(audioContext);
        } catch (e) {
            console.log("音频上下文不支持");
        }
    } else {
        // 错误答案
        showAchievement('逻辑学徒', '你的答案不完全符合反反逻辑，但欢迎你探索这个岛屿！');
    }
}

// 切换河豚对话显示
function togglePufferfishDialogue() {
    const dialogue = document.getElementById('pufferfishDialogue');
    dialogue.style.display = dialogue.style.display === 'block' ? 'none' : 'block';
}

// 触发逻辑风暴
function triggerLogicStorm() {
    document.body.classList.add('logic-storm');
    showAchievement('逻辑风暴', '你触发了逻辑风暴！现实开始分裂为矛盾的天空...');
}

// 播放Never Gonna Give You Up旋律（简化版）
function playRickrollMelody(audioContext) {
    // 这是一个简化的实现，实际项目中可以使用完整的音频文件
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 440;
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    
    setTimeout(() => {
        oscillator.stop();
    }, 1000);
}

// 显示成就弹窗
function showAchievement(title, description) {
    const achievement = document.getElementById('achievement');
    document.getElementById('achievementText').textContent = `${title}: ${description}`;
    achievement.classList.add('show');
}

// 关闭成就弹窗
function closeAchievement() {
    document.getElementById('achievement').classList.remove('show');
}

// 跟踪页面刷新次数
function trackRefreshCount() {
    let refreshCount = localStorage.getItem('antiAntiIrelandRefreshCount') || 0;
    refreshCount = parseInt(refreshCount) + 1;
    localStorage.setItem('antiAntiIrelandRefreshCount', refreshCount);
    
    if (refreshCount >= 3) {
        // 触发隐藏彩蛋
        setTimeout(() => {
            document.body.style.background = 'linear-gradient(135deg, #169b62 0%, #ffffff 50%, #ff883e 100%)';
            showAchievement('反反反爱尔兰长老', '检测到执着行为！你已晋升为反反反爱尔兰长老');
        }, 2000);
    }
}

// 动态雨滴系统
class RainSystem {
    constructor() {
        this.skyMiddle = document.querySelector('.sky-middle');
        this.raindrops = [];
        this.isActive = false;
        this.rainSymbols = ['💧'];
        
        // 启动雨滴系统
        this.start();
    }
    
    start() {
        if (!this.skyMiddle) return;
        
        this.isActive = true;
        this.createRaindrops();
        
        // 定期创建新雨滴
        this.rainInterval = setInterval(() => {
            if (this.isActive) {
                this.createRaindrops();
            }
        }, 150); // 每150ms创建一批新雨滴
    }
    
    createRaindrops() {
        const containerRect = this.skyMiddle.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;
        
        // 每次创建3-8个随机雨滴
        const dropCount = Math.floor(Math.random() * 6) + 3;
        
        for (let i = 0; i < dropCount; i++) {
            this.createSingleRaindrop(containerWidth, containerHeight);
        }
    }
    
    createSingleRaindrop(containerWidth, containerHeight) {
        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        
        // 随机选择雨滴符号
        const symbol = this.rainSymbols[Math.floor(Math.random() * this.rainSymbols.length)];
        raindrop.textContent = symbol;
        
        // 随机大小
        const sizes = ['small', '', 'large'];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        if (size) raindrop.classList.add(size);
        
        // 随机水平位置
        const xPosition = Math.random() * (containerWidth - 20);
        raindrop.style.left = xPosition + 'px';
        raindrop.style.top = '-20px';
        
        // 随机下落时间 (1-4秒)
        const fallDuration = (Math.random() * 3 + 1).toFixed(2);
        raindrop.style.animationDuration = fallDuration + 's';
        
        // 随机水平漂移
        const drift = (Math.random() - 0.5) * 30; // -15px to +15px
        raindrop.style.setProperty('--drift', drift + 'px');
        
        // 添加到天空中
        this.skyMiddle.appendChild(raindrop);
        this.raindrops.push(raindrop);
        
        // 动画结束后移除雨滴
        raindrop.addEventListener('animationend', () => {
            this.removeRaindrop(raindrop);
        });
        
        // 防止雨滴堆积过多
        if (this.raindrops.length > 100) {
            const oldDrop = this.raindrops.shift();
            if (oldDrop && oldDrop.parentNode) {
                oldDrop.parentNode.removeChild(oldDrop);
            }
        }
    }
    
    removeRaindrop(raindrop) {
        if (raindrop && raindrop.parentNode) {
            raindrop.parentNode.removeChild(raindrop);
            const index = this.raindrops.indexOf(raindrop);
            if (index > -1) {
                this.raindrops.splice(index, 1);
            }
        }
    }
    
    stop() {
        this.isActive = false;
        if (this.rainInterval) {
            clearInterval(this.rainInterval);
        }
        
        // 清除所有雨滴
        this.raindrops.forEach(drop => this.removeRaindrop(drop));
        this.raindrops = [];
    }
}

// 混沌色块系统
class ChaosBlockSystem {
    constructor() {
        this.skyBottom = document.querySelector('.sky-bottom');
        this.chaosBlocks = [];
        this.isActive = false;
        this.shapes = ['circle', 'square', 'diamond', 'triangle', 'hexagon', 'star'];
        
        // 启动混沌色块系统
        this.start();
    }
    
    start() {
        if (!this.skyBottom) return;
        
        this.isActive = true;
        this.scheduleNextBlock();
    }
    
    scheduleNextBlock() {
        if (!this.isActive) return;
        
        // 随机间隔时间 1-5000ms
        const interval = Math.floor(Math.random() * 100) + 1;
        
        setTimeout(() => {
            if (this.isActive) {
                this.createChaosBlock();
                this.scheduleNextBlock();
            }
        }, interval);
    }
    
    createChaosBlock() {
        const containerRect = this.skyBottom.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;
        
        const block = document.createElement('div');
        block.className = 'chaos-block';
        
        // 随机形状
        const shape = this.shapes[Math.floor(Math.random() * this.shapes.length)];
        if (shape !== 'circle') {
            block.classList.add(shape);
        }
        
        // 随机颜色
        const colors = [
            '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
            '#ff8000', '#8000ff', '#ff0080', '#80ff00', '#0080ff', '#ff8080',
            '#80ff80', '#8080ff', '#ffff80', '#ff80ff', '#80ffff', '#ff4040',
            '#40ff40', '#4040ff', '#ffaa00', '#aa00ff', '#00aaff', '#ff6600',
            '#6600ff', '#00ff66', '#ff0066', '#66ff00', '#0066ff', '#ff3366',
            '#33ff66', '#6633ff', '#ff6633', '#66ff33', '#3366ff'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // 随机大小 10-80px
        const size = Math.floor(Math.random() * 70) + 10;
        
        // 随机位置
        const x = Math.random() * (containerWidth - size);
        const y = Math.random() * (containerHeight - size);
        
        // 随机透明度
        const maxOpacity = (Math.random() * 0.6 + 0.2).toFixed(2); // 0.2-0.8
        
        // 随机存在时间 1-3000ms
        const duration = Math.floor(Math.random() * 2999) + 1;
        
        // 设置样式
        block.style.left = x + 'px';
        block.style.top = y + 'px';
        block.style.width = size + 'px';
        block.style.height = size + 'px';
        block.style.backgroundColor = color;
        block.style.animationDuration = duration + 'ms';
        block.style.setProperty('--color', color);
        block.style.setProperty('--size', (size / 2) + 'px');
        block.style.setProperty('--max-opacity', maxOpacity);
        
        // 特殊形状处理
        if (shape === 'triangle') {
            block.style.left = (x + size/2) + 'px';
            block.style.top = (y + size/4) + 'px';
        }
        
        // 添加到天空中
        this.skyBottom.appendChild(block);
        this.chaosBlocks.push(block);
        
        // 动画结束后移除
        block.addEventListener('animationend', () => {
            this.removeChaosBlock(block);
        });
        
        // 防止色块过多堆积
        if (this.chaosBlocks.length > 50) {
            const oldBlock = this.chaosBlocks.shift();
            if (oldBlock && oldBlock.parentNode) {
                oldBlock.parentNode.removeChild(oldBlock);
            }
        }
    }
    
    removeChaosBlock(block) {
        if (block && block.parentNode) {
            block.parentNode.removeChild(block);
            const index = this.chaosBlocks.indexOf(block);
            if (index > -1) {
                this.chaosBlocks.splice(index, 1);
            }
        }
    }
    
    stop() {
        this.isActive = false;
        
        // 清除所有色块
        this.chaosBlocks.forEach(block => this.removeChaosBlock(block));
        this.chaosBlocks = [];
    }
    
    // 增强混沌效果的方法
    intensifyChaos() {
        // 创建多个同时出现的色块
        const burstCount = Math.floor(Math.random() * 5) + 3;
        for (let i = 0; i < burstCount; i++) {
            setTimeout(() => {
                if (this.isActive) {
                    this.createChaosBlock();
                }
            }, i * 100);
        }
    }
}

// 页面加载后启动雨滴系统和混沌色块系统
document.addEventListener('DOMContentLoaded', function() {
    // 延迟启动系统，确保DOM完全加载
    setTimeout(() => {
        window.rainSystem = new RainSystem();
        window.chaosBlockSystem = new ChaosBlockSystem();
        
        // 每30秒触发一次混沌爆发
        setInterval(() => {
            if (window.chaosBlockSystem && window.chaosBlockSystem.isActive) {
                window.chaosBlockSystem.intensifyChaos();
            }
        }, 30000);
    }, 1000);
});