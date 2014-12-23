function Trie(parent, prev, key) {
    if (key !== void 0)
        this.key = key;
    if (prev)
        prev.next = this;
    else if (parent)
        parent.child = this;
}

Trie.prototype.put = function(name) {
    var i = 0, t = this, len = name.length, prev, parent;
    down : while (t.child) {
        parent = t;
        t = t.child;
      
        while (t.key != name[i]) {
            if (!t.next) {
                prev = t;
                t = parent;
                break down;
            }
            t = t.next;
        }
        if (++i > len) {
            return;
        }
    }
  
    t = new this.constructor(t, prev, name[i]);
    while (++i <= len)
        t = new this.constructor(t, null, name[i]);
    t.key = "";
};

function traverseTrie(t, results, j){
	var traversedString = "";
	if(t){
		if(t.next){
				traversedString = results[j];
				traverseTrie(t.next, results, j);
				j = results.length;
				results[j] = "";
		}
		results[j] = traversedString + results[j] + t.key;
		traverseTrie(t.child, results, j);
	}
}

Trie.prototype.get = function(name) {
    var i = 0, j = 0, t = this.child, len = name.length, results = new Array();
    results[j] = "";
    while (t) {
        if (t.key == name[i]) {
	    results[j] = results[j]  + t.key;
            if (i+1 == len){
		traverseTrie(t.child, results, j);
                return results;
	    }
            t = t.child;
            ++i;
        } else {
            t = t.next;
        }
    }
    results[j] = "";
    return results;
};


//Tester//
var dict = new Trie();
dict.put("true");
dict.put("truck");
dict.put("trowel");
dict.put("hat");
dict.put("halt");
dict.put("ham");
dict.put("hammer");
dict.put("halt");
console.log("t:", dict.get("ta"));
console.log("tr:", dict.get("tr"));
console.log("ham:", dict.get("ham"));
