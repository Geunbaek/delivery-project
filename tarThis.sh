# 과제 제출용 압축 명령어 - 8MB(디스코드 공유 제한 용량) 이내로 딱 필요한거만 압축
tar czvf DATeam3.tar.gz --exclude .git --exclude ./front/node_modules --exclude ./DA/CSVs --exclude ./back/data_set --exclude ./db .