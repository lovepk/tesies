// 克隆vue项目的1.1分支
git clone -b 1.1 https://github.com/vuejs/vue.git
// 显示远程仓库信息
git remote show origin  
// 删除和远程仓库的联系
git remote rm origin
// 建立远程仓库和本地的联系
git remote add origin git@github.com:lovepk/vue1-source-learn.git
//push代码  -u参数是方便以后用git push 命令直接提交
git push -u origin master
// 在本地创建新分支b1
git branch b1
// 切换到分支b1
git checkout b1
// 往github上上传新分支b1
git push origin b1
// 在本地删除一个分支b1
git branch -d b1
// 在github远程删除一个分支b1
git push origin:b1
// 原因是路径中存在 / 的符号转义问题，false就是不转换符号默认是true，相当于把路径的 / 符号进行转义，这样添加的时候就有问题
git config --global core.autocrlf false
// 分支合并，先切换到要合并到的分支，再把被合并的分支合过去
git merge branchname
