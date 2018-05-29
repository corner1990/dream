##一.数组  
    几乎所有的编程语言都原生支持数组类型,数组是最简单的内存数据结构  

-   创建和初始化数组  
    javaScript声明、创建和初始化数组很简单  
```
    var arr = new Array();  
    var arr = new Array(7);//设置数组的长度 数组的长度会受到限制  
    var arr2 = []; //新建一个空数组  
    var arr3 = [1,2,3];//在创建一个数组的时候直接赋值    

```
-   数组的常见方法  
    1.arr.length; //得到数组的长度  
    2.concat;//可以连接两个或者更多的数组  
    3.every ;对数组中的每一项运行给定的函数，如果该函数每一项都返回true，则返回true； 相当于使用if判断，而数组里的每一项都是一个条件，并且是&&的关系  
    4.filter：给数组中的每一项运行给定的函数，返回该函数结果为true的项组组成的新的数组，需要一个变量接受；  
    5.forEach：对数组中的每一项运行给定的函数、该方法没有返回值  
    6.join；将所有的数组元素连接成一个字符串；  
    7.indexOf；返回一个给定元素的相同元素的数组元素的索引，没有找到则返回-1；从数组的头部开始查找  
    8.lastIndexOf；返回数组中搜索到的的给定元素的索引里最大的值；从数组的尾部开始查找元素  
    9.map；对数组中的每一项运行给定的函数，返回给定参数调用结果组成的数组；  
    10.reverse；颠倒数组中元素的位置，原先数组第一个变成数组最后一个；反之，最后一个变为数组第一个  
    11.slice；传入索引值，将数组里对应索引范围内的元素作为新数组范围;//截取数组  
    12.some；对数组中的每一项运行给定函数，如果任意一个返回true，则返回true；相当于使用if判断，而数组里的每一项都是一个条件，是||的关系  
    13.sort；按照字母的顺序对数组排序。支持传入指定排序方法的函数作为参数；  
    14.toStrong；将数组作为字符串返回  
    15.value；和toStrong类似，将数组作为字符串返回；
-   添加和删除元素  
JavaScript中数组是一个可以修改的对象。常用的方法有：  
push、pop：  从数组的尾部添加或者删除元素  
arr.pop();//删除arr[arr.lengt-1] 元素
shift、unshift  ：从数组的头部开始添加或者删除元素  
arr.unshift(0);//给数组的arr[0] 位置添加元素 ，数组原有的所有元素下标+1  
-   二维数组和多为数组  
    var arr = [[1,2,3,4],[a,b,c,d]];
    想要访问里边的每一个元素的时候需要嵌套循环
```  
    for(var i = 0; i< arr.length; i++){//得到arr数组里下标为i的数组

        for(var j = 0; j < arr[i].length; j++){//第二次循环得到数组arr的二维数组
            console.log(arr[i][j]);
        }
    }
```
-   数组合并   
``` 
var num = 0;    
var arr2 = [-3,-2,-1];
var arr3 = [1,2,3];
var newArr = arr2.cocat(num.arr3);  //[-3,-2,-1,0,1,2,3]
```

-   迭代函数起
有时候我们需要迭代数组中的元素；
```
    //判断数组元素是否是偶数
    function isEven(x){
        console.log(x);
        return (x % 2 == 0) ? true : false;
    }
    var num = [1,2,3,4,5,6,7,8,9,10];

    num.every(isEven); //x, false
    num.some(isEven);//1,2 true 
    var numMap = num.map(isEven); //返回每项遍历的结果做成的数组
    var numFilter = num.filter(isEven);[2,4,6,8] //返回遍历为true的新的数组
```

-   搜索和排序   
    1.自定义排序   
    2.搜索  
      搜索有两个方法：indexOf()方法返回与参数匹配的第一个元素的索引，lastIndexOf()返回参数匹配的最后一个元素的所用，没有找到返回-1；  
      console.log(arr.indexOf(1))  
      console.log(arr.lastIndexOf(2))
```
    arr.sort(function(a,b){return a-b});  

     function compare(a,b){
        if(a < b){
            return -1
        }
        if(a > b){
            return 1
        }
        //a 必须等于
        return 0;
     }
     arr.sort(compare);
     //我们可以对任何对象类型的数组进行排序，也可以创建compareFunction来比较

     var firends = [
        {naem : 'John',age:20},
        {naem : 'Ana',age:22},
        {naem : 'Chirs',age:26},
     ];

     function comparse(a,b){
        if(a.age < b.age){
            return -1
        }
        if(a.age > b.age){
            return 1
        }
        return 0;
     }

     console.log(firends.sort(comparse))
```
  

-   输出数组为字符串  
    常用的方法有toStrong和join  
    arr.toStrong();  
    arr.join('');//可以传入想要使用的分隔符，默认是空

