/**
 * @desc 封装
 */
class Animal{
    public name;
    protected age;
    private weight;
    constructor (name, age, weight) {
        this.name = name;
        this.age = age;
        this.weight = weight;
    }
}
class Person extends Animal {
    private money;
    constructor (name, age, weight, money) {
        super(name, age, weight);
        this.money = money;
    }
    getName(){
        console.log(this.name)
    }
    getAge(){
        console.log(this.age)
    }
}
