import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import starfield from "../assets/bg/starfield.webm"

export const Layout = () => {
    return (
        <>
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    objectFit: "cover",
                    zIndex: 0,
                    pointerEvents: "none"
                }}
            >
                <source src={starfield} type="video/webm" />
                Your browser does not support the video tag.
            </video>
            <div style = {{ position: "relative", zIndex: 1 }}>
                <ScrollToTop>
                    <Outlet />
                </ScrollToTop>
            </div>
        </>
    );
};