##二.栈  
    栈是一种遵从后进先出(LIFO)原则的有序集合。新添加的或待删除的元素都保存在栈的末尾，称作栈顶，另一端叫做栈底。  
    在栈里，新元素都靠近栈顶，旧元素都接近栈底；就像我们生活中把书一本一本的堆放成一摞；  

-   创建栈  
    创建一类来表示栈  
```
//创建栈
function Stack(){
    //创建数组，保存元素
    var item = [];

    //创建方法
    //添加方法
    this.push = function(elem){//elem 可以是任意类型的元素
        return item.push(elem)
    }
    //返回栈顶的元素
    this.pop = function(){
        return item.pop()
    }
    //判断栈里是否为空
    this.isEmpty = function(){
        return item.length == 0 ? true : false
    }
    //查看栈最后添加的元素
    this.peek = function(){
        return item[item.length-1]
    }
    //清空栈
    this.clear = function(){
        item = [];
    }
    //查看所有的栈里的元素
    this.print = function(){
        return item.toString();
    }
}
```     
-   转换进制(从十进制到二进制)  
现实生活中，我们主要使用十进制。但在计算科学中，二进制非常重要，因为计算机里所有的内容都是用二进制(0和1)表示的。

```
    function transform(decNumber,base){
        //dexNumber 需要转换的数组 number
        //base 需要转换的进制 number
        //stack方法为之前定义的
        var remstack = new Stack();
        var rem = 0;
        binaryString = '';

        while(decNumber > 0){
            rem = Math.floor(decNumber % base);
            remStack.push(rem);
            decNumber = Math.floor(decNumber / base);
        }
        
        //将得到的数组转换为字符串
        while(!remstack.isEmpty()){
            binaryString+=remstack.pop().toString();
        }
        return binaryString;
        //也可以写成如下：
        //binaryString = remstack.reverse();
        //binaryString = binaryString.toString();
    }
    

```  
##三.队列  
    队列是遵循FIFO(First In First Out,先进先出)原则的一组有序项。队列在尾部添加新元素，并从顶部移除元素。
    俗话说的好呀，代码就是人生。在生活中排队也会有插队的现在，代码里也肯定不能少，不过我的代码，规则我说了算。。。。    
    请看我开天辟地：
-   创建队列    
```
    function queue(){
        //enqueun(elem);向尾部添加一个（多个）新项。
        //dequeue(); 移除对了的第一个(排队在最顶端)项，并返回被移除的元素；
        //front();返回对了中的第一个元素(队列最顶端的元素),队列不做任何变动(不移除元素，只返回元素信息)；
        //isEmpty();检查对了是否为空 是的话返回true，不是的话返回false
        //size();返回对了包含元素的个数

        var item = [];
        
        this.enqueue = fucntion(elem){
            item.push(elem)
        }
        
        this.duqueue = function(){
            item.shift()
        }
        
        this.front = function(){
            return item[0]
        }
        
        this.isEmpty = function(){
            return item.length == 0 ? true : false
        }
        
        this.size = function(){
            return item.length
        }
    }
```
-   创建优先队列
```
    //开启我的地盘我做主模式 实现优先出列

    function PriorityQueue(){
        //QueueElement 工厂函数 创建对象，保存元素和优先级别
        var item = [];
        function QueueElement(elem,priority){
            this.elem = elem;
            this.priority = priority;
        }

        this.enqueue = function(elem,priority){
            var quenenElem = new QueueElement(elem,priority);
            if(this.isEmpty()){
                item.push(quenenElem)
            }else{
                var added = false;//开关
                for(var i = 0; i < item.length; i++){
                    if(quenenElem.priority < item[0].priority){
                        item.splice(i,0,quenenElem);
                        added = true;
                        break;
                    }
                }

                if(!added){//上边都不满足时默认添加到最后
                    item.push(quenenElem)
                }
            }
        }

        this.duqueue = function(){
            item.shift()
        }
        
        this.front = function(){
            return item[0]
        }
        
        this.isEmpty = function(){
            return item.length == 0 ? true : false
        }
        
        this.size = function(){
            return item.length
        }
        this.print = function(){
            return item.toString()
        }
    }
```

##四.链表  
    存储多个元素，数组（列表）可能是最常用的数据结构。由于数组结构有一个缺点：从数组的起点或者中间插入或移除项的成本很高，  
    因为需要移动元素链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。  
    每个元素由一个元素本身的节点和一个指向下一个元素的引用(也成为指针或者链表)组成。  

