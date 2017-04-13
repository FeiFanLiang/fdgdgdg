git branch -a，列出所有分支
git checkout -b dev origin/dev 作用是checkout远程的dev分支，在本地起名为dev分支，并切换到本地的dev分支

用远程的覆盖本地的
git fetch --all
git reset --hard origin/master
用本地的覆盖远程的
git push -f
回滚到某一分支
git checkout 77e3873
git 一个分支完全替换另一个分支
git checkout master // 切换到旧的分支
git reset --hard develop  // 将本地的旧分支 master 重置成 develop
git push origin master --force // 再推送到远程仓库
