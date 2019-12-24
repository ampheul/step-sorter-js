//-- KEYS FOR TYPE TAGS

var type_key = '$type';

var data_key = '$data';

var typed_obj = (the_type, data) => {
    var val = {};
    val[type_key] = the_type;
    val[data_key] = data;

    return val;
}



//-- UTILITY

var eq = 0;
var gt = 1;
var lt = 2;

var cons_nonempty = ([a, as], b) => [b, [a, ...as]];

var choices = (sorting) => {
    let [, , merge] = sorting[data_key];
    let [, [l],[r]] = merge[data_key];
    return [l, r];
};


//-- MERGING

var merging = 'merging';

// left and right are type (T, T[])
var make_merging =
    (stack, left, right) => typed_obj(merging, [stack, left, right]);

var merge_step = (ord, merge) => {
    let [stack, [l, ls], [r, rs]] = merge[data_key];

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

var init_sort = (xs) => {
    if (xs.length > 1) {
        let [x, y, ...ys] = xs;
        return make_sorting([], ys.map((a) => [a, []]), make_merging([], [x, []], [y, []]));
    } else {
        return xs;
    }
};

var sort_step = (ord, sort) => {
    [merged, unmerged, merge] = sort[data_key];

    // step forward in the merge, only place we use ord
    merge = merge_step(ord, merge);

    // if the merge is still ongoing, return an updated sort
    if (typeof(merge) === 'object' && merge[type_key] === merging) {
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
    init_sort: init_sort,
    sort_step: sort_step,
    type: type_key,
    data: data_key,
    choices: choices
};
