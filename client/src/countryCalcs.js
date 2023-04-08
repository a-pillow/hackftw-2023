class countryCalcs{
    constructor(){
        var status = "";
        function calculate(startyear, trees){
            var div1 = div(trees);
            var decrease = testDec(trees);
            if(decrease < 3 && average(div1) >= 0){
                return "good work";
            }else if(decrease >= 3 && average(div1) >= 0){
                var temp = trees;
                trees = [];
                for(var i = 0; i < decrease; i++){
                    trees[i] = temp[trees.size - decrease -1 + i];
                }
            }

            var div2 = div(div1);

            avg = average(div2);
            var years;
            if(avg > 0){
                years = logReg(trees);
            }else if(avg < 0){
                years = expReg(trees);
            }else{
                years = Math.round(trees[0]/average(div1));
            }

            return startyear + years;
            
        }


        function div(data){
            var diffs;
            for(var i = 0; i < data.size - 1; i++){
                diffs.add(data[i] - data[i - 1]);
            }
            return diffs;
        }

        function testDec(trees){
            var diffs = div(trees);

            var constDec = 0;
            for(var i = diffs.size - 1; i >= 0; i--){
                if(diffs[i] < 0){
                    constDec++;
                }else{
                    break;
                }
            }
            
            return constDec;
        }

        function average(diffs){
            var sum = 0;
            for(var i = 0; i < diffs.size; i++){
                sum += diffs[i];
            }
            return sum / diffs.size;
        }

        function logReg(trees){
            var linearized;
            for(var i = 0; i < trees.size; i++){
                var lin = Math.pow(Math.E, trees);
                linearized.add(lin);
            }
            
            var diffs = div(linearized);
            var slope = average(diffs);

            return Math.round(trees[0]/slope);
        }

        function expReg(trees){
            var linearized;
            for(var i = 0; i < trees.size; i++){
                var lin = Math.log(trees);
                linearized.add(lin);
            }
            
            var diffs = div(linearized);
            var slope = average(diffs);

            return Math.round(trees[0]/slope);
        }
    }
}