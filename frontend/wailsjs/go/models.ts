export namespace database {
	
	export class Entry {
	    headword: string;
	    html: string;
	
	    static createFrom(source: any = {}) {
	        return new Entry(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.headword = source["headword"];
	        this.html = source["html"];
	    }
	}

}

export namespace dictionary {
	
	export class LookupResult {
	    id: string;
	    dictionary: string;
	    full_name: string;
	    entries: database.Entry[];
	
	    static createFrom(source: any = {}) {
	        return new LookupResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.dictionary = source["dictionary"];
	        this.full_name = source["full_name"];
	        this.entries = this.convertValues(source["entries"], database.Entry);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class LookupResultWithSuggestion {
	    lookup_results: LookupResult[];
	    match_type: number;
	    suggestions: string[];
	
	    static createFrom(source: any = {}) {
	        return new LookupResultWithSuggestion(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.lookup_results = this.convertValues(source["lookup_results"], LookupResult);
	        this.match_type = source["match_type"];
	        this.suggestions = source["suggestions"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

