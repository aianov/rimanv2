import React, { useState, useEffect } from 'react'
import tasks from '../../tasks.module.scss'

// HOOKS
import { useToggle } from '../../../../hooks/useToggle';

//BIBL'S
import { nanoid } from 'nanoid'

// ICONS
import { BsPlus } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

const FilterTasks = ({ id, onDeleteTask }) => {
    const [value, setValue] = useState(1);
    const maxTasks = 40;

    const handlePlus = () => {
        if (value === maxTasks) {
            return;
        }
        setValue((prevValue) => prevValue + 1);
    };

    const handleMinus = () => {
        if (value === 1) {
            return;
        }
        setValue((prevValue) => prevValue - 1);
    };

    const handleDelete = () => {
        onDeleteTask(id);
    };

    const tasksHandler = (e) => {
        if (!/^[0-9]*$/.test(e)) { return; }
        if (parseInt(e) > maxTasks || parseInt(e) < 1) {
            setValue('');
            return;
        }
        setValue(e);
    }

    return (
        <div className={tasks.tasks}>
            <div className={`${tasks.chooseitem} w100 df jcsb`}>
                <p>Задания:</p>
                <select name="chooseitem">
                    <option value="1" selected>1 задание</option>
                </select>
            </div>
            <div className={`${tasks.chooseitem} w100 df jcsb`}>
                <div className={`${tasks.create} df jcc aic h100 cp`} onClick={handleDelete}>
                    <MdClose size={25} />
                </div>
                <div className={`${tasks.inpbtns} df jcsb aic h100`}>
                    <div className={`${tasks.inpbtn} df jcsb aic h100 cp`} onClick={handleMinus}>
                        <BiMinus size={25} />
                    </div>
                    <input
                        type="text"
                        value={value}
                        className={`${tasks.input} tac cw`}
                        onChange={(e) => tasksHandler(e.target.value)}
                    />
                    <div className={`${tasks.plus} df jcc aic h100 cp`} onClick={handlePlus}>
                        <BsPlus size={25} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const FilterPodtip = ({ id, onDeleteTask }) => {
    const [value, setValue] = useState(1);
    const maxTasks = 20;

    const handlePlus = () => {
        if (value === maxTasks) {
            return;
        }
        setValue((prevValue) => prevValue + 1);
    };

    const handleMinus = () => {
        if (value === 1) {
            return;
        }
        setValue((prevValue) => prevValue - 1);
    };

    const handleDelete = () => {
        onDeleteTask(id);
    };

    const tasksHandler = (e) => {
        if (!/^[0-9]*$/.test(e)) { return; }
        if (parseInt(e) > maxTasks || parseInt(e) < 1) {
            setValue('');
            return;
        }
        setValue(e);
    }

    return (
        <div className={tasks.tasks}>
            <div className={`${tasks.chooseitem2} w100 df jcsb`}>
                <p>Подтип:</p>
                <select name="chooseitem">
                    <option value="1" selected>Треугольники</option>
                </select>
            </div>
            <div className={`${tasks.chooseitem2} w100 df jcsb`}>
                <div className={`${tasks.create} df jcc aic h100 cp`} onClick={handleDelete}>
                    <MdClose size={25} />
                </div>
                <div className={`${tasks.inpbtns} df jcsb aic h100`}>
                    <div className={`${tasks.inpbtn} df jcsb aic h100 cp`} onClick={handleMinus}>
                        <BiMinus size={25} />
                    </div>
                    <input
                        type="text"
                        value={value}
                        className={`${tasks.input} tac cw`}
                        onChange={(e) => tasksHandler(e.target.value)}
                    />
                    <div className={`${tasks.plus} df jcc aic h100 cp`} onClick={handlePlus}>
                        <BsPlus size={25} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const TasksFilters = () => {
    // States for filter
    const [dostover, setDostover] = useState(80);
    const [difficulty, setDifficulty] = useState(30);
    const [tasksNum, setTasksNum] = useState(5);
    const [podtipNum, setPodtipNum] = useState(10);
    const [timerHours, setTimerHours] = useState(parseInt(localStorage.getItem("timerHours")) || 0)
    const [timerMinutes, setTimerMinutes] = useState(parseInt(localStorage.getItem("timerMinutes")) || 0)
    const [timerHide, setTimerHide] = useToggle(false);
    const [taskCount, setTaskCount] = useState(1);
    const [addtasks, setAddtasks] = useState([]);
    const [filtersTasks, setFiltersTasks] = useState([]);
    const [filtersPodtip, setFiltersPodtip] = useState([]);

    if (timerHours === 0 && timerMinutes === 0) {
        setTimerMinutes(0)
        setTimerHours(12)
    }

    // Filters maximum
    const maxTasks = 40;
    const maxPodtip = 20;

    const dostoverInput = (e) => { setDostover(e.target.value) }
    const difficultyInput = (e) => { setDifficulty(e.target.value) }

    // Filters logic
    // Tasks
    const tasksHandler = (e) => {
        if (!/^[0-9]*$/.test(e)) { return; }
        if (parseInt(e) > maxTasks || parseInt(e) < 1) {
            setTasksNum('');
            return;
        }
        setTasksNum(e);
    }
    const tasksPlus = () => {
        if (parseInt(tasksNum) === maxTasks) { return }
        setTasksNum(num => parseInt(num) + 1)
    }
    const tasksMinus = () => {
        if (parseInt(tasksNum) === 1) { return }
        setTasksNum(num => parseInt(num) - 1)
    }
    const handleAddTasks = () => {
        const id = nanoid();
        setFiltersTasks([...filtersTasks, { id }]);
    };
    const handleDeleteTasks = (id) => {
        setFiltersTasks(filtersTasks.filter(task => task.id !== id));
    };
    // Podtip
    const podtipHandler = (e) => {
        if (!/^[0-9]*$/.test(e)) { return; }
        if (parseInt(e) > maxPodtip || parseInt(e) < 1) {
            setPodtipNum('');
            return;
        }
        setPodtipNum(e);
    }
    const podtipPlus = () => {
        if (parseInt(podtipNum) === maxTasks) { return }
        setPodtipNum(num => parseInt(num) + 1)
    }
    const podtipMinus = () => {
        if (parseInt(podtipNum) === maxTasks) { return }
        setPodtipNum(num => parseInt(num) - 1)
    }
    const handleAddPodtip = () => {
        const id = nanoid();
        setFiltersPodtip([...filtersPodtip, { id }]);
    };
    const handleDeletePodtip = (id) => {
        setFiltersPodtip(filtersPodtip.filter(filter => filter.id !== id));
    };
    // Timer
    const timerBtnMinus = () => {
        if (timerMinutes === 1) { return; }
        if (timerHours > 3) {
            setTimerHours(timerHours => timerHours - 1)
            return;
        }
        if (timerHours < 2 && timerHours >= 0 && timerMinutes === 0) {
            setTimerHours(timerHours => timerHours - 1)
            setTimerMinutes(50)
            return;
        }
        if (timerMinutes <= 5 && timerHours === 0) {
            setTimerMinutes(timerMinutes => timerMinutes - 1)
            return;
        }
        if (timerHours === 0 && timerMinutes <= 30) {
            setTimerMinutes(timerMinutes => timerMinutes - 5)
            return;
        }
        if (timerHours === 3) {
            setTimerHours(2)
            setTimerMinutes(30)
            return;
        }
        if (timerHours === 2 && timerMinutes === 30) {
            setTimerMinutes(0)
            return;
        }
        if (timerHours === 2 && timerMinutes === 0) {
            setTimerHours(1)
            setTimerMinutes(50)
        }
        if (timerHours < 2) { setTimerMinutes(timerMinutes => timerMinutes - 10) }
    }
    const timerBtnPlus = () => {
        if (timerHours === 12) { return; }
        if (timerMinutes < 5 && timerHours === 0) { setTimerMinutes(timerMinutes => timerMinutes + 1) }
        if (timerMinutes >= 5 && timerMinutes < 30 && timerHours === 0) { setTimerMinutes(timerMinutes => timerMinutes + 5) }
        if (timerMinutes >= 30 && timerHours === 0) { setTimerMinutes(timerMinutes => timerMinutes + 10) }
        if (timerHours >= 1 && timerHours < 2) { setTimerMinutes(timerMinutes => timerMinutes + 10) }
        if (timerMinutes === 50 && timerHours < 2) {
            setTimerMinutes(0)
            setTimerHours(timerHours => timerHours + 1)
        }
        if (timerMinutes < 30 && timerHours === 2 && timerHours < 3) { setTimerMinutes(timerMinutes => timerMinutes + 30) }
        if (timerMinutes === 30 && timerHours === 2 && timerHours < 3) {
            setTimerMinutes(0)
            setTimerHours(3)
        }
        if (timerMinutes === 0 && timerHours >= 3) { setTimerHours(timerHours => timerHours + 1) }
    }

    const removeTask = (index) => {
        const updatedTasks = [...addtasks];
        updatedTasks.splice(index, 1);
        setAddtasks(updatedTasks);
    };

    const addTasks = () => {
        setTaskCount(taskCount => taskCount + 1);
        const additionalTasks = [...addtasks];

        additionalTasks.push(
            <div className={tasks.tasks}>
                <div className={`${tasks.chooseitem2} w100 df jcsb`}>
                    <p>Задания:</p>
                    <select name="chooseitem">
                        <option value="1" selected>1 задание</option>
                    </select>
                </div>
                <div className={`${tasks.chooseitem2} w100 df jcsb`}>
                    <div className={`${tasks.create} df jcc aic h100 cp`} onClick={() => removeTask(additionalTasks.length - 1)}>
                        <MdClose size={25} />
                    </div>
                    <div className={`${tasks.inpbtns} df jcsb aic h100`}>
                        <div className={`${tasks.inpbtn} df jcsb aic h100 cp`} onClick={tasksMinus}>
                            <BiMinus size={25} />
                        </div>
                        <input
                            type="text"
                            value={tasksNum}
                            className={`${tasks.input} tac cw`}
                            onChange={(e) => tasksHandler(e.target.value)}
                        />
                        <div className={`${tasks.plus} df jcc aic h100 cp`} onClick={tasksPlus}>
                            <BsPlus size={25} />
                        </div>
                    </div>
                </div>
            </div>
        );
        setAddtasks(additionalTasks)
    }

    const removeFilters = () => {
        setFiltersPodtip([])
        setFiltersTasks([])
    }

    useEffect(() => {
        localStorage.setItem("timerHours", timerHours);
        localStorage.setItem("timerMinutes", timerMinutes);
    }, [timerMinutes, timerHours])

    return (
        <div className={`${tasks.filters} w100 cw`}>
            <div className={`${tasks.title} w100 df jcc`}>
                <p className='tac'>ФИЛЬТРЫ:</p>
            </div>
            <div className={`${tasks.clearcontainer} w100`}>
                <div className={`${tasks.clear} df jcsb aic w100 cw cp`} onClick={removeFilters}>
                    <p>Очистить поиск</p>
                    <MdClose size={20} />
                </div>
            </div>
            <div className={`${tasks.choose} w100`}>
                <div className={`${tasks.select} w100`}>
                    <div className={`${tasks.chooseitem} w100 df jcsb`}>
                        <p>Предмет:</p>
                        <select name="chooseitem">
                            <option value="1" selected>Математика</option>
                        </select>
                    </div>
                    <div className={`${tasks.chooseitem} w100 df jcsb`}>
                        <p>Направление:</p>
                        <select name="chooseitem">
                            <option value="1" selected>Математика</option>
                        </select>
                    </div>
                    <div className={`${tasks.chooseitem} w100 df jcsb`}>
                        <p>Тип задачи:</p>
                        <select name="chooseitem">
                            <option value="1" selected>ЕГЭ</option>
                        </select>
                    </div>
                </div>
                <div className={`${tasks.rangediv} w100`}>
                    {/* DOSTOVER */}
                    <div className={`${tasks.chooseitem} w100 df jcsb`}>
                        <p>Достоверность:</p>
                        <div className={`${tasks.range} df aic`}>
                            <div className='w100 df aic'>
                                <input onChange={(e) => dostoverInput(e)} id="dostoverRange" type="range" min="0" max="100" step="1" value={dostover} />
                            </div>
                        </div>
                    </div>
                    {/* DIFFICULTY */}
                    <div className={`${tasks.chooseitem} w100 df jcsb`}>
                        <p>Сложность:</p>
                        <div className={`${tasks.range} df aic`}>
                            <div className='w100 df aic'>
                                <input onChange={(e) => difficultyInput(e)} id="difficultyRange" type="range" min="0" max="100" step="1" value={difficulty} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${tasks.block} w100`}>
                    {/* TASKS */}
                    <div className={tasks.tasks}>
                        <div className={`${tasks.chooseitem2} w100 df jcsb`}>
                            <p>Задания:</p>
                            <select name="chooseitem">
                                <option value="1" selected>1 задание</option>
                            </select>
                        </div>
                        <div className={`${tasks.chooseitem2} w100 df jcsb`}>
                            <div className={`${tasks.create} df jcc aic h100 cp`} onClick={handleAddTasks}>
                                <BsPlus size={25} />
                            </div>
                            <div className={`${tasks.inpbtns} df jcsb aic h100`}>
                                <div className={`${tasks.inpbtn} df jcsb aic h100 cp`} onClick={tasksMinus}>
                                    <BiMinus size={25} />
                                </div>
                                <input
                                    type="text"
                                    value={tasksNum}
                                    className={`${tasks.input} tac cw`}
                                    onChange={(e) => tasksHandler(e.target.value)}
                                />
                                <div className={`${tasks.plus} df jcc aic h100 cp`} onClick={tasksPlus}>
                                    <BsPlus size={25} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {filtersTasks.map(({ id }) => (
                        <FilterTasks key={id} id={id} onDeleteTask={handleDeleteTasks} />
                    ))}
                    {/* PODTIP */}
                    <div className={tasks.tasks}>
                        <div className={`${tasks.chooseitem2} w100 df jcsb`}>
                            <p>Подтип:</p>
                            <select name="chooseitem">
                                <option value="1" selected>Треугольники</option>
                            </select>
                        </div>
                        <div className={`${tasks.chooseitem2} w100 df jcsb`}>
                            <div className={`${tasks.create} df jcc aic h100 cp`} onClick={handleAddPodtip}>
                                <BsPlus size={25} />
                            </div>
                            <div className={`${tasks.inpbtns} df jcsb aic h100`}>
                                <div className={`${tasks.inpbtn} df jcsb aic h100 cp`} onClick={podtipMinus}>
                                    <BiMinus size={25} />
                                </div>
                                <input
                                    type="text"
                                    value={podtipNum}
                                    className={`${tasks.input} tac cw`}
                                    onChange={(e) => podtipHandler(e.target.value)}
                                />
                                <div className={`${tasks.plus} df jcc aic h100 cp`} onClick={podtipPlus}>
                                    <BsPlus size={25} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {filtersPodtip.map(({ id }) => (
                        <FilterPodtip key={id} id={id} onDeleteTask={handleDeletePodtip} />
                    ))}
                </div>
                {/* TIMER */}
                <div className={`${tasks.timer} df jcsb fww w100`}>
                    <p>Таймер:</p>
                    <div className={`${tasks.timerbtns} df jcsb h100`}>
                        <div className={`${tasks.timerclose} df aic jcc h100 cp`} onClick={setTimerHide}>
                            {timerHide ? <BsPlus size={25} /> : <MdClose size={21} />}
                        </div>
                        {timerHide ? <></> :
                            <div className={`${tasks.timerinpbtns} df jcsb aic h100`}>
                                <div className={`${tasks.inpbtn} df jcsb aic h100 cp`} onClick={timerBtnMinus}>
                                    <BiMinus size={25} />
                                </div>
                                <span>{`${timerHours === 0 ? "" : `${timerHours}ч`} ${timerMinutes === 0 ? "" : `${timerMinutes}м`}`}</span>
                                <div className={`${tasks.plus} df jcc aic h100 cp`} onClick={timerBtnPlus}>
                                    <BsPlus size={25} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}