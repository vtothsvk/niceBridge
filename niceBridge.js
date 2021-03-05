[
    {
        "id": "1467b860.f5e048",
        "type": "tab",
        "label": "niceBridge",
        "disabled": false,
        "info": ""
    },
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
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "complete": "true",
        "statusVal": "",
        "statusType": "auto",
        "x": 630,
        "y": 100,
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
        "x": 260,
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
        "func": "var jwt =  global.get('jsonwebtoken');\nvar fs = global.get('fs');\n\nvar dirPrefix = '/home/pi/devices/';\nvar sn = msg.payload.sn;\nvar dirSuffix = '/private.pem';\n\nmsg.payload.body[0].Timestamp = parseInt(Date.now() / 1000);\n\nvar kid = msg.payload.kid;\n\nmsg.payload = msg.payload.body;\n\nvar input = { sub: sn };\n\nvar privateKey = fs.readFileSync(dirPrefix + sn + dirSuffix);\n\nvar token = jwt.sign(input, privateKey, { algorithm: 'ES256', keyid: kid, expiresIn: 300});\n\nmsg.headers = {};\nmsg.headers['Content-Type'] = 'application/json';\nmsg.headers['Authorization'] = 'Bearer ' + token;\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 410,
        "y": 180,
        "wires": [
            [
                "57947fdd.f828"
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
                "81ae7ba3.157368"
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
        "id": "57947fdd.f828",
        "type": "http request",
        "z": "1467b860.f5e048",
        "name": "",
        "method": "POST",
        "ret": "obj",
        "paytoqs": "ignore",
        "url": "https://fei.edu.r-das.sk:51415/api/v1/Auth",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 590,
        "y": 180,
        "wires": [
            [
                "8215562f.7deaa8"
            ]
        ]
    }
]