-  创建链表  
```
    function LinkedList(){
            var Node = function(elem){
                this.elem = elem;//添加到列表的值
                this.next = null;//指向列表下一个节点项的指针
            }

            //私有属性
            var length = 0;
            var head = null;
            //像列表尾部添加一个新的项
            this.append = function(elem){
                var node = new Node(elem),
                current;
                
                if(head == null){//列表中的第一个节点
                    head = node;
                }else{
                    current = head;
                    //循环列表，指导找到最后一项
                    while(current.next){
                        current = current.next;
                    }
                    //找到最后一项，将其next赋值为node，建立连接
                    current.next = node;
                }
                length++;
                
            }
            // 2. 从链表中移除元素 根据位置移除指定元素
            this.removeAt = function(position){
                //检查越界
                if(position > -1 && position < length){
                    var current = head,
                    previous,
                    index = 0;
                    //移除第一项
                    if(position === 0){
                        head = current.next;
                    }else{
                        while(index++ < position){
                            previous = current;
                            current = current.next;
                        }

                        //将previous与current的下一项连接起来，跳过current，从而移除它
                        previous.next = current.next;
                    }

                    lenght--;
                    return current.element;
                }else{
                    return null;                                                                                                                                                     
                }

            }
            //任意位置插入元素
            this.insert = function(position,elem){
                // 检查越界
                if(position > -1 && position < length){
                    var node = new Node(elem);//创建新的独享
                    var current = head,
                    previous,
                    index=0;

                    //从第一个位置添加
                    if(position === 0){
                        node.next = head;
                        head = node;
                    }else{
                        while(index++ < position){
                            previous = current;
                            current = current.next;
                        }

                        node.next = current;
                        previous.next = node;
                    }

                    length++;
                    return true;
                }else{
                    return false;
                }
            }
            this.toString = function(){
                var current = head;
                str = '';
                while(current){
                    str += current.elem;
                    current = current.next;
                }

                console.log(str)
            }
            //返回一个元素的下标 没有的话返回-1
            this.indexOf = function(elem){
                current = head;
                index = -1;
                while(current){
                    if(elem === current.elem){
                        return index
                    }
                    index++;
                    current = current.next;
                }
                return -1;
            }
            this.remove = function(elem){}
            this.isEmpty = function(){
                return length == 0 ? true : false;
            }
            this.size = function(){
                return lenght
            }
            this.getHead = function(){
                return head
            }
        }
```
-   双向链表
```
    function doublyLinkedList(){
            function Node(elem){
                this.elem = elem;
                this.prev = null;
                this.next = null;
            }

            //创建私有属性
            var length = 0;
            var head = null;
            var tail = null;//新增

            // 在表最后添加新元素
            this.append = function(elem){
                var node  = new Node(elem),
                current;
                if(head == null){
                    head = node
                }else{
                    current = head;
                    while(current.next){
                        current.prev = current; 
                        current = current.next;
                    }
                    //找到最后一项  添加元素
                    current.next = node;
                    node.prev = current;
                }
                length++;
            }
            // 在任意位置添加新元素
            this.insert = function(position,elem){
                //检查是否超出边界
                if(position > -1 && < length){
                    var node = new Node(elem),
                    current = head,
                    previous,
                    index=0;

                    if(position === 0){//在第一个位置添加
                        if(!head){
                            head = node;
                            tail = node;
                        }else{
                            node.next = current;
                            current.prev = node;
                            head = node;
                        }
                    }else if(position === length){
                        current = tail;
                        current.next = node;
                        node.prev = current;
                        tail = node;
                    }
                }else{
                    while(index++ < position){
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.prev = node;

                    current.prev = node;//新增
                    node.prev = previous;//新增

                    length++;
                    return true;
                }
                return false;
            }
            //从任意位置删除
            this.removeAt = function(position){
                //判断是否超界
                if(position > -1 && position < length){
                    var current = head;
                    previous,
                    index = 0;
                    //移除第一项
                    if(position == 0){
                        head = current.next;
                        head.prev = null;
                    }else if(position === length){
                        current = tail;
                        tail = current.prev;
                        tail.next = null;
                    }else{
                        while(index++ < position){
                            previous = current;
                            current = current.next;
                        }

                        //找到位置  删除元素
                        // 将previous与current的下一项连接起来，跳过current，从而移除它
                        previous.next = current.next;
                        current.next.prev = previous;
                    }

                    length--;
                    return current.elem;
                }else{
                    return null;
                }
            }
            this.toString = function(){
                var current = head;
                str = '';
                while(current){
                    str += current.elem;
                    current = current.next;
                }

                console.log(str)
            }
            //返回一个元素的下标 没有的话返回-1
            this.indexOf = function(elem){
                current = head;
                index = -1;
                while(current){
                    if(elem === current.elem){
                        return index
                    }
                    index++;
                    current = current.next;
                }
                return -1;
            }
            this.isEmpty = function(){
                return length == 0 ? true : false;
            }
            this.size = function(){
                return lenght
            }
            this.getHead = function(){
                return head
            }
        }
```
-   循环列表  
    循环列表和链表一样，只有单项引用，也可以像双向列表一样以后双向引用；循环列表和链表之间唯一的区别在于，最后一个元素指向下一个元素的指针(taile.next)不是引用null，而是指向第一个元素(head)  

