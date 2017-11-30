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