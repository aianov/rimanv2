import React, { useState, useEffect } from 'react';
import tasks from './tasks.module.scss';
import styles from './Components/burger-menu/burgerMenu.module.scss'

// BIBL'S
import { Routes, Route, NavLink } from 'react-router-dom';
import { Pagination, createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';

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
import { TasksItem } from './Components/tasks-item/tasksItem';
import { Statistics } from '../statistics/statistics';

const theme = createTheme({
    components: {
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    '&': {
                        transition: '.3s ease-in-out',
                        color: 'white',
                        border: '1px solid white'
                    },
                    '&.MuiPaginationItem-ellipsis': {
                        border: 'none'
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'white',
                        color: 'black',
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: 'white',
                        color: 'black',
                        transform: 'scale(1.08)',
                    },
                    '&.MuiPaginationItem-previousNext:hover': {
                        transform: 'scale(1.08)',
                    }
                },
            },
        },
    },
});

export const Tasks = () => {
    const { setTheme } = useTheme();
    //STATES
    const [tasksClick, setTasksClick] = useState(false)
    const [statClick, setStatClick] = useState(false)
    const [bg, setBg] = useState(true);
    const [search, setSearch] = useState('');
    const [max, setMax] = useState(2);
    const [taskslist, setTaskslist] = useState([]);
    const [tasksHide, setTasksHide] = useState(true);
    const [tasksPerPage, setTasksPerPage] = useState(parseInt(localStorage.getItem("maxTasks")) || 2)
    const [currentPage, setCurrentPage] = useState(1)

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
        setTasksPerPage(parseInt(max))
    }
    const maxtasksMinus = () => {
        if (parseInt(max) === 1) { return; }
        setMax(max => parseInt(max) - 1)
        setTasksPerPage(parseInt(max) - 1)
    }
    const maxtasksPlus = () => {
        if (parseInt(max) === 100) { return; }
        setMax(max => parseInt(max) + 1)
        setTasksPerPage(parseInt(max) + 1)
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const tasksGenerate = async (url) => {
        const res = await axios.get(url)
        const updatedTasks = await Promise.all(res.data.map(async (task) => {
            task.text = res.data.indexOf(task) + 1;
            const editedImage = new Image();
            editedImage.crossOrigin = 'anonymous';
            if (task.image) {
                editedImage.src = task.image;
            } else {
                task.image = "http://178.21.8.81/media/tasks_images/9a989fec-174c-4f61-8673-ed563b65c528/Screenshot_9.png";
                task.error = true;
                editedImage.src = task.image;
            }
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const loadImage = new Promise((resolve, reject) => {
                editedImage.onload = () => {
                    canvas.width = editedImage.width;
                    canvas.height = editedImage.height;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(editedImage, 0, 0, canvas.width, canvas.height);
                    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imgData.data;
                    for (let j = 0; j < data.length; j += 4) {
                        const r = data[j];
                        const g = data[j + 1];
                        const b = data[j + 2];
                        const brightness = (3 * r + 4 * g + b) >>> 3;
                        if (brightness < 128) {
                            data[j] = 220; // белый цвет
                            data[j + 1] = 220;
                            data[j + 2] = 220;
                            data[j + 3] = 255;
                        } else {
                            data[j + 3] = 0; // прозрачный цвет
                        }
                    }
                    ctx.putImageData(imgData, 0, 0);
                    task.image = canvas.toDataURL();
                    resolve(task);
                };
                editedImage.onerror = () => {
                    reject(new Error('Failed to load image.'));
                };
            });
            return loadImage;
        }));
        setTaskslist(updatedTasks);
        setTasksHide(false)
    }

    const lastTasksIndex = currentPage * tasksPerPage
    const firstTasksIndex = lastTasksIndex - tasksPerPage
    const currentTasks = taskslist.slice(firstTasksIndex, lastTasksIndex);

    const paginate = pageNumbers => {
        setCurrentPage(pageNumbers || 1);
        console.log(firstTasksIndex)
        console.log(lastTasksIndex)
        console.log(currentPage)
        console.log(currentTasks)
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
                            {tasksHide ? <GenerateTasks tasksGenerate={tasksGenerate} /> :
                                <>
                                    <div className={`${tasks.pagination} df jcc aic w100`}>
                                        <ThemeProvider theme={theme}>
                                            <Pagination
                                                count={Math.ceil(taskslist.length / tasksPerPage)}
                                                onChange={(_, num) => paginate(num)}
                                                classes=''
                                            />
                                        </ThemeProvider>
                                    </div>
                                    {currentTasks.map((item, key) => <TasksItem item={item} key={key} />)}
                                </>
                            }
                        </>
                    } />
                    <Route path="statistics/*" element={<Statistics />} />
                </Routes>
            </div>
        </div>
    )
}