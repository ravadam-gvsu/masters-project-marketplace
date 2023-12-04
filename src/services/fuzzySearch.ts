import * as fuzz from 'fuzzball';


export function fuzzSearch(products: any[], field:string, searchKey: string) {
    const options = {
            scorer: fuzz.partial_ratio, // Any function that takes two values and returns a score, default: ratio
            processor: choice => choice[field],  // Takes choice object, returns string, default: no processor. Must supply if choices are not already strings.
            limit: 20, // Max number of top results to return, default: no limit / 0.
            cutoff: 50, // Lowest score to return, default: 0
            unsorted: true // Results won't be sorted if true, default: false. If true limit will be ignored.
    };

    const results = fuzz.extract(searchKey, products, options);
    const finalResults = results.map(prd => prd[0]);
    return finalResults;
}