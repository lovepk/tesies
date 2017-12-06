define(function(require, exports, module) {
	require('../../vuex.js');
	const store = new Vuex.Store({
		state: {
			count: 0
		},
		// 通过提交mutation，我们可以在应用程序中根据mutation的名字来判断状态的变化过程。,状态的变化是同步的，动作是可以异步的
		mutations: {
			increment (state) {
				state.count ++
			},
			reduce (state) {
				state.count --
			}
		},
		// action类似于mutation,不同的是action提交的是mutation,而不是直接变更状态,action可以包含任意异步操作。
		actions: {
			incre(context) {
				setTimeout(function(){
					context.commit('increment');
				},2000)
			}
		},
		 getters: {
		    getstate: function(state) {
		    	return state.count+5
		    }
		 }
	})
	console.log(store.state.count);
	store.commit('increment'); //加一次
	console.log(store.state.count);
	store.commit('increment'); //又加了一次
	console.log(store.state.count);
	store.dispatch('incre');   //通过action来进行
	console.log(store.state.count);
	console.log(store.getters.getstate);
	return store;
})