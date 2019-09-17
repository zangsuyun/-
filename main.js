//判定某个字符串特定字符的个数
String.prototype.getInCludes = function(x) {
  return this.split(x).length - 1;
};

//创建一个函数，给定页面上的DOM元素，将访问元素本身及其后代，
//对于每个访问的元素，函数应该将元素传递给提供的回调函数

//一个DOM元素，一个回调函数，经典的深度优先搜索算法
function Traverse(p_element, p_callback) {
  p_callback(p_element);
  var list = p_element.children;
  for (var i = 0; i < list.length; i++) {
    Traverse(list[i], p_callback); //  recursive  call
  }
}

//let a = a; 在运行时候出现了什么问题？为什么？
//分为两个阶段：
//1.在预编译阶段，将let声明的变量放到暂存性死区TDZ中，TDZ=[a]
//2.当let声明语句结束的时候，这里的结束指：当 let a = a执行完事后，会把a从TDZ中拿出
//但是let a = a执行的时候，右边赋值的a还在TDZ中，所以报错，为声明就使用的错误。

//下面两个函数的区别 ，原因是js中分号在技术上是可选的事实有关，return语句的行没有其他内容后自动插入分号
function foo1() {
  return {
    bar: "hello" //返回一个对象
  };
}

function foo2() {
  return {
    //这个花括号应该在下面，自动格式下不去
    bar: "hello" //返回 undefined
  };
}

//js时间和事件  1 4 3 2
(function() {
  console.log(1);
  setTimeout(function() {
    console.log(2);
  }, 1000);
  setTimeout(function() {
    console.log(3);
  }, 0);
  console.log(4);
})();

//如何避免 typeof bar ===“object” 来确定bar是否是一个对象有什么潜在的缺陷？如何避免
// null 也为对象
// console.log(bar !== null && bar.constructor === "object");

//var a=b=3 相当于 var a=b ； b=3 b因为不在var后面是全局作用域
(function() {
  var a = (b = 3);
})();
//console.log(a); //undefined
console.log(b); //3

function Foo() {
  getName = function() {
    //赋值语句，
    alert(1);
  };
  return this;
}
Foo.getName = function() {
  alert(2);
};
Foo.prototype.getName = function() {
  alert(3);
};
var getName = function() {
  alert(4);
};

function getName() {
  alert(5);
}
//输出下面结果
// Foo.getName(); //2  访问静态属性 Foo.getName
// getName(); //4  直接调用 getName函数，函数声明提升，覆盖alert(5)
// Foo().getName(); //1   先执行Foo函数，原型属性优先，替换alert(4)
// getName(); //1  外层作用域getName函数被上一句修改
// new Foo.getName(); //2  js运算符优先级问题，getName作为构造函数执行
// new Foo().getName(); //3  等于(new Foo()).getName() 执行Foo返回this实例化新对象，新对象没有属性，在原型对象(prototype)中找到getName属性
// new new Foo().getName(); //3  等于 new((new Foo()).getName)() 先初始化Foo实例化对象，然后将其原型上的getName函数作为构造函数再次new

function a() {
  y = function() {
    X = 2;
  };
  return function() {
    var x = 3;
    y();
    console.log(this.x);
  }.apply(this, arguments);
}
a(); //得到什么。为什么？
console.log(X); //2
// console.log(x); //undefined

var length = 10;
function fn() {
  console.log(this.length);
}
var obj = {
  length: 5,
  method: function(fn) {
    // fn(); //相当于无
    arguments[0](); //arguments调用，this指向argumens，length为2
  }
};
obj.method(fn, 1);

//冒泡排序
var arr = [2, 6, 5, 8, 6, 3, 9];
function bubbleSort(arr) {
  var length = arr.length;
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < length - i - 1; j++) {
      var temp = 0;
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
var arr2 = bubbleSort(arr); //小->大
arr2.reverse();
console.log(arr2);

function fun(n, o) {
  console.log(o);
  return {
    fun: function(m) {
      return fun(m, n);
    }
  };
}
var a = fun(0); //undefined
a.fun(1); //等于fun(1,0) 0
a.fun(2); //等于fun(2,0) 0
a.fun(3); //等于fun(3,0) 0
var b = fun(0) //undefined
  .fun(1) //等于fun(1,0) 0
  .fun(2) //等于fun(2,1) 1
  .fun(3); //等于fun(3,2) 2
var c = fun(0).fun(1); //undefined //等于fun(1,0) 0
c.fun(2); //等于fun(2,1) 1
c.fun(3); //等于fun(3,1) 1

//bind 返回一个带有新this指向的函数，但是只能改一次

//instanceof 原理
// A instanceof B 检测B的prototype是否存在于参数A的原型链上
//简单理解就是沿着A的_proto_跟B的prototype寻找，如果找到同一个引用，返回true，否则返回false

//不是所有的事件都可以冒泡 如：blur，focus，load，unload
//不论指针穿过被选元素或其子元素，都会触发mouseover，对应mouseout
//只有指针穿过被选元素时候才会触发mouseenter，对应mouseleave
//将变量的值始终保存在闪存中（闭包）

//js将右边字符串转为驼峰法？‘border-left-color’
function transform() {
  var re = /-(\w)/g;
  return str.replace(re, function($0, $1) {
    return $1.toUpperCase();
  });
}

//js去除字符串中的空格
//去除所有空格：str=str.replace(/\s*/g,'')
//去除两头空格：str=str.replace(/^\s*|\s*$/g,'')
//去除左空格：str=str.replace(/^\s*/g,'')
//去除右空格：str=str.replace(/(\s*$)/g,'')
//str.trim()  str.trimLeft()  str.trimRight()

//window.onload和document.ready的区别
//window.onload是在结构，样式，外部js以及图片加载完成之后才执行js
//document.ready是DOM树创建就执行的方法，

//作用域上下文和this 举个例子
var User = {
  count: 1,
  getCount: function() {
    return this.count;
  }
};
console.log(User.getCount()); //1
var func = User.getCount();
// console.log(func()); //undefined
//finc是在window的上下文中执行，指向window，this谁调用指向谁

//判断字符串是否为回文
function isPalindrome(str) {
  str = str.replace(/\W/g, "").toLowerCase();
  return (
    str ==
    str
      .split("")
      .reverse()
      .join("")
  );
}

//报错，a undefined  //let没有变量提升
var a = 10;
function foo() {
  console.log(a);
  let a = 20;
}
foo();

//单向冒泡
function bubbleSort(arr) {
  let length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    let mark = true;
    for (let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        mark = false;
      }
    }
    if (mark) return;
  }
}

//双向冒泡
function bubbleSort_twoWays(arr) {
  let low = 0;
  let high = arr.length - 1;
  while (low < high) {
    let mark = true;
    //找到最大值放右边
    for (let i = low; i < high; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        mark = false;
      }
    }
    high--;
    //找到最小值放左边
    for (let j = high; j > low; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        mark = false;
      }
    }
    low++;
    if (mark) return;
  }
}

//选择排序
function selectSort(arr) {
  length = arr.length;
  for (let i = 0; i < length; i++) {
    for (j = i + 1; j < length; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
}

//插入排序
function insertSort(arr) {
  length = arr.length;
  for (let i = 1; i < length; i++) {
    let temp = arr[i];
    let j = i;
    while (j >= 0 && temp < arr[j - 1]) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
}
