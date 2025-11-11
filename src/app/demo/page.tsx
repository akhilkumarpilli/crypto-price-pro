// pages/demo.tsx
export default function Demo() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#0f172a",
                color: "white",
                textAlign: "center",
                padding: "2rem",
            }}
        >
            <video
                controls
                autoPlay
                loop
                muted
                style={{
                    maxWidth: "80%",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
            >
                <source src="/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <p style={{ marginTop: "1rem", fontSize: "1.2rem", color: "#94a3b8" }}>
                Watch CryptoPricePro in action!
            </p>
        </div>
    );
}