##五.集合  
    集合是由一组无须且唯一(即不能重复)的项目组成。  
    也可以假想集合是一种没有重复元素，没有顺序概念的数组。  

-   创建集合
```
//集合使用对象而不是用数组
//has 检查是否从在这个属性
//add(value) 向集合添加一个新项
//remove(value) 从集合移除一个值 
//clear() 移除集合中所有的元素
//size() 返回集合所包含的元素数量，类似于数组的length
//values() 返回一个包含集合中所有值得数组
function set(){
    var item = {};

    this.has = function(val){
        return val in item
    }
    this.add = function(val){
        if(!this.has(val)){
            item[val] = val;
            return true;
        }
        return false;
    }
    this.remove = function(val){
        if(this.has(val)){
            delete item[val];
            return true;
        }
        return false;
    }
    this.clear = function(){
        item = {}
    }
    this.size = function(){
        return Object.keys(item).length;
    }
    this.sizeLeagcy = function(){
        var cunt = 0;
        for(var prop in item){
            if(item.hasOwnProperty(prop)){
                cunt++;
            }
        }
        return cunt;
    }
    this.values = function(){
        return Object.keys(item);
    }
    this.valueLegacy = function(){
        var keys = [];
        for(var key in item){
            key.push(key);
        }
        return keys;
    }
}
```  
-   集合操作  
```
//并集 集合a和b的并集
this.union = function(){
                var unionSet = new Set();
                var val = this.values();
                for(var i=0; i< val.length; i++){
                    unionSet.add(val[i])
                }
                //另外一个集合
                var val = arguments[0].values();
                for(var i=0; i< val.length; i++){
                    unionSet.add(val[i])
                }
                return unionSet;
            }
//交集 
this.intersection = function(){
    var intersection = new Set();
    var val = this.values();
    for(var i=0;i<val.length; i++){
        //查找共同的项
        if(arguments[0].hasOwnProperty(val[i])){
            intersection.add(val[i])
        }
    }
    return intersection;
}

//差集 集合a和b的差集
this.differrence = function(other){
                    var differrence = new Set();
                    var val = this.values();
                    for(var i = 0; i < val.length; i++){
                        if(!other.has(val[i])){
                            differrence.add(val[i])
                        }
                    }
                    return differrence;
                }

//子集  判断a是不是b的子集
his.subSet = function(other){
                    var differrence = new Set();
                    var val = this.values();
                    if(this.size() > other.size()){
                        return false
                    }else{
                        for(var i=0;i<val.length;i++){
                            if(!other.has(val[i])){
                                return false
                            }
                        }
                    }
                    return true
                }
``` 
##六.字典和散列表  
    集合、字典、三列表可以存储不重复的值。  
    在集合中，我们感兴趣的是每个值的本身，并把它当做主要元素，在字典中，  
    我们用[键：值]的形式来存储数据。  在字典中，存储的是[键，值]对，其中简明使用来查询特定元素的。  
    字典和集合很相似，集合一个[值，值]的形式存储元素，字典则是以[键，值]的形式来存储元素；字典也可以称作为映射。

-   创建一个字典  
```
    //ECMAScript包含了一个map类的实现，就是我们所说的字典。
    //这是栗子 有问题 不要问 自己理解
    // set(key,val) ：向字典中添加新元素  
    // remove(key) ：通过使用关键字来从字典中移除键值对应的数据
    // has(key) ：如果通过某个键值存在于这个字典中，则返回true，否则返回false
    // get(key) ：通过键值查找特定的数值并返回
    // clear() ：将这个字典中所有的值清空、
    // size() ：返回字典包含的元素数量，类似于数组的length属性
    // keys()：键字典包含的所有键名以数组类型的形式返回
    // values()：键字典包含的所有数值以数组类型的形式返回
    
    function Dictionary(){
        var item = [];

        this.has = function(key){
            return key in item
        }

        this.set = function(key,val){
            item[key] = val
        }

        this.remove = function(key){
            if(this.has(key)){
                delete item[key];
                return true
            }
            return false
        }

        this.get = function(key){
            return this.has(key) ? item[key] : undefined
        }

        this.values = function(){
            var value = [];
            for(var key in item){
                value.push(item[key])
            }
            return value
        }

        this.clear = function(){
            item = {}
        }

        this.size = function(){
            return Object.keys(item).length
        }

        this.getItems = function(){
            return item
        }

        this.keys = function(){
            return Object.keys(item)
        }
    }
```  

