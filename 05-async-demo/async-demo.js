var app = (function(){
	function addSync(x,y){
		console.log('		[@Service] processing ', x , ' and ', y);
		var result = x + y;
		console.log('		[@Service] returning result');
		return result;
	}

	function addSyncClient(x,y){
		console.log('[@Consumer] triggering addSync');
		var result = addSync(x,y);
		console.log('[@Consumer] result = ', result);
	}

	function addAsync(x,y, onResult){
		console.log('		[@Service] processing ', x , ' and ', y);
		setTimeout(function(){
			var result = x + y;
			console.log('		[@Service] returning result');
			if (typeof onResult === 'function')
				onResult(result);
		}, 4000);
	}

	function addAsyncClient(x,y){
		console.log('[@Consumer] triggering addAsync');
		addAsync(x,y, function(result){
			console.log('[@Consumer] result = ', result);
		});
	}

	var addAsyncEvents = (function (){
		var _callbacks = [];
		function subscribe(callback){
			_callbacks.push(callback);
		}
		function process(x,y){
			console.log('		[@Service] processing ', x , ' and ', y);
			setTimeout(function(){
				var result = x + y;
				console.log('		[@Service] returning result');
				for(var index=0; index<_callbacks.length; index++){
					_callbacks[index](result);
				}
			}, 4000);
		}
		return {
			subscribe : subscribe,
			process : process
		}
	})();

	function addAsyncPromise(x,y){
		var promise = new Promise(function(resolveFn, rejectFn){
			setTimeout(function(){
				var result = x + y;
				console.log('		[@Service] returning result');
				resolveFn(result);
			}, 4000);
		});
		return promise;
	}


	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient,
		addAsyncEvents : addAsyncEvents,
		addAsyncPromise : addAsyncPromise
	};
})();