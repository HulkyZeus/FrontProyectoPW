import * as moment from "moment";

export class FilterDTO {
    name: string;
    date: string;
    location: string;

    constructor() {
        this.name = "";
        this.date = moment(new Date()).format("yyyy-MM-DD");
        this.location = ""
    }
}