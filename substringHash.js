/*Creating object for hash
* Take parameter as string array
*/
var hash = function newHash(arrayOfString){
	hash = function(string, pos, value){
		var p = value, d=10;
		p = (p*d + string.charCodeAt(pos))%997;
		return p;
	};
	var hashValue = new Array();
	var hashPat = 0;
	var initialize = function intialize(){
		for(var i = 0 ; i < arrayOfString.length ; i++){
			hashValue[i] = [];
			hashValue[i][0] = hash(arrayOfString[i], 0, 0);
			hashValue[i][1] = i;	
		}
	}
	initialize();
	searchHash = function(string){
		var len = string.length, j = 0;
		if(len == 0){
			hashPat = 0;
			hashValue = [];
			initialize();
			return "";
		}
		hashPat = hash(string, len-1, hashPat);
		var prunedHash = new Array(), result = new Array();
		result[j] = "";
		for(var i = 0; i < hashValue.length; i++){
			if(hashValue[i][0] == hashPat){
				prunedHash[j] = [];
				prunedHash[j][0] = hashValue[i][0];
				prunedHash[j][1] = hashValue[i][1];
				result[j]  = arrayOfString[hashValue[i][1]];
				j++;
			}
		}
		hashValue = [];
		hashValue = prunedHash.slice(0);
		for(var i = 0; i < hashValue.length; i++){
			hashValue[i][0] = hash(arrayOfString[hashValue[i][1]],len,hashValue[i][0]);
		}
		return result;				
	};
	return{
		search : function(string){
			return searchHash(string);
		}
	};
}

var arr = new Array();
arr = ["hello", "smile", "how", "are", "you", "blue", "green", "red", "hiver", "river"];
var subHash = new hash(arr);
console.log("h : " + subHash.search('h'));
console.log("he : " + subHash.search('he'));
console.log(" : " + subHash.search(''));
console.log("b : " + subHash.search('b'));
console.log("bl : " + subHash.search('bl'));
