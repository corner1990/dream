"use strict";
function getUserInfo(user) {
    console.log(user.name + " " + user.age);
}
function getVipInfo(user) {
    console.log(user.name + " " + user.age);
}
getUserInfo({ name: 'leo', age: 10 });
getVipInfo({ name: 'vip', age: 999 });
