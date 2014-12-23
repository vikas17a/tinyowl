//Creating object for Trie
var Trie = function Trie(){
	/*Creating Node constructor to create node
 	 * Parameter to be passed are parent, sibling and key
	*/
	var Node = function(parent, sib, key){
		//If this is a sibling
		if(sib){
			sib.next = this;
		}
		//If this is a child of parent
		else if(parent){
			parent.child = this;
		}
		if(key != null){
			this.key = key;
		}
	},
	//Creating root
	rootNode = new Node();
	/*Insert function for this trie
	 *Parameter to be passed are root of trie and string to be inserted
   	*/
	insert = function(root, value) {	
		var i=0, length = value.length-1, sib, parent, flag = true;
		while(root.child){
			parent = root;
			root = root.child;
			while(root.key != value[i]){
				sib = root;
				root = root.next;
				if(!root){
					flag = false;
					break;
				}	
			}
			if(!flag)
				break;
			i++;
		}
		if( i <= length){
			while(i <= length + 1){
				if(flag){	
					newNode = new Node(root, null, value[i]);
					root = newNode;
				}
				else{
					newNode = new Node(parent, sib, value[i]);
					root = newNode;
					flag = true;
				}
				i++;
			}
			newNode.key = "";	
		}
	},
	/* Traversal function for creating array of strings to be
	*  Parameters to be passed node from which we will traverse the tree, results array where we put results 
	*  and current index where to store in results array
	*/
	traverse = function(node, results, j){
			var traversedString = "";
			if(node){
				if(node.next){
					traversedString = results[j];
					traverse(node.next, results, j);
					j = results.length;
					results[j] = "";
				}
				results[j] = traversedString + results[j] + node.key;
				traverse(node.child, results, j);
			}
	}
	/* Seach function which will exactly perform search results on tree
	*  Parameters are root of tree and string to be searched
	*  Returns array of String
	*/
	search = function(root, string){
		var i=0, j=0, length = string.length - 1, results = new Array(), flag = true;
		results[j] = "";
		while(root.child){
			root = root.child;
			while(root.key != string[i]){
				root = root.next;
				if(!root){
					flag = false;
					break;
				}
			}
			if(!flag){
				results[j] = "";
				return results;
			}
			else
				results[j] = results[j] + root.key;
			i++;
			if(i > length){
				traverse(root.child, results, j);
				return results;	
			}
		}
	};
	return{
		insertString : function(string){
				if(string != null){
					//node = root;
					insert(rootNode, string);
					//console.log(rootNode.child);
				}
				else{
					return null;
				}
			},
		searchString : function(string){
				if(string != null){
					//node = root;
					return search(rootNode, string)
				}
				
			}
	};
		
};

var createTree = function treeSearch(strings){
	//console.log(strings.length);
	var Tree = new Trie();
	//console.log(strings.length);
	len = strings.length;
	//console.log(len);
	for(var i = 0; i < len; i++){
		Tree.insertString(strings[i]);
	}
	return{
		search : function (string){
			return Tree.searchString(string);
		}
	};
};

var strings = new Array();
strings = ["blue", "green", "red", "bluegreen", "bluered", "bluerose"];
var searchSub = new createTree(strings); 
console.log(searchSub.search('tes'));
