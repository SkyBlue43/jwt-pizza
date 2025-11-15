import { sleep, check, fail } from "k6";
import http from "k6/http";
import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export const options = {
  cloud: {
    distribution: {
      "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
    },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: "ramping-vus",
      gracefulStop: "30s",
      stages: [
        { target: 5, duration: "30s" },
        { target: 15, duration: "1m" },
        { target: 10, duration: "30s" },
        { target: 0, duration: "30s" },
      ],
      gracefulRampDown: "30s",
      exec: "scenario_1",
    },
  },
};

export function scenario_1() {
  let response;

  const vars = {};

  // login
  response = http.put(
    "https://pizza-service.cs329.click/api/auth",
    '{"email":"a@jwt.com","password":"admin"}',
    {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        origin: "https://pizza.cs329.click",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
    }
  );
  if (
    !check(response, {
      "status equals 200": (response) => response.status.toString() === "200",
    })
  ) {
    console.log(response.body);
    fail("Login was *not* 200");
  }

  vars["token"] = jsonpath.query(response.json(), "$.token")[0];

  sleep(2);

  // menu
  response = http.get("https://pizza-service.cs329.click/api/order/menu", {
    headers: {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9",
      authorization: `Bearer ${vars["token"]}`,
      "content-type": "application/json",
      "if-none-match": 'W/"1fc-cgG/aqJmHhElGCplQPSmgl2Gwk0"',
      origin: "https://pizza.cs329.click",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
    },
  });

  // franchise
  response = http.get(
    "https://pizza-service.cs329.click/api/franchise?page=0&limit=20&name=*",
    {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        authorization: `Bearer ${vars["token"]}`,
        "content-type": "application/json",
        "if-none-match": 'W/"3b7-bPIT1xWJIKbLiKTAAXOfGCANHr0"',
        origin: "https://pizza.cs329.click",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
    }
  );
  sleep(2);

  // user
  response = http.get("https://pizza-service.cs329.click/api/user/me", {
    headers: {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9",
      authorization: `Bearer ${vars["token"]}`,
      "content-type": "application/json",
      "if-none-match": 'W/"5e-a5P2cJTGcrqoFM1KpaKp1y5Onbk"',
      origin: "https://pizza.cs329.click",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
    },
  });
  sleep(2);

  // order
  response = http.post(
    "https://pizza-service.cs329.click/api/order",
    '{"items":[{"menuId":2,"description":"Pepperoni","price":0.0042},{"menuId":3,"description":"Margarita","price":0.0042},{"menuId":4,"description":"Crusty","price":0.0028}],"storeId":"22","franchiseId":19}',
    {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        authorization: `Bearer ${vars["token"]}`,
        "content-type": "application/json",
        origin: "https://pizza.cs329.click",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
    }
  );

  if (
    !check(response, {
      "status equals 200": (response) => response.status.toString() === "200",
    })
  ) {
    console.log(response.body);
    fail("Login was *not* 200");
  }
  response.jwt;

  sleep(2);

  // verify
  response = http.post(
    "https://pizza-factory.cs329.click/api/order/verify",
    `{"jwt": ${response.jwt}}`,
    {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        authorization: `Bearer ${vars["token"]}`,
        "content-type": "application/json",
        origin: "https://pizza.cs329.click",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
    }
  );
  sleep(2);

  // logout
  response = http.del("https://pizza-service.cs329.click/api/auth", null, {
    headers: {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9",
      authorization: `Bearer ${vars["token"]}`,
      "content-type": "application/json",
      origin: "https://pizza.cs329.click",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
    },
  });
}
