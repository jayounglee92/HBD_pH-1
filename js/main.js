(() => {
    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
	let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
	let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5, // 브러우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                massageA: document.querySelector('#scroll-section-0 .main-message.a'),
                massageB: document.querySelector('#scroll-section-1 .main-message.b'),
                massageC: document.querySelector('#scroll-section-2 .main-message.c'),
                massageD: document.querySelector('#scroll-section-3 .main-message.d'),
            },
            values: {
                messageA_opacity: [0, 1]
            }
        },
        {
            // 1
            type: 'normal',
            heightNum: 5, // 브러우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            },
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5, // 브러우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            },
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5, // 브러우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            },
        }
    ];


    function setLayout() {
        // 각 스크롤 섹션의 높이 셋팅
        for(let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        let totalScrollHeight = 0;
        for(let i = 0; i < sceneInfo.length; i ++) {
            totalScrollHeight +- sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
    }

    function calcValues(values, currentYOffset) {

    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;

        console.log(currentScene, currentYOffset);

        switch (currentScene) {
            case 0:
                let messageA_opacity_0 = sceneInfo[0].values.messageA_opacity[0];
                let messageA_opacity_1 = sceneInfo[0].values.messageA_opacity[1];
                console.log(calcValues(values, currentYOffset));
                break;
            case 1:
                break;
            case 2:
                break;
            case 3: 
                break;
        }
    }

    
    function scrollLoop() {
        prevScrollHeight = 0;
        for(let i = 0; i < currentScene; i ++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
            document.body.setAttribute('id',`show-scene-${currentScene}`)
        }

        if(yOffset < prevScrollHeight) {
            if( currentScene == 0 ) return; // 브라우저 바운스 효과로 인해 마이너스 되는 것을 방지(모바일)
            currentScene--;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }

        playAnimation();
    }

    
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);

})();