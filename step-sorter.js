//-- KEYS FOR TYPE TAGS

var type = '$type';

var data = '$data';

var typed_obj = (the_type, the_data) => {
    var val = {};
    val[type] = the_type;
    val[data] = the_data;

    return val;
}

var is_type = (the_type) => (the_obj) => {
    return typeof(the_obj) === 'object' && the_obj[type] === the_type;
};

//-- UTILITY

var eq = 0;

var gt = 1;

var lt = 2;

var cons_nonempty = ([a, as], b) => [b, [a, ...as]];

var choices = (sorting) => {
    let [, , merge] = sorting[data];
    let [, [l],[r]] = merge[data];
    return [l, r];
};


//-- MERGING

var merging = 'merging';

// left and right are type (T, T[])
var make_merging =
    (stack, left, right) => typed_obj(merging, [stack, left, right]);

var init_merge = (left, right) => {
    if (left.length === 0) return left;
    if (right.length === 0) return right;
    
    let [l,...ls] = left;
    let [r,...rs] = right;

    return make_merging([], [l, ls], [r, rs]);
};

var merge_step = (ord, merge) => {
    let [stack, [l, ls], [r, rs]] = merge[data];

    if (ord === eq) {
        return merge_step(gt, merge);
    } else if (ord === gt && ls.length > 0) {
        let [x, ...xs] = ls;
        return make_merging([l, ...stack], [x, xs], [r, rs]);
    } else if (ord === gt && ls.length === 0) {
        return stack.reduce(cons_nonempty, [l, [r, ...rs]]);
    } else if (ord === lt && rs.length > 0) {
        let [x, ...xs] = rs;
        return make_merging([r, ...stack], [x, xs], [l, ls]);
    } else if (ord === lt && rs.length === 0) {
        return stack.reduce(cons_nonempty, [r, [l, ...ls]]);
    }
};


//-- SORTING

var sorting = 'sorting';

// note that merged, unmerged are of type (T,T[])[], merge is a merging
var make_sorting =
    (merged, unmerged, merge) => typed_obj(sorting, [merged, unmerged, merge]);

var is_sorting =
    (x) => x && typeof(x) === 'object' && x[type] === sorting


var init_sort = (xs) => {
    if (xs.length < 2)
        return xs;

    let [x, y, ...ys] = xs;
    let f  = (a) => [a, []];
    
    return make_sorting([], ys.map(f), init_merge([x], [y]));
};

var sort_step = (ord, sort) => {
    [merged, unmerged, merge] = sort[data];

    // step forward in the merge, only place we use ord
    merge = merge_step(ord, merge);

    // if the merge is still ongoing, return an updated sort
    if (typeof(merge) === 'object' && merge[type] === merging) {
        return make_sorting(merged, unmerged, merge);
    }
    // pick two more lists to merge, the continue as before
    else if (unmerged.length > 1) {
        let [x, y, ...ys] = unmerged;
        return make_sorting([merge, ...merged], ys, make_merging([], x, y));
    } else if (unmerged.length == 1) {
        let [x] = unmerged;
        return make_sorting(merged, [], make_merging([], x, merge));
    } else if (unmerged.length == 0 && merged.length > 0) {
        let [x, ...xs] = merged;
        return make_sorting([], xs, make_merging([], merge, x));
    }
    // otherwise all the sorting is done
    else if (unmerged.length == 0 && merged.length == 0) {
        let [x, xs] = merge
        return [x, ...xs];
    }
};


//-- EXPORTS

module.exports = {
    eq: eq,
    gt: gt,
    lt: lt,
    init_merge: init_merge,
    init_sort: init_sort,
    sort_step: sort_step,
    type: type,
    data: data,
    is_merging : is_type(merging),
    is_sorting : is_type(sorting),
    choices: choices
};
