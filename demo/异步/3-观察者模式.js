class Subject {
    constructor(name) {
        this.name = name;
        this.observers = [];    // 存放所有观察者
        this.mood = '心情很美丽';
    }
    // 接收观察者方法
    accept(observer) {
        this.observers.push(observer);
    }
    // 心情
    setMood(newMood) {
        this.mood = newMood;
        // 通知所欲观察者我现在的心情
        this.observers.forEach(o => o.update(newMood));
    }
}

// 观察者
class Observer {
    constructor(name) {
        this.name = name;
    }
    update(newMood) {
        console.log(this.name);
        console.log(newMood);
    }
}

// 创建被观察者实例
let sub = new Subject('girl');
// 创建观察者
let o1 = new Observer('boy');
let o2 = new Observer('father');

sub.accept(o1);
sub.accept(o2);
sub.setMood('心情很糟糕');