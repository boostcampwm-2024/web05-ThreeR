import Lottie from "lottie-react";

import LoginLoading from "./login.json";

export default function Login() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Lottie animationData={LoginLoading} loop autoPlay />
    </div>
  );
}
