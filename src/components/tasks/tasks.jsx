import React, { useState, useEffect } from 'react';
import tasks from './tasks.module.scss';
import styles from './Components/burger-menu/burgerMenu.module.scss'

// BIBL'S
import { Link, Routes, Route, NavLink } from 'react-router-dom';

// ICONS/IMAGES
import { MdClose } from 'react-icons/md';
import { FiCopy } from 'react-icons/fi'
import { BiExport, BiSearch, BiMinus } from 'react-icons/bi'
import { HiOutlinePrinter } from 'react-icons/hi'
import { CiDark, CiLight } from 'react-icons/ci'
import { BsPlus } from 'react-icons/bs';
import logo from '../../pages/main-page/images/logo.jpg'

// COMPONENTS
import { TasksFilters } from './Components/tasks-filters/tasksFilters'
import { useTheme } from '../../hooks/usetheme';
import { GenerateTasks } from './Components/generate-tasks/generateTasks';
import { Statistics } from '../statistics/statistics';

export const Tasks = () => {
    const { setTheme } = useTheme();
    //STATES
    const [tasksClick, setTasksClick] = useState(false)
    const [statClick, setStatClick] = useState(false)
    const [bg, setBg] = useState(true);
    const [search, setSearch] = useState('');
    const [max, setMax] = useState(2);

    const taskBtn = () => {
        setStatClick(false)
        setTasksClick(true)
    }

    const statisticBtn = () => {
        setTasksClick(false)
        setStatClick(true)
    }


    useEffect(() => {
        const currentTheme = localStorage.getItem("app-theme")
        if (currentTheme === "light") {
            setBg(false)
        }
    }, []);

    const themeBtn = (val) => {
        if (val === "dark") {
            setTheme('dark')
            setBg(true)
        } else {
            setTheme('light')
            setBg(false)
        }
    }

    const searchHandler = (e) => {
        if (!/^[0-9]*$/.test(e)) { return; }
        setSearch(e)
    }

    // MAXTASKS
    const maxtasksHandler = (e) => {
        if (!/^[0-9]*$/.test(e)) { return; }
        if (parseInt(e) > 100) {
            setMax('')
            return;
        }
        if (parseInt(e) === 0) {
            setMax('1')
            return;
        }
        setMax(e)
    }
    const maxtasksBlur = () => {
        if (max === '') { setMax('1') }
    }
    const maxtasksMinus = () => {
        if (parseInt(max) === 1) { return; }
        setMax(e => parseInt(e) - 1)
    }
    const maxtasksPlus = () => {
        if (parseInt(max) === 100) { return; }
        setMax(e => parseInt(e) + 1)
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const url = window.location.href;
        if (url.includes('/statistics')) {
            setStatClick(true)
            setTasksClick(false)
        } else {
            setTasksClick(true)
            setStatClick(false)
        }
    }, []);

    return (
        <div className={`${tasks.main} df w100 h100vh`}>
            <div className={tasks.left}>
                <div className={`${tasks.logo} w100`}>
                    <img src={logo} alt="Logo of the Riman site!" />
                </div>
                {/* <BurgerMenu taskBtn={taskBtn} tasksClick={tasksClick} statisticBtn={statisticBtn} statClick={statClick} /> */}
                <div className={styles.burgerMenu}>
                    <div className={`${styles.burgerIcon} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
                        <div className={styles.bar}></div>
                        <div className={styles.bar}></div>
                        <div className={styles.bar}></div>
                    </div>
                    <div className={`${styles.content} ${isOpen ? styles.open : ''}`} style={{ transform: isOpen ? 'translateX(0%)' : 'translateX(100%)' }}>
                        <div className={styles.menuItems}>
                            <NavLink onClick={taskBtn} to={tasksClick ? null : "/tasks"} className='cp cw tdn'>
                                <p className={tasksClick ? styles.menuselected : ''}>Задачи</p>
                            </NavLink>
                            <NavLink onClick={statisticBtn} to={statClick ? null : "/tasks/statistics"} className='cp cw tdn'>
                                <p className={statClick ? styles.menuselected : ''}>Статистика</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <TasksFilters />
                <div className={`${tasks.bottom} w100`}>
                    <div className={`${tasks.bottombtn} df jcsb aic w100 cp`}>
                        <p>ID варианта</p>
                        <FiCopy size={20} className='cp' />
                    </div>
                    <div className={`${tasks.bottombtn} df jcsb aic w100 cp`}>
                        <p>Экспорт в PDF</p>
                        <BiExport size={20} className='cp' />
                    </div>
                    <div className={`${tasks.bottombtn} df jcsb aic w100 cp`}>
                        <p>Экспорт в PDF</p>
                        <HiOutlinePrinter size={20} className='cp' />
                    </div>
                </div>
            </div>
            <div className={`${tasks.right} h100`}>
                <div className={`${tasks['right-top']} w100`}>
                    <div className={`${tasks.righttop} df jcsb aic w100`}>
                        <div className={`${tasks['righttop-btns']} df jcsb aic`}>
                            <NavLink onClick={taskBtn} to={tasksClick ? null : "/tasks"} className='cp cw tdn'>
                                <p className={tasksClick ? tasks.menuselected : ''}>Задачи</p>
                            </NavLink>
                            <NavLink onClick={statisticBtn} to={statClick ? null : "/tasks/statistics"} className='cp cw tdn'>
                                <p className={statClick ? tasks.menuselected : ''}>Статистика</p>
                            </NavLink>
                        </div>
                        <div className={`${tasks.themebtn} df aic jcc cw cp`}>
                            <CiLight onClick={() => themeBtn("light")} className={bg ? '' : tasks.hide} size={25} />
                            <CiDark onClick={() => themeBtn("dark")} className={bg ? tasks.hide : ''} size={25} />
                        </div>
                    </div>
                </div>
                <Routes>
                    <Route path='/' element={
                        <>
                            <div className={`${tasks.bar} w100 cw`}>
                                <div className={`${tasks.container} df jcsb aic w100`}>
                                    <div className={`${tasks.search} df jcsb aic`}>
                                        <input className='cw' placeholder='id задания или варианта' type="text" maxLength={20} value={search} onChange={e => searchHandler(e.target.value)} />
                                        <BiSearch size={20} />
                                    </div>
                                    <div className={`${tasks.maxtasks} df jcsb aic`}>
                                        <BiMinus className='cp' size={25} onClick={maxtasksMinus} />
                                        <input className='cw' type="text" maxLength={3} value={max} onBlur={maxtasksBlur} onChange={e => maxtasksHandler(e.target.value)} />
                                        <BsPlus className='cp' size={25} onClick={maxtasksPlus} />
                                    </div>
                                    <select name="your variant">
                                        <option value="1" selected>Свой вариант</option>
                                    </select>
                                </div>
                            </div>
                            <GenerateTasks />
                        </>
                    } />
                    <Route path="statistics/*" element={<Statistics />} />
                </Routes>
            </div>
        </div>
    )
}