-   散列表   
>散列算法的作用是尽可能快的在数据结构中找到一个值。  

```
//创建一个散列表
/创建一个散列表
//put(key,val) ：向散列表增加一个新的项（也能更新散列表）
//remove(key) ：根据键值从散列表中移除值
//get(key) : 返回根据键值索引道德特定的值
function HashTable(){
    var table = [];
    var num = 0;
    // 私有方法 根据key获取到ASCII编码得到一个数字
    var loseloseHashCode = function(key){
        var hash = 0;
        for(var i = 0; i < key.length; i++){
            hash += key.charCodeAt(i); 
        }
        return hash % 37
    }
    var num = 0;
    this.put =function(key,val){
        var position = loseloseHashCode(key);
        table[position] = val;
        console.log(position +'-'+key,'put',num++,table);
    }

    this.get = function(key){
        return table[loseloseHashCode(key)] ? table[loseloseHashCode(key)] : undefined
    }

    this.remove = function(key){
        table[loseloseHashCode(key)] = undefined
    }

    this.print = function(){
        for(var i=0; i<table.length; i++){
            if(table[i] !== undefined){
                console.log(i +':'+table[i])
            }
        }
    }

    this.val = function(){
        return table
    }
}

var hash = new HashTable();
hash.put('Gandalf','gandaiomnenkjlkdjfa');
hash.put('John','gandaiodaasdgaf');
hash.put('Tyrion','Trionhellowroal');
hash.put('Aaron','AAronhellowroal');
hash.put('Donnie','Donnienhellowroal');
hash.put('Ana','Anaienhellowroal');
hash.put('Jonathan','Jonathanenhellowroal');
hash.put('Jamie','Jaminthanenhellowroal');
hash.put('Sue','Suenthanenhellowroal');
hash.put('Mindy','Mindythanenhellowroal');
hash.put('Paul','Pauldythanenhellowroal');
hash.put('Nathan','Nathan@qq.com');
```

-   散列表何散集合  
>   散列表和散列映射是一样的。在一些编程语言中会有一种叫做散列集合的实现。  
>   散列集合由一个集合构成，但是插入，移除或者获取元素时，使用的是散列函数  
>   和集合相似，散列集合只存储唯一的不重复的值  

-   处理散列表中的冲突  
>   某些特殊情况下，一些键会有相同的散列值、不同的值在散列表中对应相同的位置的时候没我们称其为冲突。处理冲突的方法有几种：分离链接，线性探查，双散列法  
>   1.分离链接
```
 //对于分离链接和线性探查来说，只需要重写put，get，和remove。
//为了实现一个使用了分离链接的HashTable实例，需要一个新的辅助类来表示将要加入LinkedList实例的元素
var ValuePair = function(key,val){
this.key = key;
this.val = val;
this.toString = function(){
    return '['+this.key+'-'+this.val+';'
}

this.put = function(key,val){
    var position = loseloseHashCode(key);

    if(table[position] !== undefined){
        table[position] = new LinkedList()
    }

    table[position],.append(new ValuePair(key,val))
}

this.get = function(key){
    var position = loseloseHashCode(key);

    if(table[position] !== undefined){
        //遍历链表寻找键/值
        var current = table[position].getHead();
        while(current.next){
            if(current.element.key == key){
                return currten.element.value
            }

            current = current.next;
        }

        //检查元素在链表第一个或者最后一个节点的情况
        if(current.element.key === key){
            return current.element.value
        }
    }

    return undefined
}

this.remove = function(key){
    var position = loseloseHashCode(key);

    if(table[position] !== undefined){
        var current = table[position].getHead();
        while(current.next){
            if(current.elem.key === key){
                table[position].remove(current.elem);
                if(table[position].isEmpty()){
                    table[position] = undefined
                }

                return true
            }
        }

        //检查是否为第一个或者最后一个元素
        if(current.elem.key === key){
            table[position].remove(current.elem);
            if(table[position].isEmpty()){
                    table[position] = undefined
                }

                return true
        }
    }
    return false
}
```  

