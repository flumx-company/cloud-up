export class Query {
    private data:any;
    private OperatorList:any;
    private operation:any;
    // lock_type = '';
    constructor(array_data:any,OperatorList:any, operation:any){
        this.data = array_data;
        this.OperatorList = OperatorList;
        this.operation = operation;
    }
    // private startTemlate(MATCH_ENTITY:any, MATCH_FIELD:any){}
    private entity_object = (item:any) =>{
        return {[`${item.MATCH_ENTITY}.${item.MATCH_FIELD}`]: this.itemOperator(item)}
    };
    private itemOperator = (item:any) => {
		return {[item.OPERATOR]: `${item.VALUE}`}
    };
    private entity_operation = (item:any) =>{
        return {[`${item.OPERATION}`] : [{...this.entity_object(item)}]}
    };
	private empty_entity_operation = (item:any) =>{
		return  {...this.entity_object(item)}
	};
    private bracesAsString = (bracesCount: number, start: boolean) => start?'['.repeat(bracesCount) : ']'.repeat(bracesCount);

    private buildQuery = (array:any) => {
    	let main_operation = '';
    	let obj:any = {};
    	let pivot = obj;
    	array.forEach((item:any, index:any) => {
			!main_operation ? main_operation = item.OPERATION : null;
    		if(!item.OPERATION) {
    			const name = `${item.MATCH_ENTITY}.${item.MATCH_FIELD}`;
    			if(pivot && Array.isArray(pivot)) {
					let operatorlast = this.operation
						.find((oper:any) => Object
							.keys(obj[main_operation][obj[main_operation].length-1])[0] === oper.technicalName);
					if(operatorlast) {
						let indexLast:any;
						const data = obj[main_operation].find((main:any, index_main:number) => {
							indexLast = index_main;
							return Object.keys(main)[0] === operatorlast.technicalName
						});
						obj[main_operation][indexLast][operatorlast.technicalName]
							.push({...this.empty_entity_operation(item)});
						return;
					}
    				let inx = null;
    				pivot.push({...this.entity_object(item)});
    				pivot.forEach((arr_item, index_arr) => arr_item[name]
    					? inx = index_arr
    					: null)
    				if(inx) {
    					pivot = pivot[inx];
    					return;
    				}
    			}
    			pivot[name] = {[item.OPERATOR]: `${item.VALUE}`};
    			pivot = pivot[name]
    		} else {
    			let inx, operator = `${item.OPERATION}`;
    			if(pivot && Array.isArray(pivot)) {
					array[index - 1] && item.OPERATION === array[index - 1].OPERATION ?
						pivot.push({...this.empty_entity_operation(item)}) :
						pivot.push({...this.entity_operation(item)});

    				pivot.forEach((arr_item, index_arr) => arr_item[operator]
    					? inx = index_arr
    					: null);
    				if(array[index + 1] && item.OPERATION === array[index + 1].OPERATION) {
						if(inx) {
							pivot = pivot[inx][operator];
							return;
						}
					}
    				else pivot = obj[main_operation];
					return;
    			}
    			if(!pivot) return;
    			pivot[operator] = [{...this.entity_object(item)}];
    			pivot = pivot[operator]
    		}
    	});
        return obj;
    };
    convertToString(){
        if(!this.data || !Array.isArray(this.data)) return null;
        if(Array.isArray(this.data) && this.data.length < 1) return null;

        let query = this.buildQuery(this.data);

        return `${JSON.stringify(query)}`
    }
}
