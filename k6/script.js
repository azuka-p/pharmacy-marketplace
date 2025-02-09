import http from "k6/http";
import { check } from "k6";

export const options = {
    stages: [
        { duration: "3s", target: 100 },
        { duration: "5s", target: 100 },
        { duration: "3s", target: 0 },
    ],
    thresholds: {
        http_req_duration: ["p(99)<500"],
        checks: ["rate>0.99"],
    },
};

export default function () {
    const data = JSON.stringify({
        email: "alice@mail.com",
        password: "password",
    });

    const option = {
        "Content-Type": "application/json",
    };

    let res = http.post("http://localhost:8080/auth/login", data, option);

    check(res, { "success login": (r) => r.status === 200 });
}