>   2.线性检查
```
//当想向表中某个位置添加一个新元素是，如果索引为index的位置已经被占用了，  
就尝试index—+1的位置，如果index+1的位置也被占用了 就尝试index+2....依次类推

var ValuePair = function(key,val){
                this.key = key;
                this.val = val;
                this.toString = function(){
                    return '['+this.key+'-'+this.val+';'
                }

                this.put = function(key,val){
                    var position = loseloseHashCode(key);

                    if(table[position] !== undefined){
                        table[position] = new ValuePair(key,val)
                    }else{
                        var index = ++position;
                        while(table[index] != undefined){
                            index++;
                        }

                        table[index] = new ValuePair(key,val);
                    }
                }

                this.get = function(key){
                    var position = loseloseHashCode(key);

                    if(table[position] !== undefined){
                        if(table[position].key === key){
                            return table[position].key
                        }else{
                            var index = ++position;
                            while(table[index] == undefined || table[index].key != key){
                                index++
                            }

                            if(table[index].key == key){
                                return  table[index].key
                            }
                        }
                    }

                    return undefined
                }

                this.remove = function(key){
                    var position = loseloseHashCode(key);

                    if(table[position] !== undefined){
                        if(table[position].key == key){
                            table[position].key = undefined
                        }else{
                            var index = ++position;
                            while(table[index] == undefined || table[index] != key){
                                index++
                            }

                            if(table[index] === key){
                                table[position].key = undefined
                                return true
                            }
                        }
                    }
                    return false
                }
            }

``` 
-   创建更好的散列函数
>   插入和检索元素的时间(即性能),当然也包括较低的冲突可能性，

```
//这是一个比较推荐的散列函数之一
var djb2HashCode = function(key){
                    var Hash = 5381;//质数
                    for(var i=0;i<key.length;i++){
                        Hash += Hash * 33 + key.charCodeAt(i);
                    }
                    return Hash % 1031
                }

//它包括初始化一个hash变量并赋值为质数，然后迭代参数key，将Hash与33相乘（用来当做一个魔力数），并和迭代的ASCII编码相加
```

##七.树  
    树是一种分层数据的抽象模型。生活中的栗子有：家谱，公司组织架构什么的...自己脑补好了。
-   相关术语   
>   节点：一个树包含一系列存在父子关系的节点，每个节点(除了顶部的第一个节点)，以及一个及零个或者多个子节点   
子树：子树由节点和他的后代构成  
深度：节点的深度取决于他的祖先节点的数量。有几个祖先节点，深度就为几  

 -  二叉树和二叉搜索树   
 >  二叉树：最多有两个子节点，一个是左侧子节点，一个是右侧子节点；这些定义能够让我们写出更高效的向/树中插入。查找和删除节点的算法。二叉树计算在计算机科学中应用非常广泛。  
 >  二叉搜索树：它只允许你在左侧节点存储(比父节点)小的值，在右侧节点存储(比父节点)大(或者等于)的值
 
 ```
 // 这里就是栗子啦
 function BinarySearchTree(){
        // insert(key) 向树种插入一个新的键
        // search(key) 在树中查找一个键，存在的话返回这个节点，不存在的话返回false
        // inOrderTraverse 通过中序便利方式遍历所有节点
        // preOrderTraverse 通过先序遍历方式遍历所有节点  
        // postOrderTraverse  通过后续遍历方式遍历所有节点  
        // min 返回树中最小的键/值
        // max 返回树中最大的值
        // remvoe(key) 从树中移除某个键
        function Node(key){
            this.key = key;
            this.left = null;
            this.right = null;
        }

        var root = null;
        this.insert = function(key){
            var node = new Node(key);

            if(root === null){
                root = node
            }else{
                insertNode(root,node)
            }
        }

        var insertNode = function(node,newNode){
            if(newNode.key < node.key){
                if(node.left == null){
                    node.left = newNode
                }else{
                    insertNode(node.left,newNode);
                }
            }else{
                if(node.right == null){
                    node.right = newNode
                }else{
                    insertNode(node.right,newNode)
                }
            }
        }
    
        this.inOrderTraverse = function(callback){
                inOrderTraverseNode(root,callback)
            }

        var inOrderTraverseNode = function(root,callback){
            if(root !== null){
                inOrderTraverseNode(root.left,callback);
                callback ? callback(root.key) : ''; 
                inOrderTraverseNode(root.right,callback);
            }
        }
   
        this.preOrderTraverse = function(node,callback){
            preOrderTraverseNode(root,callback);
        }

        function preOrderTraverseNode(node,callback){
            if(node !== null){
                console.log(node.key,'pre');
                preOrderTraverseNode(node.left,callback);
                preOrderTraverseNode(node.right,callback);
            }
        }

        this.postOrderTraverse = function(callback){
                postOrderTraverseNode(root,callback);
            }

        function postOrderTraverseNode(node,callback){
            if(node !== null){
                postOrderTraverseNode(node.left,callback);
                postOrderTraverseNode(node.right,callback);
                console.log(node.key,'post');
            }
        }
    }
 ```

