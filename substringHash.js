/*Creating object for hash
* Take parameter as string array
*/
var hash = function newHash(arrayOfString){

	/*Rabin Karp Hash Function
	* Parameters : string , position of character to update hashValue,value( previous hash value)
	*/
	hash = function(string, pos, value){
		var p = value, d=0;
		p = (p*d + string.charCodeAt(pos))%997;
		return p;
	};
	
	//Hash Value Container
	//var hashValue = new Array();
	var maps = {};
	
	//Hash Value of String to be entered by User for search
	var hashPat = 0;
	
	/*Intializing function with hash value of first character
	 No parameter
	*/
	var initialize = function intialize(){
		for(var i = 0 ; i < arrayOfString.length ; i++){
			var p = hash(arrayOfString[i], 0, 0);
			if(p in maps){
				maps[p].push(i);
			}
			else{
				maps[p] = new Array();
				maps[p].push(i);
			}
		}
		//for(x in maps)
		//	console.log(maps[x]);
	}
	
	/*Call to initialize
	*/
	initialize();
	
	/* Remove hash entries function
	*/
	var emptyHash = function emptyHash(){
		 maps = {};
	};

	
	/*Search Function to match the hashPat and HashValue and also doing pruning to remove obsolete strings
	  Parameter string to be searched entered by user character by character		
	*/
	searchHash = function(string){
		var len = string.length, j = 0;
		if(len == 0){
			emptyHash();
			hashPat = 0;
			initialize();
			return "";
		}
		hashPat = hash(string, len-1, hashPat);
		var result = new Array();
		result[j] = "";
		if(hashPat in maps){
			for(var i = 0; i < maps[hashPat].length; i++){
				result[j] = arrayOfString[maps[hashPat][i]];
				j++;
			}
		}
		else{
			emptyHash();
			return result;
		}
		var requiredKeys = new Array();
		requiredKeys = maps[hashPat].slice(0);
		//console.log(requiredKeys);
		emptyHash();
		for(var i = 0; i < requiredKeys.length; i++){
			var p = hash(arrayOfString[requiredKeys[i]], len, hashPat);
			if(p in maps){
				maps[p].push(requiredKeys[i]);
			}
			else{
				maps[p] = new Array();
				maps[p].push(requiredKeys[i]);
			}
		}
		return result;				
	};
	return{
		/*searchx : function(string){
				return searchHash(string);
		},*/
		search : function(string){
				searchHash('');
				var len = string.length;
				var k = 0;
				for(k = 0; k < len; k++){
					if(k == (len-1)){
						return searchHash(string.substr(0,k+1));						
					}
					else{
						searchHash(string.substr(0,k+1));
					}
				}
		}
	};
};

var arr = new Array();
arr = ["hello", "smile", "how", "are", "you", "blue", "bluegreen" ,"green", "red", "hiver", "river"];
var subHash = new hash(arr);
console.log(subHash.search('hello'));
console.log(subHash.search('blueg'));
console.log(subHash.search('bl'));
console.log(subHash.search('r'));
console.log(subHash.search("ve"));
console.log(subHash.search("ver"));
console.log(subHash.search('hell'));
console.log(subHash.search('ver'));
