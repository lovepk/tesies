define(function(require, exports, module) {
	require('./vuex.js');
	const store = new Vuex.Store({
		state: {
			count: 0
		},
		// 通过提交mutation，我们可以在应用程序中根据mutation的名字来判断状态的变化过程。
		mutations: {
			increment (state) {
				state.count ++
			},
			reduce (state) {
				state.count --
			}
		}
	})
	console.log(store.state.count);
	store.commit('increment'); //加一次
	console.log(store.state.count);
	store.commit('increment'); //又加了一次
	console.log(store.state.count);

	return store;
})