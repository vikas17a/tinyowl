/*
* File: bst.js
*
* A pure JavaScript implementation of a binary search tree.
*
*/
 
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
* key - the key to search for (as an integer).
*
* Returns:
* the value of the found node,
* or null if no node was found.
*
*/
searchNode = function (node, key) {
	if (node.key === null) {
		return null; // key not found
	}
	var nodeKey =node.key;
 
	if (key < nodeKey) {
		return searchNode(node.leftChild, key);
	} 
	else if (key > nodeKey) {
		return searchNode(node.rightChild, key);
	     } 
	     else { // key is equal to node key
		return node.value;
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
* key - the key to search for.
*
* Returns:
* the value of the found node,
* or null if no node was found,
* or undefined if no key was specified.
*
*/
search: function (key) {
	if (key == null) {
		return undefined; // key must be a number
	} else {
		return searchNode(root, key);
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

var searchIn = function find(obj, key){
	var keyTree = new BST();
	for(var i=0; i < obj.length; i++){
		keyTree.insert(obj[i][key], obj[i]);		
	}
	//keyTree.traverse(function (key, value) {
	//	console.log("The value of " + key + " is " + value + ".");
	//});
	return{
		search : function(key){
			return keyTree.search(key);				
		}	
	};			
};

var arr = new Object();
arr = [
	{Name : "Vikas", Value : "2"},
	{Name: "Simmy", Value : "3"}
]
var searchOp = new searchIn(arr,"Value");
console.log(searchOp.search("Simmy"));
