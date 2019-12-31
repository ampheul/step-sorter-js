function range(start, end) {
    var xs  = [];
    for (let i = start; i <= end; i++) {
        xs.push(i);
    }
    return xs;
}

// uses knuth shuffling algorithm
function shuffle(xs) {
    for (let i = 0; i < xs.length; i++) {
	var r = Math.floor(Math.random()*(xs.length-i));
	var tmp = xs[i];
	xs[i] = xs[i+r];
	xs[i+r] = tmp;
    }
    return xs;
}

function compare_arrays(xs, ys) {
    if (xs === ys) return true;
    else if (!xs || !ys) return false;
    else if (xs.length !== ys.length) return false;

    for (let i = 0; i < xs.length; i++) {
        if (xs[i] !== ys[i]) return false;
    }
    return true;
}
