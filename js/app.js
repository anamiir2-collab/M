const { useState, useEffect, useRef } = React;

/* ========================================
   البيانات العامة
======================================== */

const APP_NAME = "معلمي";
const APP_NAME_EN = "MOALLEMY";


/* ========================================
   Logo
======================================== */

function Logo({ s = 48 }) {
    return (
        <img
            src="./logo.png"
            alt="معلمي"
            style={{
                width: s,
                height: s,
                objectFit: "contain",
                display: "block"
            }}
        />
    );
}


/* ========================================
   Splash Screen
======================================== */

function Splash({ onDone }) {

    const svgRef = useRef(null);
    const [done, setDone] = useState(false);

    const R = 68;
    const C = 2 * Math.PI * R;
    const dur = 2800;

    useEffect(() => {

        const t0 = performance.now();
        const circle = svgRef.current;

        let raf;

        const easeOutCubic = t =>
            1 - Math.pow(1 - t, 3);

        const tick = now => {

            const p = Math.min(
                (now - t0) / dur,
                1
            );

            const ep = easeOutCubic(p);

            if (circle) {

                circle.setAttribute(
                    "stroke-dashoffset",
                    C * (1 - ep)
                );

                const angle =
                    -Math.PI / 2 +
                    ep * 2 * Math.PI;

                const dot =
                    circle.parentElement
                        .querySelector(".led-dot");

                if (dot) {

                    dot.setAttribute(
                        "cx",
                        80 + R * Math.cos(angle)
                    );

                    dot.setAttribute(
                        "cy",
                        80 + R * Math.sin(angle)
                    );

                }
            }

            if (p < 1) {

                raf = requestAnimationFrame(tick);

            } else {

                setTimeout(
                    () => setDone(true),
                    300
                );

                setTimeout(
                    onDone,
                    900
                );
            }
        };

        raf = requestAnimationFrame(tick);

        return () =>
            cancelAnimationFrame(raf);

    }, []);

    return (
        <div
            className={`splash ${
                done ? "out" : ""
            }`}
        >

            <div className="splash-content">

                <svg
                    width="160"
                    height="160"
                    viewBox="0 0 160 160"
                >

                    <circle
                        cx="80"
                        cy="80"
                        r={R}
                        fill="none"
                        stroke="var(--border)"
                        strokeWidth="4"
                    />

                    <circle
                        ref={svgRef}
                        cx="80"
                        cy="80"
                        r={R}
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={C}
                        strokeDashoffset={C}
                        transform="rotate(-90 80 80)"
                    />

                    <circle
                        className="led-dot"
                        cx="80"
                        cy={80 - R}
                        r="5"
                        fill="var(--primary)"
                    >

                        <animate
                            attributeName="opacity"
                            values="1;0.4;1"
                            dur="1.5s"
                            repeatCount="indefinite"
                        />

                    </circle>

                </svg>


                {/* اللوجو الحقيقي */}

                <div
                    style={{
                        position: "absolute",
                        top: 46,
                        left: "50%",
                        transform:
                            "translateX(-50%)",

                        width: 68,
                        height: 68,

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >

                    <Logo s={68} />

                </div>

            </div>


            <h1
                style={{
                    fontSize: 28,
                    fontWeight: 700,
                    margin: "12px 0 2px",
                    color: "var(--fg)"
                }}
            >
                معلمي
            </h1>


            <p
                style={{
                    fontSize: 13,
                    letterSpacing: 3,
                    color: "var(--muted)",
                    marginBottom: 6
                }}
            >
                MOALLEMY
            </p>


            <p
                style={{
                    color: "var(--accent)",
                    fontWeight: 600,
                    fontSize: 15,
                    margin: 0
                }}
            >
                نلهم، نعلّم، نشبّ
            </p>


            <p
                style={{
                    color: "var(--muted)",
                    fontSize: 11,
                    margin: "18px 0 0",
                    opacity: 0.6
                }}
            >
                Created & Designed by Amir Anwar Mohamed
            </p>

        </div>
    );
}


/* ========================================
   التطبيق الرئيسي
======================================== */

function App() {

    const [showSplash, setShowSplash] =
        useState(true);


    if (showSplash) {

        return (
            <Splash
                onDone={() =>
                    setShowSplash(false)
                }
            />
        );

    }


    return (
        <div className="app">

            <main>

                <div className="card">

                    <div className="text-center">

                        <Logo s={80} />

                        <h1>
                            معلمي
                        </h1>

                        <p className="text-muted">
                            MOALLEMY
                        </p>

                    </div>

                </div>

            </main>

        </div>
    );
}


/* ========================================
   تشغيل التطبيق
======================================== */

const root =
    ReactDOM.createRoot(
        document.getElementById("r")
    );

root.render(
    <App />
);
