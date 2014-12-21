/*
* Class: BST
*
* The binary search tree class.
*
*/
var BST = function () {
/*
* Private Class: Node
*
* A BST node constructor
*
* Parameters:
* leftChild - a reference to the left child of the node.
* key - The key of the node.
* value - the value of the node.
* rightChild - a reference to the right child of the node.
* parent - a reference to the parent of the node.
*
* Note: All parameters default to null.
*/
var results = new Array();
var Node = function (leftChild, key, value, rightChild, parent) {
	return {
		leftChild: (typeof leftChild === "undefined") ? null : leftChild,
		key: (typeof key === "undefined") ? null : key,
		value: (typeof value === "undefined") ? null : value,
		rightChild: (typeof rightChild === "undefined") ? null : rightChild,
		parent: (typeof parent === "undefined") ? null : parent
	};
},
/*
* Private Variable: root
*
* The root nade of the BST.
*/
root = new Node(),
/*
* Private Method: searchNode
*
* Search through a binary tree.
*
* Parameters:
* node - the node to search on.
* key1 - the key1 to search for lower limit
* key2 - the key2 to search for upper limit
*
* Returns:
* void type 
*
*/


searchNode = function (node, key1, key2) {
	if (node.key === null) {
		return;
	}
	var nodeKey =node.key; 
	if (key1 < nodeKey) {
		searchNode(node.leftChild, key1, key2);
	}
	if((key1 <= nodeKey) && (key2 >= nodeKey)){
		results.push(node.value);
	} 
	if (key2 > nodeKey) {
		searchNode(node.rightChild, key1, key2);
	}
	},
/*
* Private Method: insertNode
*
* Insert into a binary tree.
*
* Parameters:
* node - the node to search on.
* key - the key to insert (as an integer).
* value - the value to associate with the key (any type of
* object).
*
* Returns:
* true.
*
*/
insertNode = function (node, key, value, parent) {
	if (node.key === null) {
		node.leftChild = new Node();
		node.key = key;
		node.value = value;
		node.rightChild = new Node();
		node.parent = parent;
		return true;
	}
	var nodeKey = node.key;
	if (key < nodeKey) {
		insertNode(node.leftChild, key, value, node);
	} 
	else if (key > nodeKey) {
		insertNode(node.rightChild, key, value, node);
	} else { // key is equal to node key, update the value
		node.value = value;
		return true;
	}
},
/*
* Private Method: traverseNode
*
* Call a function on each node of a binary tree.
*
* Parameters:
* node - the node to traverse.
* callback - the function to call on each node, this function
* takes a key and a value as parameters.
*
* Returns:
* true.
*
*/
traverseNode = function (node, callback) {
	if (node.key !== null) {
		traverseNode(node.leftChild, callback);
		callback(node.key, node.value);
		traverseNode(node.rightChild, callback);
	}
	return true;
};
return {
/*
* Method: search
*
* Search through a binary tree.
*
* Parameters:
* key1 - the key to search for lower limit.
* key2 - the key to serach for upper limit.
*
* Returns:
* the value of the found node,
* or null if no node was found,
* or undefined if no key was specified.
*
*/
search: function (key1, key2) {
	if (key1 == null || key2 == null) {
		return undefined;
	} else {
		results = [];
		if(key2 > key1)
			searchNode(root, key1, key2);
		else
			searchNode(root, key2, key1);
		return results;
	}
},
 
/*
* Method: insert
*
* Insert into a binary tree.
*
* Parameters:
* key - the key to search for.
* value - the value to associate with the key (any type of
* object).
*
* Returns:
* true,
* or undefined if no key was specified.
*
*/
insert: function (key, value) {
	if (key == null) {
		return undefined;
	} else {
		return insertNode(root, key, value, null);
	}
},
/*
* !!!!!!!!Not in use!!!!!!!!!!!! only for test 
* Method: traverse
*
* Call a function on each node of a binary tree.
*
* Parameters:
* callback - the function to call on each node, this function
* takes a key and a value as parameters. If no
* callback is specified, print is called.
*
* Returns:
* true.
*
*/
traverse: function (callback) {
	if (typeof callback === "undefined") {
		callback = function (key, value) {
			console.log(key + ": " + value);
		};
	} 
	return traverseNode(root, callback);
}
};
};

/*
* Private Class searchIn to create BST of large
* array of objects
* Use : Create a Object of class and pass default 
* params as array of objects and key to be indexed
* 
* Public method search to be initiated for 'where useability' 
* 
* To use this library create an object of searchIn class and use array and paramater to be indexed in BST
* Call public method search to find out the key
*/


var searchIn = function find(obj, key){
	if(obj.length == 0)
		return null;
	if(key == null)
		return null;
	var keyTree = new BST();
	for(var i=0; i < obj.length; i++){
		keyTree.insert(obj[i][key], obj[i]);		
	}
	return{
		search : function(key1, key2){
			return keyTree.search(key1, key2);				
		}	
	};			
};
var arr = new Object();
arr = [
	{Name : "Vikas", Value : "2"},
	{Name: "Simmy", Value : "3"},
	{Name : "Google", Value : "5"},
	{Name : "India", Value : "77"},
	{Name : "Samar", Value : "55"}
];

var searchOp = new searchIn(arr,"Name");
console.log(searchOp.search("India","Google"));
console.log(searchOp.search("Samar", "Vikas"));
