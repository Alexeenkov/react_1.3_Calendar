import React from 'react';
import s from './Calendar.module.css';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from "prop-types";

const Calendar = (props) => {
    const { date } = props;

    // Полное название текущего месяца на русском языке
    const currentMonthName = date.toLocaleDateString('ru-RU', {
        month: 'long',
    });
    // Полное название текущего месяца на русском языке (в родительском падеже)
    const currentMonthNameDeclination = (date.getMonth() === 2 || date.getMonth() === 7) ? currentMonthName + 'a' : currentMonthName.slice(0, -1) + 'я';
    // Полное название текущего дня недели на русском языке
    const weekdayCurrentName = date.toLocaleDateString('ru-RU', {
        weekday: 'long'
    });
    // В прототипе объекта Date создаем метод, определяющий количество дней в месяце
    // eslint-disable-next-line no-extend-native
    Date.prototype.daysInMonth = function () {
        return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
    };

    const daysCurrentMonth = date.daysInMonth(); // Количество дней в текущем месяце
    const daysPrevMonth = new Date(date.getFullYear(), date.getMonth() - 1).daysInMonth(); // Количество дней в предыдущем месяце
    const yearCurrent = date.getFullYear(); // Текущий год
    let weekdayFirstNumber = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // День недели 1 числа месяца (1-7), где 1 = понедельник
    if (weekdayFirstNumber === 0) {
        weekdayFirstNumber = 7;
    }
    const daysPrev = weekdayFirstNumber - 1;// Cколько дней предшествует 1 числу текущего месяца
    const dayCurrent = date.getDate(); // День месяца

    const tableBody = []; // Таблица календаря (Массив с JSX-разметкой, вставляемый в основную разметку компонента)
    let count = 1; // Число месяца, увеличивается циклом
    let dayNext = 1; // Число следующего месяца, увеличивается циклом
    for (let i = 0; i < 5; i += 1) {
        const tr = [];
        for (let j = 0; j < 7; j += 1) {
            if (i === 0 && j <= daysPrev - 1) {
                tr.push(
                    <td key={uuidv4()} className={s.uiDatepickerOtherMonth}>{daysPrevMonth - daysPrev + j + 1}</td>
                );
                continue;
            }
            if (count === dayCurrent) {
                tr.push(
                    <td key={uuidv4()} className={s.uiDatepickerToday}>{count}</td>
                );
                count += 1;
                continue;
            }
            if (count > daysCurrentMonth) {
                tr.push(
                    <td key={uuidv4()} className={s.uiDatepickerOtherMonth}>{dayNext}</td>
                );
                dayNext += 1;
                continue;
            }
            tr.push(
                <td key={uuidv4()}>{count}</td>
            );
            count += 1;
        }
        tableBody.push(<tr key={uuidv4()}>{tr}</tr>);
    }

    return (
        <div className={s.uiDatepicker}>
            <div className={s.uiDatepickerMaterialHeader}>
                <div className={s.uiDatepickerMaterialDay}>{weekdayCurrentName}</div>
                <div className={s.uiDatepickerMaterialDate}>
                    <div className={s.uiDatepickerMaterialDayNum}>{dayCurrent}</div>
                    <div className={s.uiDatepickerMaterialMonth}>{currentMonthNameDeclination}</div>
                    <div className={s.uiDatepickerMaterialYear}>{yearCurrent}</div>
                </div>
            </div>
            <div className={s.uiDatepickerHeader}>
                <div className={s.uiDatepickerTitle}>
                    <span className={s.uiDatepickerMonth}>{currentMonthName}</span>&nbsp;<span className={s.uiDatepickerYear}>{yearCurrent}</span>
                </div>
            </div>
            <table className={s.uiDatepickerCalendar}>
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col className={s.uiDatepickerWeekEnd} />
                    <col className={s.uiDatepickerWeekEnd} />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
        </div>
    );
}

Calendar.propTypes = {
    item: PropTypes.shape({
        now: PropTypes.object,
    }),
};

export default Calendar;