-  树的遍历  
>  访问数的每个节点并对他们进行某种操作。  
```
//1.中序遍历  终须遍历是一种以上行顺序访问BST所有节点的遍历方式、
// 也可以说事从小到大的顺序访问所有的节点。中序遍历的应用就是对数进行排序操作

    this.inOrderTraverse = function(callback){
            inOrderTraverseNode(root,callback)
        }

    var inOrderTraverseNode = function(root,callback){
        if(root !== null){
            inOrderTraverseNode(root.left,callback);
            callback ? callback(root.key) : ''; 
            inOrderTraverseNode(root.right,callback);
        }
    }

// 2.先序遍历  先序遍历是优先于后代节点顺序访问每个节点的。

this.preOrderTraverse = function(node,callback){
        preOrderTraverseNode(root,callback);
    }

    function preOrderTraverseNode(node,callback){
        if(node !== null){
            console.log(node.key,'pre');
            preOrderTraverseNode(node.left,callback);
            preOrderTraverseNode(node.right,callback);
        }
    }

// 3.后续遍历  先访问后代节点，在访问节点本身。后续遍历的一种应用是计算一个木了和它子目录中所有文件所占空间的大小。

this.postOrderTraverse = function(callback){
        postOrderTraverseNode(root,callback);
    }

    function postOrderTraverseNode(node,callback){
        if(node !== null){
            postOrderTraverseNode(node.left,callback);
            postOrderTraverseNode(node.right,callback);
            console.log(node.key,'post');
        }
    }
``` 
-   搜索树中的值  
    最大值，最小值，指定值

```
this.min = function(){
        return minNode(root);
    }

var minNode = function(node){
    if(node){
        while(node && node.left !== null){
            node = node.left
        }
        return node.key
    }
    return false
}

this.max = function(){
    return maxNode(root)
}

var maxNode = function(node){
    if(node){
        while(node && node.right !== null){
            node = node.right
        }
        return node.key
    }

    return false
}

this.search = function(key){
    return searchNode(root,key);
}

var searchNode = function(node,key){
    if(node === null){
        return false
    }

    if(key < node.key){
        return searchNode(node.left,key)
    }else if(key > node.key){
        return searchNode(node.right,key)
    }else{
        return true
    }
}
```

-   实现删除一个元素

```
this.remove = function(key){
removeNode(root,key);
}

var removeNode = function(node,key){
if(node === null){
    return false
}

if(key < node.key){
    node.left = remvoeNode(node.left,key);
    return node
}else if(key > node.key){
    node.right = remvoeNode(node.right,key);
    return node
}else{
    //第一种情况 键等于node.key
    if(node.left === null && node.right === null){
        node = null;
        return node
    }
    //第二种情况 一个子节点的节点
    if(node.left == null){
        node = node.right;
        return node;
    }else if(node.right === null){
        node = node.left;
        return node;
    }

    //第三种情况 有两个子节点
    var aux = findMinNode(node.right);
    node.key = aux.key;
    node.right = removeNode(node.right,aux.key);
    return node;
}

var findMinNode = function(node){
    if(node){
        while(node && node.left !== null){
            node = node.left
        }
        return node.key
    }
    return false
}

//BST存在一个问题：取决于所添加的节点数，树的一条边可能会很深，
//也就是说输的一条分支可能会有很多层，而其他分支却只有几层。
//这会导致在某条边上添加、移除、搜索某个节点时引起的一些性能问题。
//为了解决一勺那个问题，有一种树叫做阿德尔森-威尔斯和兰迪斯(AVL树)，
//AVL树是一种自然平衡的二叉搜索树，意思是任何一个节点左右两侧子树的高度之差为1；
//这种树会在添加或者移除节点时尽量试着称为一种完整的树。
```
##八.图  
    图是网络结构的抽象模型、图示一组由边线连接的节点(或定点)，学习图是很重要的，因为任何二元关系都可以用图来表示、  
    一个图G = (V,E);两个元素组成 V：一组顶点；E：一组边；  
    由一条边连接在一起的定点称为相邻定点。  
    一定点的度是其相邻顶点的数量。  
    简单的路径要求不包含重复的定点。

-   有向图和无向图  
>   图可以是五香的(边没有方向)或者是有向的、 如果图中每个顶点间在双向上都存在路径，则该图是强连通的。  
>   图还可以是未加权的或者加权的。
>   图的表示  
>   从数据结构的结构来说，我们有多中方式來表示图。在所有的表示法中，不存在绝对的正确方式，图的正确方式取决于待解决的问题和图的类型。 

-   邻接矩阵  
>   图最常见的实现是邻接矩阵。每个节点都和一个整数相关联，该整数将作为数组的索引。我们用一个二维数组来表示顶点之间的链接。

-   邻接表    
>   邻接表有图中的每个顶点的相邻定点列表所组成。  
>   待续  

## 九.排序和算法  

