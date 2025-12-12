// 简单的交互效果
document.addEventListener('DOMContentLoaded', function() {
    // 为所有毛玻璃卡片添加鼠标悬停效果增强
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.backdropFilter = 'blur(15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.backdropFilter = 'blur(10px)';
        });
    });
    
    // 技能条动画
    const skillBars = document.querySelectorAll('.skill-level');
    
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
    
    // 社交媒体按钮点击效果
    const socialButtons = document.querySelectorAll('.social-btn');
    
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
    
    // 添加一些动态背景效果
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
            'rgba(110, 142, 251, 0.05)',
            'rgba(167, 119, 227, 0.05)',
            'rgba(255, 255, 255, 0.03)'
        ];
        shape.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        backgroundArea.appendChild(shape);
    }
});
