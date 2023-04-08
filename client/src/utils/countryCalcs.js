//const trees = [81.59800664451828, 81.28384551495017, 80.96968438538205, 80.65552325581396, 80.34136212624584, 80.02720099667773, 79.71303986710964, 79.39887873754152, 79.08471760797342];
//console.log("trees: " + trees);
//console.log("final: " + calculate(2006, trees));

export function calculate(startyear, trees) {
    var div1 = div(trees);
    console.log("div1: " + div1);

    var decrease = testDec(trees);
    if (decrease < 3 && average(div1) >= 0) {
        return "good work";
    } else if (decrease >= 3 && average(div1) >= 0) {
        var temp = trees;
        trees = [];
        for (var i = 0; i < decrease; i++) {
            trees[i] = temp[trees.length - decrease - 1 + i];
        }
    }

    var div2 = div(div1);
    console.log("div2: " + div2);

    var avg = average(div2);
    console.log("avg: " + avg);
    var years;
    if (avg > 0) {
        years = logReg(trees);
        console.log("log");
    } else if (avg < 0) {
        years = expReg(trees);
        console.log("exp");
    } else {
        years = -Math.round(trees[0] / average(div1));
        console.log("linear");
    }

    console.log("years: " + years);
    return startyear + years;

}


function div(data) {
    var diffs = [];
    console.log("data: " + data);
    console.log("length: " + data.length);
    for (var i = 0; i < data.length - 1; i++) {
        diffs[i] = data[i + 1] - data[i];
        console.log("diffs[i]: " + diffs[i]);
    }
    return diffs;
}

function testDec(trees) {
    var diffs = div(trees);

    var constDec = 0;
    for (var i = diffs.length - 1; i >= 0; i--) {
        if (diffs[i] < 0) {
            constDec++;
        } else {
            break;
        }
    }

    return constDec;
}

function average(diffs) {
    var sum = 0;
    for (var i = 0; i < diffs.length; i++) {
        sum += diffs[i];
    }
    return sum / diffs.length;
}

function logReg(trees) {
    var linearized = [];
    for (var i = 0; i < trees.length; i++) {
        var lin = Math.pow(Math.E, trees[i]);
        linearized[i] = lin;
        console.log("lin: " + lin);
    }

    var diffs = div(linearized);
    console.log("diffs log: " + diffs);
    var slope = average(diffs);
    console.log("slope: " + slope);

    return -Math.round(trees[0] / slope);
}

function expReg(trees) {
    var linearized = [];
    for (var i = 0; i < trees.length; i++) {
        var lin = Math.log(trees[i]);
        linearized[i] = lin;
    }

    var diffs = div(linearized);
    var slope = average(diffs);

    return -Math.round(trees[0] / slope);
}