//const trees = [13.900798082250809, 13.837151848248933, 13.773269218693377, 13.70914887409922, 13.644789485143285, 13.58018971257231, 13.515348207110039];
//console.log("trees: " + trees);
//console.log("final: " + calculate(2006, trees));

export function calculate(startyear, trees) {
    var div1 = div(trees);
    //console.log("div1: " + div1);

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
    //console.log("div2: " + div2);

    var avg = average(div2);
    avg = avg * 100;
    avg = Math.round(avg);
    avg = avg / 100;
    //console.log("avg: " + avg);
    var years;
    if (avg > 0) {
        years = logReg(trees);
        //console.log("log");
    } else if (avg < 0) {
        years = expReg(trees);
        //console.log("exp");
    } else {
        years = -Math.round(trees[0] / average(div1));
        //console.log("linear");
    }

    //console.log("years: " + years);
    return startyear + years;

}


function div(data) {
    var diffs = [];
    //console.log("data: " + data);
    //console.log("length: " + data.length);
    for (var i = 0; i < data.length - 1; i++) {
        diffs[i] = data[i + 1] - data[i];
        //console.log("diffs[i]: " + diffs[i]);
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
        //console.log("lin: " + lin);
    }

    var diffs = div(linearized);
    //console.log("diffs log: " + diffs);
    var slope = average(diffs);
    //console.log("slope: " + slope);

    return -Math.round(trees[0] / slope);
}

function expReg(trees) {
    var linearized = [];
    for (var i = 0; i < trees.length; i++) {
        var lin = Math.log(trees[i]);
        linearized[i] = lin;
        //console.log("lin: " + lin);

    }

    var diffs = div(linearized);
    //console.log("diffs log: " + diffs);
    var slope = average(diffs);
    //console.log("slope: " + slope);


    return -Math.round(trees[0] / slope);
}