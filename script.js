    // 页面切换功能
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM加载完成，开始初始化...');
        
        // 页面切换功能
        function initPageSwitcher() {
            const navLinks = document.querySelectorAll('.nav-link');
            const pages = document.querySelectorAll('.page');
            
            console.log('找到导航链接:', navLinks.length);
            console.log('找到页面:', pages.length);
            
            // 简单的页面切换函数
            function switchPage(pageId) {
                console.log('切换到页面:', pageId);
                
                // 隐藏所有页面
                pages.forEach(page => {
                    page.style.display = 'none';
                    page.classList.remove('active');
                });
                
                // 显示目标页面
                const targetPage = document.getElementById(pageId);
                if (targetPage) {
                    targetPage.style.display = 'block';
                    targetPage.classList.add('active');
                    console.log('页面显示成功:', pageId);
                } else {
                    console.error('找不到页面元素:', pageId);
                }
                
                // 更新导航链接状态
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const linkPage = link.getAttribute('data-page') || link.getAttribute('href').substring(1);
                    if (linkPage === pageId) {
                        link.classList.add('active');
                    }
                });
            }
            
            // 为导航链接添加点击事件
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const pageId = this.getAttribute('data-page') || this.getAttribute('href').substring(1);
                    console.log('导航链接点击:', pageId);
                    switchPage(pageId);
                });
            });
            
            // 处理URL哈希
            function handleHashChange() {
                const hash = window.location.hash.substring(1);
                console.log('当前哈希:', hash);
                if (hash && ['home', 'download', 'tutorial'].includes(hash)) {
                    switchPage(hash);
                } else {
                    switchPage('home');
                }
            }
            
            // 初始加载时处理哈希
            handleHashChange();
            
            // 监听哈希变化
            window.addEventListener('hashchange', handleHashChange);
            
            // 返回主页按钮
            const backHomeBtn = document.querySelector('.back-home-btn');
            if (backHomeBtn) {
                backHomeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('返回主页按钮点击');
                    switchPage('home');
                });
            }
            
            return switchPage;
        }
        
        // 移动端菜单功能
        function initMobileMenu() {
            const navToggle = document.getElementById('navToggle');
            const navLinksContainer = document.querySelector('.nav-links');
            
            if (navToggle && navLinksContainer) {
                navToggle.addEventListener('click', function() {
                    navLinksContainer.classList.toggle('active');
                    this.classList.toggle('active');
                });
            }
        }
        
        // 下载按钮功能
        function initDownloadButtons() {
            const downloadBtns = document.querySelectorAll('.download-btn');
            console.log('找到下载按钮:', downloadBtns.length);
            
            downloadBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const item = this.closest('.download-item');
                    const title = item.querySelector('h3').textContent;
                    
                    // 创建下载提示
                    const message = document.createElement('div');
                    message.className = 'download-message';
                    message.innerHTML = `
                        <div class="download-message-content">
                            <i class="fas fa-download"></i>
                            <p>正在下载 "${title}"</p>
                            <div class="download-progress">
                                <div class="progress-bar"></div>
                            </div>
                            <p class="download-note">这是一个演示功能，实际应用中会连接到真实文件</p>
                        </div>
                    `;
                    
                    message.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.7);
                        backdrop-filter: blur(10px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 10000;
                        animation: fadeIn 0.3s ease;
                    `;
                    
                    document.body.appendChild(message);
                    
                    // 模拟下载进度
                    const progressBar = message.querySelector('.progress-bar');
                    let progress = 0;
                    const interval = setInterval(() => {
                        progress += Math.random() * 10;
                        if (progress >= 100) {
                            progress = 100;
                            clearInterval(interval);
                            
                            // 下载完成
                            setTimeout(() => {
                                message.innerHTML = `
                                    <div class="download-message-content">
                                        <i class="fas fa-check-circle" style="color:#4CAF50;font-size:3rem;"></i>
                                        <p>"${title}" 下载完成！</p>
                                        <button class="close-message-btn">关闭</button>
                                    </div>
                                `;
                                
                                message.querySelector('.close-message-btn').addEventListener('click', () => {
                                    message.remove();
                                });
                            }, 500);
                        }
                        progressBar.style.width = progress + '%';
                    }, 100);
                    
                    // 点击背景关闭
                    message.addEventListener('click', function(e) {
                        if (e.target === this) {
                            this.remove();
                            clearInterval(interval);
                        }
                    });
                });
            });
        }
        
        // 教程分类功能
        function initTutorialCategories() {
            const categoryBtns = document.querySelectorAll('.category-btn');
            console.log('找到分类按钮:', categoryBtns.length);
            
            categoryBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // 移除所有按钮的active类
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    // 给当前点击的按钮添加active类
                    this.classList.add('active');
                    
                    const category = this.textContent;
                    console.log('选择分类:', category);
                });
            });
        }
        
        // 毛玻璃卡片效果
        function initGlassCardEffects() {
            const glassCards = document.querySelectorAll('.glass-card');
            console.log('找到毛玻璃卡片:', glassCards.length);
            
            glassCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.backdropFilter = 'blur(15px)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.backdropFilter = 'blur(10px)';
                });
            });
        }
        
        // 技能条动画
        function initSkillBarAnimations() {
            const skillBars = document.querySelectorAll('.skill-level');
            console.log('找到技能条:', skillBars.length);
            
            // 使用Intersection Observer API实现滚动时显示动画
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.3
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // 当技能条进入视口时，触发宽度动画
                        const skillLevel = entry.target;
                        const width = skillLevel.style.width;
                        skillLevel.style.width = '0';
                        
                        setTimeout(() => {
                            skillLevel.style.transition = 'width 1.5s ease-in-out';
                            skillLevel.style.width = width;
                        }, 200);
                        
                        // 停止观察该元素
                        observer.unobserve(skillLevel);
                    }
                });
            }, observerOptions);
            
            // 观察所有技能条
            skillBars.forEach(bar => {
                observer.observe(bar);
            });
        }
        
        // 社交媒体按钮效果
        function initSocialButtonEffects() {
            const socialButtons = document.querySelectorAll('.social-btn');
            console.log('找到社交媒体按钮:', socialButtons.length);
            
            socialButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    // 创建涟漪效果
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('ripple');
                    
                    this.appendChild(ripple);
                    
                    // 移除涟漪元素
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }
        
        // 背景效果
        function initBackgroundEffects() {
            const backgroundArea = document.querySelector('.background-area');
            
            // 创建更多背景形状
            for (let i = 0; i < 5; i++) {
                const shape = document.createElement('div');
                shape.classList.add('bg-shape');
                
                // 随机位置和大小
                const size = Math.random() * 150 + 50;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                
                shape.style.width = size + 'px';
                shape.style.height = size + 'px';
                shape.style.left = posX + '%';
                shape.style.top = posY + '%';
                
                // 随机颜色
                const colors = [
                    'rgba(255, 215, 0, 0.05)',
                    'rgba(255, 170, 0, 0.05)',
                    'rgba(255, 255, 255, 0.03)'
                ];
                shape.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                backgroundArea.appendChild(shape);
            }
        }
        
        // 添加下载消息样式
        function addDownloadMessageStyles() {
            const style = document.createElement('style');
            style.textContent = `
                .download-message-content {
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(20px);
                    border-radius: 20px;
                    padding: 40px;
                    text-align: center;
                    max-width: 400px;
                    width: 90%;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
                }
                
                .download-message-content i {
                    font-size: 4rem;
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: 20px;
                }
                
                .download-message-content p {
                    color: #fff;
                    font-size: 1.2rem;
                    margin-bottom: 20px;
                }
                
                .download-progress {
                    height: 8px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    overflow: hidden;
                    margin: 20px 0;
                }
                
                .progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #ffa100, #ff7b00);
                    border-radius: 4px;
                    width: 0%;
                    transition: width 0.3s ease;
                }
                
                .download-note {
                    font-size: 0.9rem !important;
                    color: rgba(255, 255, 255, 0.7) !important;
                    font-style: italic;
                }
                
                .close-message-btn {
                    background: rgba(255, 255, 255, 0.25);
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    padding: 10px 30px;
                    border-radius: 10px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: 20px;
                }
                
                .close-message-btn:hover {
                    background: rgba(255, 255, 255, 0.35);
                    transform: translateY(-2px);
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // 初始化所有功能
        initPageSwitcher();
        initMobileMenu();
        initDownloadButtons();
        initTutorialCategories();
        initGlassCardEffects();
        initSkillBarAnimations();
        initSocialButtonEffects();
        initBackgroundEffects();
        addDownloadMessageStyles();
        
        console.log('页面初始化完成');
    });
    [file content end]
