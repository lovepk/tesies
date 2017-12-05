define(function(require, exports, module){
	require('../../vue.js')
	//  组件声明
	Vue.use(Vuex);
	const Counter = {
		template: `<div>我是子组件我也使用了store里的count: {{ count }} <button @click="redu()">减少</button></div>`,
		computed: {
			// 访问store里的数据最简单是通过计算属性
			count () {
				// 之所以可以通过this.$store来访问，是因为根实例里有store选项
				return this.$store.state.count;
			}
		},
		methods: {
			// 不能直接改变store中的状态。改变store中的状态的唯一途径是显示的提交mutation(变化的意思)
			redu() {
				this.$store.commit('reduce');
			}
		}
	}
	Vue.extend(Counter);
	Vue.component('Counter', Counter)
	return Counter;
})