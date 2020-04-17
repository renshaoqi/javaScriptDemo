import $ from 'jquery';
import './css/a.css';
import './css/b.less';
import './css/c.scss';

$(function () {
    $('p').css('background', 'red');
    $('p').css('font-size', '30px');
});

class Student {
    static name = 'R先生';
}