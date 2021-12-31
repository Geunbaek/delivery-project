# 브라우저 화면에 Invalid host header [React] 오류 해결용 - https://babysunmoon.tistory.com/entry/React-Invalid-host-header-%EC%98%A4%EB%A5%98
#!/bin/bash

sed -i "s/!proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true'/true/" node_modules/react-scripts/config/webpackDevServer.config.js