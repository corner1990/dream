// 定义枚举类型的值 性别，里边有两个选项，girl， boy
var Gender;
(function (Gender) {
    Gender["BOY"] = "\u7537\u5B69";
    Gender["GIRL"] = "\u5973\u5B69";
})(Gender || (Gender = {}));
console.log("leo is gender" + Gender.BOY + ", nick is " + Gender.GIRL);
