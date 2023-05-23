import { delay } from "../common/utill/utill";
import { sampleData } from "./sampleData";

export function fetchSampleData(){
    return delay(1000).then(function() {
        return Promise.resolve(sampleData )
    })
}