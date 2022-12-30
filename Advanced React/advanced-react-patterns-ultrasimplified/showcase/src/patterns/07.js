import React from "react";
import mojs from "mo-js";
import styles from "./index.css";

const initialState = {
    count: 1,
    totalCount: 232,
    isClicked: false
}
const MAX_CLAP_STATE = 10
// custom hook
const useDOMRef = () => {
    const [DOMRef, setRefs] = React.useState({});
    const setAllRef = React.useCallback(
        node => {
            setRefs(prevRef => ({...prevRef, [node.dataset.refkey]: node}))
        },
        [],
    );

    return [DOMRef, setAllRef]
}
const useClapState = () => {
    const [clapState, setClapState] = React.useState(initialState);
    const {count, totalCount, isClicked} = clapState


    const updateClapState = React.useCallback(() => {
            setClapState(({count, totalCount}) => ({
                count: Math.min(count + 1, MAX_CLAP_STATE),
                totalCount: count < MAX_CLAP_STATE ? totalCount + 1 : totalCount,
                isClicked: true
            }))
        }, [count, totalCount]
    )

    return [clapState, updateClapState]

}

const useEffectAfterMount = (cb, dep) => {
    const componentFirstMount = React.useRef(true);
    React.useEffect(() => {
        if (!componentFirstMount.current) {
            return cb()
        }
        componentFirstMount.current = false
    }, dep);

}

const MediumClap = () => {
    const [{clapRef, clapCountRef, clapTotalRef}, setAllRef] = useDOMRef();
    const [clapState, updateClapState] = useClapState();

    const {count, totalCount, isClicked} = clapState
    const animationTimeline = useClapAnimation({
        clapRef, clapCountRef, clapTotalRef
    })
    useEffectAfterMount(
        ()=>{
            animationTimeline.replay()
        },[count]
    )

    return <button ref={setAllRef} id="clap-btn" className={styles.clap}
                   onClick={updateClapState}>
        <ClapIcon isClicked={isClicked} setAllRef={setAllRef}/>
        <ClapCount count={count} setAllRef={setAllRef} data-refkey="clapCountRef" />
        <ClapTotal totalCount={totalCount} setAllRef={setAllRef}  data-refkey="clapTotalRef"/>
    </button>
}

