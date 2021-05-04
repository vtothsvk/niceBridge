[
    {
        "id": "a8f33cd2.570cc",
        "type": "inject",
        "z": "1467b860.f5e048",
        "name": "",
        "props": [
            {
                "p": "payload",
                "v": "",
                "vt": "date"
            },
            {
                "p": "topic",
                "v": "",
                "vt": "string"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 120,
        "y": 100,
        "wires": [
            [
                "2fe68ea3.d01972"
            ]
        ]
    },
    {
        "id": "2fe68ea3.d01972",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "Set Some data",
        "func": "return {payload:{sub:\"cov0420210000001\"}};",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 280,
        "y": 100,
        "wires": [
            [
                "a13f1303.be578"
            ]
        ]
    },
    {
        "id": "8215562f.7deaa8",
        "type": "debug",
        "z": "1467b860.f5e048",
        "name": "in",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 570,
        "y": 60,
        "wires": []
    },
    {
        "id": "a13f1303.be578",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "",
        "func": "var jwt =  global.get('jsonwebtoken');\nvar fs = global.get('fs');\n\nvar dirPrefix = 'C:/Users/epic_/.node-red/homes/';\nvar sn = 'cov0420210000001';\nvar dirSuffix = '/private.pem';\n\nvar privateKey = fs.readFileSync(dirPrefix + sn + dirSuffix);\n\nvar token = jwt.sign(msg.payload, privateKey, { algorithm: 'ES256', keyid: \"3324f15765add6d521a672b0fa69728f5e927cc0542fd3d3497c80658eb9980d\", expiresIn: 300});\nmsg.token = token; \nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 440,
        "y": 100,
        "wires": [
            [
                "8215562f.7deaa8"
            ]
        ]
    },
    {
        "id": "721bb0be.bf655",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "",
        "func": "msg.payload = {\n    sn : \"ceho202110000002\",\n    kid: \"c36c8cd355bdddeecc4117933e74d9e684328c6cc23628dca341c0e206a3b822\",\n    body :\n            [{\n                LoggerName: \"PIR\", \n                //Timestamp: 1614251001, \n                MeasuredData: \n                [\n                    { \n                        Name: \"movement\",\n                        Value: 0 \n                    }\n                ], \n                ServiceData: [], \n                DebugData: [], \n                DeviceId: \"08d8df1b-a44c-4ac7-81bc-3cb660b107f7\"\n            }]\n    }\n    \nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 280,
        "y": 180,
        "wires": [
            [
                "81ae7ba3.157368"
            ]
        ]
    },
    {
        "id": "d857ad92.72785",
        "type": "inject",
        "z": "1467b860.f5e048",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 120,
        "y": 180,
        "wires": [
            [
                "721bb0be.bf655"
            ]
        ]
    },
    {
        "id": "81ae7ba3.157368",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "jwt",
        "func": "var jwt =  global.get('jsonwebtoken');\nvar fs = global.get('fs');\n\nvar dirPrefix = 'C:/Users/epic_/Desktop/devs/';\nvar sn = msg.payload.sn;\nvar dirSuffix = '/private.pem';\n\nmsg.payload.body[0].Timestamp = parseInt(Date.now() / 1000);\n\nvar kid = msg.payload.kid;\n\nmsg.payload = msg.payload.body;\n\nvar input = { sub: sn };\n\nvar privateKey = fs.readFileSync(dirPrefix + sn + dirSuffix);\n\nvar token = jwt.sign(input, privateKey, { algorithm: 'ES256', keyid: kid, expiresIn: 300});\n\nmsg.headers = {};\nmsg.headers['Content-Type'] = 'application/json';\nmsg.headers['Authorization'] = 'Bearer ' + token;\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 430,
        "y": 180,
        "wires": [
            [
                "975c73c.803469",
                "2463425a.b1247e",
                "c9a00ce0.5b5d4"
            ]
        ]
    },
    {
        "id": "f93afc93.736c7",
        "type": "http in",
        "z": "1467b860.f5e048",
        "name": "in",
        "url": "/niceBridge",
        "method": "post",
        "upload": false,
        "swaggerDoc": "",
        "x": 110,
        "y": 140,
        "wires": [
            [
                "a57bd5dd.427638",
                "8215562f.7deaa8",
                "81ae7ba3.157368",
                "d27ad638.4841c8"
            ]
        ]
    },
    {
        "id": "a57bd5dd.427638",
        "type": "http response",
        "z": "1467b860.f5e048",
        "name": "",
        "statusCode": "200",
        "headers": {},
        "x": 400,
        "y": 140,
        "wires": []
    },
    {
        "id": "c9a00ce0.5b5d4",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "sort",
        "func": "var count = flow.get('count');\n\nif (count == 0) {\n    return [msg, 0, 0, 0, 0, 0]\n} else if (count == 1) {\n    return [0, msg, 0, 0, 0, 0]    \n} else if (count == 2) {\n    return [0, 0, msg, 0, 0, 0]    \n} else if (count == 3) {\n    return [0, 0, 0, msg, 0, 0]   \n}else if (count == 4) {\n    return [0, 0, 0, 0, msg, 0];\n}else if (count == 5) {\n    return [0, 0, 0, 0, 0, msg];\n}\n",
        "outputs": 6,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 830,
        "y": 180,
        "wires": [
            [
                "2dce6e34.812a62"
            ],
            [
                "ce2e1ad.84016e8"
            ],
            [
                "e52c7e56.d72f6"
            ],
            [
                "42eed7a8.7972c8"
            ],
            [
                "56e3fde2.eb2bc4"
            ],
            [
                "c1c0c2ea.222c4"
            ]
        ]
    },
    {
        "id": "975c73c.803469",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "counter",
        "func": "var count = flow.get('count');\n\ncount = count + 1;\n\nif (count == 6){\n    count = 0;\n}\n\nmsg.payload = count;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 660,
        "y": 140,
        "wires": [
            [
                "6fecac8a.43f954"
            ]
        ]
    },
    {
        "id": "3dcb78cd.88bd38",
        "type": "inject",
        "z": "1467b860.f5e048",
        "name": "",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": true,
        "onceDelay": "0",
        "topic": "",
        "payload": "0",
        "payloadType": "num",
        "x": 670,
        "y": 100,
        "wires": [
            [
                "6fecac8a.43f954"
            ]
        ]
    },
    {
        "id": "6fecac8a.43f954",
        "type": "change",
        "z": "1467b860.f5e048",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "count",
                "pt": "flow",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 840,
        "y": 100,
        "wires": [
            []
        ]
    },
    {
        "id": "2dce6e34.812a62",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "nullDetect",
        "func": "if (msg.payload != null) {\n return msg;   \n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 1040,
        "y": 80,
        "wires": [
            [
                "8ce457db.af5958"
            ]
        ]
    },
    {
        "id": "ce2e1ad.84016e8",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "nullDetect",
        "func": "if (msg.payload != null) {\n return msg;   \n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 1040,
        "y": 120,
        "wires": [
            [
                "ca9d9a92.c72ac8"
            ]
        ]
    },
    {
        "id": "e52c7e56.d72f6",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "nullDetect",
        "func": "if (msg.payload != null) {\n return msg;   \n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 1040,
        "y": 160,
        "wires": [
            [
                "8b2f45f5.1e6fd8"
            ]
        ]
    },
    {
        "id": "42eed7a8.7972c8",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "nullDetect",
        "func": "if (msg.payload != null) {\n return msg;   \n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 1040,
        "y": 200,
        "wires": [
            [
                "74ad5089.539d6"
            ]
        ]
    },
    {
        "id": "56e3fde2.eb2bc4",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "nullDetect",
        "func": "if (msg.payload != null) {\n return msg;   \n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 1040,
        "y": 240,
        "wires": [
            [
                "cf410261.b7908"
            ]
        ]
    },
    {
        "id": "44852d13.85ba14",
        "type": "http request",
        "z": "1467b860.f5e048",
        "name": "",
        "method": "POST",
        "ret": "txt",
        "paytoqs": "ignore",
        "url": "https://fei.edu.r-das.sk:51414/api/v1/Auth",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 1390,
        "y": 80,
        "wires": [
            [
                "6b003f95.61c63"
            ]
        ]
    },
    {
        "id": "4a3ad2c6.bdc9fc",
        "type": "http request",
        "z": "1467b860.f5e048",
        "name": "",
        "method": "POST",
        "ret": "txt",
        "paytoqs": "ignore",
        "url": "https://fei.edu.r-das.sk:51414/api/v1/Auth",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 1390,
        "y": 120,
        "wires": [
            [
                "59fd32b5.71b4ec"
            ]
        ]
    },
    {
        "id": "bdd29967.1cf158",
        "type": "http request",
        "z": "1467b860.f5e048",
        "name": "",
        "method": "POST",
        "ret": "txt",
        "paytoqs": "ignore",
        "url": "https://fei.edu.r-das.sk:51414/api/v1/Auth",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 1390,
        "y": 160,
        "wires": [
            [
                "34521a0e.29ca66"
            ]
        ]
    },
    {
        "id": "e2625e2b.327a4",
        "type": "http request",
        "z": "1467b860.f5e048",
        "name": "",
        "method": "POST",
        "ret": "txt",
        "paytoqs": "ignore",
        "url": "https://fei.edu.r-das.sk:51414/api/v1/Auth",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 1390,
        "y": 200,
        "wires": [
            [
                "346352b4.64364e"
            ]
        ]
    },
    {
        "id": "3fd8648b.e2a7ec",
        "type": "http request",
        "z": "1467b860.f5e048",
        "name": "",
        "method": "POST",
        "ret": "txt",
        "paytoqs": "ignore",
        "url": "https://fei.edu.r-das.sk:51414/api/v1/Auth",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 1390,
        "y": 240,
        "wires": [
            [
                "5b680ab7.571c24"
            ]
        ]
    },
    {
        "id": "6b003f95.61c63",
        "type": "debug",
        "z": "1467b860.f5e048",
        "name": "1",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 1530,
        "y": 80,
        "wires": []
    },
    {
        "id": "59fd32b5.71b4ec",
        "type": "debug",
        "z": "1467b860.f5e048",
        "name": "2",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 1530,
        "y": 120,
        "wires": []
    },
    {
        "id": "34521a0e.29ca66",
        "type": "debug",
        "z": "1467b860.f5e048",
        "name": "3",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 1530,
        "y": 160,
        "wires": []
    },
    {
        "id": "346352b4.64364e",
        "type": "debug",
        "z": "1467b860.f5e048",
        "name": "4",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 1530,
        "y": 200,
        "wires": []
    },
    {
        "id": "5b680ab7.571c24",
        "type": "debug",
        "z": "1467b860.f5e048",
        "name": "5",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 1530,
        "y": 240,
        "wires": []
    },
    {
        "id": "2463425a.b1247e",
        "type": "debug",
        "z": "1467b860.f5e048",
        "name": "jwt out",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 570,
        "y": 220,
        "wires": []
    },
    {
        "id": "8ce457db.af5958",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "rate",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 1190,
        "y": 80,
        "wires": [
            [
                "44852d13.85ba14"
            ]
        ]
    },
    {
        "id": "ca9d9a92.c72ac8",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "rate",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 1190,
        "y": 120,
        "wires": [
            [
                "4a3ad2c6.bdc9fc"
            ]
        ]
    },
    {
        "id": "8b2f45f5.1e6fd8",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "rate",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 1190,
        "y": 160,
        "wires": [
            [
                "bdd29967.1cf158"
            ]
        ]
    },
    {
        "id": "74ad5089.539d6",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "rate",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 1190,
        "y": 200,
        "wires": [
            [
                "e2625e2b.327a4"
            ]
        ]
    },
    {
        "id": "cf410261.b7908",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "rate",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 1190,
        "y": 240,
        "wires": [
            [
                "3fd8648b.e2a7ec"
            ]
        ]
    },
    {
        "id": "dc26a775.037dc8",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "rate",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 1190,
        "y": 280,
        "wires": [
            [
                "f568026.52807"
            ]
        ]
    },
    {
        "id": "c1c0c2ea.222c4",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "nullDetect",
        "func": "if (msg.payload != null) {\n return msg;   \n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 1040,
        "y": 280,
        "wires": [
            [
                "dc26a775.037dc8"
            ]
        ]
    },
    {
        "id": "f568026.52807",
        "type": "http request",
        "z": "1467b860.f5e048",
        "name": "",
        "method": "POST",
        "ret": "txt",
        "paytoqs": "ignore",
        "url": "https://fei.edu.r-das.sk:51414/api/v1/Auth",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 1390,
        "y": 280,
        "wires": [
            [
                "7bd9496b.230088"
            ]
        ]
    },
    {
        "id": "7bd9496b.230088",
        "type": "debug",
        "z": "1467b860.f5e048",
        "name": "6",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 1530,
        "y": 280,
        "wires": []
    },
    {
        "id": "a696023f.974de",
        "type": "ui_switch",
        "z": "1467b860.f5e048",
        "name": "",
        "label": "AP-6-H-001",
        "tooltip": "",
        "group": "bd1f79cf.36f5f8",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": true,
        "decouple": "false",
        "topic": "topic",
        "topicType": "msg",
        "style": "",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "fa-2x fa-power-off",
        "oncolor": "#42f456",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "fa-2x fa-power-off",
        "offcolor": "#f46241",
        "animate": false,
        "x": 1090,
        "y": 500,
        "wires": [
            []
        ]
    },
    {
        "id": "585816a1.6ecda8",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "milliseconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 750,
        "y": 540,
        "wires": [
            [
                "218dea67.655bb6"
            ]
        ]
    },
    {
        "id": "218dea67.655bb6",
        "type": "trigger",
        "z": "1467b860.f5e048",
        "name": "",
        "op1": "1",
        "op2": "false",
        "op1type": "str",
        "op2type": "bool",
        "duration": "120",
        "extend": true,
        "overrideDelay": false,
        "units": "s",
        "reset": "",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 910,
        "y": 540,
        "wires": [
            [
                "a696023f.974de"
            ]
        ]
    },
    {
        "id": "f645b042.b90fb",
        "type": "change",
        "z": "1467b860.f5e048",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 560,
        "y": 500,
        "wires": [
            [
                "a696023f.974de",
                "585816a1.6ecda8"
            ]
        ]
    },
    {
        "id": "86d11cec.a1e87",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "ap6h202110000001",
        "func": "if (msg.payload.sn == \"ap6h202110000001\") {\n    return msg;    \n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 360,
        "y": 500,
        "wires": [
            [
                "f645b042.b90fb"
            ]
        ]
    },
    {
        "id": "7accc75d.cd50b8",
        "type": "ui_switch",
        "z": "1467b860.f5e048",
        "name": "",
        "label": "AP-1-H",
        "tooltip": "",
        "group": "bd1f79cf.36f5f8",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": true,
        "decouple": "false",
        "topic": "topic",
        "topicType": "msg",
        "style": "",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "fa-2x fa-power-off",
        "oncolor": "#42f456",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "fa-2x fa-power-off",
        "offcolor": "#f46241",
        "animate": false,
        "x": 1080,
        "y": 660,
        "wires": [
            []
        ]
    },
    {
        "id": "dfb32dd1.44ae9",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "milliseconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 750,
        "y": 700,
        "wires": [
            [
                "e1252288.d40ff"
            ]
        ]
    },
    {
        "id": "e1252288.d40ff",
        "type": "trigger",
        "z": "1467b860.f5e048",
        "name": "",
        "op1": "1",
        "op2": "false",
        "op1type": "str",
        "op2type": "bool",
        "duration": "120",
        "extend": true,
        "overrideDelay": false,
        "units": "s",
        "reset": "",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 910,
        "y": 700,
        "wires": [
            [
                "7accc75d.cd50b8"
            ]
        ]
    },
    {
        "id": "6d2b54a8.0d5dbc",
        "type": "change",
        "z": "1467b860.f5e048",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 560,
        "y": 660,
        "wires": [
            [
                "7accc75d.cd50b8",
                "dfb32dd1.44ae9"
            ]
        ]
    },
    {
        "id": "acb88841.c0b858",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "ap1h202110000001",
        "func": "if (msg.payload.sn == \"ap1h202110000001\") {\n    return msg;    \n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 360,
        "y": 660,
        "wires": [
            [
                "6d2b54a8.0d5dbc"
            ]
        ]
    },
    {
        "id": "dfc2542e.5122f8",
        "type": "ui_switch",
        "z": "1467b860.f5e048",
        "name": "",
        "label": "AP-1-H-1-002",
        "tooltip": "",
        "group": "bd1f79cf.36f5f8",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": true,
        "decouple": "false",
        "topic": "topic",
        "topicType": "msg",
        "style": "",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "fa-2x fa-power-off",
        "oncolor": "#42f456",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "fa-2x fa-power-off",
        "offcolor": "#f46241",
        "animate": false,
        "x": 1100,
        "y": 720,
        "wires": [
            []
        ]
    },
    {
        "id": "d8789461.155a68",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "milliseconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 750,
        "y": 760,
        "wires": [
            [
                "b20fa36b.b8b1f"
            ]
        ]
    },
    {
        "id": "b20fa36b.b8b1f",
        "type": "trigger",
        "z": "1467b860.f5e048",
        "name": "",
        "op1": "1",
        "op2": "false",
        "op1type": "str",
        "op2type": "bool",
        "duration": "120",
        "extend": true,
        "overrideDelay": false,
        "units": "s",
        "reset": "",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 910,
        "y": 760,
        "wires": [
            [
                "dfc2542e.5122f8"
            ]
        ]
    },
    {
        "id": "644ff81d.0da408",
        "type": "change",
        "z": "1467b860.f5e048",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 560,
        "y": 720,
        "wires": [
            [
                "dfc2542e.5122f8",
                "d8789461.155a68"
            ]
        ]
    },
    {
        "id": "d58cc607.c45fc8",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "ap1h202110000002",
        "func": "if (msg.payload.sn == \"ap1h202110000002\") {\n    return msg;    \n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 360,
        "y": 720,
        "wires": [
            [
                "644ff81d.0da408"
            ]
        ]
    },
    {
        "id": "af54e468.f0e728",
        "type": "ui_switch",
        "z": "1467b860.f5e048",
        "name": "",
        "label": "AP-1-H-1-002",
        "tooltip": "",
        "group": "bd1f79cf.36f5f8",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": true,
        "decouple": "false",
        "topic": "topic",
        "topicType": "msg",
        "style": "",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "fa-2x fa-power-off",
        "oncolor": "#42f456",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "fa-2x fa-power-off",
        "offcolor": "#f46241",
        "animate": false,
        "x": 1100,
        "y": 780,
        "wires": [
            []
        ]
    },
    {
        "id": "65d63496.94201c",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "milliseconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 750,
        "y": 820,
        "wires": [
            [
                "6dfe7f4f.8b975"
            ]
        ]
    },
    {
        "id": "6dfe7f4f.8b975",
        "type": "trigger",
        "z": "1467b860.f5e048",
        "name": "",
        "op1": "1",
        "op2": "false",
        "op1type": "str",
        "op2type": "bool",
        "duration": "120",
        "extend": true,
        "overrideDelay": false,
        "units": "s",
        "reset": "",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 910,
        "y": 820,
        "wires": [
            [
                "af54e468.f0e728"
            ]
        ]
    },
    {
        "id": "7e9944ed.e37d2c",
        "type": "change",
        "z": "1467b860.f5e048",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 560,
        "y": 780,
        "wires": [
            [
                "af54e468.f0e728",
                "65d63496.94201c"
            ]
        ]
    },
    {
        "id": "47a358aa.4131e8",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "ap1h202110000002",
        "func": "if (msg.payload.sn == \"ap1h202110000002\") {\n    return msg;    \n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 360,
        "y": 780,
        "wires": [
            [
                "7e9944ed.e37d2c"
            ]
        ]
    },
    {
        "id": "b3b389d9.38da18",
        "type": "ui_switch",
        "z": "1467b860.f5e048",
        "name": "",
        "label": "AP-1-H-1-003",
        "tooltip": "",
        "group": "bd1f79cf.36f5f8",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": true,
        "decouple": "false",
        "topic": "topic",
        "topicType": "msg",
        "style": "",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "fa-2x fa-power-off",
        "oncolor": "#42f456",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "fa-2x fa-power-off",
        "offcolor": "#f46241",
        "animate": false,
        "x": 1100,
        "y": 840,
        "wires": [
            []
        ]
    },
    {
        "id": "b7f43c38.8abc8",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "milliseconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 750,
        "y": 880,
        "wires": [
            [
                "b82a1579.231b08"
            ]
        ]
    },
    {
        "id": "b82a1579.231b08",
        "type": "trigger",
        "z": "1467b860.f5e048",
        "name": "",
        "op1": "1",
        "op2": "false",
        "op1type": "str",
        "op2type": "bool",
        "duration": "120",
        "extend": true,
        "overrideDelay": false,
        "units": "s",
        "reset": "",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 910,
        "y": 880,
        "wires": [
            [
                "b3b389d9.38da18"
            ]
        ]
    },
    {
        "id": "511ab6be.3815b8",
        "type": "change",
        "z": "1467b860.f5e048",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 560,
        "y": 840,
        "wires": [
            [
                "b3b389d9.38da18",
                "b7f43c38.8abc8"
            ]
        ]
    },
    {
        "id": "5c97296b.f36518",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "ap1h202110000003",
        "func": "if (msg.payload.sn == \"ap1h202110000003\") {\n    return msg;    \n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 360,
        "y": 840,
        "wires": [
            [
                "511ab6be.3815b8"
            ]
        ]
    },
    {
        "id": "424eac88.250c54",
        "type": "ui_switch",
        "z": "1467b860.f5e048",
        "name": "",
        "label": "AP-1-H-1-004",
        "tooltip": "",
        "group": "bd1f79cf.36f5f8",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": true,
        "decouple": "false",
        "topic": "topic",
        "topicType": "msg",
        "style": "",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "fa-2x fa-power-off",
        "oncolor": "#42f456",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "fa-2x fa-power-off",
        "offcolor": "#f46241",
        "animate": false,
        "x": 1100,
        "y": 900,
        "wires": [
            []
        ]
    },
    {
        "id": "9b84bca8.cbe26",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "milliseconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 750,
        "y": 940,
        "wires": [
            [
                "f78b0e5c.8b5a5"
            ]
        ]
    },
    {
        "id": "f78b0e5c.8b5a5",
        "type": "trigger",
        "z": "1467b860.f5e048",
        "name": "",
        "op1": "1",
        "op2": "false",
        "op1type": "str",
        "op2type": "bool",
        "duration": "120",
        "extend": true,
        "overrideDelay": false,
        "units": "s",
        "reset": "",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 910,
        "y": 940,
        "wires": [
            [
                "424eac88.250c54"
            ]
        ]
    },
    {
        "id": "a69ed795.7c07d8",
        "type": "change",
        "z": "1467b860.f5e048",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 560,
        "y": 900,
        "wires": [
            [
                "424eac88.250c54",
                "9b84bca8.cbe26"
            ]
        ]
    },
    {
        "id": "370d10cc.fab63",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "ap1h202110000004",
        "func": "if (msg.payload.sn == \"ap1h202110000004\") {\n    return msg;    \n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 360,
        "y": 900,
        "wires": [
            [
                "a69ed795.7c07d8"
            ]
        ]
    },
    {
        "id": "75cad71a.b077a8",
        "type": "ui_switch",
        "z": "1467b860.f5e048",
        "name": "",
        "label": "AP-1-H-1-005",
        "tooltip": "",
        "group": "bd1f79cf.36f5f8",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": true,
        "decouple": "false",
        "topic": "topic",
        "topicType": "msg",
        "style": "",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "fa-2x fa-power-off",
        "oncolor": "#42f456",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "fa-2x fa-power-off",
        "offcolor": "#f46241",
        "animate": false,
        "x": 1100,
        "y": 960,
        "wires": [
            []
        ]
    },
    {
        "id": "5817b2fa.e83d0c",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "milliseconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 750,
        "y": 1000,
        "wires": [
            [
                "646c858.312fc7c"
            ]
        ]
    },
    {
        "id": "646c858.312fc7c",
        "type": "trigger",
        "z": "1467b860.f5e048",
        "name": "",
        "op1": "1",
        "op2": "false",
        "op1type": "str",
        "op2type": "bool",
        "duration": "120",
        "extend": true,
        "overrideDelay": false,
        "units": "s",
        "reset": "",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 910,
        "y": 1000,
        "wires": [
            [
                "75cad71a.b077a8"
            ]
        ]
    },
    {
        "id": "5093cb7.abc9234",
        "type": "change",
        "z": "1467b860.f5e048",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 560,
        "y": 960,
        "wires": [
            [
                "75cad71a.b077a8",
                "5817b2fa.e83d0c"
            ]
        ]
    },
    {
        "id": "b2da9163.77edb",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "ap1h202110000005",
        "func": "if (msg.payload.sn == \"ap1h202110000005\") {\n    return msg;    \n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 360,
        "y": 960,
        "wires": [
            [
                "5093cb7.abc9234"
            ]
        ]
    },
    {
        "id": "8e62630b.de29",
        "type": "ui_switch",
        "z": "1467b860.f5e048",
        "name": "",
        "label": "AP-1-H-1-006",
        "tooltip": "",
        "group": "bd1f79cf.36f5f8",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": true,
        "decouple": "false",
        "topic": "topic",
        "topicType": "msg",
        "style": "",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "fa-2x fa-power-off",
        "oncolor": "#42f456",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "fa-2x fa-power-off",
        "offcolor": "#f46241",
        "animate": false,
        "x": 1100,
        "y": 1020,
        "wires": [
            []
        ]
    },
    {
        "id": "d5f3349f.a5a6b8",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "milliseconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 750,
        "y": 1060,
        "wires": [
            [
                "ba55cfc3.cf158"
            ]
        ]
    },
    {
        "id": "ba55cfc3.cf158",
        "type": "trigger",
        "z": "1467b860.f5e048",
        "name": "",
        "op1": "1",
        "op2": "false",
        "op1type": "str",
        "op2type": "bool",
        "duration": "120",
        "extend": true,
        "overrideDelay": false,
        "units": "s",
        "reset": "",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 910,
        "y": 1060,
        "wires": [
            [
                "8e62630b.de29"
            ]
        ]
    },
    {
        "id": "4982644c.ffcf6c",
        "type": "change",
        "z": "1467b860.f5e048",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 560,
        "y": 1020,
        "wires": [
            [
                "8e62630b.de29",
                "d5f3349f.a5a6b8"
            ]
        ]
    },
    {
        "id": "e68f1e2a.cb099",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "ap1h202110000006",
        "func": "if (msg.payload.sn == \"ap1h202110000006\") {\n    return msg;    \n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 360,
        "y": 1020,
        "wires": [
            [
                "4982644c.ffcf6c"
            ]
        ]
    },
    {
        "id": "9d7ece1a.7335",
        "type": "ui_switch",
        "z": "1467b860.f5e048",
        "name": "",
        "label": "AP-1-H-1-006",
        "tooltip": "",
        "group": "bd1f79cf.36f5f8",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": true,
        "decouple": "false",
        "topic": "topic",
        "topicType": "msg",
        "style": "",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "fa-2x fa-power-off",
        "oncolor": "#42f456",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "fa-2x fa-power-off",
        "offcolor": "#f46241",
        "animate": false,
        "x": 1100,
        "y": 1080,
        "wires": [
            []
        ]
    },
    {
        "id": "a1d812f8.7753",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "milliseconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 750,
        "y": 1120,
        "wires": [
            [
                "4ccf2ae1.8701c4"
            ]
        ]
    },
    {
        "id": "4ccf2ae1.8701c4",
        "type": "trigger",
        "z": "1467b860.f5e048",
        "name": "",
        "op1": "1",
        "op2": "false",
        "op1type": "str",
        "op2type": "bool",
        "duration": "120",
        "extend": true,
        "overrideDelay": false,
        "units": "s",
        "reset": "",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 910,
        "y": 1120,
        "wires": [
            [
                "9d7ece1a.7335"
            ]
        ]
    },
    {
        "id": "f0eff63c.008178",
        "type": "change",
        "z": "1467b860.f5e048",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 560,
        "y": 1080,
        "wires": [
            [
                "9d7ece1a.7335",
                "a1d812f8.7753"
            ]
        ]
    },
    {
        "id": "2e065125.1fa14e",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "ap1h202110000006",
        "func": "if (msg.payload.sn == \"ap1h202110000006\") {\n    return msg;    \n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 360,
        "y": 1080,
        "wires": [
            [
                "f0eff63c.008178"
            ]
        ]
    },
    {
        "id": "51ba1366.9d65ac",
        "type": "ui_switch",
        "z": "1467b860.f5e048",
        "name": "",
        "label": "AP-1-H-1-007",
        "tooltip": "",
        "group": "bd1f79cf.36f5f8",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": true,
        "decouple": "false",
        "topic": "topic",
        "topicType": "msg",
        "style": "",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "fa-2x fa-power-off",
        "oncolor": "#42f456",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "fa-2x fa-power-off",
        "offcolor": "#f46241",
        "animate": false,
        "x": 1100,
        "y": 1140,
        "wires": [
            []
        ]
    },
    {
        "id": "dc65bd39.0d959",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "milliseconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 750,
        "y": 1180,
        "wires": [
            [
                "84a18c13.78279"
            ]
        ]
    },
    {
        "id": "84a18c13.78279",
        "type": "trigger",
        "z": "1467b860.f5e048",
        "name": "",
        "op1": "1",
        "op2": "false",
        "op1type": "str",
        "op2type": "bool",
        "duration": "120",
        "extend": true,
        "overrideDelay": false,
        "units": "s",
        "reset": "",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 910,
        "y": 1180,
        "wires": [
            [
                "51ba1366.9d65ac"
            ]
        ]
    },
    {
        "id": "96276f9e.30be7",
        "type": "change",
        "z": "1467b860.f5e048",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 560,
        "y": 1140,
        "wires": [
            [
                "51ba1366.9d65ac",
                "dc65bd39.0d959"
            ]
        ]
    },
    {
        "id": "9698ab08.a5eb18",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "ap1h202110000007",
        "func": "if (msg.payload.sn == \"ap1h202110000007\") {\n    return msg;    \n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 360,
        "y": 1140,
        "wires": [
            [
                "96276f9e.30be7"
            ]
        ]
    },
    {
        "id": "decabf35.56fab",
        "type": "ui_switch",
        "z": "1467b860.f5e048",
        "name": "",
        "label": "AP-1-H-1-008",
        "tooltip": "",
        "group": "bd1f79cf.36f5f8",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": true,
        "decouple": "false",
        "topic": "topic",
        "topicType": "msg",
        "style": "",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "fa-2x fa-power-off",
        "oncolor": "#42f456",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "fa-2x fa-power-off",
        "offcolor": "#f46241",
        "animate": false,
        "x": 1100,
        "y": 1200,
        "wires": [
            []
        ]
    },
    {
        "id": "9b0f791f.7fedb8",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "milliseconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 750,
        "y": 1240,
        "wires": [
            [
                "704eac6b.a64254"
            ]
        ]
    },
    {
        "id": "704eac6b.a64254",
        "type": "trigger",
        "z": "1467b860.f5e048",
        "name": "",
        "op1": "1",
        "op2": "false",
        "op1type": "str",
        "op2type": "bool",
        "duration": "120",
        "extend": true,
        "overrideDelay": false,
        "units": "s",
        "reset": "",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 910,
        "y": 1240,
        "wires": [
            [
                "decabf35.56fab"
            ]
        ]
    },
    {
        "id": "5d36f16d.916c5",
        "type": "change",
        "z": "1467b860.f5e048",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 560,
        "y": 1200,
        "wires": [
            [
                "decabf35.56fab",
                "9b0f791f.7fedb8"
            ]
        ]
    },
    {
        "id": "ef612784.437728",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "ap1h202110000008",
        "func": "if (msg.payload.sn == \"ap1h202110000008\") {\n    return msg;    \n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 360,
        "y": 1200,
        "wires": [
            [
                "5d36f16d.916c5"
            ]
        ]
    },
    {
        "id": "6b1282ce.7f422c",
        "type": "ui_switch",
        "z": "1467b860.f5e048",
        "name": "",
        "label": "AP-2-H-001",
        "tooltip": "",
        "group": "bd1f79cf.36f5f8",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": true,
        "decouple": "false",
        "topic": "topic",
        "topicType": "msg",
        "style": "",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "fa-2x fa-power-off",
        "oncolor": "#42f456",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "fa-2x fa-power-off",
        "offcolor": "#f46241",
        "animate": false,
        "x": 1090,
        "y": 1320,
        "wires": [
            []
        ]
    },
    {
        "id": "aeb8c867.abf248",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "milliseconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 750,
        "y": 1360,
        "wires": [
            [
                "27d1b90.abea948"
            ]
        ]
    },
    {
        "id": "27d1b90.abea948",
        "type": "trigger",
        "z": "1467b860.f5e048",
        "name": "",
        "op1": "1",
        "op2": "false",
        "op1type": "str",
        "op2type": "bool",
        "duration": "120",
        "extend": true,
        "overrideDelay": false,
        "units": "s",
        "reset": "",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 910,
        "y": 1360,
        "wires": [
            [
                "6b1282ce.7f422c"
            ]
        ]
    },
    {
        "id": "ac246202.17aab",
        "type": "change",
        "z": "1467b860.f5e048",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 560,
        "y": 1320,
        "wires": [
            [
                "6b1282ce.7f422c",
                "aeb8c867.abf248"
            ]
        ]
    },
    {
        "id": "dca554e6.1c4f78",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "ap2h202110000001",
        "func": "if (msg.payload.sn == \"ap2h202110000001\") {\n    return msg;    \n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 360,
        "y": 1320,
        "wires": [
            [
                "ac246202.17aab"
            ]
        ]
    },
    {
        "id": "a795d913.f23808",
        "type": "ui_switch",
        "z": "1467b860.f5e048",
        "name": "",
        "label": "AP-2-H-002",
        "tooltip": "",
        "group": "bd1f79cf.36f5f8",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": true,
        "decouple": "false",
        "topic": "topic",
        "topicType": "msg",
        "style": "",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "fa-2x fa-power-off",
        "oncolor": "#42f456",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "fa-2x fa-power-off",
        "offcolor": "#f46241",
        "animate": false,
        "x": 1090,
        "y": 1380,
        "wires": [
            []
        ]
    },
    {
        "id": "24c400e2.0b2f3",
        "type": "delay",
        "z": "1467b860.f5e048",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "milliseconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 750,
        "y": 1420,
        "wires": [
            [
                "7a4513f2.aed22c"
            ]
        ]
    },
    {
        "id": "7a4513f2.aed22c",
        "type": "trigger",
        "z": "1467b860.f5e048",
        "name": "",
        "op1": "1",
        "op2": "false",
        "op1type": "str",
        "op2type": "bool",
        "duration": "120",
        "extend": true,
        "overrideDelay": false,
        "units": "s",
        "reset": "",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 910,
        "y": 1420,
        "wires": [
            [
                "a795d913.f23808"
            ]
        ]
    },
    {
        "id": "f933bf4f.6bd24",
        "type": "change",
        "z": "1467b860.f5e048",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 560,
        "y": 1380,
        "wires": [
            [
                "a795d913.f23808",
                "24c400e2.0b2f3"
            ]
        ]
    },
    {
        "id": "b4f09c6f.57f2",
        "type": "function",
        "z": "1467b860.f5e048",
        "name": "ap2h202110000002",
        "func": "if (msg.payload.sn == \"ap2h202110000002\") {\n    return msg;    \n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 360,
        "y": 1380,
        "wires": [
            [
                "f933bf4f.6bd24"
            ]
        ]
    },
    {
        "id": "260b2fc5.50d72",
        "type": "link in",
        "z": "1467b860.f5e048",
        "name": "",
        "links": [
            "d27ad638.4841c8"
        ],
        "x": 215,
        "y": 500,
        "wires": [
            [
                "86d11cec.a1e87"
            ]
        ]
    },
    {
        "id": "d27ad638.4841c8",
        "type": "link out",
        "z": "1467b860.f5e048",
        "name": "",
        "links": [
            "260b2fc5.50d72",
            "1c5493a6.ab72ec",
            "26bbdab2.ac4cc6",
            "2fb7122b.80d56e",
            "f51ae9f8.3730e8",
            "ecb1866c.4b7018",
            "ee909019.abae5",
            "b63602ac.deff3",
            "98200981.754e88",
            "4fde30c4.407b5",
            "807464af.93f798",
            "18abc3ae.eb349c",
            "1428cf1a.da2011"
        ],
        "x": 255,
        "y": 220,
        "wires": []
    },
    {
        "id": "1c5493a6.ab72ec",
        "type": "link in",
        "z": "1467b860.f5e048",
        "name": "",
        "links": [
            "d27ad638.4841c8"
        ],
        "x": 215,
        "y": 660,
        "wires": [
            [
                "acb88841.c0b858"
            ]
        ]
    },
    {
        "id": "26bbdab2.ac4cc6",
        "type": "link in",
        "z": "1467b860.f5e048",
        "name": "",
        "links": [
            "d27ad638.4841c8"
        ],
        "x": 215,
        "y": 720,
        "wires": [
            [
                "d58cc607.c45fc8"
            ]
        ]
    },
    {
        "id": "2fb7122b.80d56e",
        "type": "link in",
        "z": "1467b860.f5e048",
        "name": "",
        "links": [
            "d27ad638.4841c8"
        ],
        "x": 215,
        "y": 780,
        "wires": [
            [
                "47a358aa.4131e8"
            ]
        ]
    },
    {
        "id": "f51ae9f8.3730e8",
        "type": "link in",
        "z": "1467b860.f5e048",
        "name": "",
        "links": [
            "d27ad638.4841c8"
        ],
        "x": 215,
        "y": 840,
        "wires": [
            [
                "5c97296b.f36518"
            ]
        ]
    },
    {
        "id": "ecb1866c.4b7018",
        "type": "link in",
        "z": "1467b860.f5e048",
        "name": "",
        "links": [
            "d27ad638.4841c8"
        ],
        "x": 215,
        "y": 900,
        "wires": [
            [
                "370d10cc.fab63"
            ]
        ]
    },
    {
        "id": "ee909019.abae5",
        "type": "link in",
        "z": "1467b860.f5e048",
        "name": "",
        "links": [
            "d27ad638.4841c8"
        ],
        "x": 215,
        "y": 960,
        "wires": [
            [
                "b2da9163.77edb"
            ]
        ]
    },
    {
        "id": "b63602ac.deff3",
        "type": "link in",
        "z": "1467b860.f5e048",
        "name": "",
        "links": [
            "d27ad638.4841c8"
        ],
        "x": 215,
        "y": 1020,
        "wires": [
            [
                "e68f1e2a.cb099"
            ]
        ]
    },
    {
        "id": "98200981.754e88",
        "type": "link in",
        "z": "1467b860.f5e048",
        "name": "",
        "links": [
            "d27ad638.4841c8"
        ],
        "x": 215,
        "y": 1080,
        "wires": [
            [
                "2e065125.1fa14e"
            ]
        ]
    },
    {
        "id": "4fde30c4.407b5",
        "type": "link in",
        "z": "1467b860.f5e048",
        "name": "",
        "links": [
            "d27ad638.4841c8"
        ],
        "x": 215,
        "y": 1140,
        "wires": [
            [
                "9698ab08.a5eb18"
            ]
        ]
    },
    {
        "id": "807464af.93f798",
        "type": "link in",
        "z": "1467b860.f5e048",
        "name": "",
        "links": [
            "d27ad638.4841c8"
        ],
        "x": 215,
        "y": 1200,
        "wires": [
            [
                "ef612784.437728"
            ]
        ]
    },
    {
        "id": "18abc3ae.eb349c",
        "type": "link in",
        "z": "1467b860.f5e048",
        "name": "",
        "links": [
            "d27ad638.4841c8"
        ],
        "x": 215,
        "y": 1320,
        "wires": [
            [
                "dca554e6.1c4f78"
            ]
        ]
    },
    {
        "id": "1428cf1a.da2011",
        "type": "link in",
        "z": "1467b860.f5e048",
        "name": "",
        "links": [
            "d27ad638.4841c8"
        ],
        "x": 215,
        "y": 1380,
        "wires": [
            [
                "b4f09c6f.57f2"
            ]
        ]
    },
    {
        "id": "bd1f79cf.36f5f8",
        "type": "ui_group",
        "name": "Home",
        "tab": "e83cc3b.4d6214",
        "order": 1,
        "disp": true,
        "width": "6",
        "collapse": false
    },
    {
        "id": "e83cc3b.4d6214",
        "type": "ui_tab",
        "name": "Petrzka",
        "icon": "dashboard",
        "order": 1,
        "disabled": false,
        "hidden": false
    }
]
