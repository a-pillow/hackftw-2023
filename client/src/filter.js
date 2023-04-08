const json = 'C:\Users\yuxia\Documents\hackftw-2023\client\public\share-global-forest-2.json';
const forests = JSON.parse(json);

class filter{
    constructor(){
        var forestlist = forests;
        var recentForests;
        for(var i = 0; i < forestlist.size; i++){
            if(forestlist[i][2] == 2020){
                console.log(forestlist[i].Entity);
                recentForests[i] = forestlist[i];
            }
        }
    }
}