const useClapAnimation = ({
                              clapRef, clapCountRef, clapTotalRef
                          }) => {
    const [animationTimeline, setAnimationTimeline] = React.useState(() => new mojs.Timeline());
    React.useEffect(() => {
        if (!clapRef || !clapCountRef || !clapTotalRef) return
        const tlDuration = 300
        const scaledButton = new mojs.Html({
                el: clapRef,
                duration: tlDuration,
                scale: {1.3: 1},
                easing: mojs.easing.ease.out

            }
        )
        const triangleBurst = new mojs.Burst({
                parent: clapRef,
                radius: {50: 95},
                count: 5,
                angle: 30,
                children: {
                    shape: "polygon",
                    radius: {6: 0},
                    scale: 1,
                    stroke: "rgba(211,84,0 ,0.5)",
                    strokeWidth: 2,
                    angle: 210,
                    delay: 30,
                    speed: 0.2,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
                    duration: tlDuration,
                }
            }
        )
        const circularBurst = new mojs.Burst({
            parent: clapRef,
            radius: {50: 75},
            angle: 25,
            duration: tlDuration,
            children: {
                shape: "circle",
                fill: "rgba(149,165,166 ,0.5)",
                delay: 30,
                speed: 0.2,
                radius: {3: 0},
                easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
            }
        })
        const currCountBtn = new mojs.Html({
            el: clapCountRef,
            duration: tlDuration,
            y: {0: -38},
            opacity: {0: 1},
        }).then({
            duration: tlDuration,
            y: -80,
            opacity: {1: 0},
            delay: tlDuration / 2
        })
        const countTotalBtn = new mojs.Html({
                el: clapTotalRef,
                duration: tlDuration,
                opacity: {0: 1},
                delay: (3 * tlDuration) / 2,
                y: {0: -3},
            }
        )
        const newAnimationTimeline = animationTimeline.add([scaledButton, countTotalBtn, currCountBtn, triangleBurst, circularBurst])
        // const clap = document.getElementById('clap-btn')
        clapRef.style.transform = 'scale(1,1)'
        setAnimationTimeline(newAnimationTimeline)
    }, [clapRef, clapCountRef, clapTotalRef,])

    return animationTimeline
}
const ClapIcon = ({isClicked}) => {
    return <span>
        <svg
            id="clapIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-549 338 100.1 125"
            className={`${styles.icon} ${isClicked && styles.checked}`}
        >
        <path
            d="M-471.2 366.8c1.2 1.1 1.9 2.6 2.3 4.1.4-.3.8-.5 1.2-.7 1-1.9.7-4.3-1-5.9-2-1.9-5.2-1.9-7.2.1l-.2.2c1.8.1 3.6.9 4.9 2.2zm-28.8 14c.4.9.7 1.9.8 3.1l16.5-16.9c.6-.6 1.4-1.1 2.1-1.5 1-1.9.7-4.4-.9-6-2-1.9-5.2-1.9-7.2.1l-15.5 15.9c2.3 2.2 3.1 3 4.2 5.3zm-38.9 39.7c-.1-8.9 3.2-17.2 9.4-23.6l18.6-19c.7-2 .5-4.1-.1-5.3-.8-1.8-1.3-2.3-3.6-4.5l-20.9 21.4c-10.6 10.8-11.2 27.6-2.3 39.3-.6-2.6-1-5.4-1.1-8.3z"/>
        <path
            d="M-527.2 399.1l20.9-21.4c2.2 2.2 2.7 2.6 3.5 4.5.8 1.8 1 5.4-1.6 8l-11.8 12.2c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l34-35c1.9-2 5.2-2.1 7.2-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l28.5-29.3c2-2 5.2-2 7.1-.1 2 1.9 2 5.1.1 7.1l-28.5 29.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.4 1.7 0l24.7-25.3c1.9-2 5.1-2.1 7.1-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l14.6-15c2-2 5.2-2 7.2-.1 2 2 2.1 5.2.1 7.2l-27.6 28.4c-11.6 11.9-30.6 12.2-42.5.6-12-11.7-12.2-30.8-.6-42.7m18.1-48.4l-.7 4.9-2.2-4.4m7.6.9l-3.7 3.4 1.2-4.8m5.5 4.7l-4.8 1.6 3.1-3.9"/>
    </svg>
    </span>
}

const ClapCount = ({count, setAllRef, ...restProps}) => {
    return <span ref={setAllRef} className={styles.count} {...restProps}>+{count}</span>
}

const ClapTotal = ({totalCount, setAllRef, ...restProps }) => {
    return <span ref={setAllRef} className={styles.total} {...restProps}>{totalCount}</span>
}
// export default MediumClap;


// usage
const ClapContainer = ({children, setAllRef, handleClick, ...restProps}) => {
    return <button ref={setAllRef} id="clap-btn" className={styles.clap}
                   onClick={handleClick} {...restProps}>{children}
    </button>
}

const Usage = () => {
    const [{clapRef, clapCountRef, clapTotalRef}, setAllRef] = useDOMRef();
    const [clapState, updateClapState] = useClapState();

    const {count, totalCount, isClicked} = clapState
    const animationTimeline = useClapAnimation({
        clapRef, clapCountRef, clapTotalRef
    })
    useEffectAfterMount(
        ()=>{
            animationTimeline.replay()
        },[count]
    )

    return <ClapContainer setAllRef={setAllRef} id="clap-btn"  className={styles.clap}
                   handleClick={updateClapState} data-refkey="clapRef">
        <ClapIcon isClicked={isClicked} setAllRef={setAllRef}/>
        <ClapCount count={count} setAllRef={setAllRef} data-refkey="clapCountRef" />
        <ClapTotal totalCount={totalCount} setAllRef={setAllRef}  data-refkey="clapTotalRef"/>
    </ClapContainer>
}

export default Usage