-   排序和算法  
>   对给定信息得先排序在搜索  
```
//简单的数据结构
var arrList = function(){
    var item = [];
    this.insert = function(elem){
        item.push(elem)
    }

    //冒泡排序
    this.bubbleSort = function(){
        var length = item.length;
        for(var i=0;i<length;i++){
            for(var j=0;j<length-1;j++){
                if(item[i] > item[j+1]){
                    swap(j,j+1);
                }
            }
        }
    }

    var swap = function(index1,index2){
        var aux = item[index1];
        item[intex1] = item[intex2]; 
        item[intex2] = aux; 
    }

    //冒泡排序改进
    this.modifiedBubbleSort = function(){
        var length = item.length;
        for(var i=0;i<length;i++){
            for(var j=0;j<length-1-i;j++){
                if(item[i] > item[j+1]){
                    swap(j,j+1);
                }
            }
        }
    }

    //选择排序
    //选址排序算法是一种原址比较排序算法。选择排序的大致思路是找到数据中最小值并将其放在第一位，接着找到第二小的值刚到第二位
    this.selectSort = function(){
        //创建变量 length 下标变量indexMin
        var length = item.length,
        indexMin;
        for(var i=0;i<length;i++){
            //首次设置为i
            indexMin = i;
            for(var j=i;j<length;j++){
                if(item[indexMin] > item[j]){
                     indexMin = j;
                }
            }
            if (i !==indexMin){
                swap(i,indexMin)
            }
        }
    }

    //插入排序
    //插入排序每次排一个数组项，以此方式构建最后的数组
    this.insertionSort = function(){
        var length = item.length,
        j,
        temp;
        for(var i=1;i<length;i++){
            j=i;
            temp = item[i];
            while(j > 0 && item[j-1] > temp){
                item[j] = item[j-1];
                j--;
            }
            item[j] = temp;
        }
    }

    //归并排序
    //归并排序第一个可以被实际使用的排序算法。其思想是将原始数据切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。
    this.mergeSort = function(){
        item = merageSortRec(item);
    }

    var merageSortRec = function(item){
        var length = item.length;
        if(length === 1){
            return item;
        }
        var mid = Math.floor(length/2);
        var left = item.slice(0,mid);
        var right = item.slice(mid,length);
        return merge(merageSortRec(left),merageSortRec(right));
    }

    var merge = function(left,right){
        var result = [];
        il = 0;
        ir = 0;
        while(il < left.length && ir < right.length){
            if(left[il] < right[ir]){
                result.push(left[il++])
            }else{
                result.push(right[il++])
            }
        }

        while(il < left.length){
            result.push(left[il++])
        }

        while(ir < right.length){
            result.push(right[il++])
        }

        return result;
    }

    //快速排序
    //快速排序是很常用的算法之一。他的算法和归并排序一样，快速排序也使用分之的方法，
    //将原始数组分割为较小的数组(但它没有像归并排序那样将他们分隔开)
    this.quickSort = function(){
        quick(item,0,item.length-1)
    }

    var quick = function(item,left,right){
        var index;
        if(item.length > 1){
            index = partition(item,left,right)
        }
        if(left < index-1){
            quick(item,left,index - 1)
        }
        if(index < right){
            quick(item,index,right)
        }
    }

    var partition = function(item,left,right){
        var pivot = item[Math.floor(right+left)/2],
        i = left,
        j = right;

        while(i <= j){
            while(item[i] < pivot){
                i++
            }
            while(item[j] < pivot){
                j--
            }

            if( i <= j){
                swapQuickSort(item,i,j)
            }
        }

        return i
    }
    
    var swapQuickSort = function(item,left,right){
        var aux = item[left];
        item[right] = item[left];
        item[right] = aux;
    }

    //搜索算法
    //1.顺序搜索
    //顺序搜索是最基本的搜索算法，它的机制是，将每一个数据结构中的元素和我们要找的元素作比较。
    //顺序搜索是最低效的搜索算法。
    this.serquentialSearch = function(elem){
        var length = item.length;
        for(var i=0;i<length;i++){
            if(elem == item[i]){
                return i;
            }
        }
        return -1;
    }

    //2.二分搜索
    //二分搜索的算法原理和猜数字游戏类似，就是那个有人说我正在向着一个1到100的数字的游戏，我们每回应一个数字，那个人就说高了，低了，还是对了。
    //这个算法要求被搜索的数据结构已排序。实现步骤为：
    //选择数组中间的值
    //如果选中的值是待搜索的值，那么算法执行完毕(得到了自己想要的)
    //如果搜索之比选中值小，则返回步骤一并在选中值中左侧的子数组中寻找
    //如果搜索值比选中值要大，则返回步骤一并在选中值右边的子数组中寻找。
    //
    
    this.binarySearch = function(elem){
        this.quickSort();
         var low = 0,
         height = item.length-1,
         mid,element;

        while(low <= height){
            mid = Math.floor(item.length/2);
            element = item[mid];
            if(element < elem){
                low = mid+1
            }else if(element > elem){
                height = mid-1;
            }else{
                return mid
            }
        }

        return -1;  
    }
}
```