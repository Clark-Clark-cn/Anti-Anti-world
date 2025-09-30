        // 页面加载完成后的初始化
        document.addEventListener('DOMContentLoaded', function() {
            // 初始化逻辑辐射效果
            initLogicRadiation();
            
            // 30秒后触发逻辑风暴
            setTimeout(triggerLogicStorm, 30000);
            
            // 绑定事件
            document.getElementById('helpPufferfish').addEventListener('click', helpPufferfish);
            document.getElementById('contradictionBtn').addEventListener('click', handleContradiction);
            document.getElementById('submitParadox').addEventListener('click', submitParadox);
            document.getElementById('closeAchievement').addEventListener('click', closeAchievement);
            
            // 跟踪页面刷新次数
            trackRefreshCount();
        });
        
        // 初始化逻辑辐射效果
        function initLogicRadiation() {
            const body = document.body;
            for (let i = 0; i < 5; i++) {
                const radiation = document.createElement('div');
                radiation.className = 'logic-radiation';
                radiation.style.left = `${Math.random() * 90}%`;
                radiation.style.top = `${Math.random() * 90}%`;
                radiation.style.animationDelay = `${Math.random() * 5}s`;
                body.appendChild(radiation);
            }
        }
        
        // 触发逻辑风暴
        function triggerLogicStorm() {
            document.body.style.background = 'linear-gradient(135deg, #87CEEB 0%, #FF6B6B 50%, #A8E6CF 100%)';
            showAchievement('Logic Storm', 'You triggered the logic storm! Reality begins splitting into contradictory quadrants...');
        }
        
        // 帮助河豚解套
        function helpPufferfish() {
            const result = document.getElementById('pufferfishResult');
            result.innerHTML = "You tell the pufferfish: 'No, you shouldn't not inflate!'<br>The pufferfish has an epiphany and instantly inflates, floating into the sky! 🎈";
            result.style.display = 'block';
            
            // 添加漂浮效果
            const pufferfish = document.querySelector('.character-img');
            pufferfish.style.transition = 'all 2s ease';
            pufferfish.style.transform = 'translateY(-100px) rotate(360deg)';
            pufferfish.style.opacity = '0';
            
            showAchievement('Philosophical Savior', 'You bravely clicked the button that shouldn\'t be clicked!');
        }
        
        // 处理矛盾按钮点击
        function handleContradiction() {
            const result = document.getElementById('contradictionResult');
            result.innerHTML = "You violated the 'do not click' command, but thus earned the achievement: 'Anti-Anti Warrior'!";
            result.style.display = 'block';
            
            // 改变按钮文本和样式
            const btn = document.getElementById('contradictionBtn');
            btn.textContent = "Now You Can Click This!";
            btn.style.background = 'var(--gold)';
            btn.style.color = 'var(--text-color)';
            
            showAchievement('Anti-Anti Warrior', 'You bravely clicked the button that shouldn\'t be clicked!');
        }
        
        // 提交悖论选择
        function submitParadox() {
            const selectedOption = document.querySelector('input[name="paradox"]:checked');
            const result = document.getElementById('paradoxResult');
            
            if (!selectedOption) {
                result.innerHTML = "Please select an option!";
                result.style.display = 'block';
                return;
            }
            
            if (selectedOption.value === 'option3') {
                result.innerHTML = "Correct! You understand the essence of anti-anti logic!";
                result.style.color = 'var(--primary-green)';
                
                // 触发特殊效果
                document.body.style.animation = 'rainbow 3s infinite';
                document.documentElement.style.setProperty('--primary-green', '#ff6b6b');
                
                // 播放音频（模拟）
                try {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    playRickrollMelody(audioContext);
                } catch (e) {
                    console.log("Audio context not supported");
                }
                
                showAchievement('Paradox Master', 'You have mastered the mystery of anti-anti logic!');
            } else {
                result.innerHTML = "This answer doesn't conform to anti-anti logic, please reconsider!";
                result.style.color = '#ff6b6b';
            }
            
            result.style.display = 'block';
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
                    showAchievement('Anti-Anti-Anti Ireland Elder', 'Persistent behavior detected! You are now an Anti-Anti-Anti Ireland Elder!');
                }, 2000);
            }
        }
        
        // 添加彩虹动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);