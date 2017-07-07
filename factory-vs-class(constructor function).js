//factory
function spinnerFactory(){
	var counter  = 0;
	function increment(){
		return ++counter;
	}
	function decrement(){
		return --counter;
	}
	return {
		up : increment,
		down : decrement
	}
}

var spinner = spinnerFactory();


//constructor function
function Spinner(){
	var counter = 0;

	this.up = function(){
		return ++counter;
	};

	this.down = function(){
		return --counter;
	}

	//this object is returned by default
}

var spinner = new Spinner()