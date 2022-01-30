'use strict'

/*
Создайте дату
важность: 5
Создайте объект Date для даты: 20 февраля 2012 года, 3 часа 12 минут. Временная зона – местная.

Для вывода используйте alert.
 */

const date = new Date("2012-02-20T03:12:00");
//alert(date);

const date2 = new Date(2012, 1, 20, 3, 12);
//alert(date2);

const weekDays = [
    "ВС",
    "ПН",
    "ВТ",
    "СР",
    "ЧТ",
    "ПТ",
    "СБ",
];

/*
Покажите день недели
важность: 5
Напишите функцию getWeekDay(date), показывающую день недели в коротком формате: «ПН», «ВТ», «СР», «ЧТ», «ПТ», «СБ», «ВС».

Например:

let date = new Date(2012, 0, 3);  // 3 января 2012 года
alert( getWeekDay(date) );        // нужно вывести "ВТ"
 */

const getWeekDay = (date) => {
    const dayNum = date.getDay();
    return weekDays[dayNum];
}

const date3 = new Date();
//alert(getWeekDay(date3));


/*
День недели в европейской нумерации
важность: 5
В Европейских странах неделя начинается с понедельника (день номер 1), затем идёт вторник (номер 2) и так до воскресенья (номер 7). Напишите функцию getLocalDay(date), которая возвращает «европейский» день недели для даты date.
let date = new Date(2012, 0, 3);  // 3 января 2012 года
alert( getLocalDay(date) );       // вторник, нужно показать 2
 */

const getLocalDay = date => {
    const day = date.getDay();
    return day === 0 ? 7 : day;
};
const date4 = new Date(2012, 0, 3);
//alert(getLocalDay(date4));


/*
Какой день месяца был много дней назад?
важность: 4
Создайте функцию getDateAgo(date, days), возвращающую число, которое было days дней назад от даты date.

К примеру, если сегодня двадцатое число, то getDateAgo(new Date(), 1) вернёт девятнадцатое и getDateAgo(new Date(), 2) – восемнадцатое.

Функция должна надёжно работать при значении days=365 и больших значениях:
 */

const getDateAgo = (date, days) => {
    const pastDate = new Date(date);
    pastDate.setDate(date.getDate() - days);
    return pastDate.getDate();
};

//alert(getDateAgo(new Date(), 1));
//alert(getDateAgo(new Date(), 2));


/*
Последнее число месяца?
важность: 5
Напишите функцию getLastDayOfMonth(year, month), возвращающую последнее число месяца. Иногда это 30, 31 или даже февральские 28/29.

Параметры:

year – год из четырёх цифр, например, 2012.
month – месяц от 0 до 11.
К примеру, getLastDayOfMonth(2012, 1) = 29 (високосный год, февраль).
 */

const getLastDayOfMonth = (year, month) => {
    let day = 28;
    const date = new Date(year, month, day);
    while (true) {
        date.setDate(date.getDate() + 1);
        if (date.getMonth() !== month) return day;
        day++;
    }
}

alert(getLastDayOfMonth(2012, 1));

const getLastDayOfMonth2 = (year, month) => {
    const date = new Date(year, month+1, 0);
    return date.getDate();
}

alert(getLastDayOfMonth2(2012, 1));

/*
Сколько сегодня прошло секунд?
важность: 5
Напишите функцию getSecondsToday(), возвращающую количество секунд с начала сегодняшнего дня.

Например, если сейчас 10:00, и не было перехода на зимнее/летнее время, то:

getSecondsToday() == 36000 // (3600 * 10)
Функция должна работать в любой день, т.е. в ней не должно быть конкретного значения сегодняшней даты.
 */

const getSecondsToday = () => {
    const dateNow = Date.now();

    const dateMorning = new Date(dateNow);
    dateMorning.setHours(0);
    dateMorning.setMinutes(0);
    dateMorning.setSeconds(0);
    dateMorning.setMilliseconds(0);

    // .getTime() работает быстрее, чем просто сравнение дат, т.к. не нужно преобразовывать типы и js'у это легче оптимизировать
    const milliSecFromMorning = dateNow - dateMorning.getTime();

    return Math.round(milliSecFromMorning / 1000);
}

alert("сегодня ты мог бы изучать js уже " + getSecondsToday() + " секунд");


/*
Сколько секунд осталось до завтра?
важность: 5
Создайте функцию getSecondsToTomorrow(), возвращающую количество секунд до завтрашней даты.

Например, если сейчас 23:00, то:

getSecondsToTomorrow() == 3600
P.S. Функция должна работать в любой день, т.е. в ней не должно быть конкретного значения сегодняшней даты.
 */

const getSecondsToTomorrow = () => {
    const dateNow = new Date();
    const dateTomorrow = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() + 1);
    return Math.round((dateTomorrow.getTime() - dateNow.getTime()) / 1000);
}

alert(getSecondsToTomorrow());


/*
Форматирование относительной даты
важность: 4
Напишите функцию formatDate(date), форматирующую date по следующему принципу:

Если спустя date прошло менее 1 секунды, вывести "прямо сейчас".
В противном случае, если с date прошло меньше 1 минуты, вывести "n сек. назад".
В противном случае, если меньше часа, вывести "m мин. назад".
В противном случае, полная дата в формате "DD.MM.YY HH:mm". А именно: "день.месяц.год часы:минуты", всё в виде двух цифр, т.е. 31.12.16 10:00.
Например:

alert( formatDate(new Date(new Date - 1)) ); // "прямо сейчас"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 сек. назад"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 мин. назад"

// вчерашняя дата вроде 31.12.2016, 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
 */

const formatDate = (date) => {
    const dateNow = Date.now();
    const timePassedMs = dateNow - date.getTime();
    const sec = 1000;

    if (timePassedMs < sec) return 'прямо сейчас';
    if (timePassedMs < sec * 60) return `${Math.round(timePassedMs / 1000)} сек. назад`;
    if (timePassedMs < sec * 60 * 60) return `${Math.round(timePassedMs / 1000 / 60)} мин. назад`;

    const day = date.getDate().toString().length === 1 ? "0" + date.getDate() : date.getDate();
    const month = date.getMonth().toString().length === 1 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const fullYear = date.getFullYear();
    const shortYear = fullYear.toString()[2] + fullYear.toString()[3];
    const hours = date.getHours().toString().length === 1 ? "0" + date.getHours() : date.getHours();
    const minutes = date.getMinutes().toString().length === 1 ? "0" + date.getMinutes() : date.getMinutes() ;

    return `${day}.${month}.${shortYear} ${hours}:${minutes}`;
}

const formatDate2 = (date) => {
    const dateNow = Date.now();
    const timePassedMs = dateNow - date.getTime();
    const sec = 1000;

    if (timePassedMs < sec) return 'прямо сейчас';
    if (timePassedMs < sec * 60) return `${Math.round(timePassedMs / 1000)} сек. назад`;
    if (timePassedMs < sec * 60 * 60) return `${Math.round(timePassedMs / 1000 / 60)} мин. назад`;

    const dateArray = [
        "0" + date.getDate(),
        "0" + (date.getMonth() + 1),
        "" + date.getFullYear(),
        "0" + date.getHours(),
        "0" + date.getMinutes(),
    ].map(elem => elem.slice(-2));

    return dateArray.slice(0, 3).join(".") + " " + dateArray.slice(3).join(":")
}

alert(formatDate(new Date(1980)));
alert(formatDate2(new Date(1980)));